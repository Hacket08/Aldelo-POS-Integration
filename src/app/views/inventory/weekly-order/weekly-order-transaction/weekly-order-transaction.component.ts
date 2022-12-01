import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SwalService } from 'src/_services/swal-service';

import { Item } from 'src/_model/item/item';
import { ItemService } from 'src/_shared/items/item.service';

import { Users } from 'src/_services/user.api';
import { ItemCategoriesService } from '../../../../../_shared/item-categories/item-categories.service';
import { WeeklyOrderService } from '../../../../../_shared/weekly-order/weekly-order.service';

import { ItemCategories } from 'src/_model/item-categories/item-categories';
import { WeeklyOrder } from 'src/_model/weekly-order/weekly-order';
import { WeeklyOrderDetails } from 'src/_model/weekly-order/weekly-order-details';

import { WeeklyOrderApi } from 'src/_shared/weekly-order/weekly-order.api';
import { GlobalService } from 'src/_shared/api/service';

@Component({
  selector: 'app-weekly-order-transaction',
  templateUrl: './weekly-order-transaction.component.html',
  styleUrls: ['./weekly-order-transaction.component.scss'],
})
export class WeeklyOrderTransactionComponent implements OnInit {
  @Input() weeklyorderData: WeeklyOrder[] = [];
  @Output() weeklyOrderEvent = new EventEmitter();

  headerForm!: FormGroup;
  userInfo: any;
  isViewHidden = false;
  isEditHidden = false;

  otheritem: WeeklyOrderDetails;
  otheritemlines: WeeklyOrderDetails[] = [];

  weeklyorderitem: WeeklyOrderDetails;
  weeklyorderitemlist: WeeklyOrderDetails[] = [];

  weeklyorderdetails: WeeklyOrderDetails;
  weeklyorderlines: WeeklyOrderDetails[] = [];

  weeklyorderinfo: WeeklyOrder[] = [];
  isPOCreated = false;
  POCreated = '';

  isReadOnly = false;

  isHiddenSave = false;
  isHiddenAction = false;
  isHiddenActionRow = false;
  isHiddenAddItem = false;
  isHiddenApproveBtn = false;
  isHiddenRejectBtn = false;
  isHiddenDiv = false;
  isHiddenDeleteBtn = false;
  isHiddenPurchaseBtn = false;
  isHiddenAddItemBtn = false;

  isHiddenRow = false;
  isHiddenDelRow = false;
  isHiddenActRow = false;
  isHiddenItemRow = false;
  isHiddenStockRow = false;

  isReadOnlyHeader = false;
  isReadOnlyOrderDate = false;
  isReadOnlyOrderRow = false;

  state = 'add';
  docId: number;
  badge: string = 'warning';
  badgename: string = 'Pending';

  // initialized values
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  deliverydate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'yyyy-MM-dd'
  );

  itemcategorylist: ItemCategories[] = [];
  items: Item[] = [];

  constructor(
    private fb: FormBuilder,
    private user: Users,
    private swal: SwalService,
    private itemcategory: ItemCategories,
    private itemcategoriesservice: ItemCategoriesService,
    private weeklyorderservice: WeeklyOrderService,
    private itemservice: ItemService,
    // private weeklyorderapi: WeeklyOrderApi,
    private globalservice: GlobalService,
    private weeklyorder: WeeklyOrder
  ) {
    // declare the form group fields
    
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      weeklyorderid: '',
      remarks: '',
      docnum: '',
      docdate: this.postingdate,
      orderdate: this.postingdate,
      deldate: this.deliverydate,

      branchcode: this.userInfo.BranchCode,
      branchname: this.userInfo.BranchName,
      orderby: this.userInfo.FullName,
      owner: this.userInfo.FullName,
      receivedby: '',
      deliveredby: '',
      docstatus: 0,
      ispocreated: 0,
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.weeklyorderData.length <= 0) {
      await this.isAddEvent();
    } else {
      await this.isEditEvent();
    }
  }

  async isAddEvent() {
    this.isHiddenPurchaseBtn = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDeleteBtn = true;
    this.isPOCreated = true; 
    this.POCreated = '';   
    this.isHiddenDiv = true;

    this.isViewHidden = false;
    this.isEditHidden = true;
    this.isReadOnly = false;
    this.state = 'add';

    let data: any;
    this.itemcategorylist = [];

    const _docnum = await this.globalservice.getMaxId('WeeklyOrder');
    // const _docnum = await this.weeklyorderapi.get_WeeklyOrderBy('GetMaxId');
    this.headerForm.patchValue({
      weeklyorderid: 0,
      docnum: _docnum,
    });

    data = await this.itemcategoriesservice.getList();
    let int = 0;
    let pint = 0;
    if (data !== false) {
      for (var val of data) {
        this.itemcategory = [] as any;
        this.itemcategory.ins_CategoryCode = val.ins_CategoryCode;
        this.itemcategory.ins_CategoryName = val.ins_CategoryName;
        this.itemcategory.ins_IsValid = true;
        this.itemcategory.ins_AddItem = true;

        let tempItems = (await this.ItemPerCategories(
          val.ins_CategoryCode
        )) as any[];
        this.weeklyorderitemlist = [];
        for (var o of tempItems) {
          console.log(o);
          this.weeklyorderitem = new WeeklyOrderDetails();
          this.weeklyorderitem.ins_ParentId = pint;
          this.weeklyorderitem.ins_Id = int++;
          this.weeklyorderitem.ins_ItemCode = o.ins_ItemCode;
          this.weeklyorderitem.ins_ItemDescription = o.ins_ItemName;
          this.weeklyorderitem.ins_InventoryUom = o.ins_InventoryUom;
          this.weeklyorderitem.ins_ItemCategory = o.ins_ItemCategory;
          this.weeklyorderitem.ins_OnHand = o.ins_OnHand;

          this.weeklyorderitem.ins_BranchCode = this.userInfo[0].ins_BranchCode;
          this.weeklyorderitem.ins_BranchName = this.userInfo[0].ins_BranchName;
          this.weeklyorderitem.ins_CreatedBy = this.userInfo[0].ins_FullName;

          this.weeklyorderitemlist.push(this.weeklyorderitem);
        }

        this.itemcategory.ins_Items = this.weeklyorderitemlist as any[];
        this.itemcategorylist.push(this.itemcategory);
        pint++;
      }
    }

    this.itemcategory = [] as any;
    this.itemcategory.ins_CategoryCode = 'CAT9999';
    this.itemcategory.ins_CategoryName = 'OTHER ITEMS';
    this.itemcategory.ins_IsValid = false;
    this.itemcategory.ins_AddItem = false;
    this.itemcategory.ins_Items = [];
    this.itemcategorylist.push(this.itemcategory);

    console.log(this.itemcategorylist);
  }

  async isEditEvent() {
    this.isHiddenPurchaseBtn = true;
    this.isViewHidden = true;
    this.isEditHidden = false;
    this.isReadOnly = true;

    this.state = 'edit';

    let data: any;
    this.itemcategorylist = [];

    console.log(this.weeklyorderData);

    for (var a of this.weeklyorderData as any) {
      this.docId = a.ins_WeeklyOrderID;

      this.onLoadBadge(a.ins_DocStatus, a.ins_IsPOCreated)

      if (a.ins_DocStatus == 0) {
        this.isViewHidden = false;
        this.isEditHidden = true;
        this.isReadOnly = false;
      }

      this.headerForm = this.fb.group({
        weeklyorderid: a.ins_WeeklyOrderID,
        remarks: a.ins_Remarks,
        docnum: a.ins_DocNum,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),
        orderdate: this.datepipe.transform(a.ins_OrderDate, 'yyyy-MM-dd'),
        deldate: this.datepipe.transform(a.ins_DeliveryDate, 'yyyy-MM-dd'),

        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        orderby: this.userInfo[0].ins_FullName,
        owner: this.userInfo[0].ins_FullName,
        receivedby: a.ins_ReceiveBy,
        deliveredby: a.ins_DeliverBy,
        docstatus: a.ins_DocStatus,
        ispocreated: a.ins_IsPOCreated,
      });

      let details = a.ins_WeeklyOrderDetails as any[];
      console.log('list', details);

      data = await this.itemcategoriesservice.getList();
      let int = 0;
      let pint = 0;
      if (data !== false) {
        for (var val of data) {
          this.itemcategory = [] as any;
          this.itemcategory.ins_CategoryCode = val.ins_CategoryCode;
          this.itemcategory.ins_CategoryName = val.ins_CategoryName;

          switch (a.ins_DocStatus) {
            case 0: // Pending
              this.itemcategory.ins_IsValid = !this.isHiddenItemRow;
              this.itemcategory.ins_AddItem = true;
              break;
            case 1: // Approved
              this.itemcategory.ins_IsValid = this.isHiddenItemRow;
              this.itemcategory.ins_AddItem = true;
              break;
            case 2: // Reject
              this.itemcategory.ins_IsValid = this.isHiddenItemRow;
              this.itemcategory.ins_AddItem = true;
              break;
            case 3: // Close
              break;
            default:
              break;
          }

          let items = details.filter(
            (p) => p.ins_ItemCategory == val.ins_CategoryCode
          );
          console.log('items', items);

          this.weeklyorderitemlist = [];
          for (var o of items) {
            this.weeklyorderitem = new WeeklyOrderDetails();

            this.weeklyorderitem.ins_WeeklyOrderID = o.ins_WeeklyOrderID;
            this.weeklyorderitem.ins_WeeklyOrderDetailsID =
              o.ins_WeeklyOrderDetailsID;

            this.weeklyorderitem.ins_ParentId = pint;
            this.weeklyorderitem.ins_Id = int++;
            this.weeklyorderitem.ins_ItemCode = o.ins_ItemCode;
            this.weeklyorderitem.ins_ItemDescription = o.ins_ItemDescription;
            this.weeklyorderitem.ins_InventoryUom = o.ins_InventoryUom;

            this.weeklyorderitem.ins_OnHand = o.ins_OnHand;
            this.weeklyorderitem.ins_OnOrder = o.ins_OnOrder;
            this.weeklyorderitem.ins_OnDelivery = o.ins_OnDelivery;
            this.weeklyorderitem.ins_OnActual = o.ins_OnActual;

            this.weeklyorderitem.ins_BranchCode = o.ins_BranchCode;
            this.weeklyorderitem.ins_BranchName = o.ins_BranchName;
            this.weeklyorderitem.ins_CreatedBy = o.ins_CreatedBy;

            this.weeklyorderitem.ins_ItemCategory = o.ins_ItemCategory;

            this.weeklyorderitemlist.push(this.weeklyorderitem);
          }

          this.itemcategory.ins_Items = this.weeklyorderitemlist as any[];
          this.itemcategorylist.push(this.itemcategory);
          pint++;
        }

        this.itemcategory = [] as any;
        this.itemcategory.ins_CategoryCode = 'CAT9999';
        this.itemcategory.ins_CategoryName = 'OTHER ITEMS';

        switch (a.ins_DocStatus) {
          case 0: // Pending
            this.itemcategory.ins_IsValid = this.isHiddenItemRow;
            this.itemcategory.ins_AddItem = this.isHiddenAddItemBtn;
            break;
          case 1: // Approved
            this.itemcategory.ins_IsValid = this.isHiddenItemRow;
            this.itemcategory.ins_AddItem = this.isHiddenAddItemBtn;
            break;
          case 2: // Reject
            this.itemcategory.ins_IsValid = this.isHiddenItemRow;
            this.itemcategory.ins_AddItem = this.isHiddenAddItemBtn;
            break;
          case 3: // Close
            break;
          default:
            break;
        }

        let items = details.filter(
          (p) => p.ins_ItemCategory == this.itemcategory.ins_CategoryCode
        );
        console.log('items', items);

        this.weeklyorderitemlist = [];
        for (var o of items) {
          this.weeklyorderitem = new WeeklyOrderDetails();

          this.weeklyorderitem.ins_WeeklyOrderID = o.ins_WeeklyOrderID;
          this.weeklyorderitem.ins_WeeklyOrderDetailsID =
            o.ins_WeeklyOrderDetailsID;

          this.weeklyorderitem.ins_ParentId = pint;
          this.weeklyorderitem.ins_Id = int++;
          this.weeklyorderitem.ins_ItemCode = o.ins_ItemCode;
          this.weeklyorderitem.ins_ItemDescription = o.ins_ItemDescription;
          this.weeklyorderitem.ins_InventoryUom = o.ins_InventoryUom;

          this.weeklyorderitem.ins_OnHand = o.ins_OnHand;
          this.weeklyorderitem.ins_OnOrder = o.ins_OnOrder;
          this.weeklyorderitem.ins_OnDelivery = o.ins_OnDelivery;
          this.weeklyorderitem.ins_OnActual = o.ins_OnActual;

          this.weeklyorderitem.ins_BranchCode = o.ins_BranchCode;
          this.weeklyorderitem.ins_BranchName = o.ins_BranchName;
          this.weeklyorderitem.ins_CreatedBy = o.ins_CreatedBy;

          this.weeklyorderitem.ins_ItemCategory = o.ins_ItemCategory;

          this.weeklyorderitemlist.push(this.weeklyorderitem);
        }

        this.itemcategory.ins_Items = this.weeklyorderitemlist as any[];
        this.itemcategorylist.push(this.itemcategory);
      }

      console.log('WO', a);
    }
  }

  async ItemPerCategories(category: string): Promise<any[]> {
    let data: any;
    this.items = [];
    data = (await this.itemservice.getList()) as any;
    if (data !== false) {
      for (var val of data) {
        this.items.push(val);
      }
    }

    return this.items.filter((p) => p.ins_ItemCategory == category);
  }

  onCancel() {
    this.weeklyOrderEvent.emit();
  }

  async onSubmit() {
    this.weeklyorder = new WeeklyOrder();
    this.weeklyorderlines.length = 0;

    this.weeklyorder.ins_Badge = '';
    this.weeklyorder.ins_BadgeName = '';

    this.weeklyorder.ins_WeeklyOrderID = this.headerForm.value.weeklyorderid;
    this.weeklyorder.ins_BranchCode = this.headerForm.value.branchcode;
    this.weeklyorder.ins_BranchName = this.headerForm.value.branchname;
    this.weeklyorder.ins_DocNum = this.headerForm.value.docnum;

    this.weeklyorder.ins_OrderBy = this.headerForm.value.orderby;
    this.weeklyorder.ins_ReceiveBy = this.headerForm.value.receivedby;
    this.weeklyorder.ins_DeliverBy = this.headerForm.value.deliveredby;
    this.weeklyorder.ins_Remarks = this.headerForm.value.remarks;
    this.weeklyorder.ins_CreatedBy = this.headerForm.value.owner;
    this.weeklyorder.ins_DocStatus = this.headerForm.value.docstatus;
    this.weeklyorder.ins_IsPOCreated = this.headerForm.value.ispocreated;

    this.weeklyorder.ins_PostingDate = this.datepipe.transform(
      this.headerForm.value.docdate,
      'yyyy-MM-dd'
    ) as unknown as Date;

    this.weeklyorder.ins_OrderDate = this.datepipe.transform(
      this.headerForm.value.orderdate,
      'yyyy-MM-dd'
    ) as unknown as Date;

    this.weeklyorder.ins_DeliveryDate = this.datepipe.transform(
      this.headerForm.value.deldate,
      'yyyy-MM-dd'
    ) as unknown as Date;

    for (var a of this.itemcategorylist) {
      for (var o of a.ins_Items) {
        this.weeklyorderdetails = new WeeklyOrderDetails();

        this.weeklyorderdetails.ins_WeeklyOrderID = o.ins_WeeklyOrderID;
        this.weeklyorderdetails.ins_WeeklyOrderDetailsID =
          o.ins_WeeklyOrderDetailsID;

        this.weeklyorderdetails.ins_Id = o.ins_Id;
        this.weeklyorderdetails.ins_ItemCode = o.ins_ItemCode;
        this.weeklyorderdetails.ins_ItemDescription = o.ins_ItemDescription;
        this.weeklyorderdetails.ins_InventoryUom = o.ins_InventoryUom;
        this.weeklyorderdetails.ins_ItemCategory = o.ins_ItemCategory;

        this.weeklyorderdetails.ins_OnHand = o.ins_OnHand;
        this.weeklyorderdetails.ins_OnOrder = o.ins_OnOrder;
        this.weeklyorderdetails.ins_OnDelivery = o.ins_OnDelivery;
        this.weeklyorderdetails.ins_OnActual = o.ins_OnActual;

        this.weeklyorderdetails.ins_BranchCode = o.ins_BranchCode;
        this.weeklyorderdetails.ins_BranchName = o.ins_BranchName;
        this.weeklyorderdetails.ins_CreatedBy = o.ins_CreatedBy;

        await this.weeklyorderlines.push(this.weeklyorderdetails);
      }
    }
    this.weeklyorder.ins_WeeklyOrderDetails = this.weeklyorderlines;

    console.log(this.weeklyorderlines);
    console.log(this.weeklyorder);


    if (this.state == 'add') {
      await this.globalservice.postData(
        'WeeklyOrder',
        'PostAsync',
        this.weeklyorder
      );
    } else {
      this.globalservice.putData(
        'WeeklyOrder',
        '',
        this.weeklyorder
      );
    }


    // if (this.state == 'add') {
    //   await this.weeklyorderapi.post_WeeklyOrder(this.weeklyorder, 'PostAsync');
    // } else {
    //   await this.weeklyorderapi.put_WeeklyOrder(this.weeklyorder);
    // }
  }

  onchangeorder(a: any) {
    console.log(a);
    console.log(a.target);
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    console.log(a.target.name);
    console.log(a.target.id);
    console.log(a.target.value);
    console.log(this.itemcategorylist[_pid]);
    this.itemcategorylist[_pid].ins_Items[_id].ins_OnOrder = _qty as number;

    console.log('sample', this.itemcategorylist[_pid].ins_Items[_id]);
    console.log('value', _qty);

    console.log('sample', this.itemcategorylist[_pid]);
  }

  onchangedelivery(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_OnDelivery = _qty as number;

    console.log('sample', this.itemcategorylist[_pid].ins_Items[_id]);
    console.log('value', _qty);

    console.log('sample', this.itemcategorylist[_pid]);
  }

  onchangeactual(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_OnActual = _qty as number;

    console.log('sample', this.itemcategorylist[_pid].ins_Items[_id]);
    console.log('value', _qty);

    console.log('sample', this.itemcategorylist[_pid]);
  }

  onchangeitem(a: any) {
    console.log(a.target.name);
    console.log(a.target.id);
    console.log(a.target.value);
    const _pid = a.target.name;
    const _id = a.target.id;
    const _item = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_ItemDescription =
      _item as string;

    console.log('sample', this.itemcategorylist[_pid]);
  }

  onchangeuom(a: any) {
    console.log(a.target.name);
    console.log(a.target.id);
    console.log(a.target.value);
    const _pid = a.target.name;
    const _id = a.target.id;
    const _uom = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_InventoryUom =
      _uom as string;

    console.log('sample', this.itemcategorylist[_pid]);
  }

  addOtherItems(a: any) {
    // console.log(a);
    // console.log(a.ins_Items);
    console.log(this.itemcategorylist);

    this.weeklyorderitem = new WeeklyOrderDetails();
    this.weeklyorderitem.ins_ParentId = 0;
    this.weeklyorderitem.ins_Id = 0;
    this.weeklyorderitem.ins_ItemCode = '';
    this.weeklyorderitem.ins_ItemDescription = '';
    this.weeklyorderitem.ins_InventoryUom = '';
    this.weeklyorderitem.ins_ItemCategory = 'CAT9999';
    this.weeklyorderitem.ins_OnHand = 0;
    this.weeklyorderitem.ins_OnOrder = 0;
    this.weeklyorderitem.ins_OnDelivery = 0;
    this.weeklyorderitem.ins_OnActual = 0;

    this.weeklyorderitem.ins_BranchCode = this.userInfo[0].ins_BranchCode;
    this.weeklyorderitem.ins_BranchName = this.userInfo[0].ins_BranchName;
    this.weeklyorderitem.ins_CreatedBy = this.userInfo[0].ins_FullName;

    // this.weeklyorderitemlist.push(this.weeklyorderitem);

    a.ins_Items.push(this.weeklyorderitem);
    // this.itemcategorylist.push(this.itemcategory);

    // this.weeklyorderitem = new WeeklyOrderDetails;

    // this.weeklyorderitem.ins_WeeklyOrderID = 0;
    // this.weeklyorderitem.ins_WeeklyOrderDetailsID = 0;

    // this.weeklyorderitem.ins_Id = 0;
    // this.weeklyorderitem.ins_ItemCode = '';
    // this.weeklyorderitem.ins_ItemDescription = '';
    // this.weeklyorderitem.ins_InventoryUom = '';
    // this.weeklyorderitem.ins_ItemCategory = 'CAT9999';

    // this.weeklyorderitem.ins_OnHand = 0;
    // this.weeklyorderitem.ins_OnOrder = 0;
    // this.weeklyorderitem.ins_OnDelivery = 0;
    // this.weeklyorderitem.ins_OnActual = 0;

    // this.weeklyorderitem.ins_BranchCode = this.userInfo[0].ins_BranchCode;
    // this.weeklyorderitem.ins_BranchName = this.userInfo[0].ins_BranchName;
    // this.weeklyorderitem.ins_CreatedBy = this.userInfo[0].ins_FullName;

    // a.ins_Items.push(this.weeklyorderitem);

    // console.log(a);
    // console.log(this.itemcategorylist);
  }

  async onApprove(id: number) {
    let data = (await this.weeklyorderservice.docApproved(
      id,
      this.userInfo[0].ins_FullName
    )) as any;
    this.onLoadBadge(1, 0);
  }

  async onReject(id: number) {
    let data = (await this.weeklyorderservice.docRejected(
      id,
      this.userInfo[0].ins_FullName
    )) as any;
    this.onLoadBadge(2, 0);
  }

  async onCreatePO(id: number) {
    let data = (await this.weeklyorderservice.docCreatePO(id)) as any;
    this.onLoadBadge(1, 1);
  }


  onLoadBadge(status: number, pocreated: number){
    switch (status) {
      case 0: // Pending
        this.isHiddenItemRow = false;
        this.isHiddenAddItemBtn = false;
        this.isReadOnlyHeader = false;
        this.isHiddenRow = false;
        this.isHiddenDelRow = false;
        this.isHiddenActRow = false;
        this.isReadOnlyOrderDate = false;

        this.badge = 'warning';
        this.badgename = 'PENDING';
        break;
      case 1: // Approved
        this.isHiddenSave = false;
        this.isHiddenAction = true;
        this.isHiddenActionRow = true;
        this.isHiddenAddItem = true;
        this.isHiddenApproveBtn = true;
        this.isHiddenAddItemBtn = true;
        this.isHiddenRejectBtn = false;
        this.isHiddenDiv = false;
        this.isHiddenDeleteBtn = true;
        this.isHiddenPurchaseBtn = false;

        this.isHiddenItemRow = true;
        this.isHiddenRow = true;
        this.isHiddenDelRow = false;
        this.isHiddenActRow = false;

        this.isReadOnlyHeader = false;
        this.isReadOnlyOrderDate = true;

        if (pocreated == 1) {
          this.POCreated = '( PO CREATED )';   
          this.isHiddenDelRow = true;    
          this.isHiddenRejectBtn = true;
          this.isHiddenDiv = true;
          this.isHiddenPurchaseBtn = true;
          this.isReadOnlyHeader = true;
          this.isHiddenSave = true;
          this.isHiddenActRow = true;
        }

        this.badge = 'success';
        this.badgename = 'APPROVED';
        break;
      case 2: // Reject
        this.isHiddenItemRow = true;
        this.isHiddenRow = true;
        this.isHiddenDelRow = true;
        this.isHiddenActRow = true;
        this.isHiddenAddItemBtn = true;

        this.isReadOnlyHeader = true;
        this.isReadOnlyOrderDate = true;

        this.isHiddenSave = true;
        this.isHiddenAction = true;
        this.isHiddenActionRow = true;
        this.isHiddenAddItem = true;
        this.isHiddenApproveBtn = true;
        this.isHiddenRejectBtn = true;
        this.isHiddenDiv = true;
        this.isHiddenDeleteBtn = true;
        this.isHiddenPurchaseBtn = true;

        this.badge = 'danger';
        this.badgename = 'REJECTED';
        break;
      case 3: // Close
        this.badge = 'danger';
        this.badgename = 'CLOSED';
        break;
      default:
        break;
    }
  }


}

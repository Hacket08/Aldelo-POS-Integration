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
  @Input() dataList: WeeklyOrder[] = [];
  @Output() outputEvent = new EventEmitter();

  itemdetails: WeeklyOrderDetails;
  itemdetailslist: WeeklyOrderDetails[] = [];

  headerForm!: FormGroup;
  badge: string = 'warning';
  badgename: string = 'Pending';

  // Header Data
  userInfo: any;
  userApprover: any;
  userOwner: any;
  deliveryQty: number;
  docId: number;
  isPOCreated = false;
  POCreated = '';
  state = 'add';

  // isViewHidden = false;
  // isEditHidden = false;

  otheritem: WeeklyOrderDetails;
  otheritemlines: WeeklyOrderDetails[] = [];


  // weeklyorderitemlist: WeeklyOrderDetails[] = [];

  // weeklyorderinfo: WeeklyOrder[] = [];

  // isReadOnly = false;

  isHiddenPrinterBtn = false;
  isHiddenSave = false;
  isHiddenAction = false;
  isHiddenActionRow = false;
  isHiddenAddItem = false;

  isHiddenConfirmBtn = false;
  isHiddenApproveBtn = false;
  isHiddenRejectBtn = false;
  isHiddenDiv = false;
  isHiddenDeleteBtn = false;
  isHiddenCancelBtn = false;
  isHiddenPurchaseBtn = false;
  isHiddenAddItemBtn = false;

  isHiddenOrdRow = false;
  isHiddenDelRow = false;
  isHiddenActRow = false;

  isHiddenItemRow = false;
  // isHiddenStockRow = false;

  isReadOnlyHeader = false;
  isReadOnlyOrderDate = false;
  isReadOnlyOrderRow = false;

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
    private user: Users,
    private globalservice: GlobalService,
    private fb: FormBuilder,
    private itemcategory: ItemCategories,
    private headerdata: WeeklyOrder 
  ) 
  {
    // declare the form group fields

    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      weeklyorderid: '',
      remarks: '',
      docnum: '',
      docdate: this.postingdate,
      orderdate: this.postingdate,
      deldate: this.deliverydate,

      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      orderby: this.userInfo.fullName,
      owner: this.userInfo.fullName,
      receivedby: '',
      deliveredby: '',
      docstatus: 0,
      ispocreated: 0,
    });

  }

  async ngOnInit(): Promise<void> {
    if (this.dataList.length <= 0) {
      await this.isAddEvent();
    } else {
      await this.isEditEvent();
    }
  }

  async isAddEvent() {
    this.formDefault();
    this.userInfo = this.user.getCurrentUser();
    this.userOwner = this.userInfo.fullName;
    this.userApprover = this.user.getCurrentUserApprover();
    const output = (await this.globalservice.getMaxId('WeeklyOrder')) as any;

    // const _docnum = await this.weeklyorderapi.get_WeeklyOrderBy('GetMaxId');
    this.headerForm.patchValue({
      weeklyorderid: 0,
      docnum: output.value,
      docdate: this.postingdate,
      orderdate: this.postingdate,
      deldate: this.deliverydate,
      
      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      owner: this.userInfo.fullName,
      docstatus: this.userApprover.length > 0 ? 0 : 1,
    });

    let data = (await this.globalservice.getAuthList('ItemCategories')) as any;
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
        this.itemdetailslist = [];
        for (var o of tempItems) {
          this.itemdetails = new WeeklyOrderDetails();
          
          this.itemdetails.ins_ParentId = pint;
          this.itemdetails.ins_Id = int++;
          this.itemdetails.ins_ItemCode = o.ins_ItemCode;
          this.itemdetails.ins_ItemDescription = o.ins_ItemName;
          this.itemdetails.ins_InventoryUom = o.ins_InventoryUom;
          this.itemdetails.ins_ItemCategory = o.ins_ItemCategory;
          this.itemdetails.ins_OnHand = o.ins_OnHand;

          this.itemdetails.ins_BranchCode = this.userInfo.branchCode;
          this.itemdetails.ins_BranchName = this.userInfo.branchName;
          this.itemdetails.ins_CreatedBy = this.userInfo.fullName;

          this.itemdetailslist.push(this.itemdetails);
        }

        this.itemcategory.ins_Items = this.itemdetailslist as any[];
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
  }

  async isEditEvent() {
    this.deliveryQty = 0;
    this.userInfo = this.user.getCurrentUser();
    this.userApprover = this.user.getCurrentUserApprover();
    this.state = 'edit';

    let data: any;
    this.itemcategorylist = [];

    for (var a of this.dataList as any) {
      this.docId = a.ins_WeeklyOrderID;
      this.userOwner = a.ins_CreatedBy;
      this.isPOCreated = a.ins_IsPOCreated;
      this.onLoadForm(a.ins_DocStatus);

      this.headerForm = this.fb.group({
        weeklyorderid: a.ins_WeeklyOrderID,
        remarks: a.ins_Remarks,
        docnum: a.ins_DocNum,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),
        orderdate: this.datepipe.transform(a.ins_OrderDate, 'yyyy-MM-dd'),
        deldate: this.datepipe.transform(a.ins_DeliveryDate, 'yyyy-MM-dd'),

        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        orderby: this.userInfo.fullName,
        owner: this.userInfo.fullName,
        receivedby: a.ins_ReceiveBy,
        deliveredby: a.ins_DeliverBy,
        docstatus: a.ins_DocStatus,
        ispocreated: a.ins_IsPOCreated,
      });

      let details = a.ins_WeeklyOrderDetails as any[];
      data = (await this.globalservice.getAuthList('ItemCategories')) as any;
      // data = await this.itemcategoriesservice.getList();
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
            case 4: // Approved
              this.itemcategory.ins_IsValid = this.isHiddenItemRow;
              this.itemcategory.ins_AddItem = true;
              break;
            default:
              break;
          }

          let items = details.filter(
            (p) => p.ins_ItemCategory == val.ins_CategoryCode
          );
          
          this.itemdetailslist = [];
          for (var o of items) {
            this.itemdetails = new WeeklyOrderDetails();

            this.itemdetails.ins_WeeklyOrderID = o.ins_WeeklyOrderID;
            this.itemdetails.ins_WeeklyOrderDetailsID = o.ins_WeeklyOrderDetailsID;

            this.itemdetails.ins_ParentId = pint;
            this.itemdetails.ins_Id = int++;
            this.itemdetails.ins_ItemCode = o.ins_ItemCode;
            this.itemdetails.ins_ItemDescription = o.ins_ItemDescription;
            this.itemdetails.ins_InventoryUom = o.ins_InventoryUom;

            this.itemdetails.ins_OnHand = o.ins_OnHand;
            this.itemdetails.ins_OnOrder = o.ins_OnOrder;
            this.itemdetails.ins_OnDelivery = o.ins_OnDelivery;
            this.itemdetails.ins_OnActual = o.ins_OnActual;

            this.itemdetails.ins_BranchCode = o.ins_BranchCode;
            this.itemdetails.ins_BranchName = o.ins_BranchName;
            this.itemdetails.ins_CreatedBy = o.ins_CreatedBy;

            this.itemdetails.ins_ItemCategory = o.ins_ItemCategory;
            this.deliveryQty = this.deliveryQty + Number(o.ins_OnDelivery);
            console.log(this.deliveryQty);
            this.itemdetailslist.push(this.itemdetails);
          }

          this.itemcategory.ins_Items = this.itemdetailslist as any[];
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

            if (this.userOwner !== this.userInfo.fullName && this.userInfo.securityLevel !== "1") {
              this.itemcategory.ins_IsValid = true;
              this.itemcategory.ins_AddItem = true;
            }

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
          case 4: // Approved
            this.itemcategory.ins_IsValid = this.isHiddenItemRow;
            this.itemcategory.ins_AddItem = this.isHiddenAddItemBtn;
            break;
          default:
            break;
        }

        let items = details.filter(
          (p) => p.ins_ItemCategory == this.itemcategory.ins_CategoryCode
        );

        this.itemdetailslist = [];
        for (var o of items) {
          this.itemdetails = new WeeklyOrderDetails();

          this.itemdetails.ins_WeeklyOrderID = o.ins_WeeklyOrderID;
          this.itemdetails.ins_WeeklyOrderDetailsID =
            o.ins_WeeklyOrderDetailsID;

          this.itemdetails.ins_ParentId = pint;
          this.itemdetails.ins_Id = int++;
          this.itemdetails.ins_ItemCode = o.ins_ItemCode;
          this.itemdetails.ins_ItemDescription = o.ins_ItemDescription;
          this.itemdetails.ins_InventoryUom = o.ins_InventoryUom;

          this.itemdetails.ins_OnHand = o.ins_OnHand;
          this.itemdetails.ins_OnOrder = o.ins_OnOrder;
          this.itemdetails.ins_OnDelivery = o.ins_OnDelivery;
          this.itemdetails.ins_OnActual = o.ins_OnActual;

          this.itemdetails.ins_BranchCode = o.ins_BranchCode;
          this.itemdetails.ins_BranchName = o.ins_BranchName;
          this.itemdetails.ins_CreatedBy = o.ins_CreatedBy;

          this.itemdetails.ins_ItemCategory = o.ins_ItemCategory;

          this.deliveryQty = this.deliveryQty + Number(o.ins_OnDelivery);
          this.itemdetailslist.push(this.itemdetails);
        }

        this.itemcategory.ins_Items = this.itemdetailslist as any[];
        this.itemcategorylist.push(this.itemcategory);
      }
    }

    this.onLoadForm(a.ins_DocStatus);
  }

  async ItemPerCategories(category: string): Promise<any[]> {
    let data: any;
    this.items = [];
    data = (await this.globalservice.getAuthList('Item')) as any;
    // data = (await this.itemservice.getList()) as any;
    if (data !== false) {
      for (var val of data) {
        this.items.push(val);
      }
    }

    return this.items.filter((p) => p.ins_ItemCategory == category);
  }

  async onSubmit() {    
    let approverlist = this.user.getCurrentUserApprover();
    this.deliveryQty = 0;
    this.headerdata = new WeeklyOrder();

    this.headerdata.ins_Badge = '';
    this.headerdata.ins_BadgeName = '';

    this.headerdata.ins_WeeklyOrderID = this.headerForm.value.weeklyorderid;
    this.headerdata.ins_BranchCode = this.headerForm.value.branchcode;
    this.headerdata.ins_BranchName = this.headerForm.value.branchname;
    this.headerdata.ins_DocNum = this.headerForm.value.docnum;

    this.headerdata.ins_OrderBy = this.headerForm.value.orderby;
    this.headerdata.ins_ReceiveBy = this.headerForm.value.receivedby;
    this.headerdata.ins_DeliverBy = this.headerForm.value.deliveredby;
    this.headerdata.ins_Remarks = this.headerForm.value.remarks;
    this.headerdata.ins_CreatedBy = this.headerForm.value.owner;
    this.headerdata.ins_DocStatus = this.headerForm.value.docstatus;
    this.headerdata.ins_ApproverEmailList = approverlist;
    this.headerdata.ins_IsPOCreated = this.headerForm.value.ispocreated;

    this.headerdata.ins_PostingDate = this.datepipe.transform(
      this.headerForm.value.docdate,
      'yyyy-MM-dd'
    ) as unknown as Date;

    this.headerdata.ins_OrderDate = this.datepipe.transform(
      this.headerForm.value.orderdate,
      'yyyy-MM-dd'
    ) as unknown as Date;

    this.headerdata.ins_DeliveryDate = this.datepipe.transform(
      this.headerForm.value.deldate,
      'yyyy-MM-dd'
    ) as unknown as Date;

    // this.itemdetailslist.length = 0;
    this.itemdetailslist = [];
    for (var a of this.itemcategorylist) {
      for (var o of a.ins_Items) {
        this.itemdetails = new WeeklyOrderDetails();

        this.itemdetails.ins_WeeklyOrderID = o.ins_WeeklyOrderID;
        this.itemdetails.ins_WeeklyOrderDetailsID = o.ins_WeeklyOrderDetailsID;
        this.itemdetails.ins_Id = o.ins_Id;
        this.itemdetails.ins_ItemCode = o.ins_ItemCode;
        this.itemdetails.ins_ItemDescription = o.ins_ItemDescription;
        this.itemdetails.ins_InventoryUom = o.ins_InventoryUom;
        this.itemdetails.ins_ItemCategory = o.ins_ItemCategory;

        this.itemdetails.ins_OnHand = o.ins_OnHand;
        this.itemdetails.ins_OnOrder = o.ins_OnOrder;
        this.itemdetails.ins_OnDelivery = Number(o.ins_OnDelivery);
        this.itemdetails.ins_OnActual = o.ins_OnActual;

        this.itemdetails.ins_BranchCode = o.ins_BranchCode;
        this.itemdetails.ins_BranchName = o.ins_BranchName;
        this.itemdetails.ins_CreatedBy = o.ins_CreatedBy;

        this.deliveryQty = this.deliveryQty + Number(o.ins_OnDelivery);
        await this.itemdetailslist.push(this.itemdetails);
      }
    }
    this.headerdata.ins_WeeklyOrderDetails = this.itemdetailslist;

    if (this.state == 'add') {
      await this.globalservice.postAuth(
        'WeeklyOrder',
        'PostAsync',
        this.headerdata
      );
    } else {
      await this.globalservice.postAuth('WeeklyOrder', 'PutAsync', this.headerdata);
    }

    this.onLoadForm(this.headerForm.value.docstatus);

    // if (this.state == 'add') {
    //   await this.weeklyorderapi.post_WeeklyOrder(this.weeklyorder, 'PostAsync');
    // } else {
    //   await this.weeklyorderapi.put_WeeklyOrder(this.weeklyorder);
    // }
  }

  onchangeorder(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_OnOrder = _qty as number;
  }

  onchangedelivery(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_OnDelivery = _qty as number;
  }

  onchangeactual(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_OnActual = _qty as number;
  }

  onchangeitem(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _item = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_ItemDescription =
      _item as string;
  }

  onchangeuom(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _uom = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_InventoryUom =
      _uom as string;
  }

  addOtherItems(a: any) {
    this.userInfo = this.user.getCurrentUser();
    this.itemdetails = new WeeklyOrderDetails();
    this.itemdetails.ins_ParentId = 0;
    this.itemdetails.ins_Id = 0;
    this.itemdetails.ins_ItemCode = '';
    this.itemdetails.ins_ItemDescription = '';
    this.itemdetails.ins_InventoryUom = '';
    this.itemdetails.ins_ItemCategory = 'CAT9999';
    this.itemdetails.ins_OnHand = 0;
    this.itemdetails.ins_OnOrder = 0;
    this.itemdetails.ins_OnDelivery = 0;
    this.itemdetails.ins_OnActual = 0;

    this.itemdetails.ins_BranchCode = this.userInfo.branchCode;
    this.itemdetails.ins_BranchName = this.userInfo.branchName;
    this.itemdetails.ins_CreatedBy = this.userInfo.fullName;

    a.ins_Items.push(this.itemdetails);
  }

  async onApprove(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 1,
      DocId: id,
      RejectComment: '',
    };
    let data = await this.globalservice.postAuth('WeeklyOrder', 'Status', approvalData);
    this.onLoadForm(1);


    // let data = (await this.globalservice.docApproved('WeeklyOrder', id)) as any;
    // this.onLoadForm(1);
  }

  async onConfirmDelivery(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 4,
      DocId: id,
      RejectComment: '',
    };
    let data = await this.globalservice.postAuth('WeeklyOrder', 'Status', approvalData);
    this.onLoadForm(4);



    // let data = (await this.globalservice.docStatusChange(
    //   'WeeklyOrder',
    //   id,
    //   4
    // )) as any;
    // this.onLoadForm(4);
  }

  async onReject(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 2,
      DocId: id,
      RejectComment: '',
    };
    let data = await this.globalservice.postAuth('WeeklyOrder', 'Status', approvalData);
    this.onLoadForm(2);


    // let data = (await this.globalservice.docRejected('WeeklyOrder', id)) as any;
    // this.formRejected();
  }

  async onClose(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 3,
      DocId: id,
      RejectComment: '',
    };
    let data = await this.globalservice.postAuth('WeeklyOrder', 'Status', approvalData);
    this.onLoadForm(3);

    // let data = (await this.globalservice.docClosed('WeeklyOrder', id)) as any;
    // this.formClosed();
  }

  onCancel() {
    this.outputEvent.emit();
  }
  async onCreatePO(id: number) {
    let data = (await this.globalservice.docCreatePO(id)) as any;
    this.isPOCreated = true;
    this.onLoadForm(4);
  }

  onLoadForm(status: number) {
    this.state = 'edit';

    switch (status) {
      case 0: // Pending
        this.formPending();
        break;
      case 1: // Approved
        this.formApproved();
        break;
      case 2: // Reject
        this.formRejected();
        break;
      case 3: // Closed
        this.formClosed();
        break;
      case 4: // Closed
        this.formConfirm();
        break;
      default:
        break;
    }
  }

  onChangeData() {
    this.isHiddenPrinterBtn = true;

    this.isHiddenSave = false;
    this.isHiddenConfirmBtn = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;
  }

  formDefault() {
    this.state = 'add';

    this.isHiddenPrinterBtn = true;
    this.isHiddenSave = true;

    this.isHiddenConfirmBtn = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenPurchaseBtn = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenOrdRow = false;
    this.isHiddenDelRow = true;
    this.isHiddenActRow = true;

    this.isHiddenItemRow = false;
    this.isHiddenAddItemBtn = false;

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    this.userInfo = this.user.getCurrentUser();

    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.isHiddenConfirmBtn = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenPurchaseBtn = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenOrdRow = false;
    this.isHiddenDelRow = true;
    this.isHiddenActRow = true;

    this.isHiddenItemRow = false;
    this.isHiddenAddItemBtn = false;

    if (this.userOwner !== this.userInfo.fullName && this.userInfo.securityLevel !== "1") {

      this.isHiddenConfirmBtn = true;
      this.isHiddenApproveBtn = false;
      this.isHiddenRejectBtn = false;
      this.isHiddenDiv = false;
      this.isHiddenPurchaseBtn = true;
      this.isHiddenDeleteBtn = true;

      this.isHiddenOrdRow = true;
      this.isHiddenDelRow = true;
      this.isHiddenActRow = true;
  
      this.isHiddenItemRow = false;
      this.isHiddenAddItemBtn = true;
      this.isReadOnlyOrderDate = true;
      this.isReadOnlyHeader = true;
    }

    this.badge = 'warning';
    this.badgename = 'PENDING';
  }

  formApproved() {
    this.userInfo = this.user.getCurrentUser();
    this.userApprover = this.user.getCurrentUserApprover();

    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;
    this.isHiddenConfirmBtn = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenPurchaseBtn = true;
    this.isHiddenCancelBtn = true;
    this.isHiddenDeleteBtn = true;

    if (this.deliveryQty > 0) {
      this.isHiddenConfirmBtn = false;
      this.isHiddenDiv = false;
    }


    this.isHiddenOrdRow = true;
    this.isHiddenDelRow = false;
    this.isHiddenActRow = true;

    this.isReadOnlyOrderDate = true;
    this.isHiddenItemRow = true;
    this.isHiddenAddItemBtn = true;
    this.isReadOnlyHeader = false;

    if (this.userOwner !== this.userInfo.fullName && this.userInfo.securityLevel !== "1") {

      this.isHiddenConfirmBtn = true;
      this.isHiddenApproveBtn = true;
      this.isHiddenRejectBtn = false;
      this.isHiddenDiv = false;
      this.isHiddenPurchaseBtn = true;
      this.isHiddenDeleteBtn = true;

      if (this.userApprover.length === 0) {
        if (this.deliveryQty > 0) {
          this.isHiddenConfirmBtn = false;
          this.isHiddenDiv = false;
        }
      }

      this.isHiddenOrdRow = true;
      this.isHiddenDelRow = true;
      this.isHiddenActRow = true;
  
      this.isHiddenItemRow = true;
      this.isHiddenAddItemBtn = true;
      this.isReadOnlyOrderDate = true;
      this.isReadOnlyHeader = true;
    }


    this.badge = 'success';
    this.badgename = 'FOR DELIVERY CONFIRMATION';
  }

  formConfirm() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;


    this.isHiddenConfirmBtn = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenPurchaseBtn = false;
    this.isHiddenCancelBtn = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenOrdRow = true;
    this.isHiddenDelRow = true;
    this.isHiddenActRow = true;

    this.isHiddenItemRow = true;
    this.isHiddenAddItemBtn = true;
    this.isReadOnlyOrderDate = true;
    this.isReadOnlyHeader = true;

    this.badge = 'info';
    this.badgename = 'FOR PO CREATION';
    if (Boolean(this.isPOCreated) === true) {
      this.isHiddenPurchaseBtn = true;
      this.badge = 'danger';
      this.badgename = 'CLOSED (PO CREATED)';
    }


    
  }

  formRejected() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;


    this.isHiddenConfirmBtn = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenPurchaseBtn = true;
    this.isHiddenCancelBtn = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenOrdRow = true;
    this.isHiddenDelRow = true;
    this.isHiddenActRow = true;

    this.isHiddenItemRow = true;
    this.isHiddenAddItemBtn = true;
    this.isReadOnlyOrderDate = true;
    this.isReadOnlyHeader = true;


    this.badge = 'danger';
    this.badgename = 'REJECTED';
  }

  formClosed() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;
    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.badge = 'danger';
    this.badgename = 'CLOSED';
  }

  onLoadBadge(status: number, pocreated: number) {
    switch (status) {
      case 0: // Pending
        this.isHiddenItemRow = false;
        this.isHiddenAddItemBtn = false;
        this.isReadOnlyHeader = false;
        this.isHiddenOrdRow = false;
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
        this.isHiddenOrdRow = true;
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
        this.isHiddenOrdRow = true;
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

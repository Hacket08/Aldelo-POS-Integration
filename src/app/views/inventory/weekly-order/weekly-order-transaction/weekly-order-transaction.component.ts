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
import { WeeklyOrderDetails } from 'src/_model/weekly-order-details/weekly-order-details';


import { WeeklyOrderApi } from 'src/_shared/weekly-order/weekly-order.api';

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
  
  weeklyorderitem: WeeklyOrderDetails;
  weeklyorderitemlist: WeeklyOrderDetails[] = [];

  weeklyorderdetails: WeeklyOrderDetails;
  weeklyorderlines: WeeklyOrderDetails[] = [];
  
  weeklyorderinfo: WeeklyOrder[] = [];
  isReadOnly = false;
  state = 'add';
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
    private itemservice: ItemService,
    private weeklyorderapi: WeeklyOrderApi,
    private weeklyorder: WeeklyOrder,
  ) {
    // declare the form group fields
    
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      weeklyorderid:'',
      remarks: '',
      docnum: '',
      docdate: this.postingdate,
      orderdate: this.postingdate,
      deldate: this.deliverydate,

      branchcode: this.userInfo[0].ins_BranchCode,
      branchname: this.userInfo[0].ins_BranchName,
      orderby: this.userInfo[0].ins_FullName,
      owner: this.userInfo[0].ins_FullName,
      receivedby: '',
      deliveredby: '',
      docstatus: 0
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.weeklyorderData.length <= 0) {
      await this.isAddEvent();
    } else {
      await this.isEditEvent();
    }
  }

  async isAddEvent(){
    this.isViewHidden = false;
    this.isEditHidden = true;
    this.isReadOnly = false;
    this.state = 'add';

    let data: any;
    this.itemcategorylist = [];

    const _docnum = await this.weeklyorderapi.get_WeeklyOrderBy('GetMaxId');
    this.headerForm.patchValue({
      weeklyorderid: 0,
      docnum: _docnum,
    });

    data = (await this.itemcategoriesservice.getList());
    let int = 0;
    let pint = 0;
    if (data !== false) {
      for (var val of data) {
        this.itemcategory = [] as any;
        this.itemcategory.ins_CategoryCode = val.ins_CategoryCode
        this.itemcategory.ins_CategoryName = val.ins_CategoryName

        let tempItems = await this.ItemPerCategories(val.ins_CategoryCode) as any[];
        this.weeklyorderitemlist = [];
        for (var o of tempItems) {
          console.log(o);
          this.weeklyorderitem = new WeeklyOrderDetails;
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

    console.log(this.itemcategorylist);
  }

  async isEditEvent(){
    this.isViewHidden = true;
    this.isEditHidden = false;
    this.isReadOnly = true;
    this.state = 'edit';

    let data: any;
    this.itemcategorylist = [];

    console.log(this.weeklyorderData);

    for (var a of this.weeklyorderData as any) {
      switch (a.ins_DocStatus) {
        case 0: // Pending
          this.badge = 'warning';
          this.badgename = 'PENDING';
          break;
        case 1: // Approved
          this.badge = 'success';
          this.badgename = 'APPROVED';
          break;
        case 2: // Reject
          this.badge = 'danger';
          this.badgename = 'REJECTED';
          break;
        case 3: // Reject
          this.badge = 'danger';
          this.badgename = 'CLOSED';
          break;
        default:
          break;
      }
      if (a.ins_DocStatus == 0) {
        this.isViewHidden = false;
        this.isEditHidden = true;
        this.isReadOnly = false;
      }

      this.headerForm = this.fb.group({
        weeklyorderid: a.ins_WeeklyOrderID,
        remarks: a.ins_Remarks,
        docnum: a.ins_DocNum,
        docdate:  this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),
        orderdate:  this.datepipe.transform(a.ins_OrderDate, 'yyyy-MM-dd'),
        deldate: this.datepipe.transform(a.ins_DeliveryDate, 'yyyy-MM-dd'),
  
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        orderby: this.userInfo[0].ins_FullName,
        owner: this.userInfo[0].ins_FullName,
        receivedby: a.ins_ReceiveBy,
        deliveredby: a.ins_DeliverBy,
        docstatus: a.ins_DocStatus,
      });


      let details = a.ins_WeeklyOrderDetails  as any[];
      console.log("list", details);

      data = (await this.itemcategoriesservice.getList());
      let int = 0;
      let pint = 0;
      if (data !== false) {
        for (var val of data) {
          this.itemcategory = [] as any;
          this.itemcategory.ins_CategoryCode = val.ins_CategoryCode
          this.itemcategory.ins_CategoryName = val.ins_CategoryName
  
          let items = details.filter(p => p.ins_ItemCategory == val.ins_CategoryCode);
          console.log("items", items);

          this.weeklyorderitemlist = [];
          for (var o of items) {
            this.weeklyorderitem = new WeeklyOrderDetails;

            this.weeklyorderitem.ins_WeeklyOrderID = o.ins_WeeklyOrderID;
            this.weeklyorderitem.ins_WeeklyOrderDetailsID = o.ins_WeeklyOrderDetailsID;

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
      }
  
      console.log('WO', a);
    }
  }

  async ItemPerCategories(category: string): Promise<any[]> {
    let data: any;
    this.items = [];
    data = (await this.itemservice.getList())  as any;
    if (data !== false) {
      for (var val of data) {
        this.items.push(val);
      }
    }

    return this.items.filter(p => p.ins_ItemCategory == category);
  }


  onCancel() {
    this.weeklyOrderEvent.emit();
  }

  onSubmit() {
    this.weeklyorder = new WeeklyOrder;
    this.weeklyorderlines.length = 0;

    this.weeklyorder.ins_Badge = '';
    this.weeklyorder.ins_BadgeName = '';

    this.weeklyorder.ins_WeeklyOrderID = this.headerForm.value.weeklyorderid;
    this.weeklyorder.ins_BranchCode = this.headerForm.value.branchcode;
    this.weeklyorder.ins_BranchName = this.headerForm.value.branchname;
    this.weeklyorder.ins_DocNum = this.headerForm.value.docnum;

    this.weeklyorder.ins_OrderBy = this.headerForm.value.orderby;
    this.weeklyorder.ins_ReceiveBy= this.headerForm.value.receivedby;
    this.weeklyorder.ins_DeliverBy = this.headerForm.value.deliveredby;
    this.weeklyorder.ins_Remarks = this.headerForm.value.remarks;
    this.weeklyorder.ins_CreatedBy = this.headerForm.value.owner;
    

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

    for (var a of this.itemcategorylist) 
    {
      for (var o of a.ins_Items) {
        this.weeklyorderdetails  = new WeeklyOrderDetails;
        
        this.weeklyorderdetails.ins_WeeklyOrderID = o.ins_WeeklyOrderID;
        this.weeklyorderdetails.ins_WeeklyOrderDetailsID = o.ins_WeeklyOrderDetailsID;

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
        
        this.weeklyorderlines.push(this.weeklyorderdetails);
      }
    }
    this.weeklyorder.ins_WeeklyOrderDetails = this.weeklyorderlines;

    console.log(this.weeklyorderlines);
    console.log(this.weeklyorder);

    if (this.state == 'add') {
      this.weeklyorderapi.post_WeeklyOrder(this.weeklyorder, 'PostAsync');
    } else {
      this.weeklyorderapi.put_WeeklyOrder(this.weeklyorder);
    }
  }

  onchangeorder(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
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

}

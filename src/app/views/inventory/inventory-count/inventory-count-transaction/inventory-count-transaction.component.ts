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
import { GlobalService } from 'src/_shared/api/service';
import { GlobalApi } from 'src/_shared/api/api';

import { Users } from 'src/_services/user.api';
import { Item } from 'src/_model/item/item';
import { ItemService } from 'src/_shared/items/item.service';
import { ItemCategories } from 'src/_model/item-categories/item-categories';
import { ItemCategoriesService } from '../../../../../_shared/item-categories/item-categories.service';

import { InventoryWarehouse } from 'src/_model/inventory-warehouse/inventory-warehouse';
import { InventoryWarehouseLines } from 'src/_model/inventory-warehouse/inventory-warehouse-lines';
import { InventoryWarehouseApi } from 'src/_shared/inventory-warehouse/inventory-warehouse.api';
import { InventoryMovementLines } from 'src/_model/inventory-movement/inventory-movement-lines';

@Component({
  selector: 'app-inventory-count-transaction',
  templateUrl: './inventory-count-transaction.component.html',
  styleUrls: ['./inventory-count-transaction.component.scss'],
})
export class InventoryCountTransactionComponent implements OnInit {
  @Input() dataList: InventoryWarehouse[] = [];
  @Output() outputEvent = new EventEmitter();

  headerForm!: FormGroup;
  userInfo: any;
  isViewHidden = false;
  isEditHidden = false;

  inventorywarehouseitem: InventoryWarehouseLines;
  inventorywarehouselist: InventoryWarehouseLines[] = [];
  inventorywarehousedata: InventoryWarehouseLines[] = [];

  isReadOnly = false;
  isHiddenSave = false;

  isHiddenPrinterBtn = false;
  isHiddenApproveBtn = false;
  isHiddenConfirmBtn = false;
  isHiddenRejectBtn = false;
  isHiddenDiv = false;
  isHiddenDeleteBtn = false;

  isHiddenBegQty = false;
  isHiddenEndQty = false;
  isHiddenEnd2Qty = false;

  isReadOnlyHeader = false;
  isReadOnlyRemarks = false;

  state = 'add';
  docId: number;
  badge: string = 'warning';
  badgename: string = 'Pending';
  type: string = '';

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
    private globalservice: GlobalService,
    private globalapi: GlobalApi,
    private itemcategory: ItemCategories,
    private itemcategoriesservice: ItemCategoriesService,
    private itemservice: ItemService,
    private inventorywarehouseapi: InventoryWarehouseApi,
    private inventorywarehouse: InventoryWarehouse
  ) {
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      inventorywarehouseid: 0,
      branchcode: this.userInfo[0].ins_BranchCode,
      branchname: this.userInfo[0].ins_BranchName,
      docnum: '',
      docdate: this.datepipe.transform(this.postingdate, 'yyyy-MM-dd'),
      createdby: this.userInfo[0].ins_FullName,
      modifiedby: '',
      owner: this.userInfo[0].ins_FullName,
      docstatus: 0,
      remarks: '',
      approvedby: '',
      approveremaillist: '',
      inventorytype: { value: 'B', disabled: true },
      inventorycode: { value: 'BEGI', disabled: true },
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

    const _docnum = await this.globalservice.getMaxId('InventoryWarehouse');
    this.headerForm.patchValue({
      docnum: _docnum,
      inventorytype: 'B',
      inventorycode: 'BEGI'
    });

    let data: any;
    data = await this.itemcategoriesservice.getList();
    let int = 0;
    let pint = 0;
    this.inventorywarehousedata = [];

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

        this.inventorywarehouselist = [];
        for (var o of tempItems) {
          this.inventorywarehouseitem = new InventoryWarehouseLines();

          this.inventorywarehouseitem.ins_ItemCode = o.ins_ItemCode;
          this.inventorywarehouseitem.ins_ItemDescription = o.ins_ItemName;
          this.inventorywarehouseitem.ins_InventoryUom = o.ins_InventoryUom;
          this.inventorywarehouseitem.ins_ItemCategory = o.ins_ItemCategory;
          this.inventorywarehouseitem.ins_BegCount = 0;
          this.inventorywarehouseitem.ins_EndCount = 0;
          this.inventorywarehouseitem.ins_BranchCode = this.userInfo[0].ins_BranchCode;
          this.inventorywarehouseitem.ins_BranchName = this.userInfo[0].ins_BranchName;
          this.inventorywarehouseitem.ins_CreatedBy = this.userInfo[0].ins_FullName;
          this.inventorywarehouseitem.ins_InventoryType = this.headerForm.controls["inventorytype"].value;
          this.inventorywarehouseitem.ins_InventoryCode = this.headerForm.controls["inventorycode"].value;
          this.inventorywarehouselist.push(this.inventorywarehouseitem);
        }

        this.itemcategory.ins_Items = this.inventorywarehouselist as any[];
        this.itemcategorylist.push(this.itemcategory);
        pint++;
      }
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

  async isEditEvent() {
    this.isViewHidden = true;
    this.isEditHidden = false;
    this.isReadOnly = true;
    this.state = 'edit';
    let data: any;
    this.itemcategorylist = [];

    console.log('dataList', this.dataList);

    for (var a of this.dataList as any) {
      console.log('Sample', a);
      this.docId = a.ins_InventoryWarehouseID;
      this.type = a.ins_InventoryType;

      this.headerForm = this.fb.group({
        inventorywarehouseid: a.ins_InventoryWarehouseID,
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        docnum: a.ins_DocNum,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),
        createdby: a.ins_CreatedBy,
        modifiedby: this.userInfo[0].ins_FullName,
        owner: a.ins_CreatedBy,
        docstatus: a.ins_DocStatus,
        remarks: a.ins_Remarks,
        approvedby: '',
        approveremaillist: '',
        inventorytype: { value: 'E', disabled: true },
        inventorycode: { value: 'ENDI', disabled: true }
      });

      this.onLoadForm(a.ins_DocStatus);

      let details = a.ins_InventoryWarehouseLines as any[];
      console.log('list', details);

      let data: any;
      data = await this.itemcategoriesservice.getList();
      console.log('data', data);
      let int = 0;
      let pint = 0;
      this.inventorywarehousedata = [];
      if (data !== false) {
        for (var val of data) {
          this.itemcategory = [] as any;
          this.itemcategory.ins_CategoryCode = val.ins_CategoryCode;
          this.itemcategory.ins_CategoryName = val.ins_CategoryName;
          this.itemcategory.ins_IsValid = true;
          this.itemcategory.ins_AddItem = true;

          let tempItems = details.filter(
            (p) => p.ins_ItemCategory == val.ins_CategoryCode
          );

          // console.log('tempItems', tempItems);
          this.inventorywarehouselist = [];
          for (var o of tempItems) {
            this.inventorywarehouseitem = new InventoryWarehouseLines();

            this.inventorywarehouseitem.ins_ItemCode = o.ins_ItemCode;
            this.inventorywarehouseitem.ins_ItemDescription = o.ins_ItemDescription;
            this.inventorywarehouseitem.ins_InventoryUom = o.ins_InventoryUom;
            this.inventorywarehouseitem.ins_ItemCategory = o.ins_ItemCategory;
            this.inventorywarehouseitem.ins_BegCount = o.ins_BegCount;
            this.inventorywarehouseitem.ins_EndCount = o.ins_EndCount;
            this.inventorywarehouseitem.ins_BranchCode = this.userInfo[0].ins_BranchCode;
            this.inventorywarehouseitem.ins_BranchName = this.userInfo[0].ins_BranchName;
            this.inventorywarehouseitem.ins_CreatedBy = this.userInfo[0].ins_FullName;

            // this.inventorywarehouseitem.ins_InventoryType = this.headerForm.value.inventorytype;
            // this.inventorywarehouseitem.ins_InventoryCode = this.headerForm.value.inventorycode;
            this.inventorywarehouse.ins_InventoryType = this.headerForm.controls["inventorytype"].value;
            this.inventorywarehouse.ins_InventoryCode = this.headerForm.controls["inventorycode"].value;
            this.inventorywarehouselist.push(this.inventorywarehouseitem);
          }

          this.itemcategory.ins_Items = this.inventorywarehouselist as any[];
          this.itemcategorylist.push(this.itemcategory);
          pint++;
        }
      }
      console.log('inventorywarehousedata', this.inventorywarehousedata);
    }
  }

  async onSubmit() {
    // Initialiaze Data to the Header
    // console.log(this.headerForm.controls["inventorytype"].value);

    this.inventorywarehouse = new InventoryWarehouse();
    this.inventorywarehouse.ins_Badge = '';
    this.inventorywarehouse.ins_BadgeName = '';

    this.inventorywarehouse.ins_InventoryWarehouseID = this.headerForm.value.inventorywarehouseid;
    this.inventorywarehouse.ins_PostingDate = this.headerForm.value.docdate;
    this.inventorywarehouse.ins_DocNum = this.headerForm.value.docnum;
    this.inventorywarehouse.ins_DocStatus = this.headerForm.value.docstatus;
    this.inventorywarehouse.ins_Remarks = this.headerForm.value.remarks;
    this.inventorywarehouse.ins_ApprovedBy = this.headerForm.value.approvedby;
    this.inventorywarehouse.ins_ApproverEmailList = this.headerForm.value.approveremaillist;
    this.inventorywarehouse.ins_ModifiedBy = this.headerForm.value.modifiedby;
    this.inventorywarehouse.ins_CreatedBy = this.headerForm.value.createdby;
    this.inventorywarehouse.ins_BranchCode = this.headerForm.value.branchcode;
    this.inventorywarehouse.ins_BranchName = this.headerForm.value.branchname;

    this.inventorywarehouse.ins_InventoryType = this.headerForm.controls["inventorytype"].value;
    this.inventorywarehouse.ins_InventoryCode = this.headerForm.controls["inventorycode"].value;

    // initialize data to lines
    this.inventorywarehousedata = [];
    for (var a of this.itemcategorylist) {
      for (var o of a.ins_Items) {
        this.inventorywarehouseitem = new InventoryWarehouseLines();

        this.inventorywarehouseitem.ins_ItemCode = o.ins_ItemCode;
        this.inventorywarehouseitem.ins_ItemDescription = o.ins_ItemDescription;
        this.inventorywarehouseitem.ins_InventoryUom = o.ins_InventoryUom;
        this.inventorywarehouseitem.ins_ItemCategory = o.ins_ItemCategory;
        this.inventorywarehouseitem.ins_BegCount = o.ins_BegCount;
        this.inventorywarehouseitem.ins_EndCount = o.ins_EndCount;
        this.inventorywarehouseitem.ins_BranchCode = this.userInfo[0].ins_BranchCode;
        this.inventorywarehouseitem.ins_BranchName = this.userInfo[0].ins_BranchName;
        this.inventorywarehouseitem.ins_CreatedBy = this.userInfo[0].ins_FullName;
        this.inventorywarehouseitem.ins_InventoryType = this.headerForm.value.inventorytype;
        this.inventorywarehouseitem.ins_InventoryCode = this.headerForm.value.inventorycode;
        this.inventorywarehousedata.push(this.inventorywarehouseitem);
      }
    }
    this.inventorywarehouse.ins_InventoryWarehouseLines = this.inventorywarehousedata;
    console.log(this.inventorywarehouse);

    if (this.state == 'add') {
      await this.globalservice.postData(
        'InventoryWarehouse',
        'PostAsync',
        this.inventorywarehouse
      );
    } else {
      this.globalservice.putData(
        'InventoryWarehouse',
        '',
        this.inventorywarehouse
      );
    }

    this.formPending();
  }

  onchangebeg(a: any) {
    console.log(a.target.name);
    console.log(a.target.id);
    console.log(a.target.value);
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_BegCount = _qty as number;
    console.log(this.itemcategorylist[_pid]);
  }

  onchangeend(a: any) {
    console.log(a.target.name);
    console.log(a.target.id);
    console.log(a.target.value);
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_EndCount = _qty as number;
    console.log(this.itemcategorylist[_pid]);
  }

  onCancel() {
    this.outputEvent.emit();
  }

  async onApprove(id: number) {
    let data = (await this.globalservice.docApproved('InventoryWarehouse', id)) as any;
    this.formApproved();
  }

  async onReject(id: number) {
    let data = (await this.globalservice.docRejected('InventoryWarehouse', id)) as any;
  }

  async onClose(id: number) {
    let data = (await this.globalservice.docClosed('InventoryWarehouse', id)) as any;
  }

  onChangeData() {
    this.isHiddenPrinterBtn = true;
    this.isHiddenSave = false;

    this.isHiddenApproveBtn = true;
    this.isHiddenConfirmBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;
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
      default:
        break;
    }
  }

  formDefault() {
    this.state = 'add';

    this.isHiddenPrinterBtn = true;
    this.isHiddenSave = false;

    this.isHiddenApproveBtn = true;
    this.isHiddenConfirmBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenBegQty = false;
    this.isHiddenEndQty = true;
    this.isHiddenEnd2Qty = true;

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    let InvType = '';
    this.headerForm.patchValue({
      inventorytype: 'B',
      inventorycode: 'BEGI'
    });
    InvType = 'BEGGINING BALANCE';

    this.isHiddenSave = true;
    
    this.isHiddenApproveBtn = false;
    this.isHiddenConfirmBtn = true;
    this.isHiddenRejectBtn = false;
    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;
    this.isHiddenPrinterBtn = false;

    this.isHiddenBegQty = false;
    this.isHiddenEndQty = true;
    this.isHiddenEnd2Qty = true;

    this.badge = 'warning';
    this.badgename = InvType + ' ( FOR CONFIRMATION )';
  }

  formApproved() {
    let InvType = '';
    this.isHiddenBegQty = true;
    this.isHiddenEndQty = false;
    this.isHiddenEnd2Qty = true;

    this.headerForm.patchValue({
      inventorytype: 'E',
      inventorycode: 'ENDI'
    });


    if (this.type == 'B') {
      this.isHiddenApproveBtn = true;
      this.isHiddenConfirmBtn = true;
      this.isHiddenRejectBtn = true;
      this.isHiddenDiv = true;
      this.isHiddenDeleteBtn = true;
      this.isHiddenPrinterBtn = false;

      InvType = 'ENDING BALANCE';
      this.badge = 'secondary';
      this.badgename = InvType + ' ( PENDING )';
    } else {
      this.isHiddenApproveBtn = true;
      this.isHiddenConfirmBtn = false;
      this.isHiddenRejectBtn = true;
      this.isHiddenDiv = false;
      this.isHiddenDeleteBtn = true;
      this.isHiddenPrinterBtn = false;


      InvType = 'ENDING BALANCE';
      this.badge = 'secondary';
      this.badgename = InvType + ' ( FOR CONFIRMATION )';
    }
  }

  formRejected() {
    this.isHiddenBegQty = true;
    this.isHiddenEndQty = true;
    this.isHiddenEnd2Qty = false;

    this.isHiddenApproveBtn = true;
    this.isHiddenConfirmBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;
    this.isHiddenPrinterBtn = true;

    this.isHiddenSave = true;
    this.isReadOnlyRemarks = true;

    this.badge = 'danger';
    this.badgename = 'REJECTED';
  }

  formClosed() {

    this.isHiddenBegQty = true;
    // this.isHiddenEndQty = false;
    // this.isHiddenEnd2Qty = true;

    this.isHiddenApproveBtn = true;
    this.isHiddenConfirmBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;
    this.isHiddenPrinterBtn = false;

    this.isHiddenSave = true;
    this.isHiddenEndQty = true;
    this.isHiddenEnd2Qty = false;

    this.isReadOnlyRemarks = true;

    this.badge = 'danger';
    this.badgename = 'CLOSED';
  }
}

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
  
  itemdetails: InventoryWarehouseLines;
  itemdetailslist: InventoryWarehouseLines[] = [];
  
  headerForm!: FormGroup;
  badge: string = 'warning';
  badgename: string = 'Pending';

  // Header Data
  userInfo: any;
  userApprover: any;
  userOwner: any;
  docId: number;
  state = 'add';
  type: string = '';

  begQty: number;
  endQty: number;

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

  isHiddenBegQty = false;
  isHiddenBeg2Qty = false;
  isHiddenEndQty = false;
  isHiddenEnd2Qty = false;
  isReadOnlyRemarks = false;

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
    private headerdata: InventoryWarehouse,
  ) {
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      inventorywarehouseid: '',
      remarks: '',
      docnum: '',
      docdate: this.datepipe.transform(this.postingdate, 'yyyy-MM-dd'),

      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      createdby: this.userInfo.fullName,
      owner: this.userInfo.fullName,
      approvedby: '',

      inventorytype: { value: 'B', disabled: true },
      inventorycode: { value: 'BEGI', disabled: true },
      docstatus: 0,
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.dataList.length <= 0) {
      await this.isAddEvent();
    } else {
      await this.isEditEvent();
    }
  }


  async isEditEvent() {
    this.userInfo = this.user.getCurrentUser();
    this.userApprover = this.user.getCurrentUserApprover();
    this.state = 'edit';
    this.itemcategorylist = [];

    this.begQty = 0;
    this.endQty = 0;

    for (var a of this.dataList as any) {
      // console.log("Load Data", a);
      this.docId = a.ins_InventoryWarehouseID;
      this.userOwner = a.ins_CreatedBy;
      this.type = a.ins_InventoryType;

      this.headerForm = this.fb.group({
        inventorywarehouseid: this.docId,
        remarks: a.ins_Remarks,
        docnum: a.ins_DocNum,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),

        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        createdby: a.ins_CreatedBy,
        owner: a.ins_CreatedBy,
        modifiedby: this.userInfo.fullName,
        docstatus: this.userApprover.length > 0 ? a.ins_DocStatus : (a.ins_DocStatus == 1 ? 3 : a.ins_DocStatus),
        approvedby: this.userOwner !== this.userInfo.fullName ? this.userInfo.fullName : (this.userApprover.length > 0 ? a.ins_ApprovedBy : this.userInfo.fullName),

        inventorytype: { value: 'E', disabled: true },
        inventorycode: { value: 'ENDI', disabled: true }
      });


      let details = a.ins_InventoryWarehouseLines as any[];
      let data: any;
      data = (await this.globalservice.getAuthList('ItemCategories')) as any;

      let int = 0;
      let pint = 0;
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

          this.itemdetailslist = [];
          for (var o of tempItems) {
            this.itemdetails = new InventoryWarehouseLines();

            this.itemdetails.ins_ItemCode = o.ins_ItemCode;
            this.itemdetails.ins_ItemDescription = o.ins_ItemDescription;
            this.itemdetails.ins_InventoryUom = o.ins_InventoryUom;
            this.itemdetails.ins_ItemCategory = o.ins_ItemCategory;

            this.itemdetails.ins_BegCount = o.ins_BegCount;
            this.itemdetails.ins_EndCount = o.ins_EndCount;

            this.begQty = this.begQty + Number(o.ins_BegCount);
            this.endQty = this.endQty + Number(o.ins_EndCount);

            this.itemdetails.ins_BranchCode = o.ins_BranchCode;
            this.itemdetails.ins_BranchName = o.ins_BranchName;
            this.itemdetails.ins_CreatedBy = o.ins_CreatedBy;
            this.itemdetails.ins_ModifiedBy = this.userInfo.fullName;

            this.itemdetails.ins_InventoryType = this.headerForm.controls["inventorytype"].value;
            this.itemdetails.ins_InventoryCode = this.headerForm.controls["inventorycode"].value;
            this.itemdetailslist.push(this.itemdetails);
          }

          this.itemcategory.ins_Items = this.itemdetailslist as any[];
          this.itemcategorylist.push(this.itemcategory);
          pint++;
        }
      }

      this.onLoadForm(a.ins_DocStatus);
    }
  }

  async isAddEvent() {
    this.formDefault();
    this.userInfo = this.user.getCurrentUser();
    this.userApprover = this.user.getCurrentUserApprover();
    const output = await this.globalservice.getMaxId('InventoryWarehouse') as any;


    this.headerForm.patchValue({
      inventorywarehouseid: 0,
      docnum: output.value,
      docdate: this.datepipe.transform(this.postingdate, 'yyyy-MM-dd'),

      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      owner: this.userInfo.fullName,
      createdby: this.userInfo.fullName,
      inventorytype: 'B',
      inventorycode: 'BEGI',
      docstatus: this.userApprover.length > 0 ? 0 : 1,
      approvedby: this.userApprover.length > 0 ? '' : this.userInfo.fullName,
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
          this.itemdetails = new InventoryWarehouseLines();

          this.itemdetails.ins_ItemCode = o.ins_ItemCode;
          this.itemdetails.ins_ItemDescription = o.ins_ItemName;
          this.itemdetails.ins_InventoryUom = o.ins_InventoryUom;
          this.itemdetails.ins_ItemCategory = o.ins_ItemCategory;

          this.itemdetails.ins_BegCount = 0;
          this.itemdetails.ins_EndCount = 0;

          this.itemdetails.ins_BranchCode = this.userInfo.branchCode;
          this.itemdetails.ins_BranchName = this.userInfo.branchName;
          this.itemdetails.ins_CreatedBy = this.userInfo.fullName;

          this.itemdetails.ins_InventoryType = this.headerForm.controls["inventorytype"].value;
          this.itemdetails.ins_InventoryCode = this.headerForm.controls["inventorycode"].value;

          this.itemdetailslist.push(this.itemdetails);
        }

        this.itemcategory.ins_Items = this.itemdetailslist as any[];
        this.itemcategorylist.push(this.itemcategory);
        pint++;
      }
    }

  }


  async ItemPerCategories(category: string): Promise<any[]> {
    let data: any;
    this.items = [];
    console.log("Pass here")
    data = (await this.globalservice.getAuthList('Item')) as any;
    if (data !== false) {
      for (var val of data) {
        this.items.push(val);
      }
    }

    return this.items.filter((p) => p.ins_ItemCategory == category);
  }

  async onSubmit() {
    let approverlist = this.user.getCurrentUserApprover();
    this.begQty = 0;
    this.endQty = 0;

    this.headerdata = new InventoryWarehouse();
    this.headerdata.ins_Badge = '';
    this.headerdata.ins_BadgeName = '';

    this.headerdata.ins_InventoryWarehouseID = this.headerForm.value.inventorywarehouseid;
    this.headerdata.ins_BranchCode = this.headerForm.value.branchcode;
    this.headerdata.ins_BranchName = this.headerForm.value.branchname;
    this.headerdata.ins_DocNum = this.headerForm.value.docnum;

    this.headerdata.ins_PostingDate = this.headerForm.value.docdate;
    this.headerdata.ins_Remarks = this.headerForm.value.remarks;
    this.headerdata.ins_ApprovedBy = this.headerForm.value.approvedby;
    this.headerdata.ins_ModifiedBy = this.headerForm.value.modifiedby;
    this.headerdata.ins_CreatedBy = this.headerForm.value.createdby;
    this.headerdata.ins_DocStatus = this.headerForm.value.docstatus;
    this.headerdata.ins_ApproverEmailList = approverlist;
    this.headerdata.ins_InventoryType = this.headerForm.controls["inventorytype"].value;
    this.headerdata.ins_InventoryCode = this.headerForm.controls["inventorycode"].value;

    
    this.type = this.headerForm.controls["inventorytype"].value;

    // if (this.type == 'B') {
    //   this.headerdata.ins_BegCountDate = this.headerForm.value.docdate;
    //   this.headerdata.ins_EndCountDate = this.headerForm.value.docdate;
    // } 
    // if (this.type == 'E') {
    //   this.headerdata.ins_EndCountDate = this.date;
    // } 

    // initialize data to lines
    // this.itemdetailslist.length = 0;
    this.itemdetailslist = [];
    for (var a of this.itemcategorylist) {
      if (a.ins_Items.length > 0) {
        for (var o of a.ins_Items) {
          // console.log("Items" , o);
          
          this.begQty = this.begQty + Number(o.ins_BegCount);
          this.endQty = this.endQty + Number(o.ins_EndCount);

          o.ins_InventoryType = this.headerForm.controls["inventorytype"].value;
          o.ins_InventoryCode = this.headerForm.controls["inventorycode"].value;

          // o.ins_BegCountDate = this.headerdata.ins_BegCountDate;
          // o.ins_EndCountDate = this.headerdata.ins_EndCountDate;
          await this.itemdetailslist.push(o);
        }
      }
    }
    this.headerdata.ins_InventoryWarehouseLines = this.itemdetailslist;
    console.log("headerdata", this.headerdata);

    let output: any;
    if (this.state == 'add') {
      output = await this.globalservice.postAuth(
        'InventoryWarehouse',
        'PostAsync',
        this.headerdata
      );
    } else {
      output = await this.globalservice.postAuth('InventoryWarehouse', 'PutAsync', this.headerdata);
    }


    this.docId = output.ins_InventoryWarehouseID;
    this.headerForm.patchValue({
      inventorywarehouseid: output.ins_InventoryWarehouseID
    });

    // console.log(this.docId, this.headerForm);
    this.onLoadForm(this.headerForm.value.docstatus);
  }

  onchangebeg(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_BegCount = _qty as number;
  }

  onchangeend(a: any) {
    const _pid = a.target.name;
    const _id = a.target.id;
    const _qty = a.target.value;
    this.itemcategorylist[_pid].ins_Items[_id].ins_EndCount = _qty as number;
  }

  onCancel() {
    this.outputEvent.emit();
  }

  async onApprove(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 1,
      DocId: id,
      RejectComment: '',
    };
    
    let data = await this.globalservice.postAuth('InventoryWarehouse', 'Status', approvalData);
    this.headerForm.patchValue({
      inventorytype: 'E',
      inventorycode: 'ENDI',
      inventorywarehouseid: id,
      docstatus: 1
    });

    this.docId = id;
    this.onLoadForm(1);
  }

  async onReject(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 2,
      DocId: id,
      RejectComment: 'Document Rejected',
    };
    
    let data = await this.globalservice.postAuth('InventoryWarehouse', 'Status', approvalData);
    this.headerForm.patchValue({
      inventorywarehouseid: id,
      docstatus: 2
    });
    this.docId = id;
    this.onLoadForm(2);
  }

  async onClose(id: number) {
    // console.log(id);
    let data = (await this.globalservice.docClosed('InventoryWarehouse', id)) as any;
  }

  async onConfirmEnding(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 3,
      DocId: id,
      RejectComment: '',
    };

    let data = await this.globalservice.postAuth('InventoryWarehouse', 'Status', approvalData);
    this.headerForm.patchValue({
      inventorywarehouseid: id,
      docstatus: 3
    });
    this.docId = id;
    this.onLoadForm(3);
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
    this.isHiddenSave = true;

    this.isHiddenApproveBtn = true;
    this.isHiddenConfirmBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenBegQty = false;
    this.isHiddenBeg2Qty = true;
    
    this.isHiddenEndQty = true;
    this.isHiddenEnd2Qty = true;

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    this.headerForm.patchValue({
      inventorytype: 'B',
      inventorycode: 'BEGI'
    });

    this.isHiddenSave = true;
    
    this.isHiddenApproveBtn = false;
    this.isHiddenConfirmBtn = true;
    this.isHiddenRejectBtn = false;
    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;
    this.isHiddenPrinterBtn = false;

    this.isHiddenBegQty = false;
    this.isHiddenBeg2Qty = true;
    this.isHiddenEndQty = true;
    this.isHiddenEnd2Qty = true;

    if (this.begQty > 0) {
      this.badge = 'warning';
      this.badgename = 'BEGGINING BALANCE ( FOR CONFIRMATION )';
    } 
    else {
      this.badge = 'warning';
      this.badgename = 'BEGGINING BALANCE ( PENDING )';
    }

    if (this.userInfo.securityLevel !== "1") {
      if (this.userOwner !== this.userInfo.fullName) {
        this.isHiddenApproveBtn = false;
        this.isHiddenConfirmBtn = true;
        this.isHiddenRejectBtn = false;
        this.isHiddenDiv = false;

        this.isHiddenBegQty = true;
        this.isHiddenBeg2Qty = false;

      } else {
        this.isHiddenApproveBtn = true;
        this.isHiddenConfirmBtn = true;
        this.isHiddenRejectBtn = true;
        this.isHiddenDiv = true;
      }
    }

  }

  formApproved() {
    // console.log("endQty", this.endQty);

    this.isHiddenBegQty = true;
    this.isHiddenBeg2Qty = true;
    this.isHiddenEndQty = false;
    this.isHiddenEnd2Qty = true;
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    if (this.type == 'B') {
      this.isHiddenApproveBtn = true;
      this.isHiddenConfirmBtn = true;
      this.isHiddenRejectBtn = true;
      this.isHiddenDiv = true;
      this.isHiddenDeleteBtn = true;

      if (this.endQty > 0) {
        this.isHiddenConfirmBtn = false;
        this.isHiddenRejectBtn = false;
        this.isHiddenDiv = false;
        this.badge = 'secondary';
        this.badgename = 'ENDING BALANCE ( FOR CONFIRMATION )';
      } 
      else {
        this.badge = 'secondary';
        this.badgename = 'ENDING BALANCE ( PENDING )';
      }
    }

    if (this.type == 'E') {
      this.isHiddenApproveBtn = true;
      this.isHiddenConfirmBtn = true;
      this.isHiddenRejectBtn = true;
      this.isHiddenDiv = true;
      this.isHiddenDeleteBtn = true;

      if (this.endQty > 0) {
        this.isHiddenConfirmBtn = false;
        this.isHiddenRejectBtn = false;
        this.isHiddenDiv = false;
        this.badge = 'secondary';
        this.badgename = 'ENDING BALANCE ( FOR CONFIRMATION )';
      } 
      else {
        this.badge = 'secondary';
        this.badgename = 'ENDING BALANCE ( PENDING )';
      }
    }


    if (this.userInfo.securityLevel !== "1") {
      if (this.userOwner !== this.userInfo.fullName) {
        this.isHiddenApproveBtn = true;
        this.isHiddenConfirmBtn = false;
        this.isHiddenRejectBtn = false;
        this.isHiddenDiv = false;

        this.isHiddenBegQty = true;
        this.isHiddenBeg2Qty = true;
        this.isHiddenEndQty = true;
        this.isHiddenEnd2Qty = false;

        if (this.endQty > 0) {
        } 
        else {
          this.isHiddenApproveBtn = true;
          this.isHiddenConfirmBtn = true;
          this.isHiddenRejectBtn = true;
          this.isHiddenDiv = true;
        }

      } else {
        this.isHiddenApproveBtn = true;
        this.isHiddenConfirmBtn = true;
        this.isHiddenRejectBtn = true;
        this.isHiddenDiv = true;
      }
    }
  }

  formRejected() {
    this.isHiddenBegQty = true;
    this.isHiddenBeg2Qty = true;
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


    if (this.type == 'B') {
      this.headerForm.patchValue({
        inventorytype: 'B',
        inventorycode: 'BEGI'
      });

      this.isHiddenBegQty = true;
      this.isHiddenBeg2Qty = false;
      this.isHiddenEndQty = true;
      this.isHiddenEnd2Qty = true;
      this.badgename = 'REJECTED @ BEGINNING INVENTORY COUNT';
    }
    else{
      this.headerForm.patchValue({
        inventorytype: 'E',
        inventorycode: 'ENDI'
      });

      this.isHiddenBegQty = true;
      this.isHiddenBeg2Qty = true;
      this.isHiddenEndQty = true;
      this.isHiddenEnd2Qty = false;
      this.badgename = 'REJECTED @ ENDING INVENTORY COUNT';
    }

    this.badge = 'danger';
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
    
    this.isHiddenBegQty = true;
    this.isHiddenBeg2Qty = false;
    this.isHiddenEndQty = true;
    this.isHiddenEnd2Qty = false;

    this.isReadOnlyRemarks = true;

    this.badge = 'danger';
    this.badgename = 'CLOSED';
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

import { Users } from 'src/_services/user.api';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { ItemUomSelection } from "src/app_shared/models/item-uom-selection";
import { ItemTransactionLine } from "src/app_shared/models/item-transaction-line";
import { Transaction } from "src/app_shared/models/transaction";
import { TransactionApproval } from "src/app_shared/models/transaction-approval";
import { TransactionLine } from 'src/app_shared/models/transaction-line';
import { SwalService } from 'src/_services/swal-service';
import Swal from 'sweetalert2';
import { ObjectType } from 'src/app_shared/enums/object-type';

enum UserAction {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

@Component({
  selector: 'app-purchase-order-transaction',
  templateUrl: './purchase-order-transaction.component.html',
  styleUrls: ['./purchase-order-transaction.component.scss'],
})
export class PurchaseOrderTransactionComponent implements OnInit {

  documentType: string = 'PurchaseOrders';
  docurl: string = '/purchase/purchase-order';

  settingHidden: boolean = true;

  decimalPipe: DecimalPipe = new DecimalPipe("en-US");
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  docdateInputType = 'text';
  duedateInputType = 'text';

  documentForm = new FormGroup({
    docnum: new FormControl(''),
    cardcode: new FormControl(''),
    cardname: new FormControl(''),
    branchcode: new FormControl(''),
    branchname: new FormControl(''),
    remarks: new FormControl(''),
    postingdate: new FormControl(''),
    docdate: new FormControl(''),
    duedate: new FormControl(''),
    createdby: new FormControl(''),
    modifiedby: new FormControl(''),
    userid: new FormControl(''),
    doctotal: new FormControl(''),
    approverlist: new FormControl(''),
    docstatus: new FormControl('')
  });

  userAction: string = UserAction.ADD;
  userInfo: any;
  userApprover: any;
  createdby: string = '';
  modifiedby: string = '';
  approvedby: string = '';
  approveduserid: number;
  userid: number;
  approverlist: string = '';
  rolecode: string = '';

  transOwner: string = '';
  transUserId: string = '';

  docnum: string = '';
  branchcode: string = '';
  branchname: string = '';
  remarks: string = '';
  approvedremarks: string = '';
  doctotal: number = 0;
  docstatus: number = -1;
  cardcode: string = '';
  cardname: string = '';
  received: number = -1;



  objecttype: number = ObjectType.OPOR;

  baselinenum: number = null;
  basedocentry: number = null;
  basedoctype: number = null;
  basedocnum: string = null;
  orderquantity: number = 0;

  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  docdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  duedate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'yyyy-MM-dd'
  );

  itemUOM: ItemUomSelection[] = [];
  transaction: Transaction[] = [];
  transactionApproval: TransactionApproval[] = [];

  itemTransactionLines: ItemTransactionLine[] = [];
  lastAddedIndex: number;

  badge: string = '';
  badgename: string = '';

  documentid: string = '';
  selectedUoms: any[] = [];

  // Actions
  spinnerHidden: boolean = true;
  actionHidden: boolean = true;
  printerHidden: boolean = true;
  saveHidden: boolean = true;
  confirmHidden: boolean = true;
  approvedHidden: boolean = true;
  rejectHidden: boolean = true;
  dividerHidden: boolean = true;
  cancelHidden: boolean = true;
  closeHidden: boolean = true;
  deleteHidden: boolean = true;
  deliveryHidden: boolean = true;
  backToListHidden: boolean = false;

  removeItemHidden: boolean = true;
  uomItemHidden: boolean = true;
  quantityItemHidden: boolean = true;
  releasedItemHidden: boolean = true;
  priceItemHidden: boolean = true;
  addItemHidden: boolean = true;

  docdateReadOnly: boolean = true;
  duedateReadOnly: boolean = true;
  remarksReadOnly: boolean = true;

  cardcodeDisable: boolean = true;

  LoadSettingDefault() {
    this.spinnerHidden = true;
    this.printerHidden = false;
    this.actionHidden = false;
    this.saveHidden = true;
    this.confirmHidden = true;
    this.approvedHidden = true;
    this.rejectHidden = true;
    this.dividerHidden = true;
    this.cancelHidden = true;
    this.closeHidden = true;
    this.deleteHidden = true;
    this.deliveryHidden = true;
    this.backToListHidden = false;

    this.removeItemHidden = true;
    this.uomItemHidden = true;
    this.quantityItemHidden = true;
    this.releasedItemHidden = true;
    this.priceItemHidden = true;
    this.addItemHidden = true;

    this.duedateReadOnly = true;
    this.docdateReadOnly = true;
    this.remarksReadOnly = true;

    this.cardcodeDisable = true;
  }

  constructor(private activeroute: ActivatedRoute,
    private router: Router,
    private apiservice: GlobalApiService,
    private user: Users,
    private swal: SwalService,
  ) {

    this.userInfo = this.user.getCurrentUser();
    this.approverlist = this.user.getCurrentUserApprover();
    console.log("userInfo", this.userInfo);

    this.rolecode = this.userInfo.roleCode;
    this.createdby = this.userInfo.fullName;
    this.modifiedby = this.userInfo.fullName;
    this.branchcode = this.userInfo.branchCode;
    this.branchname = this.userInfo.branchName;
    this.userid = this.userInfo.userId;

    this.approvedby = this.userInfo.fullName;
    this.approveduserid = this.userInfo.userId;
  }


  ngOnInit(): void {
    this.activeroute.params.subscribe(params => {
      this.documentid = params['documentnumber']; // Access the route parameter 'id'
    });

    if (this.documentid != undefined) {
      this.editTransaction(this.documentid);
    }
    else {
      this.addTransaction();
    }
  }

  async addTransaction() {
    this.userAction = UserAction.ADD;

    let docnum = await this.apiservice.getDataAsync(this.documentType, 'GetMaxId');
    this.docnum = docnum.value

    this.documentForm.setValue({
      docnum: this.docnum,
      cardcode: this.cardcode,
      cardname: this.cardname,
      branchcode: this.branchcode,
      branchname: this.branchname,
      remarks: this.remarks,
      postingdate: this.postingdate,
      docdate: this.docdate,
      duedate: this.duedate,
      createdby: this.createdby,
      modifiedby: this.modifiedby,
      userid: this.userInfo.userId,
      doctotal: this.doctotal,
      approverlist: this.approverlist,
      docstatus: this.docstatus,
    });

    this.OnLoadForm(this.docstatus);
  }

  async editTransaction(documentnumber: string) {
    this.userAction = UserAction.EDIT;
    let response = await this.apiservice.getDataAsync(this.documentType, 'GetTransaction', documentnumber);
    console.log("response", response);
    this.transOwner = response.ins_CreatedBy;
    this.transUserId = response.ins_UserId;
    this.userApprover = response.ins_ApproverEmailList;

    this.docnum = response.ins_DocNum;
    this.cardcode = response.ins_CardCode;
    this.cardname = response.ins_CardName;

    this.branchcode = response.ins_BranchCode;
    this.branchname = response.ins_BranchName;
    this.remarks = response.ins_Remarks;
    this.postingdate = this.datepipe.transform(response.ins_PostingDate, 'yyyy-MM-dd');
    this.docdate = this.datepipe.transform(response.ins_DocDate, 'yyyy-MM-dd');
    this.duedate = this.datepipe.transform(response.ins_DueDate, 'yyyy-MM-dd');

    this.createdby = response.ins_CreatedBy;
    this.modifiedby = response.ins_ModifiedBy;
    this.userid = response.ins_UserId;
    this.doctotal = this.ConvertToDouble(response.ins_DocTotal, '2');
    this.approverlist = response.ins_ApproverEmailList;
    this.docstatus = 0;
    this.received = response.ins_Received;

    this.documentForm.setValue({
      docnum: this.docnum,
      cardcode: this.cardcode,
      cardname: this.cardname,
      branchcode: this.branchcode,
      branchname: this.branchname,
      remarks: this.remarks,
      postingdate: this.postingdate,
      docdate: this.docdate,
      duedate: this.duedate,
      createdby: this.createdby,
      modifiedby: this.modifiedby,
      userid: this.userInfo.userId,
      doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
      approverlist: this.approverlist,
      docstatus: this.docstatus,
    });

    this.itemTransactionLines = [];
    for (var v of response.ins_TransactionLine) {
      let uomlist = await this.apiservice.getDataAsync('Item', 'UomList', v.ins_ItemCode);
      let getuom = uomlist.find((uom: any) => uom.ins_ItemUomId === v.ins_ItemUomId);

      let itemuomid = v.ins_ItemUomId;
      let itemcode = v.ins_ItemCode;
      let itemname = v.ins_ItemName;
      let unitcost = v.ins_UnitCost;
      let unitquantity = v.ins_UnitQuantity;
      let linetotal = v.ins_LineTotal;
      let unituom = v.ins_UnitUOM;

      let inventoryuom = v.ins_InventoryUOM;
      let inventorycost = this.ConvertToDouble(v.ins_InventoryCost, '6');
      let inventoryquantity = v.ins_InventoryQuantity;

      let unitbasecost = this.ConvertToDouble(v.ins_UnitBaseCost, '6');
      let unitbasequantity = v.ins_UnitBaseQuantity;
      let unitbaseuom = v.ins_UnitBaseUOM;

      let baselinenum = v.ins_BaseLineNum;
      let basedocentry = v.ins_BaseDocEntry;
      let basedoctype = v.ins_BaseDocType;
      let basedocnum = v.ins_BaseDocNum;

      let orderquantity = v.ins_OrderQuantity;
      let receivedquantity = v.ins_ReceivedQuantity;
      let receivedinventoryquantity = v.ins_ReceivedInventoryQuantity;
      let releasedquantity = v.ins_ReleasedQuantity;
      let releasedinventoryquantity = v.ins_ReleasedInventoryQuantity;

      let newTransaction = new ItemTransactionLine(itemcode, itemname, uomlist, unituom, unitquantity, unitcost, linetotal, inventoryuom,
        inventoryquantity, inventorycost, unitbaseuom, unitbasequantity, unitbasecost, itemuomid,
        basedocnum, basedocentry, basedoctype, baselinenum, this.objecttype, orderquantity, receivedquantity,
        receivedinventoryquantity, releasedquantity, releasedinventoryquantity);

      this.itemTransactionLines.push(newTransaction);
      this.selectedUoms[v.ins_LineNum] = getuom;
    }
    
    this.docstatus = response.ins_DocStatus;
    this.OnLoadForm(response.ins_DocStatus);
  }

  onDocDateChange() {
    const selectedDate = this.documentForm.get('docdate').value;
    this.docdate = this.datepipe.transform(selectedDate, 'yyyy-MM-dd');
  }

  onDueDateChange() {
    const selectedDate = this.documentForm.get('duedate').value;
    this.duedate = this.datepipe.transform(selectedDate, 'yyyy-MM-dd');
  }

  onInputFocus(fieldName: string): void {
    if (fieldName === 'docdate') {
      this.docdateInputType = 'date';
    } else if (fieldName === 'duedate') {
      this.duedateInputType = 'date';
    }
  }

  onInputBlur(fieldName: string): void {
    if (fieldName === 'docdate') {
      this.docdateInputType = 'text';
    } else if (fieldName === 'duedate') {
      this.duedateInputType = 'text';
    }
  }

  async submitTransaction() {

    this.spinnerHidden = false;
    this.saveHidden = true;

    if (this.docstatus !== -1) {
      let response = await this.apiservice.getDataAsync(this.documentType, 'GetTransaction', this.documentid);
      this.docstatus = response.ins_DocStatus;

      if (this.rolecode === 'BRUSR') {
        if (this.docstatus !== 0) {
          this.swal.commonSwalCentered('Transaction is Updated! No Change Apply', 'error');
          this.editTransaction(this.documentid);
          this.spinnerHidden = true;
          return;
        }
      }

    }

    if (this.cardcode === "") {
      this.swal.commonSwalCentered(
        'Invalid Supplier',
        'error'
      );

      this.editTransaction(this.documentid);
      this.spinnerHidden = true;
      return;
    }

    let trans = this.buildTransaction();

    switch (this.userAction) {
      case UserAction.ADD:
        trans.ins_DocStatus = 0;

        this.apiservice.postData(trans,
          this.documentType,
          'AddTransaction'
        ).subscribe((response: any) => {
          this.documentid = response.ins_PurchaseOrderID;
          this.docnum = response.ins_DocNum;

          this.router.navigate([`${this.docurl}-transaction/${this.documentid}`]);

          this.swal.commonSwalCentered('Transaction Succesfully Posted', 'success');
          this.editTransaction(this.documentid);
          this.spinnerHidden = true;
        })

        break;
      case UserAction.EDIT:

        this.apiservice.postData(trans,
          this.documentType,
          'UpdateTransaction'
        ).subscribe((response: any) => {
          this.documentid = response.ins_PurchaseOrderID;
          this.docnum = response.ins_DocNum;

          this.router.navigate([`${this.docurl}-transaction/${this.documentid}`]);
          this.swal.commonSwalCentered('Transaction Succesfully Updated', 'warning');
          this.editTransaction(this.documentid);
          this.spinnerHidden = true;
        })

        break;
      default:
        break;
    }
  }

  actionClick(actionid: number) {
    switch (actionid) {
      case 9:
        this.ConfirmTransaction(1)
        break;
      case 1:
        this.ApprovedTransaction(1)
        break;
      case 2:
        this.RejectTransaction(actionid);
        break;
      case 3:
        this.CancelTransaction(actionid);
        break;
      case 5:
        this.DeliveryTransaction(actionid);
        break;
      case -9:
        this.DeleteTransaction(actionid);
        break;
      case -8:
        this.CloseTransaction(actionid);
        break;
      case -1:
        this.BackToList();
        break;
      default:
        break;
    }
  }

  performTransaction(action: string, title: string, text: string, icon: any, status: number) {
    Swal.fire({
      title: `Are You Sure You Want to ${title} this Transaction?`,
      text: `You won't be able to revert this transaction once ${text.toLowerCase()}!`,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action.toLowerCase()} it!`
    }).then((result) => {
      if (result.isConfirmed) {
        let trans = new TransactionApproval(this.documentid, null, status, null, this.approvedremarks);
        if (status === 1) {
          // Special case for CloseTransaction
          trans = new TransactionApproval(this.documentid, this.approveduserid, status, this.approvedby, this.approvedremarks);
        }

        this.apiservice.postData(trans, this.documentType, 'UpdateTransactionStatus')
          .subscribe((response: any) => {
            this.documentid = response.ins_PurchaseOrderID;
            this.docnum = response.ins_DocNum;

            this.router.navigate([`${this.docurl}-transaction/${this.documentid}`]);

            const successMessage = `${text}`;
            // this.swal.commonSwalCentered(`Transaction ${successMessage}`, status !== 1 ? 'error' : 'success');

            this.swal.commonSwalCentered(`Transaction ${successMessage}`, icon);
            this.editTransaction(this.documentid);
            this.spinnerHidden = true;
          });
      }
    });
  }

  ApprovedTransaction(status: number) {
    this.performTransaction('Approve', 'Approved', 'Approved', 'success', status);
  }

  ConfirmTransaction(status: number) {
    this.performTransaction('Confirm', 'Confirm', 'Confirmed', 'success', status);
  }

  RejectTransaction(status: number) {
    this.performTransaction('Reject', 'Reject', 'Rejected', 'error', status);
  }

  CancelTransaction(status: number) {
    this.performTransaction('Cancel', 'Cancel', 'Cancelled', 'error', status);
  }

  CloseTransaction(status: number) {
    this.performTransaction('Close', 'Close', 'Closed', 'error', status);
  }

  DeleteTransaction(status: number) {
    this.performTransaction('Delete', 'Delete', 'Deleted', 'error', status);
  }

  DeliveryTransaction(status: number) {

    if (this.cardcode === "") {
      this.swal.commonSwalCentered(
        'Invalid Supplier',
        'error'
      );
      return;
    }

    this.performTransaction('Confirm', 'Confirm', 'Delivery Confirmed', 'success', status);
  }

  BackToList() {
    this.router.navigate([this.docurl]);
  }

  PartnerEvent(val: any) {
    this.documentForm.patchValue({
      cardcode: val.ins_CardCode,
      cardname: val.ins_CardName,
    });
    this.onDataChange();
  }

  async ItemEvent(val: any) {
    let uomlist = await this.apiservice.getDataAsync('Item', 'UomList', val.ins_ItemCode);
    let getuom = uomlist.find((uom: any) => uom.ins_BaseUOM === val.ins_InventoryUom);

    let itemcode = val.ins_ItemCode;
    let itemname = val.ins_ItemName;
    let unitcost = this.ConvertToDouble(val.ins_InventoryCost, '6');
    let unitquantity = 1;
    let amount = unitcost * unitquantity;
    let linetotal = this.ConvertToDouble(amount.toString(), '2');
    let unituom = val.ins_InventoryUom;


    let inventoryuom = val.ins_InventoryUom;
    let inventorycost = this.ConvertToDouble(val.ins_InventoryCost, '6');
    let inventoryquantity = 1;

    let unitbasecost = this.ConvertToDouble(val.ins_InventoryCost, '6');
    let unitbasequantity = 1;
    let unitbaseuom = val.ins_InventoryUom;

    let orderquantity = 0;
    let receivedquantity = 0;
    let receivedinventoryquantity = 0;
    let releasedquantity = unitquantity;
    let releasedinventoryquantity = inventoryquantity;

    let newTransaction = new ItemTransactionLine(itemcode, itemname, uomlist, unituom, unitquantity, unitcost, linetotal, inventoryuom,
      inventoryquantity, inventorycost, unitbaseuom, unitbasequantity, unitbasecost, getuom.ins_ItemUomId,
      null, null, null, null, this.objecttype, orderquantity, receivedquantity, receivedinventoryquantity, releasedquantity, releasedinventoryquantity);

    this.itemTransactionLines.push(newTransaction);
    this.lastAddedIndex = this.itemTransactionLines.length - 1;

    if (!this.selectedUoms[this.lastAddedIndex]) {
      this.selectedUoms[this.lastAddedIndex] = [];
    }

    if (this.lastAddedIndex >= 0) {
      this.selectedUoms[this.lastAddedIndex] = getuom;
    }

    this.onSelectChange(this.itemTransactionLines[this.lastAddedIndex], getuom);
    this.onDataChange();
  }

  onItemRemove(index: any) {

    this.itemTransactionLines.splice(index, 1);
    this.selectedUoms.splice(index, 1);
  }

  onSelectChange(selectedItem: any, selectedUom: any) {
    selectedItem.ins_UnitUom = selectedUom.ins_BaseUOM;
    selectedItem.ins_UnitBaseUom = selectedUom.ins_InventoryUOM;
    selectedItem.ins_UnitBaseQuantity = selectedUom.ins_UnitBaseQuantity;
    selectedItem.ins_ItemUomId = selectedUom.ins_ItemUomId;

    let unitbasecost = this.ConvertToDouble(selectedItem.ins_UnitBaseCost, '6');
    let quantity = this.ConvertToDouble(selectedItem.ins_UnitQuantity, '2');
    let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity, '2');
    let inventoryquantity = basequantity * quantity;

    selectedItem.ins_InventoryQuantity = inventoryquantity;

    let unitcost = basequantity * unitbasecost;
    let linetotal = inventoryquantity * unitbasecost;

    selectedItem.ins_UnitCost = this.ConvertToDouble(unitcost.toString(), '2');
    selectedItem.ins_LineTotal = this.ConvertToDouble(linetotal.toString(), '2');

    let amount = this.itemTransactionLines.reduce((sum, item) => sum + item.ins_LineTotal, 0);
    this.doctotal = this.ConvertToDouble(amount.toString(), '2');
    this.documentForm.patchValue({
      doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
    });
  }

  // onSelectChange(selectedItem: any, selectedUom: any) {
  //   selectedItem.ins_UnitUom = selectedUom.ins_BaseUOM;
  //   selectedItem.ins_UnitBaseUom = selectedUom.ins_InventoryUOM;
  //   selectedItem.ins_UnitBaseQuantity = selectedUom.ins_UnitBaseQuantity;
  //   selectedItem.ins_ItemUomId = selectedUom.ins_ItemUomId;

  //   let unitbasecost = this.ConvertToDouble(selectedItem.ins_UnitBaseCost);
  //   let quantity = this.ConvertToDouble(selectedItem.ins_UnitQuantity);
  //   let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity);
  //   let inventoryquantity = basequantity * quantity;

  //   selectedItem.ins_InventoryQuantity = inventoryquantity;

  //   let unitcost = basequantity * unitbasecost;
  //   let linetotal = inventoryquantity * unitbasecost;

  //   selectedItem.ins_UnitCost = this.ConvertToDouble(unitcost.toString());
  //   selectedItem.ins_LineTotal = this.ConvertToDouble(linetotal.toString());

  //   let amount = this.itemTransactionLines.reduce((sum, item) => sum + item.ins_LineTotal, 0);
  //   this.doctotal = this.ConvertToDouble(amount.toString());
  //   this.documentForm.patchValue({
  //     doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
  //   });
  // }

  // onPriceChange(selectedItem: any, val: any) {
  //   const cost = val.target.value;
  //   selectedItem.ins_UnitCost = this.ConvertToDouble(cost);

  //   let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity);
  //   let quantity = this.ConvertToDouble(selectedItem.ins_UnitQuantity);
  //   let unitbasecost = cost / basequantity;
  //   selectedItem.ins_UnitBaseCost = this.ConvertToDouble(unitbasecost.toString());
  //   selectedItem.ins_InventoryCost = this.ConvertToDouble(unitbasecost.toString());
  //   let linetotal = quantity * cost;
  //   selectedItem.ins_LineTotal = this.ConvertToDouble(linetotal.toString());


  //   let amount = this.itemTransactionLines.reduce((sum, item) => sum + item.ins_LineTotal, 0);
  //   this.doctotal = this.ConvertToDouble(amount.toString());
  //   this.documentForm.patchValue({
  //     doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
  //   });
  // }

  onQuantityChange(selectedItem: any, val: any) {

    const _qty = val.target.value;
    selectedItem.ins_UnitQuantity = this.ConvertToDouble(_qty, '2');
    selectedItem.ins_ReleasedQuantity = this.ConvertToDouble(_qty, '2');

    let unitbasecost = this.ConvertToDouble(selectedItem.ins_UnitBaseCost, '6');
    let quantity = this.ConvertToDouble(selectedItem.ins_UnitQuantity, '2');
    let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity, '2');
    let inventoryquantity = basequantity * quantity;

    selectedItem.ins_InventoryQuantity = inventoryquantity;
    selectedItem.ins_ReleasedInventoryQuantity = inventoryquantity;

    let unitcost = basequantity * unitbasecost;
    let linetotal = inventoryquantity * unitbasecost;
    selectedItem.ins_UnitCost = this.ConvertToDouble(unitcost.toString(), '2');
    selectedItem.ins_LineTotal = this.ConvertToDouble(linetotal.toString(), '2');

    let amount = this.itemTransactionLines.reduce((sum, item) => sum + item.ins_LineTotal, 0);
    this.doctotal = this.ConvertToDouble(amount.toString(), '2');
    this.documentForm.patchValue({
      doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
    });
  }

  onPriceChange(selectedItem: any, val: any) {

    const cost = val.target.value;

    if (this.rolecode === 'ORREL') {

      selectedItem.ins_UnitCost = this.ConvertToDouble(cost, '2');

      let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity, '2');
      let quantity = this.ConvertToDouble(selectedItem.ins_ReleasedQuantity, '2');
      let unitbasecost = cost / basequantity;
      selectedItem.ins_UnitBaseCost = this.ConvertToDouble(unitbasecost.toString(), '6');
      selectedItem.ins_InventoryCost = this.ConvertToDouble(unitbasecost.toString(), '6');
      let linetotal = quantity * cost;
      selectedItem.ins_LineTotal = this.ConvertToDouble(linetotal.toString(), '2');


      let amount = this.itemTransactionLines.reduce((sum, item) => sum + item.ins_LineTotal, 0);
      this.doctotal = this.ConvertToDouble(amount.toString(), '2');
      this.documentForm.patchValue({
        doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
      });

    }
    else {

      selectedItem.ins_UnitCost = this.ConvertToDouble(cost, '2');

      let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity, '2');
      let quantity = this.ConvertToDouble(selectedItem.ins_UnitQuantity, '2');
      let unitbasecost = cost / basequantity;
      selectedItem.ins_UnitBaseCost = this.ConvertToDouble(unitbasecost.toString(), '6');
      selectedItem.ins_InventoryCost = this.ConvertToDouble(unitbasecost.toString(), '6');
      let linetotal = quantity * cost;
      selectedItem.ins_LineTotal = this.ConvertToDouble(linetotal.toString(), '2');


      let amount = this.itemTransactionLines.reduce((sum, item) => sum + item.ins_LineTotal, 0);
      this.doctotal = this.ConvertToDouble(amount.toString(), '2');
      this.documentForm.patchValue({
        doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
      });

    }
  }

  onReleasedQuantityChange(selectedItem: any, val: any) {

    const _qty = val.target.value;
    selectedItem.ins_ReleasedQuantity = this.ConvertToDouble(_qty, '2');

    let _oqty = selectedItem.ins_UnitQuantity;
    let _rqty = selectedItem.ins_ReleasedQuantity;
    let _unitcost = this.decimalPipe.transform(selectedItem.ins_UnitCost, "1.2-2")

    if (_oqty < _qty) {
      // selectedItem.ins_ReleasedQuantity = this.ConvertToDouble(_rqty, '2');
      this.swal.commonSwalCentered(
        'Released Quantity is Greater Than Ordered Quantity',
        'error'
      );

      selectedItem.ins_ReleasedQuantity = this.ConvertToDouble(_oqty, '2');
      selectedItem.ins_UnitCost = this.ConvertToDouble(_unitcost, '2');

    } else {
      selectedItem.ins_ReleasedQuantity = this.ConvertToDouble(_qty, '2');
      selectedItem.ins_UnitCost = this.ConvertToDouble(_unitcost, '2');
    }

    let unitbasecost = this.ConvertToDouble(selectedItem.ins_UnitBaseCost, '6');
    let quantity = this.ConvertToDouble(selectedItem.ins_ReleasedQuantity, '2');
    let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity, '2');
    let inventoryquantity = basequantity * quantity;

    selectedItem.ins_ReleasedInventoryQuantity = inventoryquantity;

    let unitcost = basequantity * unitbasecost;
    let linetotal = inventoryquantity * unitbasecost;
    selectedItem.ins_UnitCost = this.ConvertToDouble(unitcost.toString(), '2');
    selectedItem.ins_LineTotal = this.ConvertToDouble(linetotal.toString(), '2');

    let amount = this.itemTransactionLines.reduce((sum, item) => sum + item.ins_LineTotal, 0);
    this.doctotal = this.ConvertToDouble(amount.toString(), '2');
    this.documentForm.patchValue({
      doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
    });
  }

  // onQuantityChange(selectedItem: any, val: any) {

  //   let _qty = val.target.value;
  //   selectedItem.ins_UnitQuantity = this.ConvertToDouble(_qty, '2');

  //   let _oqty = selectedItem.ins_OrderQuantity;
  //   let _rqty = selectedItem.ins_UnitQuantity;
  //   let _unitcost = this.decimalPipe.transform(selectedItem.ins_UnitCost, "1.2-2")

  //   console.log("_qty", _qty);
  //   console.log("_oqty", _oqty);
  //   console.log("_rqty", _rqty);
  //   console.log("_unitcost", _unitcost);
  //   console.log("val.target.id", val.target.id);


  //   if (_oqty < _qty) {
  //     selectedItem.ins_UnitQuantity = this.ConvertToDouble(_rqty, '2');
  //     this.swal.commonSwalCentered(
  //       'Recieve Quantity is Greater Than PO Quantity',
  //       'error'
  //     );
  //     selectedItem.ins_UnitQuantity = this.ConvertToDouble(_oqty, '2');
  //     selectedItem.ins_UnitCost = this.ConvertToDouble(_unitcost, '2');
  //     let _rqty1 = selectedItem.ins_UnitQuantity;
  //     let _unitcost1 = selectedItem.ins_UnitCost;
  //     console.log("_rqty1", _rqty1);
  //     console.log("_unitcost1", _unitcost1);
  //   } else {
  //     selectedItem.ins_UnitQuantity = this.ConvertToDouble(_qty, '2');
  //     selectedItem.ins_UnitCost = this.ConvertToDouble(_unitcost, '2');
  //   }


  //   let unitbasecost = this.ConvertToDouble(selectedItem.ins_UnitBaseCost, '6');
  //   let quantity = this.ConvertToDouble(selectedItem.ins_UnitQuantity, '2');
  //   let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity, '2');
  //   let inventoryquantity = basequantity * quantity;

  //   selectedItem.ins_InventoryQuantity = inventoryquantity;

  //   let unitcost = basequantity * unitbasecost;
  //   let linetotal = inventoryquantity * unitbasecost;
  //   selectedItem.ins_UnitCost = this.ConvertToDouble(unitcost.toString(), '2');
  //   selectedItem.ins_LineTotal = this.ConvertToDouble(linetotal.toString(), '2');

  //   let amount = this.itemTransactionLines.reduce((sum, item) => sum + item.ins_LineTotal, 0);
  //   this.doctotal = this.ConvertToDouble(amount.toString(), '2');
  //   this.documentForm.patchValue({
  //     doctotal: this.decimalPipe.transform(this.doctotal, "1.2-2"),
  //   });



  // }

  buildTransaction() {

    let transactionline: TransactionLine[] = [];

    let index = 0;
    for (var v of this.itemTransactionLines) {
      let newTransactionLine = new TransactionLine(
        v.ins_ItemCode, v.ins_ItemName,
        v.ins_UnitUom, v.ins_UnitQuantity, v.ins_UnitCost, v.ins_LineTotal,
        v.ins_InventoryUom, v.ins_InventoryQuantity, v.ins_InventoryCost,
        v.ins_UnitBaseUom, v.ins_UnitBaseQuantity, v.ins_UnitBaseCost, v.ins_ItemUomId, index,
        v.ins_BaseDocNum, v.ins_BaseDocEntry, v.ins_BaseDocType, v.ins_BaseLineNum, v.ins_ObjectType,
        v.ins_OrderQuantity, v.ins_ReceivedQuantity, v.ins_ReceivedInventoryQuantity,
        v.ins_ReleasedQuantity, v.ins_ReleasedInventoryQuantity
      );

      transactionline.push(newTransactionLine);
      index++;
    }

    let newTransaction = new Transaction(this.documentid,
      this.docnum, this.docstatus, this.cardcode, this.cardname, this.postingdate, this.docdate, this.duedate,
      this.remarks, this.approverlist, this.userid, this.ConvertToDouble(this.doctotal.toString(), '2'), this.modifiedby,
      this.createdby, this.branchcode, this.branchname, this.basedocnum,
      this.basedocentry, this.basedoctype, this.baselinenum, this.objecttype, transactionline
    );

    return newTransaction;
  }

  onDataChange() {
    this.printerHidden = true;
    this.actionHidden = true;
    this.saveHidden = false;
  }

  ConvertToDouble(val: string, dec: string): number {
    let input = "";
    console.log("ConvertToDouble", val);
    if (val && typeof val === 'string') {
      if (val.includes(',')) {
        input = this.decimalPipe.transform(val.replace(/,/g, ''), `1.${dec}-${dec}`);
      } else {
        input = this.decimalPipe.transform(val, `1.${dec}-${dec}`);
      }
    }
    else {
      input = this.decimalPipe.transform(val, `1.${dec}-${dec}`);
    }

    const convert = input.replace(/,/g, '');
    const numericValue = Number(convert);

    if (isNaN(numericValue)) {
      return 0;
    }

    console.log("numericValue", numericValue);
    return numericValue;
  }

  OnLoadForm(status: number) {
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
        this.formCancel();
        break;
      case 5: // Closed
        this.formDeleveryConfirm();
        break;
      case 6: // Closed
        this.formLocked();
        break;
      case -9: // Closed
        this.formDelete();
        break;
      case -8: // Closed
        this.formClosed();
        break;
      default:
        this.formDefault()
        break;
    }
  }


  formDefault() {
    this.badge = 'secondary';
    this.badgename = 'New Transaction';

    this.LoadSettingDefault();

    this.actionHidden = false;
    this.removeItemHidden = false;
    this.uomItemHidden = false;
    this.quantityItemHidden = false;
    this.releasedItemHidden = false;
    this.priceItemHidden = false;
    this.addItemHidden = false;

    this.duedateReadOnly = false;
    this.docdateReadOnly = false;
    this.remarksReadOnly = false;

    this.cardcodeDisable = false;


    if (this.rolecode === 'BRUSR') {
      this.priceItemHidden = true;
      this.duedateReadOnly = true;
      this.docdateReadOnly = true;
    }


    if (this.rolecode === 'ORREL' || this.rolecode === 'ADMFI') {

      this.releasedItemHidden = true;
      this.priceItemHidden = true;
      this.docdateReadOnly = true;
      // this.duedateReadOnly = true;
    }

    if (this.rolecode === 'ADMIN') {

      this.releasedItemHidden = true;
      this.priceItemHidden = true;
      // this.docdateReadOnly = true;
      // this.duedateReadOnly = true;
    }


  }

  formPending() {
    this.badge = 'warning';
    this.badgename = 'PENDING';

    this.LoadSettingDefault();

    this.printerHidden = false;
    this.actionHidden = false;
    this.confirmHidden = false;
    this.dividerHidden = false;
    this.cancelHidden = false;
    this.closeHidden = false;

    this.removeItemHidden = false;
    this.uomItemHidden = false;
    this.quantityItemHidden = false;
    this.releasedItemHidden = false;
    this.priceItemHidden = false;
    this.addItemHidden = false;

    this.duedateReadOnly = false;
    this.docdateReadOnly = false;
    this.remarksReadOnly = false;

    this.cardcodeDisable = false;

    let isApprover = this.approverlist.toLowerCase().indexOf(this.userInfo.emailAddress);

    if (this.userInfo.securityLevel !== "1") {
      if (this.transUserId !== this.userInfo.userId) {
        this.LoadSettingDefault();
        if (isApprover === 0) {
          // Is Transaction Approver

          this.approvedHidden = false;
          this.rejectHidden = false;
          this.dividerHidden = false;
        }
      } else {
        if (this.approverlist !== "") {
          this.confirmHidden = true;
          this.dividerHidden = true;
        }
        else {
          this.confirmHidden = false;
        }
      }
    }

    if (this.userInfo.securityLevel === "1") {
      this.deleteHidden = false;
    }

    if (this.rolecode === 'BRUSR') {
      this.priceItemHidden = true;
      this.docdateReadOnly = true;
      this.duedateReadOnly = true;
    }

    if (this.rolecode === 'ORREL' || this.rolecode === 'ADMIN' || this.rolecode === 'ADMFI') {
      this.releasedItemHidden = true;
      this.priceItemHidden = true;
      this.docdateReadOnly = true;
    }

  }

  formApproved() {
    this.badge = 'success';
    this.badgename = 'APPROVED';

    if (this.received === 1) {
      this.badge = 'secondary';
      this.badgename = 'RECEIVED';
    }

    this.LoadSettingDefault();

    if (this.userInfo.securityLevel !== "1") {
      if (this.transUserId !== this.userInfo.userId) {

        if (this.rolecode === 'BRUSR') {
          this.cancelHidden = false;
        }

        if (this.rolecode === 'ORREL' || this.rolecode === 'ADMIN' || this.rolecode === 'ADMFI') {

          this.badgename = 'ORDER';

          this.duedateReadOnly = false;

          this.deliveryHidden = false;
          this.dividerHidden = false;

          this.releasedItemHidden = false;
          this.priceItemHidden = false;

          this.rejectHidden = false;
        }
      }

    }
  }

  formRejected() {
    this.badge = 'danger';
    this.badgename = 'REJECTED';

    this.LoadSettingDefault();
  }

  formClosed() {
    this.badge = 'danger';
    this.badgename = 'CLOSE';

    this.LoadSettingDefault();
  }

  formCancel() {
    this.badge = 'danger';
    this.badgename = 'CANCELLED';

    this.LoadSettingDefault();
  }

  formDelete() {
    this.badge = 'danger';
    this.badgename = 'DELETED';

    this.LoadSettingDefault();
  }

  formDeleveryConfirm() {
    this.badge = 'secondary';
    this.badgename = 'FOR DELIVERY';

    if (this.received === 1) {
      this.badge = 'primary';
      this.badgename = 'RECEIVED';
    }

    this.LoadSettingDefault();
  }

  formLocked() {
    this.badge = 'danger';
    this.badgename = 'LOCKED';

    this.LoadSettingDefault();
  }

  openForm() {
    
    console.log(this.docstatus);
    if (this.docstatus === 5) {
          // const url = `https://localhost:44382/Reporting/PaymentSlip?crdocnum="${ this.docnum }"`;
      window.open(this.apiservice.view("DeliverySlip",`crdocnum="${ this.docnum }"`), '_blank');
    }
    else{
      window.open(this.apiservice.view("PurchaseOrderSlip",`crdocnum="${ this.docnum }"`), '_blank');
    }

  }
}

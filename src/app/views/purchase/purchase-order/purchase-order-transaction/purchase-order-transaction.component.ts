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
import { SwalService } from '../../../../../_services/swal-service';
import { GlobalService } from 'src/_shared/api/service';
import { GlobalApi } from 'src/_shared/api/api';

import { ItemService } from '../../../../../_shared/items/item.service';
import { SupplierService } from '../../../../../_shared/supplier/supplier.service';
import { PurchaseOrderService } from '../../../../../_shared/purchase-order/purcahse-order.service';

import { Item } from '../../../../../_model/item/item';
import { Supplier } from '../../../../../_model/supplier/supplier';

import { Users } from '../../../../../_services/user.api';
import { PurchaseOrderApi } from '../../../../../_shared/purchase-order/purchase-order.api';
import { PurchaseOrder } from 'src/_model/purchase-order/purchase-order';
import { PurchaseOrderDetails } from 'src/_model/purchase-order/purchase-order-details';

class POItem {
  itemcode: string = '';
  itemname: string = '';
}

@Component({
  selector: 'app-purchase-order-transaction',
  templateUrl: './purchase-order-transaction.component.html',
  styleUrls: ['./purchase-order-transaction.component.scss'],
})
export class PurchaseOrderTransactionComponent implements OnInit {
  @Output() purchaseOrderEvent = new EventEmitter();
  @Input() purchaseData: PurchaseOrder[] = [];

  // Header Data
  isHiddenPrinterBtn = false;
  isHiddenSave = false;
  isHiddenAction = false;
  isHiddenActionRow = false;

  isHiddenAddItem = false;
  isHiddenApproveBtn = false;
  isHiddenRejectBtn = false;
  isHiddenDiv = false;
  isHiddenDeleteBtn = false;

  isReadOnlyDeliveryDate = false;

  // Row Data
  isHiddenRowQuantity = false;

  state = 'add';
  docId: number;

  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  deliverydate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'yyyy-MM-dd'
  );
  headerForm!: FormGroup;

  purchaseorderdetails: PurchaseOrderDetails[] = [];

  suppliers: any[] = [];

  supplier?: Supplier;

  badge: string = 'warning';
  badgename: string = 'Pending';

  constructor(
    public user: Users,
    private globalservice: GlobalService,
    public swal: SwalService,
    private fb: FormBuilder,
    private purchaseorderitem: PurchaseOrderDetails,
    private purchaseorder: PurchaseOrder
  ) {
    this.headerForm = this.fb.group({
      purchaseorderid: '',
      suppliercode: '',
      suppliername: '',
      branchcode: '',
      branchname: '',
      docnum: '',
      docdate: '',
      deldate: '',
      owner: '',
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.purchaseData.length <= 0) {
      await this.isAddEvent();
    } else {
      await this.isEdit();
    }
  }

  async isAddEvent() {
    this.formDefault();

    const _docnum = await this.globalservice.getMaxId('PurchaseOrders');
    this.headerForm.patchValue({
      purchaseorderid: 0,
      docnum: _docnum,
      docdate: this.postingdate,
      deldate: this.deliverydate,
    });
  }

  async isEdit() {
    for (var a of this.purchaseData as any) {
      this.docId = a.ins_PurchaseOrderID;

      this.onLoadForm(a.ins_DocStatus);

      this.headerForm.setValue({
        purchaseorderid: a.ins_PurchaseOrderID,
        suppliercode: a.ins_SupplierCode,
        suppliername: a.ins_SupplierName,
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        docnum: a.ins_DocNum,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),
        deldate: this.datepipe.transform(a.ins_DeliveryDate, 'yyyy-MM-dd'),
        owner: a.ins_CreatedBy,
      });

      this.purchaseorderdetails.length = 0;
      for (var list of a.ins_PurchaseOrderDetails) {
        this.purchaseorderdetails.push(list);
      }
    }
  }

  PassEvent() {
    this.purchaseOrderEvent.emit();
  }

  eventAddRow(data: any) {
    const userInfo = this.user.getCurrentUser();
    this.purchaseorderitem = new PurchaseOrderDetails();

    this.purchaseorderitem.ins_ItemCode = data.ins_ItemCode;
    this.purchaseorderitem.ins_ItemDescription = data.ins_ItemName;
    this.purchaseorderitem.ins_PurchaseUom = data.ins_PurchaseUom;
    this.purchaseorderitem.ins_VatGroup = data.ins_VatGroup;
    this.purchaseorderitem.ins_PurchasePackQuantity = data.ins_PurchasePackQuantity;
    this.purchaseorderitem.ins_PurchasePackageUom = data.ins_PurchasePackageUom;
    this.purchaseorderitem.ins_BranchCode = userInfo[0].ins_BranchCode;
    this.purchaseorderitem.ins_BranchName = userInfo[0].ins_BranchName;
    this.purchaseorderitem.ins_CreatedBy = userInfo[0].ins_FullName;
    this.purchaseorderitem.ins_InventoryUom = data.ins_InventoryUom;
    this.purchaseorderitem.ins_BalanceQuantity = 0;
    this.purchaseorderitem.ins_Quantity = 0;
    this.purchaseorderitem.ins_UnitCost = data.ins_PurchasePrice;

    this.purchaseorderdetails.push(this.purchaseorderitem);
  }

  supplierSelected(data: Supplier) {
    this.suppliers.length = 0;
    const userInfo = this.user.getCurrentUser();
    this.supplier = data;

    this.headerForm.patchValue({
      suppliercode: this.supplier.ins_SupplierCode,
      suppliername: this.supplier.ins_SupplierName,
      branchcode: userInfo[0].ins_BranchCode,
      branchname: userInfo[0].ins_BranchName,
      owner: userInfo[0].ins_FullName,
    });
  }

  numericOnly(event: any): boolean {
    let patt = /^[0-9]+(\.[0-9]{1,2})?$/;
    let result = patt.test(event.key);
    return result;
  }

  async onSubmit() {
    this.purchaseorder.ins_Badge = '';
    this.purchaseorder.ins_BadgeName = '';

    this.purchaseorder.ins_PurchaseOrderID =
      this.headerForm.value.purchaseorderid;
    this.purchaseorder.ins_SupplierCode = this.headerForm.value.suppliercode;
    this.purchaseorder.ins_SupplierName = this.headerForm.value.suppliername;
    this.purchaseorder.ins_BranchCode = this.headerForm.value.branchcode;
    this.purchaseorder.ins_BranchName = this.headerForm.value.branchname;
    this.purchaseorder.ins_DocNum = this.headerForm.value.docnum;
    this.purchaseorder.ins_PostingDate = this.headerForm.value.docdate;
    this.purchaseorder.ins_DeliveryDate = this.headerForm.value.deldate;
    this.purchaseorder.ins_CreatedBy = this.headerForm.value.owner;

    this.purchaseorder.ins_PurchaseOrderDetails = this.purchaseorderdetails;

    if (this.state == 'add') {
      // this.purchaseorderapi.post_PurchaseOrder(this.purchaseorder, 'PostAsync');
      let output = await this.globalservice.postData(
        'Purchaseorders',
        'PostAsync',
        this.purchaseorder
      );
      console.log('output1', output);
      this.docId = output.DocId;
    } else {
      await this.globalservice.putData(
        'Purchaseorders',
        '',
        this.purchaseorder
      );
    }

    this.formPending();
  }

  deleteItem(i: any) {
    this.purchaseorderdetails.splice(i, 1);
  }

  onchange(event: any) {
    const _qty = event.target.value;
    const _packageqty =
      this.purchaseorderdetails[event.target.id].ins_PurchasePackQuantity;
    const _inventoryqty = _packageqty * _qty;

    this.purchaseorderdetails[event.target.id].ins_Quantity =
      event.target.value;
    this.purchaseorderdetails[event.target.id].ins_InventoryQuantity =
      _inventoryqty;
    this.purchaseorderdetails[event.target.id].ins_BalanceQuantity =
      event.target.value;
  }

  async onApprove(id: number) {
    let data = (await this.globalservice.docApproved(
      'PurchaseOrders',
      id
    )) as any;

    this.formApproved();
  }

  async onReject(id: number) {
    let data = (await this.globalservice.docRejected(
      'PurchaseOrders',
      id
    )) as any;

    this.formRejected();
  }

  async onClose(id: number) {
    let data = (await this.globalservice.docClosed(
      'PurchaseOrders',
      id
    )) as any;
  }

  onChangeData() {
    this.isHiddenPrinterBtn = true;

    this.isHiddenSave = false;
    this.isHiddenApproveBtn = true;
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
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenRowQuantity = false;
    this.isReadOnlyDeliveryDate = false;

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;
    this.isHiddenApproveBtn = false;
    this.isHiddenRejectBtn = false;
    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;

    this.isHiddenRowQuantity = false;
    this.isReadOnlyDeliveryDate = false;

    this.badge = 'warning';
    this.badgename = 'PENDING';
  }

  formApproved() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;
    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;

    this.isHiddenRejectBtn = false;
    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;

    this.isHiddenRowQuantity = true;
    this.isReadOnlyDeliveryDate = true;

    this.badge = 'success';
    this.badgename = 'APPROVED';
  }

  formRejected() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;
    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;

    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenRowQuantity = true;
    this.isReadOnlyDeliveryDate = true;

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
}

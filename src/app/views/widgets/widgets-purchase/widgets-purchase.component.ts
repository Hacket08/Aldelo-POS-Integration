import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../_services/user.api';
import { DailyPurchase } from '../../../../_model/daily-purchase/daily-purchase';

import { NgZone } from '@angular/core';
import { interval } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-widgets-purchase',
  templateUrl: './widgets-purchase.component.html',
  styleUrls: ['./widgets-purchase.component.scss']
})
export class WidgetsPurchaseComponent implements OnInit {
  dataList: DailyPurchase[] = [];
  userInfo: any;
  purchase: number;
  openpurchase: number;
  headerForm!: FormGroup;

  constructor(private globalservice: GlobalService, private user: Users, private ngZone: NgZone, 
    private fb: FormBuilder) {
      this.headerForm = this.fb.group({
        totalpurchase: 0,
      });
    }

  async ngOnInit(): Promise<void> {
    await this.getPurchaseData();
    
    interval(10000) // 10 seconds = 10,000 milliseconds
    .subscribe(async () => {
      this.ngZone.run(async () => {
        await this.getPurchaseData();
      });
    });
  }

  async getPurchaseData(): Promise<void>  {
    let data: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();
    this.purchase = 0;
    this.openpurchase = 0;

    this.dataList = (await this.globalservice.getAuthList('Purchase/GetDailyPurchasePerDay')) as any;
    // this.dailysales = data.ins_TotalAmount;
    console.log("GetDailySalesPerDay", this.dataList);
    for (var a of this.dataList as any) {
      this.purchase = a.ins_TotalCount
      // this.headerForm.patchValue({
      //   totalpurchase: a.ins_TotalCount
      // });
    }
    console.log("GetDailySalesPerDay", this.purchase);
  }

}

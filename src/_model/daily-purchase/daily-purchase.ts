import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class DailyPurchase {
    ins_Type: string = '';
    ins_Year: number = 0;
    ins_Day: number = 0;
    ins_MonthId: number = 0;
    ins_Month: string = '';
    ins_Date: number = 0;
    ins_TotalAmount: number = 0;
    ins_TotalCount: number = 0;
}

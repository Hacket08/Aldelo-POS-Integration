import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ItemCategories{
    ins_CategoryCode: string = '';
    ins_CategoryName: string = ''; 
    ins_InActive: number = 0;

    ins_Items: any[];
}
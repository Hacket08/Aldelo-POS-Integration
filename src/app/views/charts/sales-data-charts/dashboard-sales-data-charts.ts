import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils/src';
import { DatePipe, DecimalPipe } from '@angular/common';
// import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
// import { SalesData } from 'src/app_shared/models/sales-data';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

// @Injectable({
//     providedIn: 'any'
//   })

export class DashboardSalesDataCharts {
    // documentType: string = 'OrderHeaders';
    // salesdata : SalesData[] = [];
    
    // datepipe: DatePipe = new DatePipe('en-US');
    // date: Date = new Date("2024-02-02");
    // currentdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    // previousdate = this.datepipe.transform(
    //     this.date.setDate(this.date.getDate() - 1),
    //     'yyyy-MM-dd'
    // );


    // constructor(private apiservice: GlobalApiService) {
    //     this.initMainChart();
    //   }
    
    //   public mainChart: IChartProps = {};
    
    //   public random(min: number, max: number) {
    //     return Math.floor(Math.random() * (max - min + 1) + min);
    //   }
    
    //   async initMainChart(period: string = 'Month') {
    //     const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    //     const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    //     const brandInfoBg = hexToRgba(getStyle('--cui-info'), 10) ?? '#20a8d8';
    //     const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    //     console.log(this.currentdate);
    //     let response: any;
    //     response = await this.apiservice.getDataAsync(this.documentType, 'GetAccumulatedSalesData', `${this.currentdate}`);
    //     console.log(response);


    //     for (var v of response){
    //         let newdata = new SalesData(v.ins_BranchCode, v.ins_BranchName, v.ins_Year, v.ins_Quarter, v.ins_Day, v.ins_MonthId, v.ins_WeekNumber, v.ins_Hour, v.ins_Month, v.ins_Date, v.ins_TotalAmount, v.ins_NetAmount,v.ins_TotalCount)
    //         this.salesdata.push(newdata);
    //     }

    //     let uniqueInsHours = Array.from(new Set(this.salesdata.map(salesData => salesData.ins_Hour)));
    //     console.log('Ins_Hour values:', uniqueInsHours);
    //     console.log('Ins_Hour count:', uniqueInsHours.length);


    //     let uniqueInsBranchCode = Array.from(new Set(this.salesdata.map(salesData => salesData.ins_BranchCode)));
    //     console.log('ins_BranchCode values:', uniqueInsBranchCode);
    //     console.log('ins_BranchCode count:', uniqueInsBranchCode.length);

    //     uniqueInsBranchCode.forEach(branchCode => {
    //         console.log('Branch Code:', branchCode);
    //         this.mainChart[branchCode] = [];
    //     });



    //     this.mainChart['elements'] = uniqueInsHours.length;

    //     // this.mainChart['Data1'] = [];
    //     // this.mainChart['Data2'] = [];
    //     // this.mainChart['Data3'] = [];
    //     // this.mainChart['Data4'] = [];
    //     // this.mainChart['Data5'] = [];
    //     // this.mainChart['Data6'] = [];
    
    //     // // generate random values for mainChart
    //     // for (let i = 0; i <= this.mainChart['elements']; i++) {
    //     //   this.mainChart['Data1'].push(this.random(50, 240));
    //     //   this.mainChart['Data2'].push(this.random(20, 160));
    //     //   this.mainChart['Data3'].push(65);
    //     // }
    
    //     let labels: string[] = [];
    //     uniqueInsHours.forEach(hour => {
    //         labels.push(hour as any)

    //         uniqueInsBranchCode.forEach(branchCode => {

    //             let totalAmount  = this.salesdata
    //             .filter(salesData => salesData.ins_BranchCode === branchCode && salesData.ins_Hour === hour)
    //             .reduce((sum, salesData) => sum + salesData.ins_TotalAmount, 0);

                
    //             // console.log(branchCode, hour, totalAmount);
    //             this.mainChart[branchCode].push(totalAmount);
    //         });
    //     });
    //     console.log("labels", labels);

    //     uniqueInsBranchCode.forEach(branchCode => {
    //         console.log('Branch Code:', branchCode);
    //         console.log("mainChart", this.mainChart[branchCode]);
    //     });


    //     // labels = [
    //     //     '09',
    //     //     '10',
    //     //     '11',
    //     //     '12',
    //     //     '13',
    //     //     '14',
    //     //     '15',
    //     //     '16',
    //     //     '17',
    //     //     '18',
    //     //     '19',
    //     //     '20',
    //     //     '21',
    //     //     '22',
    //     //     '23',
    //     //     '24'
    //     // ];
    
    //     const colors = [
    //       {
    //         // brandInfo
    //         backgroundColor: brandInfoBg,
    //         borderColor: brandInfo,
    //         pointHoverBackgroundColor: brandInfo,
    //         borderWidth: 2,
    //         fill: true
    //       },
    //       {
    //         // brandSuccess
    //         backgroundColor: 'transparent',
    //         borderColor: brandSuccess || '#4dbd74',
    //         pointHoverBackgroundColor: '#fff'
    //       },
    //       {
    //         // brandDanger
    //         backgroundColor: 'transparent',
    //         borderColor: brandDanger || '#f86c6b',
    //         pointHoverBackgroundColor: brandDanger,
    //         borderWidth: 1,
    //         borderDash: [8, 5]
    //       }
    //     ];
    
    //     // const datasets = [
    //     //     {
    //     //       data: this.mainChart['Data1'],
    //     //       label: 'Current',
    //     //       ...colors[0]
    //     //     },
    //     //   ];

    //     // uniqueInsBranchCode.forEach(branchCode => {
    //     //     console.log('Branch Code:', branchCode);
    //     //     console.log("labels", this.mainChart[branchCode]);
    //     // });
        
    //     const datasets = uniqueInsBranchCode.map((branchCode, index) => {
    //         const dataset = {
    //             data: this.mainChart[branchCode],
    //             label: `Branch ${branchCode}`,
    //             ...colors[0], // Assuming colors is an array of color configurations
    //         };
    //         return dataset;
    //     });
    //     console.log("datasets", datasets);
        
    
    //     // const datasets = [
    //     //   {
    //     //     data: this.mainChart['Data1'],
    //     //     label: 'Current',
    //     //     ...colors[0]
    //     //   },
    //     //   {
    //     //     data: this.mainChart['Data2'],
    //     //     label: 'Previous',
    //     //     ...colors[1]
    //     //   },
    //     //   {
    //     //     data: this.mainChart['Data3'],
    //     //     label: 'BEP',
    //     //     ...colors[2]
    //     //   }
    //     // ];

    //     const plugins = {
    //       legend: {
    //         display: false
    //       },
    //       tooltip: {
    //         callbacks: {
    //           labelColor: function(context: any) {
    //             return {
    //               backgroundColor: context.dataset.borderColor
    //             };
    //           }
    //         }
    //       }
    //     };
    
    //     const options = {
    //       maintainAspectRatio: false,
    //       plugins,
    //       scales: {
    //         x: {
    //           grid: {
    //             drawOnChartArea: false
    //           }
    //         },
    //         y: {
    //           beginAtZero: true,
    //           max: 250,
    //           ticks: {
    //             maxTicksLimit: 5,
    //             stepSize: Math.ceil(100000 / 5)
    //           }
    //         }
    //       },
    //       elements: {
    //         line: {
    //           tension: 0.4
    //         },
    //         point: {
    //           radius: 0,
    //           hitRadius: 10,
    //           hoverRadius: 4,
    //           hoverBorderWidth: 3
    //         }
    //       }
    //     };
    

    //     this.mainChart.type = 'line';
    //     this.mainChart.options = options;
    //     this.mainChart.data = {
    //       datasets,
    //       labels
    //     };

    //     console.log("this.mainChart.data", this.mainChart.data);
    //   }
}

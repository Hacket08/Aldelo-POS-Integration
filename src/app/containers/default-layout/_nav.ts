import { INavData } from '@coreui/angular';

let showDashboardValue: boolean = false;

export const navItems: INavData[] = [
  {
    title: true,
    name: ''
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Data Monitoring'
  },
  {
    name: 'Sales',
    url: '/sales',
    iconComponent: { name: 'cil-chart-line' },
    children: [
      {
        name: 'Sales Monitoring',
        url: '/sales/sales-monitoring'
      },
      {
        name: 'Branch Sales Monitoring',
        url: '/sales/branch-sales-monitoring'
      },
      {
        name: 'Sales Report',
        url: '/sales/sales-report'
      },
    ]
  },
  {
    name: 'Purchase',
    url: '/purchase',
    iconComponent: { name: 'cil-truck' },
    children: [
      {
        name: 'Purchase Order Monitoring',
        url: '/purchase/purchase-order-monitoring',
        // attributes: { disabled: true },
      },
      {
        name: 'Purchase Order',
        url: '/purchase/purchase-order'
      },
      {
        name: 'Goods Receipt PO',
        url: '/purchase/goods-receipt'
      },
      {
        name: 'Invoice',
        url: '/purchase/invoice'
      },
      {
        name: 'Report',
        url: '/purchase/purchase-report'
      },

    ]
  },
  {
    name: 'Inventory',
    url: '/inventory',
    iconComponent: { name: 'cil-clipboard' },
    children: [
      {
        name: 'Inventory Monitoring',
        url: '/inventory/inventory-monitoring'
      },
      {
        name: 'Weekly Order Form',
        url: '/inventory/weekly-order'
      },
      {
        name: 'Inventory Movement',
        url: '/inventory/inventory-movement'
      },
      {
        name: 'Inventory Counting',
        url: '/inventory/inventory-counting'
      },
      {
        name: 'Inventory Level Report',
        url: '/inventory/inventory-level-report'
      },
      {
        name: 'Report',
        url: '/inventory/inventory-report'
      },

    ]
  },

  {
    name: 'Production',
    iconComponent: { name: 'cil-description' },
    children: [
      {
        name: 'Production Order',
        url: '/404',
      },
      {
        name: 'Production Report',
        url: '/404',
      },
      {
        name: 'Raw Materials Used Report',
        url: '/404',
      }
    ]
  },

  // {
  //   name: 'Other Transaction',
  //   url: '/buttons',
  //   iconComponent: { name: 'cil-money' },
  //   children: [
  //     {
  //       name: 'Expenses',
  //       url: '/others/expenses'
  //     },
  //   ]
  // },
  {
    name: 'Master Data',
    url: '/master-data',
    iconComponent: { name: 'cil-description' },
    children: [
      {
        name: 'Items',
        url: '/master-data/items'
      },
      {
        name: 'Item Recipe',
        url: '/master-data/item-recipe',
      },
      {
        name: 'Unit Of Measurement',
        url: '/404',
      },
      {
        name: 'Branch',
        url: '/master-data/branch'
      },
      {
        name: 'Supplier',
        url: '/master-data/supplier'
      },
      {
        name: 'Customer',
        url: '/404',
      },

    ]
  },
  {
    title: true,
    name: 'System Setup'
  },
  {
    name: 'Administration',
    url: '/administration',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Users',
        url: '/administration/users',
      },
    ],

  },
  {
    name: 'Configuration',
    // url: '/settings/configuration',
    url: '/404',
    iconComponent: { name: 'cil-settings' }
  },

];



export const navBranchItems: INavData[] = [
  {
    title: true,
    name: ''
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Data Monitoring'
  },
  {
    name: 'Purchase',
    url: '/purchase',
    iconComponent: { name: 'cil-truck' },
    children: [
      {
        name: 'Purchase Order',
        url: '/purchase/purchase-order'
      },
      {
        name: 'Goods Receipt PO',
        url: '/purchase/goods-receipt'
      },
    ]
  },
  {
    name: 'Inventory',
    url: '/inventory',
    iconComponent: { name: 'cil-clipboard' },
    children: [
      {
        name: 'Inventory Counting',
        url: '/inventory/inventory-counting'
      }
    ]
  },
];


export const navApproverItems: INavData[] = [
  {
    title: true,
    name: ''
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Data Monitoring'
  },
  {
    name: 'Purchase',
    url: '/purchase',
    iconComponent: { name: 'cil-truck' },
    children: [
      {
        name: 'Purchase Order',
        url: '/purchase/purchase-order'
      }
    ]
  },
  {
    name: 'Inventory',
    url: '/inventory',
    iconComponent: { name: 'cil-clipboard' },
    children: [
      {
        name: 'Inventory Counting',
        url: '/inventory/inventory-counting'
      }
    ]
  },
];



export const navHeadOfficeItems: INavData[] = [
  {
    title: true,
    name: ''
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Data Monitoring'
  },
  {
    name: 'Sales',
    url: '/sales',
    iconComponent: { name: 'cil-chart-line' },
    children: [
      {
        name: 'Sales Monitoring',
        url: '/sales/sales-monitoring'
      },
    ]
  },
  {
    name: 'Purchase',
    url: '/purchase',
    iconComponent: { name: 'cil-truck' },
    children: [
      {
        name: 'Purchase Order',
        url: '/purchase/purchase-order'
      },
      {
        name: 'Goods Receipt PO',
        url: '/purchase/goods-receipt'
      },
    ]
  },
  {
    name: 'Inventory',
    url: '/inventory',
    iconComponent: { name: 'cil-clipboard' },
    children: [
      {
        name: 'Inventory Counting',
        url: '/inventory/inventory-counting'
      },
    ]
  },
  {
    name: 'Master Data',
    url: '/master-data',
    iconComponent: { name: 'cil-description' },
    children: [
      {
        name: 'Branch',
        url: '/master-data/branch'
      },
      {
        name: 'Supplier',
        url: '/master-data/supplier'
      },
    ]
  }
];



export function updateShowDashboard(value: boolean): void {
  showDashboardValue = value;

  // console.log(navItems);
}
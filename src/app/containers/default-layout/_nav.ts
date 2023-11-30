import { INavData } from '@coreui/angular';

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
        name: 'Report',
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
        url: '/purchase/purchase-order-monitoring'
      },
      {
        name: 'Purchase Order',
        url: '/purchase/purchase-order'
      },
      {
        name: 'Goods Receipt',
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
        name: 'Inventory Count',
        url: '/inventory/inventory-count'
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
        url: '/404',
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

  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'someAnchor' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  // {
  //   name: 'Components',
  //   title: true
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Accordion',
  //       url: '/base/accordion'
  //     },
  //     {
  //       name: 'Breadcrumbs',
  //       url: '/base/breadcrumbs'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/base/cards'
  //     },
  //     {
  //       name: 'Carousel',
  //       url: '/base/carousel'
  //     },
  //     {
  //       name: 'Collapse',
  //       url: '/base/collapse'
  //     },
  //     {
  //       name: 'List Group',
  //       url: '/base/list-group'
  //     },
  //     {
  //       name: 'Navs & Tabs',
  //       url: '/base/navs'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/pagination'
  //     },
  //     {
  //       name: 'Placeholder',
  //       url: '/base/placeholder'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress'
  //     },
  //     {
  //       name: 'Spinners',
  //       url: '/base/spinners'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   iconComponent: { name: 'cil-cursor' },
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons'
  //     },
  //     {
  //       name: 'Button groups',
  //       url: '/buttons/button-groups'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns'
  //     },
  //   ]
  // },
  // {
  //   name: 'Forms',
  //   url: '/forms',
  //   iconComponent: { name: 'cil-notes' },
  //   children: [
  //     {
  //       name: 'Form Control',
  //       url: '/forms/form-control'
  //     },
  //     {
  //       name: 'Select',
  //       url: '/forms/select'
  //     },
  //     {
  //       name: 'Checks & Radios',
  //       url: '/forms/checks-radios'
  //     },
  //     {
  //       name: 'Range',
  //       url: '/forms/range'
  //     },
  //     {
  //       name: 'Input Group',
  //       url: '/forms/input-group'
  //     },
  //     {
  //       name: 'Floating Labels',
  //       url: '/forms/floating-labels'
  //     },
  //     {
  //       name: 'Layout',
  //       url: '/forms/layout'
  //     },
  //     {
  //       name: 'Validation',
  //       url: '/forms/validation'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
  // },
];

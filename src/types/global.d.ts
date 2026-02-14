// src/types/global.d.ts

import 'datatables.net';

declare global {
  namespace DataTables {
    // Api type from datatables.net types
    type Api = import('datatables.net').Api;
  }
}

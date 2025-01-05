export interface TodaysPrice {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort2;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Content {
  id: any;
  businessDate: string;
  securityId: number;
  symbol: string;
  securityName: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: any;
  totalTradedQuantity: number;
  totalTradedValue: number;
  previousDayClosePrice: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  lastUpdatedTime: string;
  lastUpdatedPrice: number;
  totalTrades: number;
  averageTradedPrice: number;
  marketCapitalization: any;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Sort2 {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

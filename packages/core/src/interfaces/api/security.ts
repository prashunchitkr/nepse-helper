export interface SecurityBrief {
  id: number;
  symbol: string;
  securityName: string;
  name: string;
  activeStatus: string;
}

export interface SecurityDetail {
  securityDailyTradeDto: SecurityDailyTradeDto;
  security: Security;
  stockListedShares: number;
  paidUpCapital: number;
  issuedCapital: number;
  marketCapitalization: number;
  publicShares: number;
  publicPercentage: number;
  promoterShares: number;
  promoterPercentage: number;
  updatedDate: string;
  securityId: number;
}

export interface SecurityDailyTradeDto {
  securityId: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  totalTradeQuantity: number;
  totalTrades: number;
  lastTradedPrice: number;
  previousClose: number;
  businessDate: string;
  closePrice: any;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  lastUpdatedDateTime: string;
}

export interface Security {
  id: number;
  symbol: string;
  isin: string;
  permittedToTrade: string;
  listingDate: string;
  creditRating: any;
  tickSize: number;
  instrumentType: InstrumentType;
  capitalGainBaseDate: string;
  faceValue: number;
  highRangeDPR: any;
  issuerName: any;
  meInstanceNumber: number;
  parentId: any;
  recordType: number;
  schemeDescription: any;
  schemeName: any;
  secured: any;
  series: any;
  shareGroupId: ShareGroupId;
  activeStatus: string;
  divisor: number;
  cdsStockRefId: number;
  securityName: string;
  tradingStartDate: string;
  networthBasePrice: number;
  securityTradeCycle: number;
  isPromoter: string;
  companyId: CompanyId;
}

export interface InstrumentType {
  id: number;
  code: string;
  description: string;
  activeStatus: string;
}

export interface ShareGroupId {
  id: number;
  name: string;
  description: string;
  capitalRangeMin: number;
  modifiedBy: any;
  modifiedDate: any;
  activeStatus: string;
  isDefault: string;
}

export interface CompanyId {
  id: number;
  companyShortName: string;
  companyName: string;
  email: string;
  companyWebsite: string;
  companyContactPerson: string;
  sectorMaster: SectorMaster;
  companyRegistrationNumber: string;
  activeStatus: string;
}

export interface SectorMaster {
  id: number;
  sectorDescription: string;
  activeStatus: string;
  regulatoryBody: string;
}

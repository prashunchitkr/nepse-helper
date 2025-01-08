import {
  IMarketOpen,
  ISecurityBrief,
  ISecurityDetail,
  ITodaysPrice,
  PageSize,
} from "./api";

export interface INepse {
  getMarketStatus(): Promise<IMarketOpen>;
  getSecurityList(): Promise<ISecurityBrief[]>;
  getTodayPrice(page: number, pageSize: PageSize): Promise<ITodaysPrice>;
  getSecurityDetail(symbol: string): Promise<ISecurityDetail | null>;
}

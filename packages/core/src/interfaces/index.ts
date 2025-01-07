import {
  IMarketOpen,
  ISecurityBrief,
  ISecurityDetail,
  ITodaysPrice,
} from "./api";

export interface INepse {
  getMarketStatus(): Promise<IMarketOpen>;
  getSecurityList(): Promise<ISecurityBrief[]>;
  getTodayPrice(): Promise<ITodaysPrice["content"]>;
  getSecurityDetail(symbol: string): Promise<ISecurityDetail | null>;
}

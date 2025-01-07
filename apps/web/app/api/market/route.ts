import { nepse } from "@/lib/nepse";
import { NextResponse } from "next/server";

export async function GET() {
  const market = await nepse.getTodayPrice();

  const data = market.map((item) => ({
    symbol: item.symbol,
    name: item.securityName,
    open: item.openPrice,
    high: item.highPrice,
    low: item.lowPrice,
    close: item.closePrice,
    lastTraded: item.lastUpdatedPrice,
    average: item.averageTradedPrice,
    fiftyTwoWeekHigh: item.fiftyTwoWeekHigh,
    fiftyTwoWeekLow: item.fiftyTwoWeekLow,
    trades: item.totalTrades,
    volume: item.totalTradedQuantity,
    updatedAt: new Date(item.lastUpdatedTime).setMilliseconds(0),
  }));

  return NextResponse.json(data);
}

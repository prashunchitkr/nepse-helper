import { nepse } from "@/lib/nepse";
import { PageSize } from "@nepse-helper/core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = parseInt(
    searchParams.get("pageSize") || searchParams.get("pagesize") || "500",
    10,
  ) as PageSize;

  const market = await nepse.getTodayPrice(page, pageSize);

  const data = market.content.map((item) => ({
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

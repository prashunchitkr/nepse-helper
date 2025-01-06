import { nepse } from "@/lib/nepse";
import { ISecurityDetail } from "@nepse-helper/core/dist/interfaces";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  symbol: string;
}

interface Props {
  params: Promise<Params>;
}

const mapResponse = (security: ISecurityDetail) => ({
  detail: {
    id: security.security.id,
    symbol: security.security.symbol,
    name: security.security.securityName,
    listingDate: security.security.listingDate,
    email: security.security.companyId.email,
    website: security.security.companyId.companyWebsite,
    sector: security.security.companyId.sectorMaster.sectorDescription,
    instrumentation: security.security.instrumentType.description,
    publicShares: security.publicShares,
    promoterShares: security.promoterShares,
    totalShares: security.publicShares + security.promoterShares,
    marketCap: security.marketCapitalization,
    issuedCap: security.issuedCapital,
    paidUpCap: security.paidUpCapital,
  },
  dailyTrade: {
    open: security.securityDailyTradeDto.openPrice,
    high: security.securityDailyTradeDto.highPrice,
    low: security.securityDailyTradeDto.lowPrice,
    close: security.securityDailyTradeDto.closePrice,
    lastTraded: security.securityDailyTradeDto.lastTradedPrice,
    previousClose: security.securityDailyTradeDto.previousClose,
    trades: security.securityDailyTradeDto.totalTrades,
    volume: security.securityDailyTradeDto.totalTradeQuantity,
    fiftyTwoWeekHigh: security.securityDailyTradeDto.fiftyTwoWeekHigh,
    fiftyTwoWeekLow: security.securityDailyTradeDto.fiftyTwoWeekLow,
    lastUpdated: new Date(
      security.securityDailyTradeDto.lastUpdatedDateTime,
    ).setMilliseconds(0),
  },
});

export async function GET(request: NextRequest, { params }: Props) {
  const { symbol } = await params;
  const securityInfo = await nepse.getSecurityDetail(symbol);

  if (!securityInfo) {
    return NextResponse.json({ error: "Security not found" }, { status: 404 });
  }

  return NextResponse.json(mapResponse(securityInfo));
}

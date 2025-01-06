import { nepse } from "@/lib/nepse";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  symbol: string;
}

interface Props {
  params: Promise<Params>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { symbol } = await params;
  const securityInfo = await nepse.getSecurityDetail(symbol);
  if (!securityInfo) {
    return NextResponse.json({ error: "Security not found" }, { status: 404 });
  }
  return NextResponse.json({
    detail: {
      id: securityInfo.security.id,
      symbol: securityInfo.security.symbol,
      name: securityInfo.security.securityName,
      listingDate: securityInfo.security.listingDate,
      email: securityInfo.security.companyId.email,
      website: securityInfo.security.companyId.companyWebsite,
      sector: securityInfo.security.companyId.sectorMaster.sectorDescription,
      instrumentation: securityInfo.security.instrumentType.description,
    },
    dailyTrade: securityInfo.securityDailyTradeDto,
  });
}

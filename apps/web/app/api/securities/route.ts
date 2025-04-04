import { nepse } from "@/lib/nepse";
import { NextResponse } from "next/server";

export async function GET() {
  const securities = await nepse.getSecurityList();

  return NextResponse.json(
    securities.map((security) => ({
      symbol: security.symbol,
      name: security.securityName,
      active: security.activeStatus === "A",
    })),
  );
}

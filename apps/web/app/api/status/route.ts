import { NextResponse } from "next/server";
import { nepse } from "@/lib/nepse";

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...marketData } = await nepse.getMarketStatus();

  return NextResponse.json(marketData);
}

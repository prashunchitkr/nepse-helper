import { NextResponse } from "next/server";
import { nepse } from "@/lib/nepse";

export async function GET() {
  const status = await nepse.getMarketStatus();

  return NextResponse.json({
    status: status.isOpen,
    time: status.asOf,
  });
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = new URL(request.url).searchParams;
  const message = query.get("message") || "Hello World";

  return NextResponse.json({ data: message });
}

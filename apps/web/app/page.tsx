import { nepse } from "@/lib/nepse";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NEPSE Helper API",
  description: "Welcome to the NEPSE Helper API!",
};

export default async function Page() {
  const marketStatus = await nepse.getMarketStatus();

  return (
    <div>
      <h1>NEPSE Helper API</h1>
      <p>Welcome to the NEPSE Helper API!</p>
      <p>
        Market is <b>{marketStatus.isOpen === "OPEN" ? "open" : "closed"}</b>.
      </p>
      <p>As of {new Date(marketStatus.asOf).toLocaleString()} NPT</p>
      <ul>
        <li>
          <Link href={"/api/status"} prefetch={false}>
            Market Status
          </Link>{" "}
        </li>
        <li>
          <Link href={"/api/securities"} prefetch={false}>
            Securities
          </Link>
        </li>
        <li>
          <Link href={"/api/market"} prefetch={false}>
            Current market data
          </Link>
        </li>
        <li>
          <Link href={"/api/market/NABIL"} prefetch={false}>
            Market data for symbol (/api/market/[symbol])
          </Link>
        </li>
      </ul>
    </div>
  );
}

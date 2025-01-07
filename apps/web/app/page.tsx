import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NEPSE Helper API",
  description: "Welcome to the NEPSE Helper API!",
};

export default function Page() {
  return (
    <div>
      <h1>NEPSE Helper API</h1>
      <p>Welcome to the NEPSE Helper API!</p>
      <ul>
        <li>
          <Link href={"/api/status"}>Market Status</Link>{" "}
        </li>
        <li>
          <Link href={"/api/securities"}>Securities</Link>
        </li>
        <li>
          <Link href={"/api/market"}>Current market data</Link>
        </li>
        <li>
          <Link href={"/api/market/NABIL"}>
            Market data for symbol (/api/market/[symbol])
          </Link>
        </li>
      </ul>
    </div>
  );
}

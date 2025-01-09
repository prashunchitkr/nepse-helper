import { NepseBuilder } from "@nepse-helper/core";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IPageProps {
  params: Promise<{
    symbol: string;
  }>;
}

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const { symbol } = await params;
  return {
    title: symbol,
    description: `Security details for ${symbol}`,
  };
}

export default async function Page({ params }: IPageProps) {
  const { symbol } = await params;
  const nepse = await NepseBuilder.build();
  const data = await nepse.getSecurityDetail(symbol);

  if (!data) {
    return notFound();
  }

  return (
    <div>
      <h2>
        {data.security.securityName} - {data.security.symbol}
      </h2>

      <div>
        <h3>Details</h3>
        <p>
          <strong>Security Name:</strong> {data.security.securityName}
        </p>
        <p>
          <strong>Symbol:</strong> {data.security.symbol}
        </p>
        <p>
          <strong>Market Cap:</strong> {data.marketCapitalization.toFixed(2)}
        </p>
        <p>
          <strong>Promoter Shares:</strong> {data.promoterShares} (
          {data.promoterPercentage.toFixed(2)}%)
        </p>
        <p>
          <strong>Public Shares:</strong> {data.publicShares} (
          {data.publicPercentage.toFixed(2)}%)
        </p>
      </div>

      <div>
        <h2>Market Status</h2>

        <p>
          <strong>Open</strong> {data.securityDailyTradeDto.openPrice}
        </p>
        <p>
          <strong>High</strong> {data.securityDailyTradeDto.highPrice}
        </p>
        <p>
          <strong>Low</strong> {data.securityDailyTradeDto.lowPrice}
        </p>
        <p>
          <strong>Close</strong>{" "}
          {data.securityDailyTradeDto.closePrice ?? "N/A"}
        </p>
        <p>
          <strong>Previous Close</strong>{" "}
          {data.securityDailyTradeDto.previousClose}
        </p>
        <p>
          <strong>Last Traded</strong>{" "}
          {data.securityDailyTradeDto.lastTradedPrice} (
          {(
            data.securityDailyTradeDto.lastTradedPrice -
            data.securityDailyTradeDto.previousClose
          ).toFixed(2)}
          )
        </p>
        <p>
          <strong>Volume</strong>{" "}
          {data.securityDailyTradeDto.totalTradeQuantity}
        </p>
        <p>
          <strong>Trades</strong> {data.securityDailyTradeDto.totalTrades}
        </p>
        <p>
          <strong>Updated At</strong>{" "}
          {new Date(
            data.securityDailyTradeDto.lastUpdatedDateTime,
          ).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

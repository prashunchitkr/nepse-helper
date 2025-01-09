import { NepseBuilder } from "@nepse-helper/core";
import { changePercentage } from "../utils/helpers";
import { MarketTable } from "./market-table.component";

export const dynamic = "force-dynamic";

export default async function Page() {
  const nepse = await NepseBuilder.build();
  const marketData = await nepse.getTodayPrice(0, 500);

  const topLosers = marketData.content
    .sort(
      (a, b) =>
        changePercentage(a.previousDayClosePrice, a.lastUpdatedPrice) -
        changePercentage(b.previousDayClosePrice, b.lastUpdatedPrice),
    )
    .slice(0, 10);

  const topGainers = marketData.content
    .sort(
      (a, b) =>
        changePercentage(b.previousDayClosePrice, b.lastUpdatedPrice) -
        changePercentage(a.previousDayClosePrice, a.lastUpdatedPrice),
    )
    .slice(0, 10);

  return (
    <div>
      <div>
        <h2>Top Gainers</h2>
        <MarketTable data={topGainers} />
      </div>
      <div>
        <h2>Top Losers</h2>
        <MarketTable data={topLosers} />
      </div>
      <div>
        <h2>Market Summary</h2>
        <MarketTable data={marketData.content} />
      </div>
    </div>
  );
}

import { nepse } from "@/lib/nepse";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const marketStatus = await nepse.getMarketStatus();

  return {
    title: `NEPSE - ${marketStatus.isOpen}`,
    description: `Market is ${
      marketStatus.isOpen
    }. As of ${new Date(marketStatus.asOf).toLocaleString()} NPT`,
  };
};

const getPointsDifference = (prevClose: number, lastTraded: number) =>
  parseFloat((lastTraded - prevClose).toFixed(2));

export default async function Page() {
  const marketStatus = await nepse.getMarketStatus();
  const marketData = await nepse.getTodayPrice(0, 500);

  return (
    <div>
      <div>
        <h1>NEPSE Helper API</h1>
        <p>Welcome to the NEPSE Helper API!</p>
        <p>
          Market is <b>{marketStatus.isOpen}</b>. As of{" "}
          {new Date(marketStatus.asOf).toLocaleString()} NPT
        </p>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Previous Close</th>
              <th>Last Traded</th>
              <th>Average</th>
              <th>52 Week High</th>
              <th>52 Week Low</th>
              <th>Volume</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {marketData.content
              .sort(
                (a, b) =>
                  getPointsDifference(
                    b.previousDayClosePrice,
                    b.lastUpdatedPrice,
                  ) -
                  getPointsDifference(
                    a.previousDayClosePrice,
                    a.lastUpdatedPrice,
                  ),
              )
              .map((item) => (
                <tr key={item.symbol}>
                  <td>
                    <b>{item.symbol}</b>
                  </td>
                  <td>{item.securityName}</td>
                  <td>{item.openPrice}</td>
                  <td>{item.highPrice}</td>
                  <td>{item.lowPrice}</td>
                  <td>{item.closePrice ?? "-"}</td>
                  <td>{item.previousDayClosePrice}</td>
                  <td>
                    {item.lastUpdatedPrice} (
                    {getPointsDifference(
                      item.previousDayClosePrice,
                      item.lastUpdatedPrice,
                    )}
                    )
                  </td>
                  <td>{item.averageTradedPrice}</td>
                  <td>{item.fiftyTwoWeekHigh}</td>
                  <td>{item.fiftyTwoWeekLow}</td>
                  <td>{item.totalTradedQuantity}</td>
                  <td>{new Date(item.lastUpdatedTime).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

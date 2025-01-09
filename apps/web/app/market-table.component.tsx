import { Content } from "@nepse-helper/core";
import Link from "next/link";
import { getPointsDifference } from "../utils/helpers";

interface IMarketTableProps {
  data: Content[];
}

export const MarketTable = (props: IMarketTableProps) => {
  return (
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
        {props.data.map((item) => (
          <tr key={item.symbol}>
            <td>
              <Link href={`/${item.symbol}`}>
                <b>{item.symbol}</b>
              </Link>
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
  );
};

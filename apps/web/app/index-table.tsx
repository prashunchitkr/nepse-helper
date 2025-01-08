"use client";

import { useEffect, useState } from "react";

interface IMarketData {
  symbol: string;
  name: string;
  open: number;
  high: number;
  low: number;
  close: number | null;
  previousClose: number;
  lastTraded: number;
  average: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  trades: number;
  volume: number;
  updatedAt: number;
}

const getPointsDifference = (prevClose: number, lastTraded: number) =>
  parseFloat((lastTraded - prevClose).toFixed(2));

export const IndexTable = () => {
  const [data, setData] = useState<IMarketData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: IMarketData[] = await fetch("/api/market").then((res) =>
        res.json(),
      );
      setData(data);
    };

    fetchData();
  }, []);

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
        {data
          .sort(
            (a, b) =>
              getPointsDifference(b.previousClose, b.lastTraded) -
              getPointsDifference(a.previousClose, a.lastTraded),
          )
          .map((d) => (
            <tr key={d.symbol}>
              <td>{d.symbol}</td>
              <td>{d.name}</td>
              <td>{d.open}</td>
              <td>{d.high}</td>
              <td>{d.low}</td>
              <td>{d.close ?? "-"}</td>
              <td>{d.previousClose}</td>
              <td>
                {d.lastTraded} (
                {getPointsDifference(d.previousClose, d.lastTraded)})
              </td>
              <td>{d.average}</td>
              <td>{d.fiftyTwoWeekHigh}</td>
              <td>{d.fiftyTwoWeekLow}</td>
              <td>{d.trades}</td>
              <td>{new Date(d.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

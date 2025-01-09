import { NepseBuilder } from "@nepse-helper/core";
import { Metadata } from "next";
import React from "react";
import "./app.css";

interface ILayoutProps {
  children: React.ReactNode;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const nepse = await NepseBuilder.build();
  const marketStatus = await nepse.getMarketStatus();

  return {
    title: `NEPSE - ${marketStatus.isOpen}`,
    description: `Market is ${
      marketStatus.isOpen
    }. As of ${new Date(marketStatus.asOf).toLocaleString()} NPT`,
  };
};

export default async function RootLayout({ children }: Readonly<ILayoutProps>) {
  const nepse = await NepseBuilder.build();
  const marketStatus = await nepse.getMarketStatus();

  return (
    <html lang="en">
      <body>
        <main>
          <div>
            <h1>NEPSE Helper API</h1>
            <p>Welcome to the NEPSE Helper API!</p>
            <p>
              Market is <b>{marketStatus.isOpen}</b>. As of{" "}
              {new Date(marketStatus.asOf).toLocaleString()} NPT
            </p>
          </div>

          {children}
        </main>
      </body>
    </html>
  );
}

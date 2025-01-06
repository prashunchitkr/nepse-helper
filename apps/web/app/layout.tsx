import React from "react";
import "./app.css";
import { Metadata } from "next";

interface ILayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "NEPSE API Helper",
  description: "A helper for NEPSE API",
};

export default function RootLayout({ children }: Readonly<ILayoutProps>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

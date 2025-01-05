import React from "react";
import "./app.css";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <html>
      <title>NEPSE Helper API</title>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

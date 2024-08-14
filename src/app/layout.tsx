import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React, {Suspense} from "react";
import {Card, CardContent} from "@/components/ui/card";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Diniz's Dealership",
  description: "The best car dealership in Brazil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={poppins.className}>
          {children}
        </body>
    </html>
  );
}

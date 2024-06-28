import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers"
import PageLayout from "./pageLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palm&Peak",
  description: "Your one stop destination for all your travel needs",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode; }) {
  return (
     <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <PageLayout>{children}</PageLayout>
        </Providers>
      </body>
    </html>
  );
}
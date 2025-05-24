import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ClockProvider } from "@/context/ClockContext";
import { Suspense } from "react";
import ScrollRestoration from "@/components/ScrollRestoration"; // create this component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClockProvider>
          <Suspense fallback={null}>
            <ScrollRestoration />
          </Suspense>
          {children}
        </ClockProvider>
      </body>
    </html>
  );
}

"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClockProvider , useClock } from "@/context/ClockContext";
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';



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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Scroll to top on initial load if no hash is present
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <body>
        <ClockProvider>
          {children}
        </ClockProvider>
      </body>
    </html>
  );
}



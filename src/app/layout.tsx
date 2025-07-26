import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&display=swap" rel="stylesheet"></link>
      </head>
      <body className="bg-gray-100">
        <Header />
        <main className="bg-gradient-to-br from-zinc-700 via-zinc-500 to-zinc-400" style={{
            fontFamily: "'Baloo 2', 'Comic Sans MS', cursive, sans-serif",
          }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

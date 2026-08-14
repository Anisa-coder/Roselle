import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roselle | Smarter Skincare for Every Skin Type",
  description:
    "Discover personalized skincare recommendations, simple routines, and products matched to your skin type and concerns.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="flex min-h-full flex-col bg-[#fffdfb] font-sans text-[#252625]">{children}</body>
    </html>
  );
}

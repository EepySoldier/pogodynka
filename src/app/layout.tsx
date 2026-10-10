import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Pogodynka",
  description: "Aplikacja do sprawdzania pogody",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html
          lang="pl"
          className={`${geistMono.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col">{children}</body>
      </html>
  );
}
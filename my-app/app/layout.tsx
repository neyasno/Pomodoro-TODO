import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./_components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TODO",
  description: "tODO-app with Pomodoro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full  `}>
        <ReduxProvider>
          <main className="w-full">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}

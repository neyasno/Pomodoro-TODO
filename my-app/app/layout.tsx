import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./_components/ReduxProvider";
import Header from "./_components/Header/Header";
import Wrapper from "./_components/Wrapper/Wrapper";


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
      <body className={` antialiased w-full  `}>
        <ReduxProvider>
          <Wrapper>
            <header><Header/></header>
            <main className="w-full">
              {children}
            </main>
          </Wrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}

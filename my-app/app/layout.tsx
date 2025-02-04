import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./_components/ReduxProvider";
import Header from "./_components/Header/Header";
import Wrapper from "./_components/Wrapper/Wrapper";
import ThemeProvider from "./_components/ThemeProvider";


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
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased w-full`}>
        <ReduxProvider>
          <ThemeProvider>
            <Wrapper>
              <header className="absolute w-full"><Header/></header>
              <main className="w-full h-full pt-20">
                {children}
              </main>
            </Wrapper>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

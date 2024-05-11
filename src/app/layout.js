import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script 
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex flex-col p-10 items-center h-screen">
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <Header/>
          <main className="flex flex-col m-10 items-center justify-center h-full w-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

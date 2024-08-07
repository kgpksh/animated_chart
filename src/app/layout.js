import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Header from "./header_components/header";
import Footer from "./footer_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Animated chart",
  description: "Animated chart is a tool that helps with data visualization. The animated chart converts 2D data, such as Excel files, into chart and graph animations. A user can create and download custom animations across a wide range.",
  icons: {
    icon: "/favicon.jpg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script 
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          type="text/javascript"
          strategy="beforeInteractive"
        />
      </head>
      <body className="flex flex-col px-10 pt-10 items-center h-screen">
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <header className="flex w-full h-1/8 item-center justify-between">
              <Header/>
            </header>
          
          <main className="flex flex-col items-center justify-center flex-grow w-full mt-11 px-11">
            {children}
          </main>
          <footer><Footer/></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

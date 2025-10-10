import "./globals.css";
import Navbar from "./components/Navbar";
import Top from "./components/Top";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Mesnaldo",
  description: "Ronaldo vs Messi stats blog",
  icons: {
    icon: "/goat.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QYL8KCLNRF"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QYL8KCLNRF', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <Navbar />
        <Top />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}

import "./globals.css";
import Navbar from "./components/Navbar";
import Top from "./components/Top";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Mesnaldo | Messi vs Ronaldo Stats Comparison",
  description:
    "Compare Lionel Messi and Cristiano Ronaldo's career stats — goals, assists, trophies, and achievements. The ultimate Messi vs Ronaldo debate with real-time updates!",
  keywords: [
    "Messi vs Ronaldo",
    "Cristiano Ronaldo stats",
    "Lionel Messi stats",
    "Messi vs Ronaldo comparison",
    "messi,ronaldo detailed goals,assists",
    "who is goat",


  ],
  icons: {
    icon: "/goat.png",
  },
  openGraph: {
    title: "Mesnaldo | Messi vs Ronaldo Stats Comparison",
    description:
      "Dive into the ultimate Messi vs Ronaldo comparison with goals, assists, trophies, and more!",
    url: "https://mesnaldo.com/",
    siteName: "Mesnaldo",
    images: [
      {
        url: "https://mesnaldo.com/og-image.jpg", // upload your OG image to /public
        width: 1200,
        height: 630,
        alt: "Messi vs Ronaldo Comparison",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5264237385052398"
     crossorigin="anonymous"></script>
        {/* ✅ Google Site Verification for mesnaldo.xyz */}
        <meta
          name="google-site-verification"
          content="vhvbGtOi7jMYUXO5Nl_ICQxmRtxW5GtamQSH2UkNxU0"
        />
          {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://mesnaldo.com/" />

        {/* ✅ Robots tag */}
        <meta name="robots" content="index, follow" />

        {/* ✅ Author */}
        <meta name="author" content="Mesnaldo Team" />

        {/* ✅ Theme Color */}
        <meta name="theme-color" content="#000000" />

        {/* ✅ Favicon */}
        <link rel="icon" href="/goat.png" type="image/png" />
      </head>
      <body>
        {/* ✅ Google Analytics Script (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G2ZNX15647"
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
              gtag('config', 'G-G2ZNX15647', {
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

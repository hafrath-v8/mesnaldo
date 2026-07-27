import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Meta */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:site_name" content="Messi vs Ronaldo" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Messi vs Ronaldo - Complete Career Comparison" />
        <meta
          property="og:description"
          content="The ultimate head-to-head comparison of Lionel Messi and Cristiano Ronaldo. Goals, assists, trophies, and complete career statistics."
        />
        <meta property="og:image" content="/images/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Messi vs Ronaldo" />
        <meta
          name="twitter:description"
          content="Complete career comparison of the two greatest footballers."
        />

        {/* AdSense Verification - Add your code when approved */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </Head>
      <body className="font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
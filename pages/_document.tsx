import {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />

        {/* Optional PNG icons */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
        />

        {/* Browser theme */}
        <meta
          name="theme-color"
          content="#0a0a0a"
        />

        {/* Improve connection to font servers */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Inter */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="font-sans bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
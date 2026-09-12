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

        {/* PNG icon */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
        />

        {/* Browser theme */}
        <meta
          name="theme-color"
          content="#0a0a0a"
        />
      </Head>

      <body className="font-sans bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
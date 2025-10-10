export default function Head() {
  return (
    <>
      <title>Messi vs Ronaldo Analysis</title>
      <meta name="description" content="The Ultimate Football Rivalry Analysis" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/goat.svg" />

      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-QYL8KCLNRF"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QYL8KCLNRF', {
              page_path: window.location.pathname
            });
          `,
        }}
      />
    </>
  );
}

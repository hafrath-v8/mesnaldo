import Head from "next/head"

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

const SITE_URL = "https://mesnaldo.com"

function getAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  if (url === "/") {
    return SITE_URL
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`
}

export default function BreadcrumbSchema({
  items,
}: BreadcrumbSchemaProps) {
  if (!items || items.length < 2) {
    return null
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  }

  return (
    <Head>
      <script
        key="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </Head>
  )
}
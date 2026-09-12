import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "dmpignlrtdqajzpjdiql.supabase.co",
        pathname: "/storage/v1/object/public/blog-images/**",
      },
    ],

    deviceSizes: [
      360,
      640,
      750,
      828,
      1080,
      1200,
      1440,
      1920,
    ],

    imageSizes: [
      16,
      32,
      48,
      64,
      96,
      128,
      256,
      384,
    ],
  },

  compress: true,

  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.mesnaldo.com",
          },
        ],
        destination:
          "https://mesnaldo.com/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
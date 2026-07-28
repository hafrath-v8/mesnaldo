import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dmpignlrtdqajzpjdiql.supabase.co',
        pathname: '/storage/v1/object/public/blog-images/**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mesnaldo.com' }],
        destination: 'https://mesnaldo.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
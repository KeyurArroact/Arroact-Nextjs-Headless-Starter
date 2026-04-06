/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['arroact-umbraco-graphql-sdk'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  experimental: {
    optimizePackageImports: ['arroact-umbraco-graphql-sdk'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;

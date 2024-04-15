/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  pageExtensions: ['ts', 'tsx'],
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index',
      },
    ]
  },
}

module.exports = nextConfig

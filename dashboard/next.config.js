/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    transpilePackages: [
      'react-syntax-highlighter',
      'swagger-client',
      'swagger-ui-react',
    ],
  },
}

module.exports = nextConfig

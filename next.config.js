/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.pravatar.cc',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig

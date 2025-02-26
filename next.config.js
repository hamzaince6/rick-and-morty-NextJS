/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add trailing slash for better static hosting compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
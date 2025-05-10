/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Remove unoptimized: true to allow Vercel to optimize images
    domains: [],
    remotePatterns: [],
  },
}

export default nextConfig

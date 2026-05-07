/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove static export to enable API routes and middleware for authentication
  // output: 'export', // Disabled - needed for dynamic auth
  trailingSlash: true,
  // distDir: 'dist',
}

export default nextConfig

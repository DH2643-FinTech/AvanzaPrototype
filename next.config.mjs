/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // Use SWC for minification
  distDir: 'build', // Change the build directory
  output: 'standalone', // Helps with serverless deployments
  reactStrictMode: false,
  env: {},
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React Strict Mode
  swcMinify: true, // Use SWC for minification
  output: 'standalone', // Helps with serverless deployments
  env: {},
};

export default nextConfig;

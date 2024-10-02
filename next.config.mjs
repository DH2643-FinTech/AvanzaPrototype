/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // Use SWC for minification
  output: 'standalone', // Helps with serverless deployments
  env: {},
};

export default nextConfig;

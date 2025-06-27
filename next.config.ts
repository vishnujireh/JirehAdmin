import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: "/admin", // ✅ Add this line
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/getAllQuote',
        destination: 'https://jirehsol.com/api/getAllQuote',
      },
      {
  source: '/api/applications',
  destination: 'https://jirehsol.com/api/applications',
},
{
  source: '/api/getQuote',
  destination: 'https://jirehsol.com/api/getQuote',
},
{
  source: '/api/admin/login',
  destination: 'https://jirehsol.com/api/admin/login',
}
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/getAllQuote',
        destination: 'http://demo1.jirehsol.com/api/getAllQuote',
      },
      {
  source: '/api/applications',
  destination: 'http://demo1.jirehsol.com/api/applications',
},
{
  source: '/api/getQuote',
  destination: 'http://demo1.jirehsol.com/api/getQuote',
}
    ];
  },
};

export default nextConfig;

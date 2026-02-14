import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: isProd ? "/admin" : "", // ✅ Add this line
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/getAllQuote',
        destination: 'https://jirehsol.com/api/getAllQuote',
      },
      {
        source: '/api/getUserRole',
        destination: 'https://jirehsol.com/api/getUserRole',
      },
      {
  source: '/api/applications',
  destination: 'https://jirehsol.com/api/applications',
},
{
        source: "/api/getApplication",
        destination: "https://jirehsol.com/api/getApplication",
      },
{
  source: '/api/getQuote',
  destination: 'https://jirehsol.com/api/getQuote',
},
{
  source: '/api/admin/addQuote',
  destination: 'https://jirehsol.com/api/admin/addQuote',
},
{
  source: '/api/admin/updateQuote',
  destination: 'https://jirehsol.com/api/admin/updateQuote',
},
{  source: '/api/admin/deleteQuote',
  destination: 'https://jirehsol.com/api/admin/deleteQuote',
},
{
  source: '/api/admin/login',
  destination: 'https://jirehsol.com/api/admin/login',
},
{
  source: '/api/admin/userList',
  destination: 'https://jirehsol.com/api/admin/userList',
},
{
  source: '/api/admin/addUser',
  destination: 'https://jirehsol.com/api/admin/addUser',
},
{
  source: '/api/admin/userView',
  destination: 'https://jirehsol.com/api/admin/userView',
},
{
  source: '/api/admin/updateUser',
  destination: 'https://jirehsol.com/api/admin/updateUser',
},
{
  source: '/api/admin/deleteUser',
  destination: 'https://jirehsol.com/api/admin/deleteUser',
},
{
  source: '/api/admin/getUser',
  destination: 'https://jirehsol.com/api/admin/getUser',
},
{
  source: '/api/admin/blogList',
  destination: 'https://jirehsol.com/api/admin/blogList',
},
{  source: '/api/admin/addBlog',
  destination: 'https://jirehsol.com/api/admin/addBlog',
},
{  source: '/api/admin/blogView',
  destination: 'https://jirehsol.com/api/admin/blogView',
},
{  source: '/api/admin/editBlog',
  destination: 'https://jirehsol.com/api/admin/editBlog',
},
{  source: '/api/admin/deleteBlog',
  destination: 'https://jirehsol.com/api/admin/deleteBlog',
},
{
  source: '/api/admin/getBlog',
  destination: 'https://jirehsol.com/api/admin/getBlog',
},
{
  source:'/api/admin/jobList',
  destination:'https://jirehsol.com/api/admin/jobList',
},
{
  source:'/api/admin/addJob',
  destination:'https://jirehsol.com/api/admin/addJob',
},
{
  source:'/api/admin/UpdateJob',
  destination:'https://jirehsol.com/api/admin/UpdateJob'
},
{
  source:'/api/admin/deleteJob',
  destination:'https://jirehsol.com/api/admin/deleteJob'
},
{
  source:'/api/admin/getJob',
  destination:'https://jirehsol.com/api/admin/getJob'
},
{
  source:'/api/admin/uploadImage',
  destination:'https://jirehsol.com/api/admin/uploadImage'
}

    ];
  },
};

export default nextConfig;

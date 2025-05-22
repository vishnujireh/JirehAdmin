import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../pages/components/Layout";
import "../styles/globals.css";

import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    //@ts-ignore

    import("bootstrap/dist/js/bootstrap")
      .then(() => {
        // Bootstrap JavaScript is loaded and can be used
      })
      .catch((error) => {
        console.error("Error loading Bootstrap:", error);
      });
  }, []);
  const router = useRouter();
  
  // Check if the current route is '/login'
  const isLoginPage = router.pathname === '/login';

  // If it's the login page, don't use the default layout
  if (isLoginPage) {
    return (
      <Component {...pageProps} />
    );
  }

  return (
    <>
      
        <Layout>
          <Component {...pageProps} />
        </Layout>
       
      </>
      );
}

      export default MyApp;

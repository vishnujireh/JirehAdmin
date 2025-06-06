import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import Layout from "../pages/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically import Bootstrap JS and DataTables Bootstrap 5 JS
      // //  @ts-ignor
      import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) =>
        console.error("Bootstrap JS load error:", err)
      );
      // // @ts-ignore
      import("datatables.net-bs5").catch((err) =>
        console.error("DataTables JS load error:", err)
      );
    }
  }, []);

  if (isLoginPage) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        {/* Load DataTables Bootstrap 5 CSS from CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.datatables.net/1.13.5/css/dataTables.bootstrap5.min.css"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

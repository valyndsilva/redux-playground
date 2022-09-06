import Head from "next/head";
import { Header, Footer } from "./";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>title goes here</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="title goes here" />
      </Head>
      <div className="min-h-screen flex flex-col  ">
        <Header />
        <main className="flex-grow ">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

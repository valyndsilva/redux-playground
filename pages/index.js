import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Footer, Header, LeftNav, RightNav, Update } from "../components";

const Home = () => {
  const [name, setName] = useState("Jake");
  return (
    <div className="flex flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header name={name}/>
      <main className="flex w-full">
        <LeftNav />
        <Update />
        <RightNav />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

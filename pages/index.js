import Head from "next/head";
import Image from "next/image";
import { LeftNav, RightNav, Update } from "../components";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full">
        <LeftNav />
        <Update />
        <RightNav />
      </main>
    </div>
  );
};

export default Home;

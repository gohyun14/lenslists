import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import HomePage from "../components/home/HomePage";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="View Lists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ExplorePage from "../components/explore/ExplorePage";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Explore</title>
        <meta name="description" content="View Lists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ExplorePage />
    </>
  );
};

export default Home;

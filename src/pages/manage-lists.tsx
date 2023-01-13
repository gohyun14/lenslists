import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ManageListsPage from "../components/manage/ManageListsPage";

import { trpc } from "../utils/trpc";

const ManageLists: NextPage = () => {
  return (
    <>
      <Head>
        <title>Manage Lists</title>
        <meta name="description" content="Manage your lists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ManageListsPage />
    </>
  );
};

export default ManageLists;

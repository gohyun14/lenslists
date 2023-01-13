import { NextPage } from "next";
import Head from "next/head";

import ListDetailPage from "../../components/lists/ListDetailPage";

const ListDetail: NextPage = () => {
  return (
    <>
      <Head>
        <title>List</title>
        <meta name="description" content="Fullscreen Quote" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ListDetailPage />
    </>
  );
};

export default ListDetail;

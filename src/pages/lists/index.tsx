import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect } from "react";

const ListsPage: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);

  return <p> </p>;
};

export default ListsPage;

import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { apolloClient } from "../../pages/_app";
import { getPublications } from "../../queries/queries";
import { useAtom } from "jotai";
import { addressAtom } from "../../store";
import { type PostType } from "../posts/Post";
import { type List } from "@prisma/client";

import SelectList from "./SelectList";
import ListBody from "../lists/ListBody";
import LoadingSpinner from "../UI/LoadingSpinner";

const HomePage = () => {
  const [userAddress] = useAtom(addressAtom);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectedList, setSelectedList] = useState<List | undefined>();

  const { isLoading: isAllListDataLoading, data: allListData } =
    trpc.list.getAllListsByOwnerAddress.useQuery(
      {
        address: userAddress as string,
      },
      {
        refetchOnWindowFocus: false,
        enabled: userAddress !== undefined,
        onSuccess: (data) => {
          setSelectedList(data[0]);
        },
      }
    );

  const {
    isLoading: isMembersLoading,
    data: membersData,
    refetch: refetchMembersData,
  } = trpc.listMember.getAllMembersByListId.useQuery(
    {
      listId: selectedList?.id as string,
    },
    {
      refetchOnWindowFocus: false,
      enabled: selectedList !== undefined,
      onSuccess(data) {
        setPosts([]);
        data.forEach((member) => {
          apolloClient
            .query({
              query: getPublications,
              variables: {
                id: member.memberId,
              },
            })
            .then((response) => {
              setPosts((posts) => [
                ...posts,
                ...response.data.publications.items,
              ]);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      },
    }
  );

  useEffect(() => {
    if (selectedList) {
      refetchMembersData();
    }
  }, [selectedList, refetchMembersData]);

  return (
    <div className="relative mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
      {allListData && selectedList && (
        <section className="mx-auto flex w-min flex-col items-start xl:fixed">
          <h1 className="ml-1 mb-[-2px] text-xs text-gray-600">Current List</h1>
          <div className="w-56">
            <SelectList
              lists={allListData}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          </div>
        </section>
      )}
      {isMembersLoading ? (
        <LoadingSpinner />
      ) : (
        membersData && <ListBody posts={posts} members={membersData} />
      )}
    </div>
  );
};

export default HomePage;

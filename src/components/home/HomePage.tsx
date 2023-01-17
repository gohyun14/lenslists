import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { apolloClient } from "../../pages/_app";
import { getPublications } from "../../queries/queries";
import { useAtom } from "jotai";
import { addressAtom } from "../../store";
import { type PostType } from "../posts/Post";
import { type List } from "@prisma/client";
import Link from "next/link";

import SelectList from "./SelectList";
import ListBody from "../lists/ListBody";
import LoadingSpinner from "../UI/LoadingSpinner";

const HomePage = () => {
  const [userAddress, setUserAddress] = useAtom(addressAtom);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectedList, setSelectedList] = useState<List | undefined>();
  const [followedListsIds, setFollowedListsIds] = useState<string[]>([]);

  // get owned lists
  const { isLoading: isOwnedListsDataLoading, data: ownedListsData } =
    trpc.list.getAllListsByOwnerAddress.useQuery(
      {
        address: userAddress as string,
      },
      {
        refetchOnWindowFocus: false,
        enabled: userAddress !== undefined,
        onSuccess: (data) => {
          if (data.length > 0) {
            setSelectedList(data[0]);
          }
        },
      }
    );

  // get followed list ids
  const {
    isLoading: isFollowedListsIdsDataLoading,
    data: followedListsIdsData,
  } = trpc.listFollower.getAllFollowedListsByAddress.useQuery(
    {
      address: userAddress as string,
    },
    {
      refetchOnWindowFocus: false,
      enabled: userAddress !== undefined,
      onSuccess: (data) => {
        setFollowedListsIds(data.map((list) => list.listId));
      },
    }
  );

  // get followed lists
  const {
    isLoading: isFollowedListsDataLoading,
    data: followedListsData,
    refetch: refetchFollowedListsData,
  } = trpc.list.getManyListsByListIds.useQuery(
    {
      listIds: followedListsIds,
    },
    {
      enabled: followedListsIds.length > 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (selectedList === undefined && data.length > 0) {
          setSelectedList(data[0]);
        }
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

  if (!userAddress) {
    return (
      <div
        className="mx-auto mt-16 flex w-fit flex-col rounded-full p-16"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.40' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      >
        <h1 className="w-fit text-7xl font-semibold text-gray-800">
          Not Logged In
        </h1>
        <h3 className="w-fit text-3xl text-gray-600">
          Please log in to view your lists.
        </h3>
        <h3 className="w-fit text-3xl text-gray-600">
          or{" "}
          <span
            onClick={() => setUserAddress("0xtest")}
            className="text-indigo-600 hover:cursor-pointer hover:text-indigo-700 hover:underline"
          >
            login as Test User
          </span>{" "}
        </h3>
      </div>
    );
  }

  if (ownedListsData?.length === 0) {
    return (
      <div
        className="mx-auto mt-16 flex w-fit flex-col rounded-full p-16"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.33' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      >
        <h1 className="w-fit text-7xl font-semibold text-gray-800">
          No Lists Found
        </h1>
        <h3 className="w-fit text-3xl text-gray-600">
          Please{" "}
          <Link
            href="/manage-lists"
            className="text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            create a list
          </Link>{" "}
          to get started.
        </h3>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
      {ownedListsData && followedListsData && selectedList && (
        <section className="mx-auto flex w-min flex-col items-start xl:fixed">
          <h1 className="ml-1 mb-[-2px] text-xs text-gray-600">Current List</h1>
          <div className="w-56">
            <SelectList
              lists={[...ownedListsData, ...followedListsData]}
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

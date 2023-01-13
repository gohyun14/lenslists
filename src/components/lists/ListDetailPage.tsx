import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { apolloClient } from "../../pages/_app";
import { getPublications } from "../../queries/queries";
import { useAtom } from "jotai";
import { addressAtom } from "../../store";
import { type PostType } from "../posts/Post";

import ListHeader from "./ListHeader";
import ListBody from "./ListBody";

const ListDetailPage = () => {
  const router = useRouter();
  const listId = router.query.listId as string;

  const [posts, setPosts] = useState<PostType[]>([]);

  const [userAddress] = useAtom(addressAtom);

  const { isLoading, data: listData } = trpc.list.getListByListId.useQuery(
    {
      listId: listId as string,
    },
    {
      refetchOnWindowFocus: false,
      enabled: listId !== undefined,
    }
  );

  const { isLoading: isTagsLoading, data: tagsData } =
    trpc.listTag.getAllTagsByListId.useQuery(
      {
        listId: listId as string,
      },
      {
        refetchOnWindowFocus: false,
        enabled: listId !== undefined,
      }
    );

  const { isLoading: isMembersLoading, data: membersData } =
    trpc.listMember.getAllMembersByListId.useQuery(
      {
        listId: listId as string,
      },
      {
        refetchOnWindowFocus: false,
        enabled: listId !== undefined,
      }
    );

  const {
    isLoading: isFollowerCountLoading,
    data: followerCountData,
    refetch: refetchFollowerCount,
  } = trpc.listFollower.getFollowerCountByListId.useQuery(
    {
      listId: listId as string,
    },
    {
      refetchOnWindowFocus: false,
      enabled: listId !== undefined,
    }
  );

  useEffect(() => {
    if (membersData) {
      setPosts([]);
      membersData.forEach((member) => {
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
    }
  }, [membersData]);

  //TODO: list not found, loading
  return (
    <div className="relative">
      <div className="absolute -top-8 h-[32rem] w-full bg-gradient-to-r from-indigo-400 to-indigo-700">
        &nbsp;
      </div>
      <div className="sticky z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {listData &&
          membersData &&
          followerCountData !== undefined &&
          tagsData && (
            <ListHeader
              userAddress={userAddress}
              list={listData}
              members={membersData}
              followerCount={followerCountData}
              refetchFollowerCount={refetchFollowerCount}
              tags={tagsData?.map((tag) => tag.tag)}
            />
          )}
        <ListBody posts={posts} members={membersData} />
      </div>
    </div>
  );
};

export default ListDetailPage;

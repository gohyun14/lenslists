import { useState } from "react";
import { type List, type ListMember } from "@prisma/client";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import { trpc } from "../../utils/trpc";

import MembersList from "./MembersList";

type ListHeaderProps = {
  userAddress: string | undefined;
  list: List;
  members: ListMember[];
  followerCount: number;
  tags: string[];
  refetchFollowerCount: () => void;
};

const ListHeader = ({
  userAddress,
  list,
  members,
  followerCount,
  tags,
  refetchFollowerCount,
}: ListHeaderProps) => {
  const [isMembersListOpen, setIsMembersListOpen] = useState(false);

  const followList = trpc.listFollower.followList.useMutation();
  const unfollowList = trpc.listFollower.unfollowList.useMutation();

  const { data: isFollowing, refetch: refetchDoesUserFollowList } =
    trpc.listFollower.doesUserFollowList.useQuery(
      {
        listId: list.id,
        follower: userAddress as string,
      },
      {
        refetchOnWindowFocus: false,
        enabled: userAddress !== undefined && userAddress !== list?.Owner,
      }
    );
  // console.log(isFollowing);

  const handleFollowList = () => {
    followList.mutate(
      {
        listId: list.id,
        follower: userAddress as string,
      },
      {
        onSuccess: () => {
          refetchDoesUserFollowList();
          refetchFollowerCount();
        },
      }
    );
  };

  const handleUnfollowList = () => {
    unfollowList.mutate(
      {
        listId: list.id,
        follower: userAddress as string,
      },
      {
        onSuccess: () => {
          refetchDoesUserFollowList();
          refetchFollowerCount();
        },
      }
    );
  };

  return (
    <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-y-8">
      <section className="flex flex-col items-center">
        <h1 className="mb-2 text-6xl font-semibold text-gray-50">
          {list.Name}
        </h1>
        <h3 className="mb-1 max-w-lg text-left text-3xl text-indigo-50">
          {list.Description}
        </h3>
        <span className="w-full text-xs font-light text-indigo-100">{`By ${list.Owner}`}</span>
      </section>
      <section className="max-w-lg">
        <div className="flex flex-row flex-wrap gap-x-2">
          {tags.map((tag) => {
            return (
              <span
                className="rounded-full border bg-white bg-opacity-10 p-2 text-gray-50 shadow-sm" //bg-gradient-to-r from-pink-400 to-purple-400
                key={tag}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </section>
      <section className="flex flex-row gap-x-6">
        <div
          className="flex flex-col hover:cursor-pointer"
          onClick={() => setIsMembersListOpen(true)}
        >
          <span className="text-2xl font-semibold text-gray-50">
            {members.length}
          </span>
          <span className="font-base text-sm text-indigo-50">Members</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold text-gray-50">
            {followerCount}
          </span>
          <span className="font-base text-sm text-indigo-50">Followers</span>
        </div>
        {/* and if user is owner */}
        {userAddress &&
          isFollowing !== undefined &&
          userAddress !== list.Owner && (
            <button
              className="font-base text-md my-auto inline-flex h-min items-center rounded-md border bg-gray-50 bg-opacity-20 p-2 text-white shadow-sm hover:bg-opacity-25 active:bg-opacity-30"
              onClick={
                isFollowing === 0 ? handleFollowList : handleUnfollowList
              }
            >
              {isFollowing === 0 ? (
                <UserPlusIcon
                  className="mr-1 h-5 w-5 rounded-full stroke-1"
                  aria-hidden="true"
                />
              ) : (
                <UserMinusIcon
                  className="mr-1 h-5 w-5 rounded-full stroke-1"
                  aria-hidden="true"
                />
              )}
              {isFollowing === 0 ? "Follow" : "Unfollow"}
            </button>
          )}
      </section>
      <MembersList
        members={members?.map((member) => ({
          memberId: member.memberId,
          memberName: member.memberName,
          memberHandle: member.memberHandle,
          memberPicture: member.memberPicture,
        }))}
        isOpen={isMembersListOpen}
        closeModal={() => setIsMembersListOpen(false)}
      />
    </div>
  );
};

export default ListHeader;

//userAddress && userAddress !== list?.Owner && (

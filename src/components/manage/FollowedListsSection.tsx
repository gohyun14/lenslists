import { useState } from "react";
import { trpc } from "../../utils/trpc";
import {
  ArrowTopRightOnSquareIcon,
  UserMinusIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

type FollowedListsSectionProps = {
  userAddress: string | undefined;
};

const FollowedListsSection = ({ userAddress }: FollowedListsSectionProps) => {
  const [followedListsNames, setFollowedListsNames] = useState<string[]>([]);

  const {
    isLoading: isFollowedListsNamesDataLoading,
    data: followedListsNamesData,
    refetch: refetchFollowedListsNamesData,
  } = trpc.listFollower.getAllFollowedListsByAddress.useQuery(
    {
      address: userAddress as string,
    },
    {
      onSuccess: (data) => {
        setFollowedListsNames(data.map((list) => list.listId));
      },
      enabled: userAddress !== undefined,
    }
  );

  const {
    isLoading: isFollowedListsDataLoading,
    data: followedListsData,
    refetch: refetchFollowedListsData,
  } = trpc.list.getManyListsByListIds.useQuery(
    {
      listIds: followedListsNames,
    },
    {
      enabled: followedListsNames.length > 0,
    }
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Followed Lists
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all of the lists you follow
          </p>
        </div>
      </div>
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {followedListsData?.map((list) => (
          <li
            key={list.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow hover:shadow-md"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <h3 className="mx-auto w-fit truncate text-sm font-medium text-gray-900">
                  {list.Name}
                </h3>
                <p className="mx-auto mt-1 w-fit truncate text-sm text-gray-500">
                  {list.Description}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <Link
                    href={`/lists/${list.id}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <ArrowTopRightOnSquareIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">View</span>
                  </Link>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`#`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <UserMinusIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Unfollow</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedListsSection;

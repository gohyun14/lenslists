import { useState } from "react";
import { trpc } from "../../utils/trpc";
import {
  ArrowTopRightOnSquareIcon,
  UserMinusIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

import Modal from "../UI/Modal";
import Alert from "./Alert";

type FollowedListsSectionProps = {
  userAddress: string | undefined;
};

const FollowedListsSection = ({ userAddress }: FollowedListsSectionProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [unfollowListId, setUnfollowListId] = useState<string | undefined>(
    undefined
  );

  const {
    isLoading: isAllListsDataLoading,
    data: allListsData,
    refetch: refetchAllListsData,
  } = trpc.list.getAllFollowedListsByAddress.useQuery(
    {
      address: userAddress as string,
    },
    {
      enabled: userAddress !== undefined,
    }
  );

  const unfollowList = trpc.listFollower.unfollowList.useMutation();

  const handleCloseModal = () => {
    setIsAlertOpen(false);
    setUnfollowListId(undefined);
  };

  const handleUnfollow = () => {
    unfollowList.mutate(
      {
        listId: unfollowListId as string,
        follower: userAddress as string,
      },
      {
        onSuccess: () => {
          refetchAllListsData();
          setUnfollowListId(undefined);
        },
      }
    );
    setIsAlertOpen(false);
  };

  return (
    <>
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
          {allListsData?.length === 0 && <div>No Lists Found</div>}
          {allListsData?.map((list) => (
            <li
              key={list.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow hover:bg-indigo-50 hover:shadow-md"
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
                      className="group relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-indigo-500"
                    >
                      <ArrowTopRightOnSquareIcon
                        className="h-5 w-5 text-gray-400 group-hover:text-indigo-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3">View</span>
                    </Link>
                  </div>
                  <div
                    className="-ml-px flex w-0 flex-1"
                    onClick={() => {
                      setUnfollowListId(list.id);
                      setIsAlertOpen(true);
                    }}
                  >
                    <div className="group relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-indigo-500">
                      <UserMinusIcon
                        className="h-5 w-5 text-gray-400 group-hover:text-indigo-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Unfollow</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isAlertOpen} closeModal={handleCloseModal}>
        <Alert
          onCancel={handleCloseModal}
          onSubmit={handleUnfollow}
          labelSubmit="Unfollow"
          title="Unfollow List"
          description="Are you sure you want to unfollow this list?"
        />
      </Modal>
    </>
  );
};

export default FollowedListsSection;

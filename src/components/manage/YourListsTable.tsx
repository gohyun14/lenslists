import { useEffect, useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { trpc } from "../../utils/trpc";
import { type List } from "@prisma/client";
import { addressAtom } from "../../store";

import ManageListForm from "./ManageListForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import DeleteListAlert from "./DeleteListAlert";

const YourListsTable = () => {
  //trpc delete list mutations
  const deleteListMutation = trpc.list.deleteListByListId.useMutation();
  const deleteListMembersMutation =
    trpc.listMember.deleteAllMembersByListId.useMutation();
  const deleteListFollowersMutation =
    trpc.listFollower.deleteAllFollowersByListId.useMutation();
  const deleteListTags = trpc.listTag.deleteAllTagsByListId.useMutation();

  // user address
  const [userAddress] = useAtom(addressAtom);

  // modal state
  const [isListFormModalOpen, setIsListFormModalOpen] =
    useState<boolean>(false);
  const [isDeleteAlertModalOpen, setIsDeleteAlertModalOpen] =
    useState<boolean>(false);
  const [editList, setEditList] = useState<List | undefined>(undefined);
  const [deleteListId, setDeleteListId] = useState<string | undefined>(
    undefined
  );

  const {
    isLoading,
    isFetching,
    data: lists,
    refetch: refetchLists,
  } = trpc.list.getAllListsByOwnerAddress.useQuery(
    {
      address: userAddress as `0x${string}`,
    },
    {
      refetchOnWindowFocus: false,
      enabled: userAddress !== undefined,
    }
  );

  const handleCreateList = () => {
    setIsListFormModalOpen(true);
  };

  const handleEditList = (list: List) => {
    setEditList(list);
    setIsListFormModalOpen(true);
  };

  const handleCloseListFormModal = () => {
    setIsListFormModalOpen(false);
    setEditList(undefined);
  };

  const handleDeleteList = () => {
    deleteListMutation.mutate(
      { listId: deleteListId as string },
      { onSuccess: () => refetchLists() }
    );
    deleteListMembersMutation.mutate({ listId: deleteListId as string });
    deleteListFollowersMutation.mutate({ listId: deleteListId as string });
    deleteListTags.mutate({ listId: deleteListId as string });
    handleCloseDeleteAlertModal();
  };

  const handleCloseDeleteAlertModal = () => {
    setIsDeleteAlertModalOpen(false);
    setDeleteListId(undefined);
  };

  const handleOpenDeleteAlertModal = (listId: string) => {
    setDeleteListId(listId);
    setIsDeleteAlertModalOpen(true);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Your Lists</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage all of the lists you&apos;ve created
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800 sm:w-auto"
              onClick={handleCreateList}
            >
              Create List
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-8 max-h-96 overflow-hidden overflow-y-scroll shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="sticky top-0 z-10 bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Created
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading || isFetching ? (
                <tr>
                  <td className="h-14">
                    <span className="fixed left-1/2 mt-3 -translate-x-1/2 -translate-y-1/2 transform">
                      <LoadingSpinner />
                    </span>
                    <span>&nbsp;</span>
                  </td>
                </tr>
              ) : lists?.length !== undefined && lists?.length > 0 ? (
                lists?.map((list) => (
                  <tr key={list.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                      {list.Name}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {list.Description}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 text-sm text-gray-500">
                      {list.createdAt.toLocaleString().split(",")[0]}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 sm:pl-0">
                      <div className="flex justify-end gap-x-4">
                        <button
                          className="text-indigo-600 hover:text-indigo-800 hover:underline"
                          onClick={() => handleEditList(list)}
                        >
                          Edit<span className="sr-only">, {list.Name}</span>
                        </button>
                        <Link
                          href={`/lists/${list.id}`}
                          className="text-gray-600 hover:text-gray-800 hover:underline"
                        >
                          View<span className="sr-only">, {list.Name}</span>
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800 hover:underline"
                          onClick={() => handleOpenDeleteAlertModal(list.id)}
                        >
                          Delete<span className="sr-only">, {list.Name}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="h-14">
                    <span className="fixed left-1/2 mt-3 -translate-x-1/2 -translate-y-1/2 transform">
                      No Lists Found
                    </span>
                    <span>&nbsp;</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ManageListForm
        isOpen={isListFormModalOpen}
        closeModal={handleCloseListFormModal}
        userAddress={userAddress as `0x${string}`}
        refetchLists={refetchLists}
        list={editList}
      />
      <Modal
        isOpen={isDeleteAlertModalOpen}
        closeModal={handleCloseDeleteAlertModal}
      >
        <DeleteListAlert
          onCancel={handleCloseDeleteAlertModal}
          onDelete={handleDeleteList}
        />
      </Modal>
    </>
  );
};

export default YourListsTable;

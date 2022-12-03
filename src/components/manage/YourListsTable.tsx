import { useState } from "react";
import Link from "next/link";
import ManageListModal from "./ManageListModal";

const lists = [
  {
    id: 1,
    name: "Projects",
    description: "All the projects I'm following",
    members: "10",
    followers: "24",
    tags: 7,
    created: "10-11-2022",
  },
  // More people...
];

const YourListsTable = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isModalCreate, setIsModalCreate] = useState<boolean>(true);

  const handleCreateList = () => {
    setModalOpen(true);
    setIsModalCreate(true);
  };

  const handleEditList = () => {
    setModalOpen(true);
    setIsModalCreate(false);
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
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
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
                  Members
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Followers
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Tags
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Created
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {lists.map((list) => (
                <tr key={list.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                    <div className="font-medium text-gray-900">{list.name}</div>
                    <div className="font-light text-gray-500">
                      {list.description}
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {list.members}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {list.followers}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {list.tags}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 text-sm text-gray-500">
                    {list.created}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 sm:pl-0">
                    <div className="flex justify-end gap-x-4">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                        onClick={handleEditList}
                      >
                        Edit<span className="sr-only">, {list.name}</span>
                      </button>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-gray-800 hover:underline"
                      >
                        View<span className="sr-only">, {list.name}</span>
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 hover:underline"
                        // onClick={handleEditList}
                      >
                        Delete<span className="sr-only">, {list.name}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ManageListModal
        isCreate={isModalCreate}
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </>
  );
};

export default YourListsTable;

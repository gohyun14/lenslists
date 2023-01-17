import React from "react";
import { useAtom } from "jotai";
import { addressAtom } from "../../store";

import YourListsTable from "./YourListsTable";
import FollowedListsSection from "./FollowedListsSection";

const ManageListsPage = () => {
  const [userAddress, setUserAddress] = useAtom(addressAtom);

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
          Please log in to manage your lists.
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

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* <div className="mx-auto max-w-md px-4 pt-8 pb-20 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Manage Lists
        </p>
        <p className="mx-auto mt-2 max-w-prose text-xl text-gray-500">
          Manage the lists you&apos;ve created and the lists you&apos;re
          following
        </p>
      </div> */}
      <div className="flex flex-col gap-y-20 pt-16">
        <YourListsTable userAddress={userAddress} />
        <FollowedListsSection userAddress={userAddress} />
      </div>
    </div>
  );
};

export default ManageListsPage;

import React from "react";
import YourListsTable from "./YourListsTable";

const ManageListsPage = () => {
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
      <div className="pt-16">
        <YourListsTable />
      </div>
    </div>
  );
};

export default ManageListsPage;

import { useState } from "react";
import { type FullList } from "./ExplorePage";

import ListCard from "./ListCard";

type ListsGridProps = {
  lists: FullList[];
};

const ListsGrid = ({ lists }: ListsGridProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-12 text-center sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-5xl font-semibold text-gray-900">Explore</h1>
          <p className="mt-2 text-2xl text-gray-700">
            Discover lists to follow
          </p>
        </div>
      </div>
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {lists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </ul>
    </div>
  );
};

export default ListsGrid;

import React from "react";
import { type FullList } from "./ExplorePage";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  UserMinusIcon,
} from "@heroicons/react/20/solid";
import { trpc } from "../../utils/trpc";

type ListCardProps = {
  list: FullList;
};

const ListCard = ({ list }: ListCardProps) => {
  const dateCreated = new Date(list.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li
      key={list.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow hover:bg-indigo-50 hover:shadow-md"
    >
      <div className="relative flex w-full items-center justify-between p-6">
        <span className="absolute top-2 left-2 text-xs text-gray-500">
          {list.followerCount} Followers
        </span>
        <span className="absolute top-2 right-2 text-xs text-gray-500">
          {dateCreated}
        </span>
        <span>{}</span>
        <div className="flex-1 truncate">
          <h3 className="mx-auto w-fit truncate text-sm font-medium text-gray-800">
            {list.Name}
          </h3>
          <p className="mx-auto mt-1 w-fit truncate overflow-ellipsis text-sm text-gray-600">
            {list.Description}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <span className="ml-2 text-sm text-gray-600">Tags:</span>
        {list.tags.length > 0 && (
          <div className="flex flex-row items-center overflow-y-scroll">
            {list.tags.map((tag) => (
              <span
                key={tag}
                className="my-2 mx-1 min-w-max rounded-full bg-indigo-300 p-1 text-xs font-light text-indigo-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
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
        </div>
      </div>
    </li>
  );
};

export default ListCard;

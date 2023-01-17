import React from "react";
import { type ListMember } from "@prisma/client";
import {
  UserCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

type PostHeaderProps = {
  member: ListMember;
  createdAt: string;
  postId: string;
};

const PostHeader = ({ member, createdAt, postId }: PostHeaderProps) => {
  const millisecondsSinceCreation =
    new Date().getTime() - new Date(createdAt).getTime();
  const daysSinceCreation = millisecondsSinceCreation / (1000 * 60 * 60 * 24);
  const timeSinceCreation =
    daysSinceCreation >= 1
      ? `${daysSinceCreation.toFixed(0)}d`
      : `${(daysSinceCreation * 24).toFixed(0)}h`;

  return (
    <div className="flex flex-row justify-between">
      <div className="flex items-center">
        {member.memberPicture ? (
          <img
            className="mr-2 h-10 w-10 rounded-full"
            src={member.memberPicture}
          />
        ) : (
          <UserCircleIcon
            className="mr-2 h-10 w-10 rounded-full stroke-1"
            aria-hidden="true"
          />
        )}
        <div className="flex flex-col">
          <span className=" block truncate text-lg font-medium text-gray-800">
            {member.memberName}
          </span>
          <span className="block truncate text-sm font-light text-gray-500">
            <span className="text-indigo-600">@{member.memberHandle}</span> -{" "}
            <span className="text-xs">{timeSinceCreation}</span>
          </span>
        </div>
      </div>
      <a
        href={`https://lenster.xyz/posts/${postId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-min items-center rounded-md border border-gray-300 bg-white p-1 text-xs font-normal text-gray-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-100"
      >
        View on Lenster
        <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
      </a>
    </div>
  );
};

export default PostHeader;

import React from "react";
import {
  HeartIcon,
  ArrowPathRoundedSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

type PostStatsProps = {
  totalCollects: string;
  totalComments: string;
  totalMirrors: string;
  totalLikes: string;
};

const PostStats = ({
  totalCollects,
  totalComments,
  totalMirrors,
  totalLikes,
}: PostStatsProps) => {
  return (
    <div className="mt-4 flex flex-row gap-x-3">
      <section className="group relative flex flex-row items-center text-green-600">
        <ArrowPathRoundedSquareIcon className="mr-[2px] h-5 w-5 stroke-2" />
        <span className="text-xs">{totalMirrors}</span>
        <span className="absolute right-[-22px] top-[-40px] hidden w-max rounded-md bg-gray-600 p-2 text-sm text-gray-50 shadow-md group-hover:block">
          {totalMirrors} Mirrors
        </span>
      </section>
      <section className="group relative flex flex-row items-center text-pink-600">
        <HeartIcon className="mr-[3px] h-5 w-5 stroke-2" />
        <span className="text-xs">{totalLikes}</span>
        <span className="absolute right-[-15px] top-[-40px] hidden w-max rounded-md bg-gray-600 p-2 text-sm text-gray-50 shadow-md group-hover:block">
          {totalLikes} Likes
        </span>
      </section>
      <section className="group relative flex flex-row items-center text-sky-500">
        <ChatBubbleBottomCenterTextIcon className="mr-[2px] h-5 w-5 stroke-2" />
        <span className="text-xs">{totalComments}</span>
        <span className="absolute right-[-31px] top-[-40px] hidden w-max rounded-md bg-gray-600 p-2 text-sm text-gray-50 shadow-md group-hover:block">
          {totalComments} Comments
        </span>
      </section>
      <section className="group relative flex flex-row items-center text-orange-600">
        <DocumentDuplicateIcon className="mr-[2px] h-5 w-5 stroke-2" />
        <span className="text-xs">{totalCollects}</span>
        <span className="absolute right-[-28px] top-[-40px] hidden w-max rounded-md bg-gray-600 p-2 text-sm text-gray-50 shadow-md group-hover:block">
          {totalCollects} Collects
        </span>
      </section>
    </div>
  );
};

export default PostStats;

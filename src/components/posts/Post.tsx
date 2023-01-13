import React from "react";
import { type ListMember } from "@prisma/client";

import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

type PostProps = {
  post: PostType;
  member: ListMember;
};

const Post = ({ post, member }: PostProps) => {
  return (
    <li
      key={post.id}
      className="my-2 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
    >
      <PostHeader member={member} createdAt={post.createdAt} postId={post.id} />
      <PostBody post={post} />
    </li>
  );
};

export default Post;

export type PostType = {
  __typename: string;
  createdAt: string;
  id: string;
  stats: {
    totalAmountOfMirrors: string;
    totalAmountOfCollects: string;
    totalAmountOfComments: string;
    totalUpvotes: string;
  };
  profile: { id: string };
  metadata: {
    name: string;
    description: string;
    content: string;
    media: {
      original: {
        url: string | null;
        mimeType: string | null;
      } | null;
    }[];
    attributes: {
      displayType: string | null;
      traitType: string | null;
      value: string | null;
    };
  };
};

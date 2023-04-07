import React from "react";
import { type ListMember } from "@prisma/client";
import { type PostType } from "../posts/Post";

import Post from "../posts/Post";

type ListBodyProps = {
  posts: PostType[];
  members: ListMember[] | undefined;
};

const ListBody = ({ posts, members }: ListBodyProps) => {
  const map = new Map();
  members?.forEach((member) => {
    map.set(member.memberId, member);
  });

  return (
    <ul className="mx-auto mt-9 max-w-2xl px-1">
      {posts
        .filter(
          (post) =>
            !(post.mirrorOf?.__typename === "Comment") &&
            post.metadata.content !== null &&
            post.metadata.content !== undefined &&
            map.get(post.profile.id) !== undefined
        )
        .sort((a, b) => {
          return new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime() >
            0
            ? 1
            : -1;
        })
        .map((post) => (
          <Post key={post.id} post={post} member={map.get(post.profile.id)} />
        ))}
    </ul>
  );
};

export default ListBody;

import React from "react";
import { type ListMember } from "@prisma/client";
import { ipfsLinkTransform } from "../../utils/utils";

import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

type PostProps = {
  post: PostType;
  member: ListMember;
};

const Post = ({ post, member }: PostProps) => {
  console.log(post);
  let mirrorPicture: string | undefined = undefined;
  if (post.mirrorOf?.profile?.picture !== undefined) {
    if (post.mirrorOf?.profile?.picture?.__typename !== undefined) {
      if (post.mirrorOf?.profile.picture.__typename === "MediaSet") {
        if (post.mirrorOf?.profile.picture.original?.url !== undefined) {
          mirrorPicture = ipfsLinkTransform(
            post.mirrorOf?.profile.picture.original?.url as string
          );
        }
      } else {
        if (post.mirrorOf?.profile?.picture.uri !== undefined) {
          mirrorPicture = ipfsLinkTransform(
            post.mirrorOf?.profile.picture.uri as string
          );
        }
      }
    }
  }

  return (
    <li
      key={post.id}
      className="my-2 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
    >
      <PostHeader
        member={member}
        createdAt={post.createdAt}
        postId={post.id}
        mirror={
          post.__typename === "Mirror" && post.mirrorOf?.profile !== undefined
            ? {
                memberId: post.mirrorOf?.profile.id as string,
                memberName: post.mirrorOf?.profile.name as string,
                memberHandle: post.mirrorOf?.profile.handle as string,
                memberPicture: mirrorPicture as string,
              }
            : undefined
        }
      />
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
  profile: {
    id: string;
    handle: string;
    name: string;
    picture: {
      uri?: string;
      original?: {
        url: string;
        mimeType: string;
      };
      __typename: string;
    };
  };
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
  mirrorOf:
    | {
        __typename: string;
        createdAt: string;
        id: string;
        stats: {
          totalAmountOfMirrors: string;
          totalAmountOfCollects: string;
          totalAmountOfComments: string;
          totalUpvotes: string;
        };
        profile: {
          id: string;
          handle: string;
          name: string;
          picture: {
            uri?: string;
            original?: {
              url: string;
              mimeType: string;
            };
            __typename: string;
          };
        };
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
      }
    | undefined;
};

import { useState } from "react";
import { type PostType } from "./Post";
import { ipfsLinkTransform } from "../../utils/utils";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { contentTokenTransform } from "../../utils/utils";

import PostStats from "./PostStats";

type PostBodyProps = {
  post: PostType;
};

// TODO: @ & link?

const PostBody = ({ post }: PostBodyProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const mediaLink =
    post.metadata.media.length > 0
      ? post.metadata.media[0]?.original?.url?.toString()
      : null;

  const isPostTooLong = post.metadata.content.length > 360;

  const contentTokens = contentTokenTransform(post.metadata.content);

  const contentJSX = contentTokens.map((token) => {
    if (token.startsWith("http")) {
      return (
        <a
          key={token + post.id + Math.random()}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 hover:underline"
        >
          {token}
        </a>
      );
    } else if (token.startsWith("@")) {
      return (
        <span
          key={token + post.id + Math.random()}
          className="font-semibold text-indigo-600"
        >
          {token}
        </span>
      );
    } else {
      return <span key={token + post.id + Math.random()}>{token}</span>;
    }
  });

  return (
    <div className="ml-12 mt-4 text-gray-800">
      <p
        className={`${!isPostTooLong && "mb-2"} ${
          isPostTooLong && isHidden ? "line-clamp-5" : "line-clamp-none"
        }`}
      >
        {contentJSX}
      </p>
      {isPostTooLong && (
        <button
          className="mb-3 flex flex-row text-xs text-gray-500 hover:text-gray-700"
          onClick={() =>
            setIsHidden((prevState) => {
              return !prevState;
            })
          }
        >
          {isHidden ? (
            <EyeIcon className="mr-1 h-4 w-4" />
          ) : (
            <EyeSlashIcon className="mr-1 h-4 w-4" />
          )}
          {isHidden ? "Show More" : "Show Less"}
        </button>
      )}
      {mediaLink &&
        (post.metadata.media[0]?.original?.mimeType?.includes("video/") ? (
          <Plyr
            source={{
              type: "video",
              sources: [
                {
                  src: ipfsLinkTransform(mediaLink),
                  type: "video/mp4",
                  size: 720,
                },
              ],
            }}
          />
        ) : (
          <img
            className="max-h-96 rounded-md"
            src={ipfsLinkTransform(mediaLink)}
          />
        ))}
      <PostStats
        totalCollects={post.stats.totalAmountOfCollects}
        totalComments={post.stats.totalAmountOfComments}
        totalLikes={post.stats.totalUpvotes}
        totalMirrors={post.stats.totalAmountOfMirrors}
      />
    </div>
  );
};

export default PostBody;

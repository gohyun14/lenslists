import { type Dispatch, type SetStateAction, useState } from "react";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import Tag from "./Tag";

type TagInputProps = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [newTag, setNewTag] = useState("");

  const onTagAdd = (newTag: string) => {
    if (
      newTag === "" ||
      tags.includes(newTag) ||
      tags.length >= 7 ||
      newTag.includes(" ")
    ) {
      return;
    }
    setTags((prevTags) => [...prevTags, newTag]);
    setNewTag("");
  };

  const onTagDelete = (i: number) => {
    setTags((prevTags) => {
      const tags = [...prevTags];
      tags.splice(i, 1);
      return tags;
    });
  };

  return (
    <div>
      <label
        htmlFor="input"
        className="block text-sm font-medium text-gray-700"
      >
        Tags{" "}
        <span className="text-xs font-light text-gray-500">
          (single-word, max 7)
        </span>
      </label>
      <div className="relative mt-1 flex gap-x-1">
        <button
          onClick={() => onTagAdd(newTag)}
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 text-sm font-normal shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-100"
        >
          <PlusSmallIcon
            className="h-6 w-6 rounded-full text-gray-500"
            aria-hidden="true"
          />
        </button>
        <input
          type="text"
          name="input"
          id="input"
          maxLength={12}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500  sm:text-sm"
          value={newTag}
          onChange={(e) => {
            setNewTag(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              onTagAdd(newTag);
            }
          }}
        />
      </div>
      <div className="mt-1 flex flex-row flex-wrap gap-x-1 gap-y-1">
        {tags.map((tag, i) => (
          <Tag key={i} text={tag} index={i} onDelete={onTagDelete} />
        ))}
      </div>
    </div>
  );
};

export default TagInput;

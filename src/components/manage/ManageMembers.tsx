import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { apolloClient } from "../../pages/_app";
import { querySearch } from "../../queries/queries";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { type memberType } from "./ManageListForm";
import { useDebounce } from "use-debounce";
import { ipfsLinkTransform } from "../../utils/utils";

import AutoCompleteProfiles from "./AutoCompleteProfiles";
import Tag from "../UI/Tag";

type ManageMembersProps = {
  members: memberType[];
  setMembers: Dispatch<SetStateAction<memberType[]>>;
};

const ManageMembers = ({ members, setMembers }: ManageMembersProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 150);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<memberType>({
    memberId: "",
    memberName: "",
    memberHandle: "",
    memberPicture: "",
  });

  useEffect(() => {
    apolloClient
      .query({
        query: querySearch,
        variables: {
          request: {
            query: debouncedQuery,
            type: "PROFILE",
            limit: 35,
          },
        },
      })
      .then((response) => {
        const res = response.data.search.items.map((item: any) => ({
          memberId: item.id,
          memberName: item.name,
          memberHandle: item.handle,
          memberPicture:
            item.picture !== null
              ? item.picture.__typename === "MediaSet"
                ? ipfsLinkTransform(item.picture.original.url)
                : ipfsLinkTransform(item.picture.uri)
              : "",
        }));
        setSearchResults(res);
      });
  }, [debouncedQuery]);

  const onAddMember = (newMember: memberType) => {
    if (newMember.memberId === "" || members.includes(newMember)) {
      return;
    }
    setMembers((prevMembers) => [...prevMembers, newMember]);
    setQuery("");
    setSelected({
      memberId: "",
      memberName: "",
      memberHandle: "",
      memberPicture: "",
    });
  };

  const onDeleteMember = (i: number) => {
    setMembers((prevMembers) => {
      const newMembers = [...prevMembers];
      newMembers.splice(i, 1);
      return newMembers;
    });
  };

  return (
    <div>
      <div>
        <label
          htmlFor="input"
          className="block text-sm font-medium text-gray-700"
        >
          Members{" "}
          <span className="text-xs font-light text-gray-500">
            (you can also add members later)
          </span>
        </label>
        <div className="relative mt-1 flex gap-x-1">
          <button
            onClick={() => onAddMember(selected)}
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 text-sm font-normal shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-100"
          >
            <PlusSmallIcon
              className="h-6 w-6 rounded-full text-gray-500"
              aria-hidden="true"
            />
          </button>
          <AutoCompleteProfiles
            query={query}
            setQuery={setQuery}
            selected={selected}
            setSelected={setSelected}
            people={searchResults}
            onAddMember={onAddMember}
          />
        </div>
        <div className="mt-1 flex flex-row flex-wrap gap-x-1 gap-y-1">
          {members.map((member, i) => (
            <Tag
              key={i}
              text={member.memberHandle}
              index={i}
              onDelete={onDeleteMember}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;

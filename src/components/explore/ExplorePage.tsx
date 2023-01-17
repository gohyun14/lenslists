import { useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { useAtom } from "jotai";
import { addressAtom } from "../../store";

import ListsGrid from "./ListsGrid";
import SortPanel from "./SortPanel";
import LoadingSpinner from "../UI/LoadingSpinner";

export type FullList = {
  id: string;
  tags: string[];
  createdAt: Date;
  Owner: string;
  Name: string;
  Description: string;
  followerCount: number;
};

const ExplorePage = () => {
  const [userAddress] = useAtom(addressAtom);

  const [allLists, setAllLists] = useState<FullList[]>([]);
  const [filteredLists, setFilteredLists] = useState<FullList[]>([]);

  //sorting variables
  const [sortPanelOpen, setSortPanelOpen] = useState(false);
  const [sortByDate, setSortByDate] = useState(true);
  const [sortHighToLow, setSortHighToLow] = useState(true);
  const [sortTags, setSortTags] = useState<string[]>([]);

  const { isLoading: isAllListsDataLoading, data: allListsData } =
    trpc.list.getAllLists.useQuery(
      {},
      {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
          setAllLists(
            data.map((list) => {
              return {
                tags: list.ListTag.map((tag) => tag.tag),
                id: list.id,
                createdAt: list.createdAt,
                Owner: list.Owner,
                Name: list.Name,
                Description: list.Description,
                followerCount: list._count.ListFollower,
              };
            })
          );
        },
      }
    );

  useEffect(() => {
    if (sortByDate) {
      setFilteredLists(
        [...allLists].sort((a, b) => {
          return sortHighToLow
            ? b.createdAt.getTime() - a.createdAt.getTime()
            : a.createdAt.getTime() - b.createdAt.getTime();
        })
      );
    } else {
      setFilteredLists(
        [...allLists].sort((a, b) => {
          return sortHighToLow
            ? b.followerCount - a.followerCount
            : a.followerCount - b.followerCount;
        })
      );
    }

    if (sortTags.length > 0) {
      setFilteredLists((prevLists) =>
        prevLists.filter((list) => {
          for (let i = 0; i < sortTags.length; i++) {
            if (list.tags.includes(sortTags[i] as string)) {
              return true;
            }
          }
          return false;
        })
      );
    }
  }, [sortByDate, sortHighToLow, sortTags, allLists]);

  return (
    <>
      <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
        {isAllListsDataLoading ? (
          <LoadingSpinner />
        ) : (
          allListsData && <ListsGrid lists={filteredLists} />
        )}
        <button
          type="button"
          className="fixed left-4 top-[4.5rem] inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-normal text-white shadow-md hover:bg-indigo-700 active:bg-indigo-800"
          onClick={() => setSortPanelOpen(true)}
        >
          Sort Lists
        </button>
      </div>
      <SortPanel
        open={sortPanelOpen}
        setOpen={setSortPanelOpen}
        tags={sortTags}
        setTags={setSortTags}
        sortByDate={sortByDate}
        setSortByDate={setSortByDate}
        sortHighToLow={sortHighToLow}
        setSortHighToLow={setSortHighToLow}
      />
    </>
  );
};

export default ExplorePage;

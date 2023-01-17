import { type Dispatch, type SetStateAction, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import TagInput from "../UI/TagInput";
import Toggle from "../UI/Toggle";

type SortPanelProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  sortByDate: boolean;
  setSortByDate: (bool: boolean) => void;
  sortHighToLow: boolean;
  setSortHighToLow: (bool: boolean) => void;
};

const SortPanel = ({
  open,
  setOpen,
  tags,
  setTags,
  sortByDate,
  setSortByDate,
  sortHighToLow,
  setSortHighToLow,
}: SortPanelProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="mb-2">
                          <p className="text-2xl font-medium text-gray-900">
                            Sort Lists
                          </p>
                          <p className="text-md text-gray-500">
                            Edit your search to find the perfect list
                          </p>
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 flex flex-col gap-y-8 px-4 sm:px-6">
                        <div>
                          <h2 className="mb-2 text-sm font-medium text-gray-900">
                            Sort By
                          </h2>
                          <div className="flex flex-row items-center gap-x-2">
                            <span className="text-sm text-gray-700">
                              Follower Count
                            </span>
                            <Toggle
                              checked={sortByDate}
                              setChecked={setSortByDate}
                            />
                            <span className="text-sm text-gray-700">
                              Date Created
                            </span>
                          </div>
                          <div>
                            <div className="mt-3 flex items-center">
                              <input
                                id="high"
                                name="high"
                                type="radio"
                                checked={sortHighToLow}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onChange={() => setSortHighToLow(true)}
                              />
                              <label
                                htmlFor="high"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                {sortByDate
                                  ? "Newest to Oldest"
                                  : "Highest to Lowest"}
                              </label>
                            </div>
                            <div className="mt-3 flex items-center">
                              <input
                                id="low"
                                name="low"
                                type="radio"
                                checked={!sortHighToLow}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onChange={() => setSortHighToLow(false)}
                              />
                              <label
                                htmlFor="low"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                {sortByDate
                                  ? "Oldest to Newest"
                                  : "Lowest to Highest"}
                              </label>
                            </div>
                          </div>
                        </div>
                        <TagInput tags={tags} setTags={setTags} />
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SortPanel;

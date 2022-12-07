import { type Dispatch, type SetStateAction, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { type memberType } from "./ManageListForm";

type AutoCompleteDropdownProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selected: memberType;
  setSelected: Dispatch<SetStateAction<memberType>>;
  people: memberType[] | undefined;
  onAddMember: (member: memberType) => void;
};

const AutoCompleteDropdown = ({
  query,
  setQuery,
  people,
  selected,
  setSelected,
  onAddMember,
}: AutoCompleteDropdownProps) => {
  // console.log(selected);
  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative w-full">
        <Combobox.Input
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500  sm:text-sm"
          displayValue={(person: memberType) => person?.memberHandle}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => onAddMember(selected)}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people?.length === 0 || query === "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              people?.map((person) => (
                <Combobox.Option
                  key={person.memberId}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={person}
                  onKeyDown={(e: any) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                      onAddMember(person);
                    }
                  }}
                >
                  {() => (
                    <div className="flex items-center">
                      {person.memberPicture ? (
                        <img
                          className="mr-2 h-9 w-9 rounded-full"
                          src={person.memberPicture}
                        />
                      ) : (
                        <UserCircleIcon
                          className="mr-2 h-9 w-9 rounded-full stroke-1"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="block truncate font-medium">
                          {person.memberName}
                        </span>
                        <span className="block truncate font-light">
                          @{person.memberHandle}
                        </span>
                      </div>
                    </div>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default AutoCompleteDropdown;

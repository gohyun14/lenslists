import React from "react";
import { type memberType } from "../manage/ManageListForm";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Modal from "../UI/Modal";

type MembersListType = {
  members: memberType[] | undefined;
  isOpen: boolean;
  closeModal: () => void;
};

const MembersList = ({ members, isOpen, closeModal }: MembersListType) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {members?.length === 0 ? (
        <div className="py-2 px-4 text-gray-700">No members yet.</div>
      ) : (
        <div className="relative">
          <XMarkIcon
            onClick={closeModal}
            className="absolute right-[-18px] top-[-18px] h-7 w-7 rounded-full p-1 text-gray-700 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300"
            aria-hidden="true"
          />
          <h1 className="border-b border-gray-500 pb-1 text-2xl font-light text-gray-700">
            List Members
          </h1>
          <ul className="max-h-72 w-full overflow-auto">
            {members?.map((member) => (
              <li
                key={member.memberId}
                className="list-none rounded-md py-2 px-4 text-gray-900 hover:bg-gray-200"
              >
                <div className="flex items-center">
                  {member.memberPicture ? (
                    <img
                      className="mr-2 h-9 w-9 rounded-full"
                      src={member.memberPicture}
                    />
                  ) : (
                    <UserCircleIcon
                      className="mr-2 h-9 w-9 rounded-full stroke-1"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="block truncate font-medium">
                      {member.memberName}
                    </span>
                    <span className="block truncate font-light">
                      @{member.memberHandle}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default MembersList;

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { trpc } from "../../utils/trpc";
import { type List } from "@prisma/client";

import InputControlled from "../UI/InputControlled";
import TextAreaControlled from "../UI/TextAreaControlled";
import TagInput from "../UI/TagInput";
import Modal from "../UI/Modal";
import ManageMembers from "./ManageMembers";

export type memberType = {
  memberId: string;
  memberName: string;
  memberHandle: string;
  memberPicture: string;
};

type ManageListModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  userAddress: `0x${string}`;
  refetchLists: () => void;
  list: List | undefined;
};

const ManageListModal = ({
  isOpen,
  closeModal,
  userAddress,
  refetchLists,
  list,
}: ManageListModalProps) => {
  const createListMutation = trpc.list.createList.useMutation();
  const deleteListMembersMutation =
    trpc.listMember.deleteAllMembersByListId.useMutation();
  const createListMembersMutation =
    trpc.listMember.createManyMembersByListId.useMutation();
  const deleteListTags = trpc.listTag.deleteAllTagsByListId.useMutation();
  const createListTags = trpc.listTag.createManyTagsByListId.useMutation();

  // name state and validation
  const [name, setName] = useState("");
  const [debouncedName] = useDebounce(name, 450);
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (debouncedName.length > 15) {
      setNameError("Name must be less than 15 characters");
    } else if (nameError !== "" && debouncedName === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  }, [debouncedName, nameError]);

  // description state and validation
  const [description, setDescription] = useState("");
  const [debouncedDescription] = useDebounce(description, 450);
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (debouncedDescription.length > 35) {
      setDescriptionError("Description must be less than 35 characters");
    } else if (descriptionError !== "" && debouncedDescription === "") {
      setDescriptionError("Description is required");
    } else {
      setDescriptionError("");
    }
  }, [debouncedDescription, descriptionError]);

  // tag state
  const [tags, setTags] = useState<string[]>([]);
  const {
    isLoading,
    data: tagsData,
    refetch,
  } = trpc.listTag.getAllTagsByListId.useQuery(
    {
      listId: list?.id as string,
    },
    {
      refetchOnWindowFocus: false,
      enabled: list?.id !== undefined,
      onSuccess: (data) => {
        setTags(data.map((tag) => tag.tag));
      },
    }
  );

  // members state
  // const {
  //   isLoading,
  //   data: initialMembers,
  //   refetch,
  // } = trpc.listMember.getListByOwnerAddress.useQuery(
  //   {
  //     address: userAddress as `0x${string}`,
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: !!userAddress,
  //   }
  // );

  const [finalMembers, setFinalMembers] = useState<memberType[]>([]);
  // console.log(finalMembers);

  // state updates when list changes
  useEffect(() => {
    setName(list ? list.Name : "");
    setDescription(list ? list.Description : "");
  }, [list]);

  // action handlers
  const handleCancel = () => {
    closeModal();
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setTags([]);
    setFinalMembers([]);
  };

  const handleCreate = () => {
    if (debouncedName === "") {
      setNameError("Name is required");
    } else if (debouncedName.length > 15) {
      setNameError("Name must be less than 15 characters");
    }

    if (debouncedDescription === "") {
      setDescriptionError("Description is required");
    } else if (debouncedDescription.length > 35) {
      setDescriptionError("Description must be less than 35 characters");
    }

    if (nameError !== "" || descriptionError !== "") {
      return;
    }

    createListMutation.mutate(
      {
        owner: userAddress,
        name: debouncedName,
        description: debouncedDescription,
        members: finalMembers,
        tags: tags,
      },
      {
        onSuccess: () => {
          refetchLists();
        },
      }
    );

    handleCancel();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="max-w-xl">
        <h3 className="mb-5 text-xl font-medium leading-6 text-gray-900">
          Create List
        </h3>
        <div className="flex flex-col gap-y-4">
          <InputControlled
            label="Name"
            value={name}
            setValue={setName}
            error={nameError !== ""}
            errorMessage={nameError}
          />
          <TextAreaControlled
            label="Description"
            value={description}
            setValue={setDescription}
            error={descriptionError !== ""}
            errorMessage={descriptionError}
          />
          <TagInput tags={tags} setTags={setTags} />
          <ManageMembers members={finalMembers} setMembers={setFinalMembers} />
          <div className="mt-4 flex flex-row justify-end gap-x-3">
            <button
              onClick={handleCancel}
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800"
            >
              {list ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ManageListModal;

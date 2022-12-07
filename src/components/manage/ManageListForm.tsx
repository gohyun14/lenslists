import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { trpc } from "../../utils/trpc";
import { type List } from "@prisma/client";

import InputControlled from "../UI/InputControlled";
import TextAreaControlled from "../UI/TextAreaControlled";
import TagInput from "../UI/TagInput";
import ManageMembers from "./ManageMembers";
import LoadingSpinner from "../UI/LoadingSpinner";

export type memberType = {
  memberId: string;
  memberName: string;
  memberHandle: string;
  memberPicture: string;
};

type ManageListFormProps = {
  closeModal: () => void;
  userAddress: `0x${string}`;
  refetchLists: () => void;
  list: List | undefined;
};

const ManageListForm = ({
  closeModal,
  userAddress,
  refetchLists,
  list,
}: ManageListFormProps) => {
  // api mutations
  const createListMutation = trpc.list.createList.useMutation();
  const updateListMutation = trpc.list.updateListByListId.useMutation();
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
    isLoading: isTagsLoading,
    isFetching: isTagsFetching,
    data: tagsData,
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
  const [members, setMembers] = useState<memberType[]>([]);
  const {
    isLoading: isMembersLoading,
    isFetching: isMembersFetching,
    data: membersData,
  } = trpc.listMember.getAllMembersByListId.useQuery(
    {
      listId: list?.id as string,
    },
    {
      refetchOnWindowFocus: false,
      enabled: list?.id !== undefined,
      onSuccess: (data) => {
        setMembers(
          data.map((member) => ({
            memberId: member.memberId,
            memberName: member.memberName,
            memberHandle: member.memberHandle,
            memberPicture: member.memberPicture,
          }))
        );
      },
    }
  );

  // state updates when list changes
  useEffect(() => {
    setName(list ? list.Name : "");
    setDescription(list ? list.Description : "");
  }, [list]);

  // action handlers and helpers
  const resetModal = () => {
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setTags([]);
    setMembers([]);
  };

  const handleCancel = () => {
    closeModal();
    resetModal();
  };

  const validateInput = () => {
    let isValid = true;
    if (debouncedName === "") {
      setNameError("Name is required");
      isValid = false;
    } else if (debouncedName.length > 15) {
      setNameError("Name must be less than 15 characters");
      isValid = false;
    }

    if (debouncedDescription === "") {
      setDescriptionError("Description is required");
      isValid = false;
    } else if (debouncedDescription.length > 35) {
      setDescriptionError("Description must be less than 35 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleCreate = () => {
    if (validateInput()) {
      if (nameError !== "" || descriptionError !== "") {
        return;
      }

      createListMutation.mutate(
        {
          owner: userAddress,
          name: debouncedName,
          description: debouncedDescription,
          members: members,
          tags: tags,
        },
        {
          onSuccess: () => {
            refetchLists();
          },
        }
      );

      resetModal();
      closeModal();
    } else {
      return;
    }
  };

  const handleEdit = () => {
    if (validateInput()) {
      if (nameError !== "" || descriptionError !== "") {
        return;
      }

      updateListMutation.mutate(
        {
          listId: list?.id as string,
          name: debouncedName,
          description: debouncedDescription,
        },
        {
          onSuccess: () => {
            refetchLists();
          },
        }
      );

      deleteListTags.mutate(
        { listId: list?.id as string },
        {
          onSuccess: () => {
            createListTags.mutate({
              listId: list?.id as string,
              tags: tags,
            });
          },
        }
      );

      deleteListMembersMutation.mutate(
        { listId: list?.id as string },
        {
          onSuccess: () => {
            createListMembersMutation.mutate({
              listId: list?.id as string,
              members: members,
            });
          },
        }
      );

      resetModal();
      closeModal();
    } else {
      return;
    }
  };

  return (
    <>
      {(isMembersLoading ||
        isTagsLoading ||
        isMembersFetching ||
        isTagsFetching) &&
      list !== undefined ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
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
            <ManageMembers members={members} setMembers={setMembers} />
            <div className="mt-4 flex flex-row justify-end gap-x-3">
              <button
                onClick={handleCancel}
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={list ? handleEdit : handleCreate}
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800"
              >
                {list ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageListForm;

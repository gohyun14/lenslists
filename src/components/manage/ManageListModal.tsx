import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import InputControlled from "../UI/InputControlled";
import TextAreaControlled from "../UI/TextAreaControlled";
import TagInput from "../UI/TagInput";
import Modal from "../UI/Modal";
import ManageMembers from "./ManageMembers";

export type memberType = {
  memberId: string;
  memberName: string;
  memberHandle: string;
  memberPicture: string | null;
};

type ManageListModalProps = {
  isCreate: boolean;
  isOpen: boolean;
  closeModal: () => void;
};

const ManageListModal = ({
  isCreate,
  isOpen,
  closeModal,
}: ManageListModalProps) => {
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
  const [debouncedDescription] = useDebounce(name, 450);
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
  const [tags, setTags] = useState<string[]>(["hello", "there", "sir"]);

  // members state
  const beforeMembers = [
    {
      memberId: "0",
      memberName: "Zero",
      memberHandle: "0.lens",
      memberPicture: null,
    },
    {
      memberId: "1",
      memberName: "One",
      memberHandle: "1.lens",
      memberPicture: null,
    },
    {
      memberId: "2",
      memberName: "Two",
      memberHandle: "2.lens",
      memberPicture: null,
    },
  ];
  const [afterMembers, setAfterMembers] = useState<memberType[]>([]);

  // action handlers
  const handleCancel = () => {
    closeModal();
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
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

    if (nameError === "" || descriptionError === "") {
      return;
    }

    closeModal();
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
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
          <ManageMembers members={afterMembers} setMembers={setAfterMembers} />
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
              Create
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ManageListModal;

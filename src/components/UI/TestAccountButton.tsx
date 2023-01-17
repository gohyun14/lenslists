import React from "react";
import { useAtom } from "jotai";
import { addressAtom } from "../../store";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const TestAccountButton = () => {
  const [userAddress, setUserAddressState] = useAtom(addressAtom);

  return (
    <button
      onClick={() => setUserAddressState(undefined)}
      type="button"
      className="group flex flex-row items-center rounded-md border-2 border-white bg-gray-200 py-1 px-2 font-bold shadow-md hover:shadow-lg active:bg-gray-300"
    >
      Disconnect
    </button>
  );
};

export default TestAccountButton;

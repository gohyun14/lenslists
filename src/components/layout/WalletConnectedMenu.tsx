import { Fragment } from "react";
import { Popover, Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";

type WalletConnectedMenuProps = {
  disconnect: () => void;
  address: `0x${string}` | undefined;
};

const WalletConnectedMenu = ({
  disconnect,
  address,
}: WalletConnectedMenuProps) => {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button className="flex items-center gap-1 rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800">
            <UserIcon className="h-5 w-5" aria-hidden="true" />
            <div>{`${address?.slice(0, 7)}...`}</div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-[-13rem] z-10 mt-3 w-96 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="flex flex-col items-center bg-indigo-50 p-4">
                  <div className="mb-2 h-min w-min rounded-full border border-gray-900 p-2">
                    <UserIconSolid
                      className="h-10 w-10 text-gray-900"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-normal text-gray-900">
                    {address}
                  </span>
                </div>
                <div className="relative bg-white p-7">
                  <div
                    className="-m-3 flex cursor-pointer items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => {
                      disconnect();
                      close();
                    }}
                  >
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Disconnect
                      </p>
                      <p className="text-sm text-gray-500">
                        Disconnect your wallet
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default WalletConnectedMenu;

import { useEffect, useState } from "react";
import { apolloClient } from "../../pages/_app";
import { gql } from "@apollo/client";
import { queryDefaultProfile } from "../../queries/queries";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useAtom } from "jotai";
import { addressAtom } from "../../store";
import {
  UserIcon as UserIconSolid,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const CustomConnectButton = () => {
  const { address } = useAccount();

  const [, setAddressState] = useAtom(addressAtom);

  const [userHandle, setUserHandle] = useState<string | null>(null);

  useEffect(() => {
    setAddressState(address);
  }, [address, setAddressState]);

  useEffect(() => {
    if (address) {
      apolloClient
        .query({
          query: gql(queryDefaultProfile),
          variables: {
            request: {
              ethereumAddress: address ? address : "",
            },
          },
        })
        .then((response) =>
          setUserHandle(
            response.data.defaultProfile
              ? response.data.defaultProfile.handle
              : null
          )
        );
    }
  }, [address]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800"
                  >
                    <UserIconSolid
                      className="mr-1 h-[1.15rem] w-[1.15rem]"
                      aria-hidden="true"
                    />
                    Login
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-800"
                  >
                    <ExclamationTriangleIcon
                      className="mr-1 h-[1.15rem] w-[1.15rem]"
                      aria-hidden="true"
                    />
                    Wrong Network
                  </button>
                );
              }
              return (
                <div className="">
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="group flex flex-row items-center rounded-md border-2 border-white bg-gray-200 p-1 font-bold shadow-md hover:shadow-lg active:bg-gray-300"
                  >
                    <UserIconSolid
                      className="mr-1 h-[1.15rem] w-[1.15rem]"
                      aria-hidden="true"
                    />
                    {userHandle ? userHandle : account.displayName}
                    <ChevronDownIcon
                      className="ml-[0.15rem] h-[1.3rem] w-[1.3rem] stroke-2 transition duration-200 ease-in-out group-hover:translate-y-[0.15rem]"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;

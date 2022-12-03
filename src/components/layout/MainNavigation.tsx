import { useState, useEffect, Fragment } from "react";
import { Disclosure, Popover, Transition, Menu } from "@headlessui/react";
import {
  UserIcon,
  Bars3Icon,
  XCircleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import CustomConnectButton from "../UI/CustomConnectButton";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MainNavigation = () => {
  const router = useRouter();
  const activeLink = router.pathname;

  const { isConnected, address } = useAccount();

  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  useEffect(() => setIsWalletConnected(isConnected), [isConnected]);

  return (
    <Disclosure as="nav" className="sticky top-0 z-0 bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-14 justify-between">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <ListBulletIcon
                    className="block h-10 w-10 rounded-full bg-indigo-600 p-2 text-white"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <div className="flex px-2 lg:px-0">
                <div className="hidden lg:ml-11 lg:flex lg:items-center lg:gap-x-4">
                  <Link
                    href="/"
                    className={
                      activeLink === "/"
                        ? "inline-flex h-min items-center rounded-md bg-indigo-200 px-3 py-1 text-sm font-semibold text-gray-900"
                        : "inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }
                  >
                    Home
                  </Link>
                  <Link
                    href="/manage-lists"
                    className={
                      activeLink === "/manage-lists"
                        ? "inline-flex h-min items-center rounded-md bg-indigo-200 px-3 py-1 text-sm font-semibold text-gray-900"
                        : "inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }
                  >
                    Manage Lists
                  </Link>
                  <Link
                    href="/explore"
                    className={
                      activeLink === "/explore"
                        ? "inline-flex h-min items-center rounded-md bg-indigo-200 px-3 py-1 text-sm font-semibold text-gray-900"
                        : "inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }
                  >
                    Explore
                  </Link>
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900">
                        More
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 mt-2 origin-top-right rounded-md border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/about"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full px-4 py-2 text-left text-sm text-gray-700"
                              )}
                            >
                              About
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/donate"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full px-4 py-2 text-left text-sm text-gray-700"
                              )}
                            >
                              Donate
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XCircleIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-8 lg:flex lg:items-center">
                {/* Profile dropdown */}
                <CustomConnectButton />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/manage-lists"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Manage Lists
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/explore"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Explore
              </Disclosure.Button>
              <Popover className="relative">
                <>
                  <Popover.Button className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800">
                    More
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
                    <Popover.Panel className="absolute right-[19.5rem] z-10 mt-2 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <div className="relative flex flex-col rounded-lg border border-gray-300 bg-white py-5 px-7">
                          <Link
                            href="/about"
                            className="-m-3 cursor-pointer items-center rounded-lg p-2 text-sm font-normal text-gray-900 transition duration-150 ease-in-out hover:bg-gray-100"
                          >
                            About
                          </Link>
                          <Link
                            href="/donate"
                            className="-m-3 mt-2 cursor-pointer items-center rounded-lg p-2 text-sm font-normal text-gray-900 transition duration-150 ease-in-out hover:bg-gray-100"
                          >
                            Donate
                          </Link>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default MainNavigation;

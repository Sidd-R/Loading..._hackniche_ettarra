"use client";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  // MenuAlt2Icon,
  UsersIcon,
  // XIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon, current: true },
  {
    name: "Products",
    href: "/admin/products",
    icon: SparklesIcon,
    current: false,
  },
  {
    name: "Analysis",
    href: "/admin/analysis",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Competition",
    href: "/admin/competition",
    icon: ChartBarIcon,
    current: false,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Sales",
    href: "/admin/sales",
    icon: CalendarIcon,
    current: false,
  }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar1() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: pathname === item.href,
  }));
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                    alt="Workflow"
                  /> */}
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {updatedNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-800 text-white"
                            : "text-indigo-100 hover:bg-indigo-600",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                alt="Workflow"
              /> */}
              <div className="text-indigo-50 font-thin text-3xl">
                <Image src="/logo.png" width={220} height={50} style={{height: 50, backgroundColor: "white"}}/>
              </div>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {updatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-800 text-white"
                        : "text-indigo-100 hover:bg-indigo-600",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 lg:h-0 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

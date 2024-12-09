import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "../../../assets/adim_navbar/Logo Header-01.svg"
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase/firebase.js";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Dashboard from "../Dashboard.jsx"
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function AdminNavbar({onSignOut}) {
    const TIMEOUT_PERIOD = 30 * 60 * 1000;

    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/login");
            onSignOut();
        } catch (err) {
            console.error("Error signing out:", err.message);
        }
    };

    useEffect(() => {
        // Function to handle session timeout
        const timeoutId = setTimeout(() => {
            signOut(auth)
                .then(() => {
                    toast.warn("User signed out due to inactivity")
                    navigate("/login");
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        }, TIMEOUT_PERIOD);

        // Function to reset the timeout when user is active (e.g., mouse movement or key press)
        const resetTimeout = () => {
            clearTimeout(timeoutId); // Clear existing timeout


            // Set a new timeout
            setTimeout(() => {
                signOut(auth)
                    .then(() => {
                        toast.warn("User signed out due to inactivity")
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.error('Error signing out:', error);
                    });
            }, TIMEOUT_PERIOD); // Restart the timeout countdown
        };

        // Listen to user activity events
        window.addEventListener('mousemove', resetTimeout);
        window.addEventListener('keydown', resetTimeout);

        // Cleanup listeners and timeout when component unmounts
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('mousemove', resetTimeout);
            window.removeEventListener('keydown', resetTimeout);
        };
    }, []);

    useEffect(() => {
        // Function to handle sign-out on page close or tab close
        const handleBeforeUnload = () => {
            signOut(auth)
                .then(() => {
                    console.log("User signed out due to tab/window close");
                })
                .catch((error) => {
                    console.error("Error signing out:", error);
                });
        };

        // Attach the beforeunload event listener
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup: remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <Disclosure as="nav" className="bg-black opacity-75">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-24 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        {/*<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">*/}
                        {/*    <span className="absolute -inset-0.5" />*/}
                        {/*    <span className="sr-only">Open main menu</span>*/}
                        {/*    <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />*/}
                        {/*    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />*/}
                        {/*</DisclosureButton>*/}
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src={logo}
                                className="h-16 w-auto"
                            />
                        </div>
                        {/*<div className="hidden sm:ml-6 sm:block">*/}
                        {/*    <div className="flex space-x-4">*/}
                        {/*        {navigation.map((item) => (*/}
                        {/*            <a*/}
                        {/*                key={item.name}*/}
                        {/*                href={item.href}*/}
                        {/*                aria-current={item.current ? 'page' : undefined}*/}
                        {/*                className={classNames(*/}
                        {/*                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*/}
                        {/*                    'rounded-md px-3 py-2 text-sm font-medium',*/}
                        {/*                )}*/}
                        {/*            >*/}
                        {/*                {item.name}*/}
                        {/*            </a>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"*/}
                        {/*>*/}
                        {/*    <span className="absolute -inset-1.5" />*/}
                        {/*    <span className="sr-only">View notifications</span>*/}
                        {/*    <BellIcon aria-hidden="true" className="size-6" />*/}
                        {/*</button>*/}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="size-14 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <Link
                                        to={"/dashboard"}
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                    >
                                        Home
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        to={"/your-profile"}
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                    >
                                        Your Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        to={"/update-password"}
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                    >
                                        Change Password
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        to={"/login"}
                                        onClick={handleSignOut}
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                    >
                                        Sign out
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                <Link
                                    to={"/save-user"}
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                >
                                    Add User
                                </Link>
                            </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            {/*<DisclosurePanel className="sm:hidden">*/}
            {/*    <div className="space-y-1 px-2 pb-3 pt-2">*/}
            {/*        {navigation.map((item) => (*/}
            {/*            <DisclosureButton*/}
            {/*                key={item.name}*/}
            {/*                as="a"*/}
            {/*                href={item.href}*/}
            {/*                aria-current={item.current ? 'page' : undefined}*/}
            {/*                className={classNames(*/}
            {/*                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*/}
            {/*                    'block rounded-md px-3 py-2 text-base font-medium',*/}
            {/*                )}*/}
            {/*            >*/}
            {/*                {item.name}*/}
            {/*            </DisclosureButton>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</DisclosurePanel>*/}
        </Disclosure>
        </>
    )
}

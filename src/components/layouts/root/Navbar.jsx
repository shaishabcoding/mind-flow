"use client";
import { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { IoMdCart } from "react-icons/io";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const navLinks = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/products",
      title: "Products",
    },
    {
      url: "/blogs",
      title: "Blogs",
    },
  ];

  const links = (
    <>
      {navLinks.map(({ url, title }, idx) => (
        <li key={idx}>
          <Link
            className={
              pathname === url
                ? "bg-teal-200/50 text-teal-700 dark:text-teal-400 dark:bg-teal-700/50 font-semibold hover:cursor-not-allowed"
                : ""
            }
            href={url}
          >
            {title}
          </Link>
        </li>
      ))}
    </>
  );
  return (
    <nav
      id="navbar"
      className="navbar backdrop-blur-md sticky lg:relative  top-0 z-50 bg-gradient-to-r from-green-50/80  dark:from-gray-600/80 via-pink-50/80 dark:via-gray-700/80 to-sky-50/50 dark:to-gray-600/80 dark:text-white lg:rounded-lg"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu max-h-svh z-50 bg-gradient-to-br from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500 menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-base font-bold md:px-4 px-0 md:text-xl"
        >
          <span className="flex gap-1 lg:gap-2 items-center text-teal-500 dark:text-teal-400">
            <Image
              alt="logo"
              width="24"
              height="24"
              className="dark:bg-white dark:mask dark:mask-squircle"
              src="/logo.png"
            />
            MindFlow
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 w-fit">{links}</ul>
      </div>
      <div className="navbar-end flex items-center">
        <div className="dropdown dropdown-bottom dropdown-end mr-2">
          <Link
            href="/cart"
            className="btn md:m-1 text-3xl btn-ghost dark:hover:bg-gray-500 p-2 rounded-full"
          >
            <IoMdCart />
          </Link>
          <button
            onClick={toggleDarkMode}
            className="btn md:m-1 text-3xl btn-ghost dark:hover:bg-gray-500 p-2 rounded-full"
          >
            {isDarkMode ? <CiLight /> : <CiDark />}
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <Image
            alt="logo"
            width="50"
            height="50"
            tabIndex={0}
            role="button"
            title="Profile"
            src="/image-placeholder.jpg"
            className="w-10 lg:w-12 bg-white aspect-square object-center mr-2 md:mr-4 rounded-full ring ring-teal-400 hover:scale-95 dark:ring-gray-400"
          />
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 bg-gradient-to-br from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500"
          >
            <li className="dark:hover:bg-gray-400/30 rounded-md">
              <Link
                href="/dashboard/admin"
                className={
                  pathname === "/dashboard/admin"
                    ? "bg-teal-200/50 text-teal-700 dark:text-teal-400 dark:bg-teal-700/50 font-semibold hover:cursor-not-allowed"
                    : ""
                }
              >
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

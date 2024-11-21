"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ links }) => {
  const pathname = usePathname();
  const { user } = {
    user: {
      displayName: "Shaishab Chandra Shil",
      email: "shaishab316@gmail.com",
      photoURL: "/logo.png",
    },
  };

  const navLinks = (
    <ul className="menu menu-sm lg:menu-md">
      {links.map(({ url, title }, idx) => (
        <li key={idx}>
          <Link
            className={
              pathname === "/dashboard/" + url
                ? "bg-teal-200/50 text-teal-700 dark:text-teal-400 dark:bg-teal-700/50 font-semibold hover:cursor-not-allowed"
                : ""
            }
            href={url}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <nav
      id="sidebar"
      className="navbar backdrop-blur-md bg-gradient-to-r from-green-50/80 dark:from-gray-600/80 via-pink-50/80 dark:via-gray-700/80 to-sky-50/50 dark:to-gray-600/80 dark:text-white lg:rounded-lg"
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
            className="menu mt-4 bg-gradient-to-br from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500 menu-sm dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-base font-bold md:px-4 px-0 md:text-xl"
        >
          <span className="flex gap-1 lg:gap-2 items-center">
            <img
              className="w-[1.5em] dark:bg-white dark:mask dark:mask-squircle"
              src="/logo.png"
            />{" "}
            <span>Hi, {user.displayName.split(" ")[0].slice(0, 10)}</span>
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = ({ links }) => {
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
    <div id="sidebar2">
      <Link
        href="/"
        className="btn btn-ghost text-lg lg:text-xl font-semibold lg:font-bold mt-2 px-4 lg:mb-2 lg:mt-4 flex flex-col gap-1 overflow-ellipsis text-balance"
      >
        <Image
          height="20"
          width="20"
          alt="logo"
          className="dark:bg-white dark:mask dark:mask-squircle"
          src="/logo.png"
        />
        <span>Hi, {user.displayName.split(" ")[0].slice(0, 10)}</span>
      </Link>

      {navLinks}
    </div>
  );
};

export default SideBar;

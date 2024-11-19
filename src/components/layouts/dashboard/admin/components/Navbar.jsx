import { Link } from "react-router-dom";

const Navbar = ({ links }) => {
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
            {links}
          </ul>
        </div>
        <Link
          to="/"
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
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
    </nav>
  );
};

export default Navbar;

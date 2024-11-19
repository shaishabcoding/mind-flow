import Image from "next/image";
import Link from "next/link";

const SideBar = ({ links }) => {
  const { user } = {
    user: {
      displayName: "Shaishab Chandra Shil",
      email: "shaishab316@gmail.com",
      photoURL: "/logo.png",
    },
  };

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

      {links}
    </div>
  );
};

export default SideBar;

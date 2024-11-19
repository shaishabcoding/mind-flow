"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const RootLayout = ({ children }) => {
  const pathname = usePathname();
  return !pathname.includes("dashboard") ? (
    <div className="bg-white dark:bg-black dark:text-white font-open-sans">
      <div className="lg:px-28 lg:pt-6 ">
        <Navbar></Navbar>
        {children}
      </div>
      <Footer></Footer>
    </div>
  ) : (
    children
  );
};

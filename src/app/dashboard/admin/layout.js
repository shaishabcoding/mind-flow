import Navbar from "@/components/layouts/dashboard/admin/Navbar";
import SideBar from "@/components/layouts/dashboard/admin/SideBar";

export const metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard for mind flow",
};

const links = [
  {
    url: "/dashboard/admin/products",
    title: "Manage Products",
  },
  {
    url: "/dashboard/admin/blogs",
    title: "Manage Blogs",
  },
  {
    url: "/dashboard/admin/media",
    title: "Manage Media",
  },
];

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="bg-white h-screen dark:bg-black dark:text-white font-open-sans">
      <div className="md:hidden sticky top-0 z-50">
        <Navbar links={links} />
      </div>
      <div className="lg:px-28 h-screen flex flex-row lg:py-6 lg:gap-6">
        <div className="w-96 md:w-72 hidden md:block bg-gradient-to-br from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500 h-full lg:rounded-lg">
          <SideBar links={links} />
        </div>
        <div className="flex-grow h-full w-full md:p-2 pt-1 lg:p-0">
          <div className="h-full w-full overflow-hidden lg:p-6 pt-6 px-2 pb-2 lg:mx-0 md:rounded-lg md:border bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
            <div className="h-full w-full overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

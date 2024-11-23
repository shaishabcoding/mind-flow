import Navbar from "@/components/layouts/root/Navbar";
import Footer from "@/components/layouts/root/Footer";
import { auth } from "@/auth";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <div className="bg-white dark:bg-black dark:text-white font-open-sans">
      <div className="lg:px-28 lg:pt-6 ">
        <Navbar user={session?.user}></Navbar>
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
}

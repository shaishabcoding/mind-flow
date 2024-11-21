import Navbar from "@/components/layouts/root/Navbar";
import Footer from "@/components/layouts/root/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="bg-white dark:bg-black dark:text-white font-open-sans">
      <div className="lg:px-28 lg:pt-6 ">
        <Navbar></Navbar>
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
}

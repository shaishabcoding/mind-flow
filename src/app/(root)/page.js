import Banner from "@/components/root/home/Banner";
import ProductsComponent from "@/components/root/products/ProductsComponent";
import BlogsComponent from "@/components/root/products/BlogsComponent";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="mx-2 lg:mx-0 mb-6">
        <div className="mt-6">
          <Link href="/products" className="group">
            <h2 className="text-3xl group-hover:scale-y-110 my-10 font-semibold mb-6">
              Recent Products{" "}
              <FaArrowRight className="inline group-hover:ml-2" />
            </h2>
          </Link>
          <ProductsComponent max={3} />
        </div>
        <div className="mt-6">
          <Link href="/blogs" className="group hover:text-teal-500">
            <h2 className="text-3xl group-hover:scale-1 my-10 font-semibold mb-6">
              Recent Blogs <FaArrowRight className="inline group-hover:ml-2" />
            </h2>
          </Link>
          <BlogsComponent max={3} />
        </div>
      </div>
    </div>
  );
}

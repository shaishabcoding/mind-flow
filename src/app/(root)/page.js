import Banner from "@/components/root/home/Banner";
import ProductsComponent from "@/components/root/products/ProductsComponent";
import BlogsComponent from "@/components/root/products/BlogsComponent";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaIntegration from "@/components/root/home/MediaIntegration";
import Faq from "@/components/root/home/Faq";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="mx-2 lg:mx-0 mb-6">
        <div className="mt-6">
          <Link
            href="/products"
            className="group hover:text-teal-500 hover:drop-shadow-sm"
          >
            <h2 className="text-3xl my-10 font-semibold mb-6">
              Recent Products{" "}
              <FaArrowRight className="inline group-hover:ml-2" />
            </h2>
          </Link>
          <ProductsComponent max={3} />
        </div>
        <div className="mt-6">
          <Link
            href="/blogs"
            className="group hover:text-teal-500 hover:drop-shadow-sm"
          >
            <h2 className="text-3xl my-10 font-semibold mb-6">
              Recent Blogs <FaArrowRight className="inline group-hover:ml-2" />
            </h2>
          </Link>
          <BlogsComponent max={3} />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="overflow-hidden">
            <MediaIntegration />
          </div>
          <div className="overflow-hidden">
            <MediaIntegration />
          </div>
        </div>
        <Faq />
      </div>
    </div>
  );
}

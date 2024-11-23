import Banner from "@/components/root/home/Banner";
import ProductsComponent from "@/components/root/products/ProductsComponent";
import BlogsComponent from "@/components/root/products/BlogsComponent";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaIntegration from "@/components/root/home/MediaIntegration";
import Faq from "@/components/root/home/Faq";

const getMedia = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/media`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch media");
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching media:", error);
    return null;
  }
};

export default async function Home() {
  const media = await getMedia();
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
      <div className="mx-2 lg:mx-0 mb-6">
        <h2 className="text-3xl my-10 font-semibold mb-6">Features Media</h2>

        <div className="flex flex-wrap gap-4 justify-center">
          {media?.map(({ link, _id }) => (
            <div className="overflow-hidden" key={_id}>
              <MediaIntegration src={link} />
            </div>
          ))}
        </div>
      </div>
      <Faq />
    </div>
  );
}

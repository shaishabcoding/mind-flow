import BlogsComponent from "@/components/root/products/BlogsComponent";

export const metadata = {
  title: "Blogs",
};

export default function Blogs() {
  return (
    <div className="px-4 lg:px-0 mb-6">
      <h2 className="text-4xl text-center my-10 font-semibold mx-2 mb-6">
        Blogs
      </h2>
      <BlogsComponent />
    </div>
  );
}

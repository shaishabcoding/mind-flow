/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { MdDateRange } from "react-icons/md";
import BlogsComponent from "@/components/root/products/BlogsComponent";

const getBlogById = async (id) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const blog = await getBlogById(id);

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The blog you're looking for could not be found.",
      };
    }

    return {
      title: `${blog.name} - Blog Details`,
      description: blog.description,
      openGraph: {
        title: `${blog.name} - Blog Details`,
        description: blog.description,
        images: [blog.image],
      },
    };
  } catch {
    return {
      title: "Error",
      description: "An error occurred while fetching the blog details.",
    };
  }
}

export default async function Blog({ params }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return (
      <div className="container mx-auto my-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Blog Not Found</h1>
        <p className="text-gray-500">
          We couldn't find the blog you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 mx-4 lg:mx-0">
      <div
        key={blog._id}
        className="border flex flex-col gap-6 md:flex-row drop-shadow-sm rounded-md p-4 bg-white dark:bg-gray-700"
      >
        <img
          alt={blog.name}
          src={blog.image}
          className="drop-shadow-sm border md:w-1/2 aspect-video object-center bg-gray-100 dark:bg-gray-500 rounded-md"
        />

        <div className="grow md:w-1/2">
          <div className="mt-4 flex flex-row gap-4">
            <div className="avatar">
              <div className="w-12 rounded-full bg-white dark:bg-gray-700 drop-shadow-sm border">
                <img
                  width={52}
                  height={52}
                  alt="author"
                  src="/image-placeholder.jpg"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold">Shaishab Chandra Shil</h3>
              <p className="flex items-center text-sm">
                <MdDateRange className="inline mr-1" />
                {blog.date}
              </p>
            </div>
          </div>
          <h3 className="font-semibold text-2xl mt-4">{blog.name}</h3>
          <p className="text-sm">{blog.description}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl my-10 font-semibold mx-2 mb-6">
          Related Blogs
        </h2>
        <BlogsComponent max={3} />
      </div>
    </div>
  );
}

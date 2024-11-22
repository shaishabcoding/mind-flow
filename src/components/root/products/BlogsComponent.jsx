"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { TbListDetails } from "react-icons/tb";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import Image from "next/image";

export default function ProductsComponent({ max = null }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then(({ data, success }) => {
        if (success) {
          max ? setBlogs(data.slice(0, max)) : setBlogs(data);
        }
      });
  }, [max]);

  return (
    <>
      {blogs.length < 1 && "No blogs found!"}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs?.map((blog) => (
          <div
            key={blog._id}
            className="border drop-shadow-sm rounded-md p-4 bg-white dark:bg-gray-700"
          >
            <img
              alt={blog.name}
              src={blog.image}
              className="drop-shadow-sm aspect-video w-full object-cover bg-gray-100 dark:bg-gray-500 rounded-md"
            />
            <div className="mt-4 flex flex-row gap-4">
              <div className="avatar">
                <div className="w-12 rounded-full bg-white dark:bg-gray-700 drop-shadow-sm border">
                  <Image
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

            <p className="text-sm">
              {blog.description?.slice(0, 80)}
              {blog.description?.length > 80 && "..."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={"/blogs/" + blog._id}>
                <button className="btn grow btn-xs md:btn-sm text-teal-800 hover:bg-teal-300/50 hover:scale-105 bg-teal-200/30 dark:bg-teal-500 dark:text-teal-900">
                  <TbListDetails className="inline" /> View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

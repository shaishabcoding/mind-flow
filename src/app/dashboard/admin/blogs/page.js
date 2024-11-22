"use client";
import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import { toast } from "sonner";
import Image from "next/image";
import Swal from "sweetalert2";
import formateDate from "@/utils/formateDate";

export default function ManageBlogs() {
  const productModalRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [notifyBlogsCng, setNotifyBlogsCng] = useState(false);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then(({ data, success }) => {
        if (success) setBlogs(data);
      });
  }, [notifyBlogsCng]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    productModalRef.current.close();

    const toastId = toast.loading("Creating new blog...");

    const newBlog = {
      name: e.target.name.value,
      image: e.target.image.value,
      date: e.target.date.value,
      description: e.target.description.value,
    };

    console.log(newBlog);

    const res = await fetch("/api/blogs/create", {
      method: "POST",
      body: JSON.stringify(newBlog),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { message, error } = await res.json();
    !error
      ? toast.success(message, { id: toastId })
      : toast.error(error, { id: toastId });

    !error && setNotifyBlogsCng(!notifyBlogsCng);

    e.target.reset();
  };

  const handleUpdateProduct = async (e, productId) => {
    e.preventDefault();
    productModalRef.current.close();

    const toastId = toast.loading("Updating product...");

    const updatedProduct = {
      name: e.target.name.value,
      image: e.target.image.value,
      date: e.target.date.value,
      description: e.target.description.value,
    };

    const res = await fetch(`/api/blogs/${productId}/edit`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { message, error } = await res.json();
    !error
      ? toast.success(message, { id: toastId })
      : toast.error(error, { id: toastId });

    !error && setNotifyBlogsCng(!notifyBlogsCng);

    e.target.reset();
  };

  const handleDeleteProduct = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting product...");

        const res = await fetch(`/api/blogs/${productId}/delete`, {
          method: "DELETE",
        });

        const { message, error } = await res.json();
        !error
          ? toast.success(message, { id: toastId })
          : toast.error(error, { id: toastId });

        !error && setNotifyBlogsCng(!notifyBlogsCng);
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mx-2 mb-6">Blogs</h2>

      <div className="overflow-x-auto overflow-y-visible min-h-20">
        <table className="table border rounded-md dark:text-black table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Image</td>
              <td>Name</td>
              <td>Description</td>
              <td>Date</td>
              <td>
                <div
                  className="tooltip font-medium tooltip-left md:tooltip-bottom z-1 relative"
                  data-tip="Create"
                >
                  <button
                    className="text-xl flex items-center text-teal-800 hover:bg-teal-300/50 hover:scale-105 bg-teal-200/30 dark:bg-teal-500 dark:text-teal-900 rounded-full p-1"
                    onClick={() => {
                      setBlog({});
                      productModalRef.current.showModal();
                    }}
                  >
                    <MdAddCircleOutline />
                  </button>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {blogs?.map(({ _id, name, description, image, date }, idx) => (
              <tr key={_id}>
                <th>{idx + 1}</th>
                <td>
                  <Image
                    src={image}
                    alt={name}
                    width="30"
                    height="30"
                    className="object-center"
                  />
                </td>
                <td>{name}</td>
                <td>
                  {description?.slice(0, 20)}
                  {description?.length > 20 && "..."}
                </td>
                <td>{formateDate(date)}</td>
                <td>
                  <div className="flex flex-row gap-2">
                    <div
                      className="tooltip tooltip-left md:tooltip-bottom z-1 relative"
                      data-tip="Update"
                    >
                      <button
                        className="text-sm md:text-xl flex items-center text-teal-800 hover:bg-teal-300/50 hover:scale-105 bg-teal-200/30 dark:bg-teal-500 dark:text-teal-900 rounded-full p-1"
                        onClick={() => {
                          setBlog({
                            name,
                            description,
                            image,
                            date,
                            _id,
                          });
                          productModalRef.current.showModal();
                        }}
                      >
                        <FiEdit />
                      </button>
                    </div>
                    <div
                      className="tooltip tooltip-left md:tooltip-bottom z-1 relative"
                      data-tip="Delete"
                    >
                      <button
                        className="text-sm md:text-xl flex items-center text-red-800 hover:bg-red-300/50 hover:scale-105 bg-red-200/30 rounded-full p-1"
                        onClick={() => handleDeleteProduct(_id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}

            <tr className="h-8">
              <td className="bg-white"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <dialog ref={productModalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            {blog?._id ? "Update " : "Create new "}
            Blog!
          </h3>
          <form
            onSubmit={(e) => {
              blog?._id
                ? handleUpdateProduct(e, blog._id)
                : handleCreateBlog(e);
            }}
            className="flex flex-col gap-2 mt-2"
          >
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                defaultValue={blog?.name ?? ""}
                required
                name="name"
                type="text"
                className="grow"
                placeholder="Enter product name"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Image
              <input
                defaultValue={blog?.image ?? ""}
                required
                name="image"
                type="url"
                className="grow"
                placeholder="Enter product image url"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Date
              <input
                defaultValue={blog?.date ?? ""}
                required
                name="date"
                type="date"
                className="grow"
                placeholder="Enter product date"
              />
            </label>
            <label className="textarea textarea-bordered flex items-start flex-col gap-2">
              Description
              <textarea
                defaultValue={blog?.description ?? ""}
                required
                name="description"
                type="text"
                className="grow w-full"
                placeholder="Enter product description"
              />
            </label>

            <button className="btn btn-primary" type="submit">
              {blog?._id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

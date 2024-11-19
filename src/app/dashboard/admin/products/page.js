"use client";
import Link from "next/link";
import { useRef } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { toast } from "sonner";

export default function ManageProducts() {
  const newProductModalRef = useRef();
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    newProductModalRef.current.close();

    const toastId = toast.loading("Creating new products...");

    const newProduct = {
      name: e.target.name.value,
      image: e.target.image.value,
      price: +e.target.price.value,
      description: e.target.description.value,
    };

    const res = await fetch("/api/products/create", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { message, error } = await res.json();
    !error
      ? toast.success(message, { id: toastId })
      : toast.error(error, { id: toastId });
  };

  return (
    <div>
      <h2>Products</h2>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => newProductModalRef.current.showModal()}
      >
        open modal
      </button>
      <div className="overflow-x-auto rounded-md border">
        <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
              <td>Image</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {/* {meals?.meals?.map((meal, idx) => {
              const { _id, title, likes, reviews, username } = meal;
              return (
                <tr
                  key={_id}
                  className="dark:bg-gray-400 dark:text-white dark:even:text-gray-700"
                >
                  <th className="dark:text-black dark:odd:bg-gray-400 ">
                    {idx + 1}
                  </th>
                  <td>{title}</td>
                  <td>{likes || 0}</td>
                  <td>{reviews?.length || 0}</td>
                  <td>{username}</td>
                  <td className="flex gap-2 w-fit">
                    <Link
                      className="grid w-full"
                      href={`/dashboard/meals/edit/${_id}`}
                    >
                      <button
                        title="update"
                        className="btn text-white btn-info btn-xs md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                      >
                        <BiSolidEdit />
                      </button>
                    </Link>
                    <button
                      disabled={deleteLoading[0] && deleteLoading[1] === _id}
                      onClick={() => handleDelete(_id)}
                      title="delete"
                      className="btn text-white disabled:text-primary btn-error btn-xs  md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                    >
                      {deleteLoading[0] && deleteLoading[1] === _id ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <RiDeleteBin6Fill />
                      )}
                    </button>
                    <Link className="grid w-full" to={`/meal/${_id}`}>
                      <button
                        title="details"
                        className="btn text-white btn-xs btn-primary md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                      >
                        <TbListDetails />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
      <dialog ref={newProductModalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Create new Product!</h3>
          <form
            onSubmit={handleCreateProduct}
            className="flex flex-col gap-2 mt-2"
          >
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
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
                required
                name="image"
                type="url"
                className="grow"
                placeholder="Enter product image url"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Price
              <input
                required
                name="price"
                type="number"
                className="grow"
                placeholder="Enter product price"
              />
            </label>
            <label className="textarea textarea-bordered flex items-start flex-col gap-2">
              Description
              <textarea
                required
                name="description"
                type="text"
                className="grow w-full"
                placeholder="Enter product description"
              />
            </label>

            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

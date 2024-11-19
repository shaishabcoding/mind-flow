"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "sonner";
import Image from "next/image";

export default function ManageProducts() {
  const newProductModalRef = useRef();
  const [products, setProducts] = useState([]);

  const [notifyProductsCng, setNotifyProductsCng] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(({ data, success }) => {
        if (success) setProducts(data);
      });
  }, [notifyProductsCng]);

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

    !error && setNotifyProductsCng(!notifyProductsCng);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mx-2 mb-6">Products</h2>

      <div className="overflow-x-auto overflow-y-hidden rounded-md border">
        <table className="table dark:text-black table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
              <td>Image</td>
              <td>
                <div
                  className="tooltip tooltip-left md:tooltip-bottom z-1 relative"
                  data-tip="Create Product"
                >
                  <button
                    className="text-xl flex items-center text-teal-800 hover:bg-teal-300/50 hover:scale-105 bg-teal-200/30 rounded-full p-1"
                    onClick={() => newProductModalRef.current.showModal()}
                  >
                    <MdAddCircleOutline />
                  </button>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {products?.map(({ _id, name, description, image, price }, idx) => (
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
                <td>{description}</td>
                <td>${price}</td>
              </tr>
            ))}
            {products?.length < 1 && (
              <tr className="h-12">
                <td className="bg-white"></td>
              </tr>
            )}
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

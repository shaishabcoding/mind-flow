"use client";
import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import { toast } from "sonner";
import Image from "next/image";
import Swal from "sweetalert2";

export default function ManageMedia() {
  const mediaModalRef = useRef();
  const [media, setMedia] = useState([]);
  const [product, setProduct] = useState({});
  const [notifyMediaCng, setNotifyMediaCng] = useState(false);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then(({ data, success }) => {
        if (success) setMedia(data);
      });
  }, [notifyMediaCng]);

  const handleCreateMedia = async (e) => {
    e.preventDefault();
    mediaModalRef.current.close();

    const toastId = toast.loading("Creating new media...");

    const newMedia = {
      link: e.target.link.value,
    };

    const res = await fetch("/api/media/create", {
      method: "POST",
      body: JSON.stringify(newMedia),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { message, error } = await res.json();
    !error
      ? toast.success(message, { id: toastId })
      : toast.error(error, { id: toastId });

    !error && setNotifyMediaCng(!notifyMediaCng);

    e.target.reset();
  };

  const handleDeleteMedia = async (productId) => {
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
        const toastId = toast.loading("Deleting media...");

        const res = await fetch(`/api/media/${productId}/delete`, {
          method: "DELETE",
        });

        const { message, error } = await res.json();
        !error
          ? toast.success(message, { id: toastId })
          : toast.error(error, { id: toastId });

        !error && setNotifyMediaCng(!notifyMediaCng);
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mx-2 mb-6">Media</h2>

      <div className="overflow-x-auto overflow-y-visible min-h-20">
        <table className="table border rounded-md dark:text-black table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Link</td>
              <td>
                <div
                  className="tooltip font-medium tooltip-left md:tooltip-bottom z-1 relative"
                  data-tip="Create"
                >
                  <button
                    className="text-xl flex items-center text-teal-800 hover:bg-teal-300/50 hover:scale-105 bg-teal-200/30 dark:bg-teal-500 dark:text-teal-900 rounded-full p-1"
                    onClick={() => {
                      setProduct({});
                      mediaModalRef.current.showModal();
                    }}
                  >
                    <MdAddCircleOutline />
                  </button>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {media?.map(({ _id, link }, idx) => (
              <tr key={_id}>
                <th>{idx + 1}</th>
                <td>{link}</td>
                <td>
                  <div
                    className="tooltip tooltip-left md:tooltip-bottom z-1 relative"
                    data-tip="Delete"
                  >
                    <button
                      className="text-sm md:text-xl flex items-center text-red-800 hover:bg-red-300/50 hover:scale-105 bg-red-200/30 rounded-full p-1"
                      onClick={() => handleDeleteMedia(_id)}
                    >
                      <MdDelete />
                    </button>
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
      <dialog ref={mediaModalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Create new Media!</h3>
          <form
            onSubmit={(e) => {
              handleCreateMedia(e);
            }}
            className="flex flex-col gap-2 mt-2"
          >
            <label className="input input-bordered flex items-center gap-2">
              Link
              <input
                required
                name="link"
                type="link"
                className="grow"
                placeholder="Enter media link"
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

"use client";
import AddToCart from "@/components/root/products/addToCart";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { toast } from "sonner";

const fetchProductDetails = async (productIds) => {
  try {
    const promises = productIds.map((id) =>
      fetch(`/api/products/${id}`).then((res) => res.json())
    );
    const products = await Promise.all(promises);
    return products.map((response) => response.data);
  } catch (error) {
    console.error("Error fetching product details:", error);
    toast.error("Failed to load cart items.");
    return [];
  }
};

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [notifyCartCng, setNotifyCartCng] = useState(false);

  const notifyCng = () => {
    setNotifyCartCng(!notifyCartCng);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
      fetchProductDetails(cart).then(setCartProducts);
    } else {
      setCartProducts([]);
    }
  }, [notifyCartCng]);

  return (
    <div className="px-4 lg:px-0">
      <h2 className="text-4xl text-center my-10 font-semibold mx-2 mb-6">
        Cart Products
      </h2>
      {cartProducts.length < 1 && "No cart products found!"}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartProducts?.map((product) => (
          <div
            key={product._id}
            className="border drop-shadow-sm rounded-md p-4 bg-white dark:bg-gray-700"
          >
            <img
              alt={product.name}
              src={product.image}
              className="drop-shadow-sm aspect-video w-full object-center bg-gray-100 dark:bg-gray-500 rounded-md"
            />

            <h3 className="font-semibold text-2xl mt-4">{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p className="text-sm">
              {product.description?.slice(0, 80)}
              {product.description?.length > 80 && "..."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={"/products/" + product._id}>
                <button className="btn grow btn-xs md:btn-sm text-teal-800 hover:bg-teal-300/50 hover:scale-105 bg-teal-200/30">
                  <TbListDetails className="inline" /> View Details
                </button>
              </Link>
              <AddToCart id={product._id} cb={notifyCng} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

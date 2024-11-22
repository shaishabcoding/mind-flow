"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { TbListDetails } from "react-icons/tb";
import AddToCart from "./addToCart";
import { useEffect, useState } from "react";

export default function ProductsComponent({ max = null }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(({ data, success }) => {
        if (success) {
          max ? setProducts(data.slice(0, max)) : setProducts(data);
        }
      });
  }, [max]);

  return (
    <>
      {products.length < 1 && "No products found!"}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="border drop-shadow-sm rounded-md p-4 bg-white dark:bg-gray-700"
          >
            <img
              alt={product.name}
              src={product.image}
              className="drop-shadow-sm aspect-video w-full object-cover bg-gray-100 dark:bg-gray-500 rounded-md"
            />

            <h3 className="font-semibold text-2xl mt-4">{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p className="text-sm">
              {product.description?.slice(0, 80)}
              {product.description?.length > 80 && "..."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={"/products/" + product._id}>
                <button className="btn grow btn-xs md:btn-sm text-teal-800 hover:bg-teal-300/50 hover:scale-105 bg-teal-200/30 dark:bg-teal-500 dark:text-teal-900">
                  <TbListDetails className="inline" /> View Details
                </button>
              </Link>
              <AddToCart id={product._id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

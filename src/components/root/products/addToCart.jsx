"use client";
import { IoMdCart } from "react-icons/io";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const toggleCart = (productId, isInCart, setInCart, cb) => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (isInCart) {
      const updatedCart = cart.filter((id) => id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setInCart(false);
      toast.success("Product removed from cart!");
    } else {
      cart.push(productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      setInCart(true);
      toast.success("Product added to cart!");
    }
    cb();
  } catch (error) {
    console.error("Error toggling cart state:", error);
    toast.error("Something went wrong!");
  }
};

export default function AddToCart({ id, cb = () => {} }) {
  const [isInCart, setInCart] = useState(false);

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setInCart(cart.includes(id));
    } catch (error) {
      console.error("Error loading cart state:", error);
    }
  }, [id]);

  return (
    <button
      className={`btn grow btn-xs md:btn-sm ${
        isInCart
          ? "text-red-800 hover:bg-red-300/50 bg-red-200/30"
          : "text-teal-800 hover:bg-teal-300/50 bg-teal-200/30"
      } hover:scale-105`}
      onClick={() => toggleCart(id, isInCart, setInCart, cb)}
    >
      <IoMdCart className="inline" />{" "}
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}

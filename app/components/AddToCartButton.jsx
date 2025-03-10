"use client";

import { useState, useEffect } from "react";

const AddToCartButton = ({ productId }) => {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setIsInCart(cart.includes(productId));
  }, [productId]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!isInCart) {
      cart.push(productId);
      setIsInCart(true);
    } else {
      cart = cart.filter((id) => id !== productId);
      setIsInCart(false);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`${!isInCart ? "bg-blue-500" : "border text-black bg-red-500"} text-white font-bold py-2 px-4 rounded cursor-pointer outline-none`}
    >
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
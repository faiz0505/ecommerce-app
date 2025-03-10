"use client";
import { useState, useEffect } from "react"
import CartItem from "../components/CartItem";
import { getProductsByIds } from "../lib/actions";

const page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const cartIds = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartIds.length > 0) {
          const products = await getProductsByIds(cartIds);
          setCartItems(products);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    const cartIds = updatedCart.map((item) => item._id);
    localStorage.setItem("cart", JSON.stringify(cartIds));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onRemove={handleRemoveFromCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;

const ErrorMessage = ({ message }) => {
    return <p className="text-red-500">{message}</p>;
  };
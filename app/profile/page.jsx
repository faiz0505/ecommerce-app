"use client";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct, editProduct } from "../lib/actions";
import EditableProductCard from "../components/EditableProductCard";
import ProductForm from "../components/ProductForm";
import next from "next";

const ProfilePage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts({next:{tags:["products"]}});
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    setError(null);
    try {
      await deleteProduct(productId);
      fetchData();
    } catch (err) {
      setError(err.message || "Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditProductData(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditProductData(null);
  };

  const handleProductUpdate = async () => {
    fetchData();
    closeModal();
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">All Products</h1>
          <button
            className="bg-blue-500 px-3 py-2 rounded text-white font-semibold cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Product
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <ErrorMessage message={error} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <EditableProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 h-full w-full left-0 flex justify-center items-center bg-black/50 bg-opacity-50">
          <ProductForm
            closeModal={closeModal}
            productData={editProductData}
            onProductUpdate={handleProductUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

const ErrorMessage = ({ message }) => {
  return <p className="text-red-500">{message}</p>;
};
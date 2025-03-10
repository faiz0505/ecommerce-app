"use client";
import { useState, useEffect } from "react";
import { addProduct, editProduct } from "../lib/actions";

const ProductForm = ({ closeModal, productData, onProductUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (productData) {
      setFormData(productData);
      setFormData((pre) => ({...pre,name:productData.title}))
      setImagePreview(productData.imageUrl);
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData((pre) => ({ ...pre, imageUrl: url }));

    try {
      new URL(url);
      setImagePreview(url);
      setError(null);
    } catch (_) {
      setImagePreview(null);
      setError("Invalid image URL");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (productData) {
        await editProduct({ ...formData, id: productData._id });
      } else {
        await addProduct(formData);
      }
      setSuccess(true);
      if (!productData) {
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          price: "",
          category: "",
        });
        setImagePreview(null);
      }
      if (onProductUpdate) {
        onProductUpdate();
      }
    } catch (err) {
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-xl mx-auto shadow bg-white max-h-[80vh] overflow-y-auto rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {productData ? "Edit Product" : "Add New Product"}
      </h1>

      {loading && <p>Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {success && <p className="text-green-500">Product saved successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            value={formData.description}
            name="description"
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Image URL:</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={handleImageUrlChange}
            className="border p-2 w-full"
            required
          />
        </div>
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-xs rounded-xl"
            />
          </div>
        )}
        <div>
          <label className="block">Price:</label>
          <input
            type="number"
            value={formData.price}
            onChange={handleChange}
            name="price"
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Category:</label>
          <input
            type="text"
            value={formData.category}
            name="category"
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            {loading ? "loadind..." : productData ? "Update Product" : "Add Product"}
          </button>
          <button className="px-3 py-2 border cursor-pointer rounded" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

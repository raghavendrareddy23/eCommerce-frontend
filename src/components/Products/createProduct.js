import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    subCategoryName: "",
    productName: "",
    productDescription: "",
    price: "",
    sellPrice: "",
    stock: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("adminToken");

    try {
      const response = await fetch(
        "https://ecommerce-backend-fm0r.onrender.com/product/uploadImage",
        {
          method: "POST",
          body: new FormData(e.target),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      toast.success("Product created successfully");
      // Reset form after successful submission
      setFormData({
        subCategoryName: "",
        productName: "",
        productDescription: "",
        price: "",
        sellPrice: "",
        stock: "",
        images: [],
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create product");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subCategoryName"
          value={formData.subCategoryName}
          onChange={handleInputChange}
          placeholder="Subcategory Name"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleInputChange}
          placeholder="Product Description"
          className="mb-4 p-2 border border-gray-300 rounded w-full h-32 resize-none"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="number"
          name="sellPrice"
          value={formData.sellPrice}
          onChange={handleInputChange}
          placeholder="Sell Price"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateProduct;

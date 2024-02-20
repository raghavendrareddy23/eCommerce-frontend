import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import axios from 'axios'; // Import Axios

const ProductStatus = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-backend-fm0r.onrender.com/product/');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.patch(`https://ecommerce-backend-fm0r.onrender.com/product/${id}`, 
        { productStatus: updatedStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        // If PATCH request is successful, update the local state
        const updatedProducts = products.map(product => {
          if (product._id === id) {
            return { ...product, productStatus: updatedStatus };
          }
          return product;
        });
        setProducts(updatedProducts);
      } else {
        console.error('Error updating product status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center m-10">
      {products.map((product, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="w-full overflow-hidden">
            <Slide autoplay={true} duration={5000}>
              {product.imageGallery.map((image, index) => (
                <div key={index} className="each-slide">
                  <img src={image} alt={`Product ${index + 1}`} className="object-cover w-full h-60 float-none" />
                </div>
              ))}
            </Slide>
          </div>
          <div className="w-2/3 p-4">
            <h3 className="text-xl font-semibold">{product.productName}</h3>
            <p className="text-gray-600 mb-2">{product.productDescription}</p>
            <div className="flex items-center justify-between">
              <div>
                {product.discount && (
                  <p className="text-gray-500 line-through">${product.price}</p>
                )}
                <p className="text-sm text-lime-600 font-semibold">Discount: <span className='font-bold'>{product.discount}%</span></p>
                <p className="text-green-600 font-semibold">${product.sellPrice}</p>
              </div>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
            </div>
            <p className={`text-xl font-semibold ${product.productStatus === 'active' ? 'text-green-800' : 'text-red-800'}`}>
              {product.productStatus}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => toggleStatus(product._id, product.productStatus)}
            >
              Change Status
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStatus;

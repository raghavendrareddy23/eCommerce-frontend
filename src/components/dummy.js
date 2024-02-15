import React, { useState, useEffect } from 'react';

const UpdateCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryStatus, setCategoryStatus] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/category');
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('categoryName', categoryName);
      formData.append('categoryStatus', categoryStatus);
      formData.append('image', image);

      // Make a PUT request to update the category with selectedCategoryId
      const response = await fetch(`http://localhost:5000/category/${selectedCategoryId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      console.log(data); // Handle response data as needed
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  return (
    <div>
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categorySelect">Select Category:</label>
          <select id="categorySelect" value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.categoryName}</option>
            ))}
          </select>
        </div>
        {selectedCategoryId && (
          <>
            <div>
              <label htmlFor="categoryName">Category Name:</label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="categoryStatus">Category Status:</label>
              <input
                type="text"
                id="categoryStatus"
                value={categoryStatus}
                onChange={(e) => setCategoryStatus(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="file">Choose File:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit">Update Category</button>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateCategoryForm;

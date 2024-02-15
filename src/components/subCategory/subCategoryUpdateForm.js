import React, { useState } from 'react';

const SubcategoryUpdateForm = ({ subcategory, onUpdate }) => {
  const [formData, setFormData] = useState({
    subCategoryName: subcategory.subCategoryName,
    subCategoryStatus: subcategory.subCategoryStatus,
    categoryName: subcategory.categoryName,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subCategoryName, subCategoryStatus, categoryName, file } = formData;
    const formDataToUpdate = new FormData();
    formDataToUpdate.append('subCategoryName', subCategoryName);
    formDataToUpdate.append('subCategoryStatus', subCategoryStatus);
    formDataToUpdate.append('categoryName', categoryName);
    formDataToUpdate.append('file', file);

    // Call the onUpdate function passed from the parent component to update the subcategory
    onUpdate(subcategory._id, formDataToUpdate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="subCategoryName" className="block text-gray-700 font-bold mb-2">Subcategory Name</label>
        <input
          type="text"
          id="subCategoryName"
          name="subCategoryName"
          value={formData.subCategoryName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="subCategoryStatus" className="block text-gray-700 font-bold mb-2">Subcategory Status</label>
        <select
          id="subCategoryStatus"
          name="subCategoryStatus"
          value={formData.subCategoryStatus}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="file" className="block text-gray-700 font-bold mb-2">Upload Image</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Subcategory
      </button>
    </form>
  );
};

export default SubcategoryUpdateForm;

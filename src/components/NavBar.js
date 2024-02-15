import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [dropdowns, setDropdowns] = useState({
    categories: false,
    subcategories: false,
    products: false,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = (dropdownName) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [dropdownName]: !prevDropdowns[dropdownName],
    }));
    // Close the menu when a dropdown item is clicked
    // setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative z-50"> {/* Increase z-index here */}
      <div className={`w-64 bg-gray-600 text-white h-full fixed top-0 left-0 bottom-0 overflow-y-auto ${isMenuOpen ? '' : 'hidden'}`}>
        <div className="p-4 flex justify-between items-center">
          <div>Admin Dashboard</div>
          <div onClick={toggleMenu} className="cursor-pointer">
            <FaTimes size={25}/>
          </div>
        </div>
        <nav className="p-2">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700" onClick={() => toggleDropdown('categories')}>
              Category
              {dropdowns.categories && (
                <ul className="ml-4 p-2">
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/create" onClick={closeMenu}>Add Categories</Link>
                  </li>
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/categories" onClick={closeMenu}>Categories</Link>
                  </li>
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/category-update" onClick={closeMenu}>Update Categories</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="px-4 py-2 hover:bg-gray-700" onClick={() => toggleDropdown('subcategories')}>
              SubCategory
              {dropdowns.subcategories && (
                <ul className="ml-4 p-2">
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/subcategory/create" onClick={closeMenu}>Add Subcategories</Link>
                  </li>
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/subcategories" onClick={closeMenu}>Subcategories</Link>
                  </li>
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/subcategory-update" onClick={closeMenu}>Update SubCategories</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="px-4 py-2 hover:bg-gray-700" onClick={() => toggleDropdown('products')}>
              Product
              {dropdowns.products && (
                <ul className="ml-4 p-2">
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/create-product" onClick={closeMenu}>Add Product</Link>
                  </li>
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/products" onClick={closeMenu}>Products</Link>
                  </li>
                  <li className='hover:bg-blue-700 p-2'>
                    <Link to="/product-update" onClick={closeMenu}>Update Product</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/user-activity" onClick={closeMenu}>User Activity</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div onClick={toggleMenu} className="sidebar-toggle cursor-pointer pl-5">
        {isMenuOpen ? <FaTimes /> : <FaBars size={25}/>}
      </div>
    </div>
  );
};

export default Navbar;

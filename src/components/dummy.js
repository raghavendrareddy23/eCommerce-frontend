import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-gray-800 w-64 ${isOpen ? '' : 'hidden md:block'}`}>
      <div className="text-white text-lg font-semibold p-4">
        Sidebar
        <button onClick={toggleSidebar} className="float-right p-2 focus:outline-none md:hidden">
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      <ul className="text-white">
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4">
          <Link to="/categories">Categories</Link>
        </li>
        <li className="p-4">
          <Link to="/subcategories">Subcategories</Link>
        </li>
        <li className="p-4">
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";

export default function TopNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUsername");
  };

  return (
    <nav className="relative flex items-center justify-between px-2 py-3 bg-gray-600 mb-3">
      <div className="container mx-auto flex items-center">
        <div className="mr-8">
          <Navbar />
        </div>
        <div className="text-center flex-grow">
          <Link
            className="text-2xl font-bold leading-relaxed inline-block py-2 whitespace-nowrap uppercase text-white"
            to="/home"
          >
            Company Name
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex list-none">
            <li className="pl-5">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white hover:opacity-75 uppercase font-bold leading-snug"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={handleLogin}
                  className="text-white hover:opacity-75 uppercase font-bold leading-snug"
                >
                  Admin Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
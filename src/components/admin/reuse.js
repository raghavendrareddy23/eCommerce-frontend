import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Link
      to="/admin/login"
      className="text-white hover:opacity-75 uppercase font-bold leading-snug"
    >
      Admin Login
    </Link>
  );
};

const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="text-white hover:opacity-75 uppercase font-bold leading-snug"
    >
      Logout
    </button>
  );
};

export { LoginButton, LogoutButton };

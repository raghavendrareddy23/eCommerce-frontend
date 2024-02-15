import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom'; 

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ecommerce-backend-fm0r.onrender.com/user/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('adminToken', data.token); 
        sessionStorage.setItem('adminUsername', JSON.stringify(data.username));
        alert('Admin logged in successfully!');
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to login admin');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input type="username" name="username" placeholder="Username" onChange={handleChange} className="border border-gray-300 rounded px-4 py-2 w-full" />
        </div>
        <div className="mb-4 text-black">
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border border-gray-300 rounded px-4 py-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;

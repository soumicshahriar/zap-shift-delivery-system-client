import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <FaLock className="text-6xl text-red-500 mb-4" />

      <h1 className="text-7xl font-bold text-gray-800">403</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-2">
        Access Forbidden
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        You don’t have permission to access this page. Please contact the admin
        if you believe this is an error.
      </p>

      <Link to="/" className="mt-6">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-all">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default Forbidden;

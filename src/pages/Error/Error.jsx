import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">
      {/* Number */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-secondary mb-4">
        404
      </h1>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>

      {/* Message */}
      <p className="text-gray-600 max-w-md mb-6">
        The page you are looking for might be removed or temporarily
        unavailable.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="btn btn-secondary text-white px-8 py-2 rounded-lg shadow-md"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;

import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../../src/assets/authImage.png";

const AuthLayoutA = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white px-4 flex justify-center items-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 w-full md:max-w-md">
          <Logo />
          <Outlet />
        </div>
        <div className="flex-1 hidden md:flex justify-center">
          <img
            src={authImage}
            alt="Authentication"
            className="w-full max-w-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutA;

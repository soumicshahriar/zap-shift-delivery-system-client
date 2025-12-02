import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { FaArrowAltCircleRight } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-[#171717] p-6 rounded-2xl shadow-lg w-full">
      <h2 className="text-center text-2xl mb-6 font-semibold">Login</h2>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-3 bg-[#1f1f1f] px-4 py-3 rounded-full shadow-inner">
          <FiMail className="text-white" size={20} />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="bg-transparent outline-none w-full text-gray-300"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}

        <div className="flex items-center gap-3 bg-[#1f1f1f] px-4 py-3 rounded-full shadow-inner">
          <FiLock className="text-white" size={20} />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            className="bg-transparent outline-none w-full text-gray-300"
          />
        </div>
        {errors.password?.type === "required" && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500 text-sm">
            Password must be 6 characters or longer
          </p>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-green-600 transition text-white px-6 py-2 rounded-md"
          >
            Login
          </button>
          <Link
            to="/register"
            state={location?.state}
            className="flex items-center gap-2 bg-gray-800 hover:bg-blue-600 transition text-white px-6 py-2 rounded-md"
          >
            Sign Up <FaArrowAltCircleRight />
          </Link>
        </div>

        <button className="mt-4 w-full bg-gray-800 hover:bg-red-600 transition text-white px-4 py-2 rounded-md">
          Forgot Password
        </button>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;

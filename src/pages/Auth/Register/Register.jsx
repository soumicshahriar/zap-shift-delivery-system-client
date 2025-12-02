import React from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { FaArrowAltCircleRight } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegister = (data) => {
    // console.log("after register", data.photo[0].name);
    const profileImage = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // store the image and get the photo url
        const formData = new FormData();
        formData.append("image", profileImage);

        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          // send user information to the database
          const userInfo = {
            email: data.email,
            displayName: data.userName,
            photoURL: res.data.data.url,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user save to the database");
            }
          });

          // update user profile
          const userProfile = {
            displayName: data.userName,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then((data) => {
              console.log("after update", data);
              console.log("user profile updated done");
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-[#171717] p-6 rounded-2xl shadow-lg w-full">
      <h2 className="text-center text-2xl mb-6 font-semibold">Register</h2>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col gap-4"
      >
        {/* name */}
        <div className="flex items-center gap-3 bg-[#1f1f1f] px-4 py-3 rounded-full shadow-inner">
          <FiUser className="text-white" size={20} />
          <input
            type="text"
            placeholder="Username"
            {...register("userName", { required: true })}
            className="bg-transparent outline-none w-full text-gray-300"
          />
        </div>
        {errors.userName && (
          <p className="text-red-500 text-sm">Username is required</p>
        )}

        {/* Photo */}
        <div className="flex items-center gap-3 bg-[#1f1f1f] px-4 py-3 rounded-full shadow-inner">
          <FiUser className="text-white" size={20} />
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input bg-transparent outline-none w-full text-gray-300"
          />
        </div>
        {errors.photo && <p className="text-red-500 text-sm">Add a photo</p>}

        {/* email */}
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

        {/* password */}
        <div className="flex items-center gap-3 bg-[#1f1f1f] px-4 py-3 rounded-full shadow-inner">
          <FiLock className="text-white" size={20} />
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            })}
            className="bg-transparent outline-none w-full text-gray-300"
          />
        </div>
        {errors.password?.type === "required" && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500 text-sm">Password must be 6+ chars</p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-500 text-sm">
            Password must include uppercase, lowercase & number
          </p>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-green-600 transition text-white px-6 py-2 rounded-md"
          >
            Register
          </button>
          <Link
            to="/login"
            state={location?.state}
            className="flex items-center gap-2 bg-gray-800 hover:bg-blue-600 transition text-white px-6 py-2 rounded-md"
          >
            Login <FaArrowAltCircleRight />
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

export default Register;

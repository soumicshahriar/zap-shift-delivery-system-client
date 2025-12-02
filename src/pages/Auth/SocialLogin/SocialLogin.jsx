import React from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);

        // create user in the database
        const userInfo = {
          email: result.user?.email,
          displayName: result.user?.displayName,
          photoURL: result.user?.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored");
          if (res.data.insertedId) {
            navigate(location?.state || "/");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-center mt-5">
      <p>Or</p>
      <div className=" mt-5 rounded bg-gray-50/5 text-center p-4">
        <button
          onClick={handleGoogleSignIn}
          className="border w-fit mx-auto rounded-full p-2 hover:bg-green-600"
        >
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

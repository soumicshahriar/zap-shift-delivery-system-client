import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loader from "../components/Loader/Loader";
import Forbidden from "../components/Forbidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();
  console.log(role);
  if (loading || isLoading) {
    return <Loader></Loader>;
  }

  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default RiderRoute;

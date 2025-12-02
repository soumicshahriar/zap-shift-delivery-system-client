import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();
  console.log(role);
  if (loading || isLoading) {
    return <Loader></Loader>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;

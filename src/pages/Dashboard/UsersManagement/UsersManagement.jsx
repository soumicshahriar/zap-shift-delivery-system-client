import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  FaUserShield,
  FaTrash,
  FaUserAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  // Load all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // Role update mutation
  // Role update mutation
  const updateRoleMutation = useMutation({
    mutationFn: async (user) => {
      const previousRole = user.role;
      const newRole = previousRole === "admin" ? "user" : "admin";

      const res = await axiosSecure.patch(`/users/role/${user._id}`, {
        role: newRole,
      });

      return { data: res.data, email: user.email, previousRole, newRole };
    },

    onSuccess: ({ email, previousRole, newRole }) => {
      toast.success(`Role updated for ${email}: ${previousRole} → ${newRole}`);
      refetch();
    },
  });

  // handle function with confirmation
  const handleRoleUpdate = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Change role for ${user.email}? (${user.role} → ${
        user.role === "admin" ? "user" : "admin"
      })`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update role!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate(user);
      }
    });
  };

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User deleted!");
      refetch();
    },
  });

  // handle delete with confirmation
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete user: ${user.email}? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(user._id);
      }
    });
  };

  return (
    <div className="p-4">
      {/* search field */}
      <div className="relative w-full max-w-md mx-auto my-4 ">
        {/* Search Icon */}
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />

        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search User..."
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 dark:bg-black dark:text-white transition-all"
        />
      </div>

      {/* search end */}
      <h2 className="text-2xl font-semibold mb-4">
        Manage Users : {users.length}
      </h2>
      {/* <p>Search Text: {searchText}</p> */}

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td>{index + 1}</td>

                <td>
                  <img
                    src={user?.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                </td>

                <td className="font-medium flex items-center gap-2">
                  {user.displayName}

                  {/* Admin Badge */}
                  {user.role === "admin" && (
                    <FaUserShield className="text-yellow-500 text-lg" />
                  )}
                </td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleRoleUpdate(user)}
                    className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600 flex items-center gap-2"
                  >
                    {user.role === "admin" ? (
                      <>
                        <FaUserAlt /> Make User
                      </>
                    ) : (
                      <>
                        <FaUserShield /> Make Admin
                      </>
                    )}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;

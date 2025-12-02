import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaCheckCircle, FaCheckDouble, FaHandPointer } from "react-icons/fa";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch parcels assigned to the logged-in rider
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
    // enabled: !!user?.email,
  });

  // Accept delivery
  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/parcels/accept/${id}`);

      if (res.data.modifiedCount > 0) {
        toast.success("Parcel accepted successfully!");
        refetch();
      } else {
        toast.error("Failed to accept parcel!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  // parcel location status

  // Reject delivery
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/parcels/reject/${id}`);

      if (res.data.modifiedCount > 0) {
        toast.success("Parcel rejected!");
        refetch();
      } else {
        toast.error("Failed to reject parcel!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  // Confirm pickup
  const handlePickup = async (id) => {
    try {
      const res = await axiosSecure.patch(`/parcels/pickup/${id}
      `);
      if (res.data.modifiedCount > 0) {
        toast.success("Parcel Pickup Confirmed!");
        refetch();
      }
    } catch (error) {
      console.log(error);

      toast.error("Something is wrong");
    }
  };

  // Confirm delivery
  const handleDelivery = async (id) => {
    try {
      const res = await axiosSecure.patch(`/parcels/deliver/${id}`);
      console.log(res);
      console.log(res.data);
      if (res.data?.parcelUpdated?.modifiedCount > 0) {
        toast.success("Parcel Delivered Successful");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-semibold mb-4">
        Parcels Pending Pickup: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Parcel Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Weight</th>
              <th className="px-4 py-2">Sender</th>
              <th className="px-4 py-2">Receiver</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{index + 1}</td>

                <td className="px-4 py-2">{parcel.parcelName}</td>

                <td className="px-4 py-2">{parcel.parcelType}</td>

                <td className="px-4 py-2">{parcel.parcelWeight} kg</td>

                <td className="px-4 py-2">
                  {parcel.senderName}
                  <br />
                  <span className="text-xs text-gray-500">
                    {parcel.senderAddress}
                  </span>
                </td>

                <td className="px-4 py-2">
                  {parcel.receiverName}
                  <br />
                  <span className="text-xs text-gray-500">
                    {parcel.receiverAddress}
                  </span>
                </td>

                <td className="px-4 py-2">{parcel.deliveryStatus}</td>

                <td className="px-4 py-2 flex gap-2">
                  {parcel.deliveryStatus === "driver-assigned" ? (
                    <>
                      <button
                        onClick={() => handleAccept(parcel._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(parcel._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        disabled
                        className="relative group px-3 py-1 bg-pink-500 text-white rounded opacity-60 cursor-not-allowed"
                      >
                        <FaCheckCircle size={20} />

                        {/* Tooltip */}
                        <span
                          className="absolute left-1/2 -translate-x-1/2 -top-8 
    bg-gray-900 text-white text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 transition"
                        >
                          Accepted
                        </span>
                      </button>
                      {/* Confirm Pickup */}
                      <button
                        onClick={() => handlePickup(parcel._id)}
                        disabled={parcel.deliveryStatus === "parcel_picked_up"}
                        className={`relative group px-3 py-3 rounded text-white
                          ${
                            parcel.deliveryStatus === "parcel_picked_up"
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                      >
                        {parcel.deliveryStatus === "parcel_picked_up" ? (
                          <FaCheckCircle size={20} />
                        ) : (
                          <FaHandPointer size={20} />
                        )}

                        <span
                          className="absolute left-1/2 -translate-x-1/2 -top-8 
                          bg-gray-900 text-white text-xs px-2 py-1 rounded 
                          opacity-0 group-hover:opacity-100 transition"
                        >
                          {parcel.deliveryStatus === "parcel_picked_up"
                            ? "Picked Up"
                            : "Confirm Pickup"}
                        </span>
                      </button>

                      {/* Confirm Delivery */}
                      <button
                        onClick={() => handleDelivery(parcel._id)}
                        disabled={parcel.deliveryStatus !== "parcel_picked_up"}
                        className={`relative group px-3 py-3 rounded text-white
                          ${
                            parcel.deliveryStatus !== "parcel_picked_up"
                              ? "bg-green-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                      >
                        <FaCheckDouble size={20} />

                        <span
                          className="absolute left-1/2 -translate-x-1/2 -top-8 
                          bg-gray-900 text-white text-xs px-2 py-1 rounded 
                          opacity-0 group-hover:opacity-100 transition"
                        >
                          Confirm Delivery
                        </span>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {parcels.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No assigned deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CiEdit } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch parcels
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  // Handle delete with SweetAlert
  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          refetch();
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Handle payment
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
    };
    const res = await axiosSecure.post("payment-checkout-session", paymentInfo);
    window.location.assign(res.data.url);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        All of my parcels: {parcels.length}
      </h2>

      {/* Table wrapper for horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border border-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Cost</th>
              <th className="px-3 py-2">Weight</th>
              <th className="px-3 py-2">Payment</th>
              <th className="px-3 py-2">Tracking ID</th>
              <th className="px-3 py-2">Delivery Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-3 py-2 text-center">{index + 1}</td>
                <td className="px-3 py-2">{parcel?.parcelName}</td>
                <td className="px-3 py-2">${parcel?.cost}</td>
                <td className="px-3 py-2">{parcel?.parcelWeight} kg</td>
                <td className="px-3 py-2">
                  {parcel.paymentStatus === "paid" ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="px-2 py-1 text-xs font-semibold bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                    >
                      Pay from here
                    </button>
                  )}
                </td>

                <td className="px-3 py-2 text-xs wrap-break-word text-blue-600 hover:text-pink-600">
                  <Link to={`/parcel-track/${parcel?.trackingId}`}>
                    {parcel?.trackingId}
                  </Link>
                </td>
                <td className="px-3 py-2">
                  {parcel?.deliveryStatus === "pending-pickup" ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-500 text-white">
                      {parcel.deliveryStatus}
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white">
                      pay first
                    </span>
                  )}
                </td>

                <td className="px-3 py-2 flex flex-wrap gap-2 justify-center">
                  <button className="px-2 py-1 text-sm border rounded hover:bg-blue-200 transition flex items-center gap-1">
                    <CiEdit />
                    Edit
                  </button>
                  <button className="px-2 py-1 text-sm border rounded hover:bg-gray-200 transition flex items-center gap-1">
                    <FaMagnifyingGlass />
                    View
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="px-2 py-1 text-sm border rounded hover:bg-red-200 transition flex items-center gap-1"
                  >
                    <MdDeleteOutline />
                    Delete
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

export default MyParcels;

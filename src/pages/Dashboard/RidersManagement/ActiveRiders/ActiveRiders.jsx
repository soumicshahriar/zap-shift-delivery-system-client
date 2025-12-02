import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaBan } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import RiderModal from "../RiderModal";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  // Modal state
  const [selectedRider, setSelectedRider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rider) => {
    setSelectedRider(rider);
    setIsModalOpen(true);
  };

  // Fetch active riders
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=Approved");
      return res.data;
    },
  });

  // Deactivate rider
  const handleDeactivate = async (id) => {
    try {
      const res = await axiosSecure.patch(`/riders/deactivate/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider Deactivate successfully",
          showConfirmButton: false,
          timer: 2500,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Failed to Deactivate Rider",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">
        Active Riders : ({riders.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Rider Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Bike</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Applied At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="border-b hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderRegion}</td>
                <td>{rider.riderDistrict}</td>
                <td>{rider.phone}</td>
                <td>{rider.bikeModel}</td>
                <td>
                  <span className="px-2 py-1 rounded bg-green-600 text-white">
                    {rider.status}
                  </span>
                </td>
                <td>
                  <span className="px-2 py-1 rounded bg-blue-500 text-white">
                    {rider.workStatus}
                  </span>
                </td>
                <td>{new Date(rider.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-3">
                  {/* View */}
                  <button
                    className="text-blue-600 text-xl"
                    title="View Details"
                    onClick={() => handleView(rider)}
                  >
                    <FaEye />
                  </button>

                  {/* Deactivate */}
                  <button
                    className="text-red-600 text-xl"
                    title="Deactivate Rider"
                    onClick={() => handleDeactivate(rider._id)}
                  >
                    <FaBan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Modal */}
      {isModalOpen && (
        <RiderModal
          rider={selectedRider}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ActiveRiders;

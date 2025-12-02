import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import RiderModal from "../RiderModal";
import Swal from "sweetalert2";

const InactiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rider) => {
    setSelectedRider(rider);
    setIsModalOpen(true);
  };

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["inactiveRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=Inactive");
      return res.data;
    },
  });

  // Activate rider
  const handleActivate = async (id) => {
    try {
      const res = await axiosSecure.patch(`/riders/activate/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider Activated",
          showConfirmButton: false,
          timer: 2500,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Failed to activate Rider",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">
        Inactive Riders : ({riders.length})
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
              <th>Rider Status</th>
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
                  <span className="px-2 py-1 rounded bg-red-600 text-white">
                    {rider.status}
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

                  {/* Activate */}
                  <button
                    className="text-green-600 text-xl"
                    title="Activate Rider"
                    onClick={() => handleActivate(rider._id)}
                  >
                    <FaCheckCircle />
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

export default InactiveRiders;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import RiderModal from "../RiderModal";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  // Modal state
  const [selectedRider, setSelectedRider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rider) => {
    setSelectedRider(rider);
    setIsModalOpen(true);
  };

  // Fetch pending riders
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "Pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=Pending");
      return res.data;
    },
  });

  //   rider accept
  const handleAccept = async (rider) => {
    console.log(rider);
    try {
      const res = await axiosSecure.patch("/riders/approve", { rider }); // wrap in object
      if (res.data.riderResult.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider Approved",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to approve Rider",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  // Reject rider
  const handleReject = async (rider) => {
    try {
      const res = await axiosSecure.patch(`/riders/reject/${rider._id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider Rejected",
          showConfirmButton: false,
          timer: 2500,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Failed to reject Rider",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">
        Riders Request : ({riders.length})
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
              <th>Application Status</th>
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
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      rider.status === "Pending"
                        ? "bg-yellow-500"
                        : rider.status === "Approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
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

                  {/* Approve */}
                  <button
                    className="text-green-600 text-xl"
                    title="Accept Rider"
                    onClick={() => handleAccept(rider)}
                  >
                    <FaCheckCircle />
                  </button>

                  {/* Reject */}
                  <button
                    className="text-red-600 text-xl"
                    title="Reject Rider"
                    onClick={() => handleReject(rider)}
                  >
                    <FaTimesCircle />
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

export default ApproveRiders;

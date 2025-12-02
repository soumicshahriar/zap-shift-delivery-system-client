import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// Icons
import { FaMotorcycle, FaUser, FaDollarSign } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { MdTrackChanges } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import { GiWeight } from "react-icons/gi";
import toast from "react-hot-toast";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Modal State
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Get all pending parcels
  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  // Get all riders
  //   to do invalidate query after assign a rider
  const { data: riders = [] } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  console.log(riders, selectedParcel);

  // Open Modal with selected parcel
  const openAssignModal = (parcel) => {
    setSelectedParcel(parcel);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedParcel(null);
  };

  // Final Rider Assignment Handler
  const handleAssign = (rider) => {
    console.log(rider);
    const assignRiderInfo = {
      riderId: rider._id,
      riderEmail: rider.riderEmail,
      riderName: rider.riderName,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };
    console.log(assignRiderInfo);

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, assignRiderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          //   selectedParcel(null);
          parcelsRefetch();
          toast.success("Rider has been assigned");
        }
      });

    // TODO: Add API call to assign rider
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <FaMotorcycle /> Assign Riders : {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-3 py-2">#</th>

              <th className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <FiPackage /> Parcel Name
                </div>
              </th>

              <th className="px-3 py-2">Type</th>

              <th className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <GiWeight /> Weight
                </div>
              </th>

              <th className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <FaDollarSign /> Cost
                </div>
              </th>

              <th className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <FaUser /> Sender
                </div>
              </th>

              <th className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <FaUser /> Receiver
                </div>
              </th>

              <th className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <MdTrackChanges /> Tracking ID
                </div>
              </th>

              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel.trackingId} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{index + 1}</td>

                <td className="px-3 py-2">{parcel.parcelName}</td>

                <td className="px-3 py-2">{parcel.parcelType}</td>

                <td className="px-3 py-2">{parcel.parcelWeight} kg</td>

                <td className="px-3 py-2">${parcel.cost}</td>

                <td className="px-3 py-2">
                  {parcel.senderName}
                  <br />
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <RiMapPin2Fill /> {parcel.senderRegion}
                  </span>
                </td>

                <td className="px-3 py-2">
                  {parcel.receiverName}
                  <br />
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <RiMapPin2Fill /> {parcel.receiverRegion}
                  </span>
                </td>

                <td className="px-3 py-2 text-xs">{parcel.trackingId}</td>

                <td className="px-3 py-2">
                  <button
                    onClick={() => openAssignModal(parcel)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-1"
                  >
                    <FaMotorcycle /> Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====================== MODAL ========================== */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FaMotorcycle /> Assign Rider
            </h2>

            <p className="text-sm font-semibold">
              Parcel: {selectedParcel.parcelName}
            </p>
            <p className="text-xs text-gray-600 mb-3">
              From: {selectedParcel.senderRegion}
            </p>

            <h3 className="text-lg font-semibold mb-2">Available Riders</h3>

            {/* Filter riders by district + available */}
            {riders
              .filter(
                (r) =>
                  r.riderDistrict === selectedParcel.senderDistrict &&
                  r.workStatus === "Available"
              )
              .map((rider) => (
                <div
                  key={rider._id}
                  className="p-3 border rounded-lg mb-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{rider.riderName}</p>
                    <p className="text-xs text-gray-500">{rider.riderEmail}</p>
                  </div>

                  <button
                    onClick={() => handleAssign(rider)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Assign
                  </button>
                </div>
              ))}

            {/* No rider found */}
            {riders.filter(
              (r) =>
                r.riderDistrict === selectedParcel.senderDistrict &&
                r.workStatus === "Available"
            ).length === 0 && (
              <p className="text-sm text-red-500">
                No more available riders in this region.
              </p>
            )}

            <div className="text-right mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ====================== END MODAL ======================= */}
    </div>
  );
};

export default AssignRiders;

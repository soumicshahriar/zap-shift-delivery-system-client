import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaDollarSign, FaMotorcycle, FaUser } from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { RiMapPin2Fill } from "react-icons/ri";
import { IoCashOutline } from "react-icons/io5";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch parcels assigned to the logged-in rider
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "parcel_delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
    // enabled: !!user?.email,
  });

  //   calculation how much rider will return and how much rider can keep
  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };
  return (
    <div className="mx-4">
      <h2 className="font-bold mb-2 mt-4">
        Completed Deliveries: {parcels.length}
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

              {/* <th className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <GiWeight /> Weight
                </div>
              </th> */}

              <th className="px-3 py-2">
                <div className="flex items-center gap-1">
                  <FaDollarSign /> Cost
                </div>
              </th>
              <th className="px-3 py-2">
                <div className="flex items-center gap-1 text-yellow-600">
                  <FaDollarSign className="text-yellow-600" /> Payout
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
              <tr
                key={parcel.trackingId}
                className="border-b hover:bg-gray-50 text-center"
              >
                <td className="px-3 py-2">{index + 1}</td>

                <td className="px-3 py-2">{parcel.parcelName}</td>

                <td className="px-3 py-2">{parcel.parcelType}</td>

                {/* <td className="px-3 py-2">{parcel.parcelWeight} kg</td> */}

                <td className="px-3 py-2">${parcel.cost}</td>

                <td className="px-3 py-2 text-yellow-600 font-semibold">
                  ${calculatePayout(parcel)}
                </td>

                <td className="px-3 py-2 ">
                  {parcel.senderName}
                  <br />
                  <span className="text-xs text-gray-500 flex items-center gap-1 justify-center">
                    <RiMapPin2Fill /> {parcel.senderRegion}
                  </span>
                </td>

                <td className="px-3 py-2">
                  {parcel.receiverName}
                  <br />
                  <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <RiMapPin2Fill /> {parcel.receiverRegion}
                  </span>
                </td>

                <td className="px-3 py-2 text-xs">{parcel.trackingId}</td>

                <td className="px-3 py-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-1">
                    <IoCashOutline /> Cash Out
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

export default CompletedDeliveries;

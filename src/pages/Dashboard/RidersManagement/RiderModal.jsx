import { FaTimes } from "react-icons/fa";

const RiderModal = ({ rider, closeModal }) => {
  if (!rider) return null;

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Rider Details</h2>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {rider.riderName}
          </p>
          <p>
            <strong>Email:</strong> {rider.riderEmail}
          </p>
          <p>
            <strong>Driving License:</strong> {rider.drivingLicense}
          </p>

          <p>
            <strong>Region:</strong> {rider.riderRegion}
          </p>
          <p>
            <strong>District:</strong> {rider.riderDistrict}
          </p>

          <p>
            <strong>NID:</strong> {rider.nid}
          </p>
          <p>
            <strong>Phone:</strong> {rider.phone}
          </p>

          <p>
            <strong>Bike Model:</strong> {rider.bikeModel}
          </p>
          <p>
            <strong>Bike Reg No:</strong> {rider.bikeRegNo}
          </p>

          <p>
            <strong>About:</strong>
          </p>
          <p className="text-gray-700">{rider.about}</p>

          <p>
            <strong>Status:</strong>
            <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700">
              {rider.status}
            </span>
          </p>

          <p>
            <strong>Applied On:</strong>{" "}
            {new Date(rider.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiderModal;

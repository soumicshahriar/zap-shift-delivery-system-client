import { useState } from "react";
// import ApproveRiders from "./ApproveRiders";
// import ActiveRiders from "./ActiveRiders";
// import InactiveRiders from "./InactiveRiders";
// import InactiveRiders from "./InactiveRiders";

import ActiveRiders from "./ActiveRiders/ActiveRiders";
import ApproveRiders from "./ApproveRiders/ApproveRiders";
import InactiveRiders from "./InactiveRiders/InactiveRiders";

const RidersDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Riders Dashboard</h1>

      {/* Tabs */}
      <div className="flex border-b mb-5">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
            activeTab === "pending"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Pending (Approved Request)
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
            activeTab === "active"
              ? "border-green-600 text-green-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("inactive")}
          className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
            activeTab === "inactive"
              ? "border-red-600 text-red-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Inactive
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "pending" && <ApproveRiders />}
        {activeTab === "active" && <ActiveRiders />}
        {activeTab === "inactive" && <InactiveRiders />}
      </div>
    </div>
  );
};

export default RidersDashboard;

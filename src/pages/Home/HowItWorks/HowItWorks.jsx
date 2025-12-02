import React from "react";
import { FaTruckPickup } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="mb-10">
      <h3 className="md:text-3xl font-semibold mb-3">How It Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* item 1 */}
        <div className="shadow-md p-2 rounded-md ">
          <FaTruckPickup className="size-6" />
          <h4 className="font-semibold">Booking Pick & Drop</h4>
          <span className="text-wrap text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </span>
        </div>
        {/* item 2 */}
        <div className="shadow-md p-2 rounded-md ">
          <FaTruckPickup className="size-6" />
          <h4 className="font-semibold">Booking Pick & Drop</h4>
          <span className="text-wrap text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </span>
        </div>
        {/* item 3 */}
        <div className="shadow-md p-2 rounded-md ">
          <FaTruckPickup className="size-6" />
          <h4 className="font-semibold">Booking Pick & Drop</h4>
          <span className="text-wrap text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </span>
        </div>
        {/* item 4 */}
        <div className="shadow-md p-2 rounded-md ">
          <FaTruckPickup className="size-6" />
          <h4 className="font-semibold">Booking Pick & Drop</h4>
          <span className="text-wrap text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

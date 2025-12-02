import React from "react";
import service from "../../../assets/service.png";

const Services = () => {
  return (
    <div className="bg-secondary p-4 text-white text-center rounded-md text-wrap shadow mb-10">
      <h3 className="font-semibold">Our Services</h3>
      <span>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
        {/* item 1 */}
        <div className="p-2 bg-white text-secondary space-y-1 rounded hover:bg-primary ">
          <img className="mx-auto" src={service} alt="" />
          <h2 className="font-semibold">Express & Standard Delivery</h2>
          <span>
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </span>
        </div>
        {/* item 2 */}
        <div className="p-2 bg-white text-secondary space-y-1 rounded hover:bg-primary">
          <img className="mx-auto" src={service} alt="" />
          <h2 className="font-semibold">Express & Standard Delivery</h2>
          <span>
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </span>
        </div>
        {/* item 3 */}
        <div className="p-2 bg-white text-secondary space-y-1 rounded hover:bg-primary">
          <img className="mx-auto" src={service} alt="" />
          <h2 className="font-semibold">Express & Standard Delivery</h2>
          <span>
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </span>
        </div>
        {/* item 4 */}
        <div className="p-2 bg-white text-secondary space-y-1 rounded hover:bg-primary">
          <img className="mx-auto" src={service} alt="" />
          <h2 className="font-semibold">Express & Standard Delivery</h2>
          <span>
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </span>
        </div>
        {/* item 5 */}
        <div className="p-2 bg-white text-secondary space-y-1 rounded hover:bg-primary">
          <img className="mx-auto" src={service} alt="" />
          <h2 className="font-semibold">Express & Standard Delivery</h2>
          <span>
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </span>
        </div>
        {/* item 6 */}
        <div className="p-2 bg-white text-secondary space-y-1 rounded hover:bg-primary">
          <img className="mx-auto" src={service} alt="" />
          <h2 className="font-semibold">Express & Standard Delivery</h2>
          <span>
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Services;

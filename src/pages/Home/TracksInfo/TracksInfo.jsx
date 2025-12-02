import React from "react";
import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";

const TracksInfo = () => {
  const items = [
    {
      img: liveTracking,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      img: safeDelivery,
      title: "Safe Delivery",
      desc: "Our service ensures your parcel is delivered safely with protective handling and a secure delivery process.",
    },
    {
      img: safeDelivery,
      title: "Delivery Tracking 100%",
      desc: "Track your parcel every step of the way with accurate, real-time data ensuring complete transparency.",
    },
  ];

  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="
            shadow-md 
            p-4 
            rounded-xl 
            flex 
            flex-col md:flex-row 
            items-center md:items-start 
            gap-6 
            bg-white
          "
        >
          {/* Icon */}
          <div className="shrink-0">
            <img src={item.img} alt="" className="w-20 md:w-24" />
          </div>

          {/* Divider (responsive) */}
          <div
            className="
              hidden md:block 
              border-l-2 border-dashed border-gray-400 
              h-24
            "
          ></div>
          <div
            className="
              md:hidden 
              border-t-2 border-dashed border-gray-300 
              w-full
            "
          ></div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-secondary font-semibold text-lg md:text-xl mb-1">
              {item.title}
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}

      <hr className="border border-dashed my-10" />
    </div>
  );
};

export default TracksInfo;

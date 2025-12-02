import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Track Your Parcel
        </h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base break-all">
          Tracking ID: {trackingId}
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="bg-white shadow-xl rounded-xl p-4 sm:p-6 border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ul className="timeline timeline-vertical md:timeline-horizontal timeline-snap-icon timeline-compact">
          {trackings.map((log, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              {/* Timeline Dot */}
              <div className="timeline-middle">
                <motion.div
                  className="w-4 h-4 rounded-full bg-linear-to-r from-blue-500 to-purple-500 shadow-md"
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                ></motion.div>
              </div>

              {/* Content Card */}
              <div className="timeline-end mb-4 mr-3">
                <motion.div
                  className="p-4 rounded-xl shadow-sm border bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="font-semibold text-lg text-gray-700">
                    {log.status}
                  </h3>

                  {log.createdAt && (
                    <p className="text-xs mt-1 text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Line between items */}
              {index !== trackings.length - 1 && (
                <hr className="bg-linear-to-r from-blue-500 to-purple-500" />
              )}
            </motion.li>
          ))}

          {/* Empty State */}
          {trackings.length === 0 && (
            <motion.p
              className="text-center text-gray-500 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No tracking updates available yet.
            </motion.p>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default ParcelTrack;

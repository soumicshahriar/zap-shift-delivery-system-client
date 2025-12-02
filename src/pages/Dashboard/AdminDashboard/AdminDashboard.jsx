import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const getPieChartData = (data) => {
    if (!data || data.length === 0) return [];
    return data.map((item) => ({
      name: item.status,
      value: item.count,
    }));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {deliveryStats.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No delivery stats available
          </p>
        )}

        {deliveryStats.map((stat) => (
          <div
            key={stat._id}
            className="stat shadow bg-base-100 rounded-xl p-4"
          >
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-10 w-10 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title font-medium text-gray-600">
              {stat?.status || "Unknown"}
            </div>
            <div className="stat-value text-primary">{stat?.count}</div>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="w-full bg-base-100 shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Delivery Status Distribution
        </h2>

        <div className="w-full h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={getPieChartData(deliveryStats)}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                fill="#8884d8"
                label
                isAnimationActive={true}
              />
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

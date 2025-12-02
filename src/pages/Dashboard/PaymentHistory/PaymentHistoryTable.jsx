import React from "react";
import { FiEye } from "react-icons/fi";

const PaymentHistoryTable = ({ payments }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        {/* Header */}
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
            <th className="py-3 px-4">Parcel</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Paid At</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {payments.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              {/* Parcel Name */}
              <td className="py-3 px-4 font-medium">{item.parcelName}</td>

              {/* Amount */}
              <td className="py-3 px-4 font-semibold">
                ${item.amount?.toLocaleString()}
              </td>

              {/* Email */}
              <td className="py-3 px-4">{item.customerEmail}</td>

              {/* Status */}
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.paymentStatus === "paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.paymentStatus}
                </span>
              </td>

              {/* Paid Date */}
              <td className="py-3 px-4">
                {new Date(item.paidAt).toLocaleString()}
              </td>

              {/* View Button */}
              <td className="py-3 px-4 text-center">
                <button className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md">
                  <FiEye />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;

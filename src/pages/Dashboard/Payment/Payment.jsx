import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  const { data: parcel = [], isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    // console.log(res.data);
    window.location.href = res.data.url;
  };
  return (
    <div>
      <h2>
        Please Pay ${parcel.cost} for: {parcel.parcelName}{" "}
      </h2>
      <button onClick={handlePayment} className="btn bg-green-400">
        Pay
      </button>
    </div>
  );
};

export default Payment;

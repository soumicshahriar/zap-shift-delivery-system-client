import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  // get the session id from params using searchParams hook
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2>Payment Successful</h2>
      <p>TransactionId: {paymentInfo.transactionId}</p>
      <p>TrackingId: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;

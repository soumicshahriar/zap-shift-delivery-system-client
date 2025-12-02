import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h2>Payment Cancelled Please Tye again</h2>
      <Link to={"/dashboard/my-parcels"} className="btn">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancel;

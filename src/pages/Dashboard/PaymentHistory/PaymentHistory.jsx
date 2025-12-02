import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentHistoryTable from "./PaymentHistoryTable";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    // isLoading,
    // isError,
  } = useQuery({
    queryKey: ["payment-history", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  //   if (isLoading) return <p className="text-center py-10">Loading...</p>;
  //   if (isError)
  //     return (
  //       <p className="text-center py-10 text-red-600">Failed to load payments</p>
  //     );
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Payment History:{payments.length}
        <PaymentHistoryTable payments={payments} />
      </h1>
    </div>
  );
};

export default PaymentHistory;

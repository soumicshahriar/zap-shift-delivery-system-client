import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Error from "../pages/Error/Error";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BeARider from "../pages/BeARider/BeARider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import RidersManagement from "../pages/Dashboard/RidersManagement/RidersDashboard";
import AssignRiders from "../pages/Dashboard/RidersManagement/AssignRiders/AssignRiders";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "parcel-track/:trackingId",
        Component: ParcelTrack,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "beARider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin-dashboard",
        Component: AdminDashboard,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },

      // rider only routes
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },

      // admin only routes
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      // {
      //   path: "approve-riders",
      //   Component: ApproveRiders,
      // },
      // {
      //   path: "active-riders",
      //   Component: ActiveRiders,
      // },
      {
        path: "riders-management",
        element: (
          <AdminRoute>
            <RidersManagement></RidersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);

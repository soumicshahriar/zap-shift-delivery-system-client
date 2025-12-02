import React from "react";
import { FiDollarSign, FiPackage } from "react-icons/fi";
import { TbBike, TbBikeFilled } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router";
import { FaUsers } from "react-icons/fa6";
import useRole from "../hooks/useRole";
import { RiEBikeFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Zap Shift Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* <div className="p-4">Page Content</div> */}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* our dashboard links */}
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Parcel"
              >
                <FiPackage size={18} />
                <span className="is-drawer-close:hidden"> My Parcels</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
              >
                <FiDollarSign size={18} />
                <span className="is-drawer-close:hidden"> Payment History</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/dashboard/approve-riders"
                className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Riders Request"
              >
                <TbBike size={18} />
                <span className="is-drawer-close:hidden"> Approve Riders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/active-riders"
                className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Active Riders"
              >
                <TbBikeFilled size={18} className="text-green-500" />
                <span className="is-drawer-close:hidden"> Active Riders</span>
              </NavLink>
            </li> */}

            {/* Rider Links only */}
            {role === "rider" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assigned-deliveries"
                    className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Deliveries"
                  >
                    <FaTasks size={18} className="text-green-500" />
                    <span className="is-drawer-close:hidden">
                      {" "}
                      Assigned Deliveries
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/completed-deliveries"
                    className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Completed Deliveries"
                  >
                    <FcCheckmark size={18} />

                    <span className="is-drawer-close:hidden">
                      {" "}
                      Completed Deliveries
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* if role admin then user can see this */}
            {/* Admin only links */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/admin-dashboard"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Dashboard"
                  >
                    {/* Home icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">
                      Admin Dashboard
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/riders-management"
                    className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Riders Management Dashboard"
                  >
                    <TbBikeFilled size={18} className="text-green-500" />
                    <span className="is-drawer-close:hidden">
                      {" "}
                      Riders Management Dashboard
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/assign-riders"
                    className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Riders"
                  >
                    <RiEBikeFill size={18} className="text-green-500" />
                    <span className="is-drawer-close:hidden">
                      {" "}
                      Assign Riders
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                  >
                    <FaUsers size={18} className="text-blue-500" />
                    <span className="is-drawer-close:hidden">
                      {" "}
                      Users Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

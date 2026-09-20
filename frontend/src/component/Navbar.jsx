import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { toast } from "sonner";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.get("/user/logout");

      if (response.data.success) {
        dispatch(logout());
        navigate("/login");
        toast.success(response.data.message || "Logged out successfully");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e3e5ec] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT — LOGO + NAVIGATION */}
        <div className="flex items-center gap-9">
          {/* HirePoint Logo */}
          <a href="#" className="group flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d0f17] shadow-sm transition-transform duration-200 group-hover:scale-105">
              <span className="h-5 w-5 rounded-full border-2 border-white/80"></span>
              <span className="absolute h-1.5 w-1.5 rounded-full bg-[#C8FF4D] shadow-[0_0_8px_#C8FF4D]"></span>
            </span>

            <span className="text-[20px] font-semibold tracking-tight text-[#0d0f17]">
              HirePoint
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            <a
              href="#"
              className="rounded-lg px-4 py-2 text-[14px] font-medium text-[#333a52] transition-all duration-200 hover:bg-[#f2f3f6] hover:text-[#0d0f17]"
            >
              Home
            </a>

            <a
              href="#"
              className="rounded-lg px-4 py-2 text-[14px] font-medium text-[#333a52] transition-all duration-200 hover:bg-[#f2f3f6] hover:text-[#0d0f17]"
            >
              Jobs
            </a>
          </div>
        </div>

        {/* RIGHT — ACCOUNT */}
        <div className="relative">
          {/* Account Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
              dropdownOpen
                ? "border-[#0d0f17] bg-[#0d0f17] text-white shadow-md"
                : "border-[#e3e5ec] bg-white text-[#333a52] hover:border-[#c9ccd6] hover:bg-[#f2f3f6]"
            }`}
          >
            <svg
              className="h-[21px] w-[21px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c.7-3.4 3.2-5.5 7-5.5s6.3 2.1 7 5.5" />
            </svg>
          </button>

          {/* Account Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-[58px] w-[235px] overflow-hidden rounded-2xl border border-[#e3e5ec] bg-white p-2 shadow-[0_12px_40px_rgba(13,15,23,0.12)]">
              {/* Account Header */}
              <div className="mb-1 border-b border-[#e3e5ec] px-3 pb-3 pt-2">
                <p className="text-sm font-semibold text-[#0d0f17]">
                  My Account
                </p>

                <p className="mt-0.5 text-xs capitalize text-[#6b7186]">
                  {user?.role || "Account"}
                </p>
              </div>

              {/* Candidate Menu */}
              {user?.role === "candidate" && (
                <div className="pt-1">
                  {/* My Profile */}
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#333a52] transition-colors hover:bg-[#f2f3f6] hover:text-[#0d0f17]">
                    <svg
                      className="h-[18px] w-[18px] text-[#6b7186]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M5 20c.7-3.4 3.2-5.5 7-5.5s6.3 2.1 7 5.5" />
                    </svg>
                    My Profile
                  </button>

                  {/* Saved Jobs */}
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#333a52] transition-colors hover:bg-[#f2f3f6] hover:text-[#0d0f17]">
                    <svg
                      className="h-[18px] w-[18px] text-[#6b7186]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.8 8.8c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
                    </svg>
                    Saved Jobs
                  </button>

                  {/* Applied Jobs */}
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#333a52] transition-colors hover:bg-[#f2f3f6] hover:text-[#0d0f17]">
                    <svg
                      className="h-[18px] w-[18px] text-[#6b7186]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 5h16v14H4z" />
                      <path d="M8 9h8M8 13h5" />
                    </svg>
                    Applied Jobs
                  </button>
                </div>
              )}

              {/* Employer Menu */}
              {user?.role === "employer" && (
                <div className="pt-1">
                  {/* My Profile */}
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#333a52] transition-colors hover:bg-[#f2f3f6] hover:text-[#0d0f17]">
                    <svg
                      className="h-[18px] w-[18px] text-[#6b7186]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M5 20c.7-3.4 3.2-5.5 7-5.5s6.3 2.1 7 5.5" />
                    </svg>
                    My Profile
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#333a52] transition-colors hover:bg-[#f2f3f6] hover:text-[#0d0f17]">
                    <svg
                      className="h-[18px] w-[18px] text-[#6b7186]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.8 8.8c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
                    </svg>
                    Saved Jobs
                  </button>

                  {/* Applied Jobs */}
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#333a52] transition-colors hover:bg-[#f2f3f6] hover:text-[#0d0f17]">
                    <svg
                      className="h-[18px] w-[18px] text-[#6b7186]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 5h16v14H4z" />
                      <path d="M8 9h8M8 13h5" />
                    </svg>
                    Applied Jobs
                  </button>

                  {/* Create Job */}
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#333a52] transition-colors hover:bg-[#f2f3f6] hover:text-[#0d0f17]">
                    <svg
                      className="h-[18px] w-[18px] text-[#6b7186]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Create Job
                  </button>

                  {/* My Jobs */}
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#333a52] transition-colors hover:bg-[#f2f3f6] hover:text-[#0d0f17]">
                    <svg
                      className="h-[18px] w-[18px] text-[#6b7186]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <path d="M8 9h8M8 13h8M8 17h5" />
                    </svg>
                    My Jobs
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="my-1.5 h-px bg-[#e3e5ec]" />

              {/* Logout — Both Roles */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#b42318] transition-colors hover:bg-[#fff1f0]"
              >
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M21 4v16" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

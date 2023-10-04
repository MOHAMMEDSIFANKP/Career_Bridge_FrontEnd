import React, { useState } from "react";
import { NavbarDefault } from "../../components/Navbar/NavBar";
import HomeJoblist from "../../components/user/Home/HomeJoblist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompanyHome from "../../components/Company/CompanyHome/CompanyHome";

function CompanyHomePage() {
  const navigate = useNavigate();

  const [selected, setSelect] = useState("home");
  return (
    <>
      <div className="h-screen w-full grid grid-rows-[5rem,1fr] gap-1 md:gap-10">
        <div className="sticky top-0">
          <NavbarDefault />
        </div>
        <div className="grid grid-cols-[10rem,1fr] container xl:mx-auto xl:px-0 px-10 ">
          <div className="grid grid-rows-[3rem,3rem,3rem] gap-2 sticky">
            <div
              className={`border cursor-pointer rounded-3xl shadow flex justify-center items-center hover:bg-gray-100 font-bold ${
                selected === "home" ? "bg-gray-200 border border-gray-300" : ""
              }`}
              onClick={() => setSelect("home")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p className="ms-4 ont-bold text-sm text-gray-800">Home</p>
            </div>
            <div
              className={`border cursor-pointer rounded-3xl shadow flex justify-center items-center hover:bg-gray-100 font-bold ${
                selected === "Dashboard"
                  ? "bg-gray-200 border border-gray-300"
                  : ""
              }`}
              onClick={() => navigate("/company/dashboard/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>

              <p className="ms-4 ont-bold text-sm text-gray-800">Dashboard</p>
            </div>
            <div
              className={`border cursor-pointer rounded-3xl shadow flex justify-center items-center hover:bg-gray-100 font-bold ${
                selected === "company"
                  ? "bg-gray-200 border border-gray-300"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>

              <p className="ms-4 ont-bold text-sm text-gray-800">Users</p>
            </div>
          </div>
          <div className="h-[50rem]  scrollbar-none overflow-y-auto mx-10">

            <CompanyHome/>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyHomePage;

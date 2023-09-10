import React, { useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import MyinfoComponent from "../../../components/Profile/MyinfoComponent";
import { PasswordSecurity } from "../../../components/Profile/PasswordSecurity";
import { Tooltip, Button } from "@material-tailwind/react";

function UserProfilePage() {
  const [option, setOption] = useState("myinfo");
  return (
    <>
      <div className="h-screen">
        <div className="sticky top-0">
          <NavbarDefault />
        </div>
        <div className="container mx-auto flex md:ps-20 md:mt-20">
          <div className="flex-row md:w-2/6 w-1/6">
            <div className="md:visible invisible">
              <h1 className="text-4xl font-sans font-bold">Settings</h1>
            </div>
            <div className="fixed md:invisible">
              <ul className="text-purple-500 mt-10">
                <Tooltip content="Profile" className="bg-white text-purple-400 font-bold">
                <li className="mb-5 rounded-full w-7 ms-4  border  border-purple-400"   onClick={() => setOption("myinfo")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </li>
                </Tooltip>
                <Tooltip content="Password & Security" className="bg-white text-purple-400 font-bold">
                <li className="mb-5 rounded-full w-7 ms-4  border  border-purple-400"  onClick={() => setOption("password&security")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </li>
                </Tooltip>
                <Tooltip content="Terms" className="bg-white text-purple-400 font-bold">
                <li className="mb-5 rounded-full w-7 ms-4  border  border-purple-400" onClick={() => setOption("terms")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>
                </li>
                </Tooltip>
                <Tooltip content="Notification Settigs" className="bg-white text-purple-400 font-bold">
                <li className="mb-5 rounded-full w-7 ms-4  border  border-purple-400" onClick={() => setOption("notification")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                    />
                  </svg>
                </li>
                </Tooltip>
                <Tooltip content="Delete Account" className="bg-white text-purple-400 font-bold">
                <li className="mb-5 rounded-full w-7 ms-4  border  border-purple-400" onClick={() => setOption("deleteaccount")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                    />
                  </svg>
                </li>
                </Tooltip>
              </ul>
            </div>
            <div className="mt-10 font-bold text-gray-700 md:visible invisible">
              <ul className="text-lg ">
                <li
                  className={
                    option === "myinfo"
                      ? "text-purple-400"
                      : "hover:text-purple-400 cursor-pointer "
                  }
                  onClick={() => setOption("myinfo")}
                >
                  My info
                </li>
                <li
                  className={
                    option === "password&security"
                      ? "text-purple-400 my-2"
                      : "hover:text-purple-400 cursor-pointer my-2"
                  }
                  onClick={() => setOption("password&security")}
                >
                  Password & Security
                </li>
                <li
                  className={
                    option === "terms"
                      ? "text-purple-400 my-2"
                      : "hover:text-purple-400 cursor-pointer my-2"
                  }
                  onClick={() => setOption("terms")}
                >
                  Terms
                </li>
                <li
                  className={
                    option === "notification"
                      ? "text-purple-400 my-2"
                      : "hover:text-purple-400 cursor-pointer my-2"
                  }
                  onClick={() => setOption("notification")}
                >
                  Notification Settigs
                </li>
                <li
                  className={
                    option === "members&Permision"
                      ? "text-purple-400 my-2"
                      : "hover:text-purple-400 cursor-pointer my-2"
                  }
                  onClick={() => setOption("members&Permision")}
                >
                  members & Permision
                </li>
                <li
                  className="my-2 text-red-900 cursor-pointer"
                  onClick={() => setOption("deleteaccount")}
                >
                  Delete Account
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className="container mx-auto">
              {option === "myinfo" && <MyinfoComponent />}
              {option === "password&security" && <PasswordSecurity />}
              {option === "terms" && <MyinfoComponent />}
              {option === "notification" && <MyinfoComponent />}
              {option === "members&Permision" && <MyinfoComponent />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;

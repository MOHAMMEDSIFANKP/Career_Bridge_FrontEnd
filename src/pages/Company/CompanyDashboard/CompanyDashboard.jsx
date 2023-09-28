import React, { useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import RequstsComponents from "../../../components/Company/Dashboard/RequestsComponents/RequstsComponents";
import ScheduledList from "../../../components/Company/Dashboard/ScheduledList/ScheduledList";
import PostList from "../../../components/Company/Dashboard/PostsComponents/PostList";

function CompanyDashboard() {
  const [selected, setselected] = useState("request");
  return (
    <>
      <div className="h-screen grid grid-rows-[5rem,1fr]">
        <div>
          <NavbarDefault />
        </div>
        <div className="mt-10 grid grid-rows-[4rem,1fr] container mx-auto">
          <div className="flex justify-center">
            <div className="bg-purple-50 h-10 w-3/5 rounded-xl grid grid-cols-3 shadow-md">
              <div
                className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                  selected === "request"
                    ? "bg-purple-200 text-white rounded-xl"
                    : "hover:text-purple-400"
                }`}
                onClick={() => setselected("request")}
              >
                <p cla>Requests</p>
              </div>
              <div
                className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                  selected === "schedule"
                    ? "bg-purple-200 text-white rounded-xl"
                    : "hover:text-purple-400"
                }`}
                onClick={() => setselected("schedule")}
              >
                Schedule
              </div>
              <div
                className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                  selected === "post"
                    ? "bg-purple-200 text-white rounded-xl"
                    : "hover:text-purple-400"
                }`}
                onClick={() => setselected("post")}
              >
                Post
              </div>
            </div>
          </div>
          {selected === "request" ? (
            <RequstsComponents />
          ) : selected === "schedule" ? (
            <ScheduledList />
          ) : (
            <PostList/>
          )}
        </div>
      </div>
    </>
  );
}

export default CompanyDashboard;

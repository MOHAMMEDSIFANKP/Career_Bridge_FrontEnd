import React, { useEffect, useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import AllapplyedList from "../../../components/user/Dashboard/AllapplyedList";
import AcceptedList from "../../../components/user/Dashboard/AcceptedList";
import PendingList from "../../../components/user/Dashboard/PendingList";
import InvitesList from "../../../components/user/Dashboard/InvitesList/InvitesList";

function Dashboard() {
  const [selected, setselected] = useState("Applyed");
  const [applyed, setapplyed] = useState("all");
  console.log(applyed);
  useEffect(() => {
    document.title = "Dashboard | Career Bridge";
  }, []);
  return (
    <>
      <div className="grid grid-rows-[5rem,1fr]">
        <div>
          <NavbarDefault />
        </div>
        <div className="container mx-auto">
          <div className="mt-10 grid grid-rows-[4rem,1fr] container mx-auto">
            <div className="flex justify-center">
              <div className="bg-purple-50 h-10 w-3/5 rounded-xl grid grid-cols-2 shadow-md">
                <div
                  className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                    selected === "Applyed"
                      ? "bg-purple-200 text-white rounded-xl"
                      : "hover:text-purple-400"
                  }`}
                  onClick={() => setselected("Applyed")}
                >
                  <p cla>Applyed list</p>
                </div>

                <div
                  className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                    selected === "Pending"
                      ? "bg-purple-200 text-white rounded-xl"
                      : "hover:text-purple-400"
                  }`}
                  onClick={() => setselected("Pending")}
                >
                  Pending List
                </div>
              </div>
            </div>
            {selected === "Applyed" ? (
              <>
                <div className="flex justify-center">
                  <div className="border h-[52rem] w-full mt-4 rounded-xl mx-5 shadow-lg grid grid-rows-[9rem,1fr]">
                    <div className="border-b">
                      <p className="font-bold text-2xl ms-10 mt-4">
                        Applyed Job list
                      </p>
                      <p className="ms-10">
                        See information about all Applyed List
                      </p>
                      <div className="bg-gray-100 w-2/5 h-9 rounded-xl ms-10 mt-2 grid grid-cols-3">
                        <div
                          className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center  hover:font-bold hover:rounded-xl hover:bold ${
                            applyed === "all"
                              ? "bg-gray-400 rounded-xl font-bold text-white"
                              : ""
                          }`}
                          onClick={() => setapplyed("all")}
                        >
                          <p className="">All</p>
                        </div>
                        <div
                          className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center hover:font-bold hover:rounded-xl hover:bold  ${
                            applyed === "accepted"
                              ? "bg-gray-400 rounded-xl font-bold text-white"
                              : ""
                          }`}
                          onClick={() => setapplyed("accepted")}
                        >
                          <p className="">Accepted</p>
                        </div>
                        <div
                          className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center  hover:font-bold hover:rounded-xl hover:bold ${
                            applyed === "pending"
                              ? "bg-gray-400 rounded-xl font-bold text-white"
                              : ""
                          }`}
                          onClick={() => setapplyed("pending")}
                        >
                          <p className="">Pending</p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-auto">
                      {applyed === "all" ? (
                        <AllapplyedList />
                      ) : applyed === "accepted" ? (
                        <AcceptedList />
                      ) : (
                        <PendingList />
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
            <div className="overflow-auto mx-5">
               <InvitesList/>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

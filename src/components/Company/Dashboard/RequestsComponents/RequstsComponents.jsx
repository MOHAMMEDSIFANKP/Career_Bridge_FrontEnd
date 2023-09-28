import React, { useState } from "react";
import AllDetails from "./CompanyList/AllDetails";
import PendingList from "./CompanyList/PendingList";
import AcceptedList from "./CompanyList/AcceptedList";
import RejectedList from "./CompanyList/RejectedList";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../../../Loading/Loading";
import { CompanyApplyPostList } from "../../../../services/companyApi";
import { useSelector } from "react-redux";

function RequstsComponents() {
  const { CompanyInfo } = useSelector((state) => state.company);
  const [List,setList] = useState([])
  const [selected, setselected] = useState("all");
  async function GetCompanysList() {
    try {
      const res = await CompanyApplyPostList(CompanyInfo.companyid);
      setList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const ResetList = (data) => {
    setList(data);
  };
    // ---------------------------------react quary-------------------------------------//
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
      queryKey: ["Companylist"],
      queryFn: () => GetCompanysList(),
    });
  
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <h1 className="text-center mt-20 font-bold text-2xl text-purple-400">
          Something went Wrong
        </h1>
      );
    }
    // ---------------------------------react quary-------------------------------------//
  
  return (
    <>
      <div className="flex justify-center">
        <div className="border h-[44rem] w-full mt-4 rounded-xl mx-5 shadow-lg grid grid-rows-[9rem,1fr]">
          <div className="border-b">
            <p className="font-bold text-2xl ms-10 mt-4">Member list</p>
            <p className="ms-10">See information about all members</p>
            <div className="bg-gray-100 w-2/5 h-9 rounded-xl ms-10 mt-2 grid grid-cols-4">
              <div
                className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center  hover:font-bold hover:rounded-xl hover:bold ${
                  selected === "all"
                    ? "bg-gray-400 rounded-xl font-bold text-white"
                    : ""
                }`}
                onClick={() => setselected("all")}
              >
                <p className="">All</p>
              </div>
              <div
                className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center hover:font-bold hover:rounded-xl hover:bold  ${
                  selected === "pending"
                    ? "bg-gray-400 rounded-xl font-bold text-white"
                    : ""
                }`}
                onClick={() => setselected("pending")}
              >
                <p className="">Pendng</p>
              </div>
              <div
                className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center  hover:font-bold hover:rounded-xl hover:bold ${
                  selected === "accepted"
                    ? "bg-gray-400 rounded-xl font-bold text-white"
                    : ""
                }`}
                onClick={() => setselected("accepted")}
              >
                <p className="">Accepted</p>
              </div>
              <div
                className={`flex justify-center cursor-pointer font-bold text-gray-600 items-center hover:font-bold hover:rounded-xl hover:bold ${
                  selected === "rejected"
                    ? "bg-gray-400 rounded-xl font-bold text-white"
                    : ""
                }`}
                onClick={() => setselected("rejected")}
              >
                <p className="">Rejected</p>
              </div>
            </div>
          </div>
          <div>
            {selected === "all" ? (
              <AllDetails List={List} ResetList={ResetList}/>
            ) : selected === "pending" ? (
              <PendingList/>
            ) : selected === "accepted" ? (
              <AcceptedList/>
            ) : (
             <RejectedList/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RequstsComponents;

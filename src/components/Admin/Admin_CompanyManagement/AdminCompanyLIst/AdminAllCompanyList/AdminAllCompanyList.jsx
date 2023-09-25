import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../Loading/Loading";
import {  CompanyList, VerifyAndBlock } from "../../../../../services/adminApi";

function AdminAllCompanyList({ List, ResetCompanyList }) {
  const [Search, setSearch] = useState("");
  const [filteredCompanyList, setFilteredCompanyList] = useState(List);
  useEffect(() => {
    const filteredUsers = List.filter(
      (List) =>
        List.company_name?.toLowerCase().includes(Search.toLowerCase()) ||
        List.company_type?.toLowerCase().includes(Search.toLowerCase()) ||
        List.country?.toLowerCase().includes(Search.toLowerCase()) ||
        List.state?.toLowerCase().includes(Search.toLowerCase()) ||
        List.city?.toLowerCase().includes(Search.toLowerCase()) ||
        List.userId?.email.toLowerCase().includes(Search.toLowerCase())
    );
    setFilteredCompanyList(filteredUsers);
  }, [List, Search]);

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  // Block Unblock users
  const CompanyVerifyAndBlock = async (value, id) => {
    const data = {
      is_verify: value,
    };
    try {
      handleLoading();
      const res = await VerifyAndBlock(data, id);
        if (res.status === 200) {
          const res2 = await CompanyList();
          ResetCompanyList(res2.data);
          if (value){
            toast.success("Verified sucessfully");
          }else{
            toast.success("Blocked sucessfully");
          }
          
        }
      handleLoading();
    } catch (error) {
      handleLoading();
      console.log(error);
      toast.error("Something wrong");
    }
  };
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <div className="sticky top-0">
        <input
          type="text"
          value={Search}
          placeholder="Search ..."
          className="border py-2 px-3 mt-4 mx-8 md:w-10/12 w-8/12 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="-ms-4 border py-2 px-3 rounded-lg bg-purple-400 font-bold text-white"
          onClick={() => {
            setSearch("");
          }}
        >
          Clear
        </button>
      </div>
      {filteredCompanyList.length === 0 ? (
        <p className="text-center mt-3 font-bold text-xl">No users found</p>
      ) : (
        filteredCompanyList.map((companylist, index) => (
          <div className="hover:bg-gray-200 cursor-pointer mx-3 py-5 mt-5 border rounded-xl grid grid-cols-[14rem,1fr,14rem]">
            <div className="flex justify-center items-center">
              <div className="w-28 border  rounded-full ">
                <img
                  src={companylist?.userId?.profile_image}
                  alt=""
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-gray-800">
              <div className="flex">
                <div>
                  <p className="font-bold text-xl capitalize">
                    {companylist?.company_name}
                  </p>
                </div>
                <div className="ms-2">
                  {companylist.is_verify ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p className="font-bold">{companylist.userId?.email}</p>
              <p className="font-bold">gst : {companylist?.gst}</p>
              <p className="font-bold text-sm">{companylist?.industry}</p>
              <p className="font-bold text-sm">{companylist?.company_type}</p>
              <p className="font-bold text-sm">{companylist?.company_size}</p>
              {companylist.streetaddress ? (
                <>
                  <p className="font-bold text-sm">
                    {companylist?.streetaddress}
                  </p>
                  <p className="font-bold text-sm">
                    {companylist?.city} / {companylist?.state} /{" "}
                    {companylist?.country} / {companylist.zipcode}
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center items-center">
              {!companylist.is_verify ? (
                <button
                  className="bg-green-500 px-3 py-2 rounded-xl text-white font-bold"
                  onClick={() => CompanyVerifyAndBlock(true, companylist.id)}
                >
                  Verify
                </button>
              ) : (
                <button
                  className="ms-3 bg-red-400 px-5 py-2 rounded-xl text-white font-bold"
                  onClick={() => CompanyVerifyAndBlock(false, companylist.id)}
                >
                  Block
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default AdminAllCompanyList;

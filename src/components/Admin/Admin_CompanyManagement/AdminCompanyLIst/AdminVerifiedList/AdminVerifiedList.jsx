import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../Loading/Loading";
import { useQuery } from "react-query";
import axios from "axios";
import { CompanyVerifiedList,VerifyAndBlock } from "../../../../../services/adminApi";
import { Chip } from "@material-tailwind/react";

function AdminVerifiedList() {
  const [Search, setSearch] = useState("");
  const [Searcheddata, setSearcheddata] = useState([]);
  const [filteredCompanyList, setFilteredCompanyList] = useState([]);

  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    handleLoading();
    try {
      const res = await CompanyVerifiedList(searchTerm);
      console.log(res);
      setFilteredCompanyList(res.data);
      setSearcheddata(res.data.results);
      handleLoading();
    } catch (error) {
      handleLoading();
      console.log(error);
    }
  };

  const handleClear = () => {
    setSearch("");
    handleSearch("");
  };
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
        const Search = ''
        const res2 = await CompanyVerifiedList(Search);
        setFilteredCompanyList(res2.data);
      setSearcheddata(res2.data.results);
        if (value) {
          toast.success("Verified sucessfully");
        } else {
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
  // Next page
  const NextButton = async () => {
    handleLoading();
    const res = await axios.get(filteredCompanyList.next);
    handleLoading();
    setFilteredCompanyList(res.data);
    setSearcheddata(res.data.results);
  };
  // Preview Page
  const PrevButton = async () => {
    handleLoading();
    const res = await axios.get(filteredCompanyList.previous);
    handleLoading();
    setFilteredCompanyList(res.data);
    setSearcheddata(res.data.results);
  };
  // Fech Data in backend
  async function GetCompanyList() {
    try {
      const res = await CompanyVerifiedList(Search);
      setFilteredCompanyList(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
      filteredCompanyList([]);
      setSearcheddata([]);
    }
  }
  //---------------------------- React quary---------------------------------------//

  const { data, isLoading, isError } = useQuery("companylist", GetCompanyList);
  if (isLoading) {
    document.title = "Company List | Career Bridge";
    return <Loader />;
  }

  if (isError) {
    return (
      <h1 className="text-center font-bold text-2xl mt-5 text-gray-700">
        There was an error fetching data
      </h1>
    );
  }
  //---------------------------- React quary---------------------------------------//
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <div className="sticky top-0">
        <div className="sticky top-0">
          <input
            type="text"
            value={Search}
            placeholder="Search ..."
            className="border py-2 px-3 mt-4 mx-8 md:w-10/12 w-8/12 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className="-ms-4 border py-2 px-3 rounded-lg bg-purple-400 font-bold text-white"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        <p className="mx-10 font-bold sticky top-14 text-gray-900 text-sm">
          {filteredCompanyList.count ? filteredCompanyList.count : 0} result
          found
        </p>
      </div>
      {Searcheddata.map((companylist, index) => (
        <div className="hover:bg-gray-200 cursor-pointer mx-3 py-5 mt-5 border rounded-xl grid grid-cols-[14rem,1fr,18rem]">
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
          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center">
              {companylist.is_verify ? (
                <Chip
                  variant="ghost"
                  color="green"
                  size="sm"
                  value="V e r i f i e d"
                  icon={
                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                  }
                />
              ) : (
                <Chip
                  variant="ghost"
                  color="red"
                  size="sm"
                  value="U n v e r i f i e d"
                  icon={
                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
                  }
                />
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
        </div>
      ))}
       <div className="flex justify-between my-5">
        <button
          className={`border rounded-xl ms-9 border-purple-400 font-bold text-purple-400 px-4 py-1 ${
            filteredCompanyList.previous === null ? "opacity-0" : ""
          } `}
          onClick={PrevButton}
        >
          Prev
        </button>
        <button
          className={`bg-purple-400 rounded-xl me-9 font-bold text-white px-4 py-1 border ${
            filteredCompanyList.next === null ? "opacity-0" : ""
          }`}
          onClick={NextButton}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default AdminVerifiedList;

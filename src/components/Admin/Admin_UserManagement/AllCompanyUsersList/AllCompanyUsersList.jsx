import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loading/Loading";
import { CompanyUsersList, UserBlockUnBlock, UsersList } from "../../../../services/adminApi";
import { useQuery } from "react-query";
import axios from "axios";
import { Chip } from "@material-tailwind/react";

function AllCompanyUsersList() {
  const [Search, setSearch] = useState("");
  const [Searcheddata, setSearcheddata] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);

  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    handleLoading();
    try {
      const res = await CompanyUsersList(searchTerm);
      console.log(res);
      setFilteredUserList(res.data);
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
  const BlockUnblock = async (value, id) => {
    const data = {
      is_active: value,
    };
    try {
      handleLoading();
      const res = await UserBlockUnBlock(data, id);
      if (res.status === 200) {
        if (res.data.is_active === true){
            toast.success("Unblocked sucessfully");
        }else{
            toast.success("Blocked sucessfully");
        }
        const res2 = await CompanyUsersList(Search);
        setFilteredUserList(res2.data);
        setSearcheddata(res2.data.results);
        
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
    const res = await axios.get(filteredUserList.next);
    setFilteredUserList(res.data);
    setSearcheddata(res.data.results);
  };
  const PrevButton = async () => {
    const res = await axios.get(filteredUserList.previous);
    setFilteredUserList(res.data);
    setSearcheddata(res.data.results);
  };
  async function GetUsersList() {
    try {
      const res = await CompanyUsersList(Search);
      console.log(res.data,'company');
      setFilteredUserList(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
      filteredUserList([]);
      setSearcheddata([]);
    }
  }
  //---------------------------- React quary---------------------------------------//

  const { data, isLoading, isError } = useQuery("UsersList", GetUsersList);
  if (isLoading) {
    document.title = "Company users List | Career Bridge";
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
        {filteredUserList.count ? filteredUserList.count : 0} result found
      </p>
      {
        Searcheddata.map((userlist, index) => (
          <div className="hover:bg-gray-200 cursor-pointer mx-3 py-5 mt-5 border rounded-xl grid grid-cols-[14rem,1fr,22rem]">
            <div className="flex justify-center items-center">
              <div className="w-28 border  rounded-full ">
                <img
                  src={userlist?.profile_image}
                  alt=""
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-gray-800">
              <div className="flex">
                <div>
                  <p className="font-bold text-xl capitalize">
                    {userlist.first_name} {userlist.last_name}
                  </p>
                </div>
                <div className="ms-4">
                  {userlist.role === "user" ? (
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
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  ) : userlist.role === "company" ? (
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
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <p className="font-bold">{userlist.email}</p>
              <div className="flex">
                <p className="font-bold me-3">Profile compleated</p>

                {userlist.is_compleated ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600"
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
                    className="w-6 h-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <div>
                {userlist.is_google ? (
                  <p className="font-bold">Login with Google</p>
                ) : (
                  <p className="font-bold">Login with email</p>
                )}
              </div>
             
            </div>
            <div className="grid grid-cols-[1fr,8rem]">
             <div className="flex justify-center items-center">
             <div>
              {userlist.is_active?( <Chip
                  variant="ghost"
                  color="green"
                  size="sm"
                  value="A c t v e"
                  icon={
                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                  }
                />):(<Chip
                  variant="ghost"
                  color="red"
                  size="sm"
                  value="I n a c t i  v e"
                  icon={
                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
                  }
                />)}
              </div>
             </div>
              <div className="flex justify-center items-center">
              {!userlist.is_active ? (
                <button
                  className="bg-green-500 px-3 py-2 rounded-xl text-white font-bold"
                  onClick={() => BlockUnblock(true, userlist.id)}
                >
                  Unblock
                </button>
              ) : (
                <button
                  className="ms-3 bg-red-400 px-5 py-2 rounded-xl text-white font-bold"
                  onClick={() => BlockUnblock(false, userlist.id)}
                >
                  Block
                </button>
              )}
            </div>
            </div>
          </div>
        ))
      }
      <div className="flex justify-between my-5">
        <button
          className={`border rounded-xl ms-9 border-purple-400 font-bold text-purple-400 px-4 py-1 ${
            filteredUserList.previous === null ? "opacity-0" : ""
          } `}
          onClick={PrevButton}
        >
          Prev
        </button>
        <button
          className={`bg-purple-400 rounded-xl me-9 font-bold text-white px-4 py-1 border ${
            filteredUserList.next === null ? "opacity-0" : ""
          }`}
          onClick={NextButton}
        >
          Next
        </button>
      </div>
      
    </>
  );
}

export default AllCompanyUsersList;

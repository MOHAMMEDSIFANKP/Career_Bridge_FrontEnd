import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loading/Loading";
import { UserBlockUnBlock, UsersList } from "../../../../services/adminApi";

function BlockedUsersList({ UserList, ResetUserList }) {
  const [Search, setSearch] = useState(""); 
  const [filteredUserList, setFilteredUserList] = useState(UserList);

  useEffect(() => {
    const filteredUsers = UserList.filter(
      (userlist) =>
        userlist.first_name.toLowerCase().includes(Search.toLowerCase()) ||
        userlist.last_name.toLowerCase().includes(Search.toLowerCase()) ||
        userlist.email.toLowerCase().includes(Search.toLowerCase())
    );
    setFilteredUserList(filteredUsers);
  }, [UserList, Search]);

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
        const res2 = await UsersList();
        ResetUserList(res2.data);
        toast.success("Updated sucessfully");
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
      <div>
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
      {filteredUserList.length === 0 ? (
    <p className="text-center mt-3 font-bold text-xl">No users found</p>
  ) : (
      filteredUserList
      .filter((userlist) => !userlist.is_active).map((userlist, index) => (
        <div className="hover:bg-gray-200 cursor-pointer mx-3 py-5 mt-5 border rounded-xl grid grid-cols-[14rem,1fr,14rem]">
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
            <p className="font-bold text-xl capitalize">
              {userlist.first_name} {userlist.last_name}
            </p>
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
      )))}
    </>
  );
}

export default BlockedUsersList;

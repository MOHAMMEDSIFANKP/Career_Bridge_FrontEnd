import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AllDetails({List,ResetList}) {
  const [Search, setSearch] = useState("");
  const [filteredUserList, setFilteredUserList] = useState(List);
  useEffect(() => {
    const filteredUsers = List.filter(
      (List) =>
        List.userInfo?.jobField.field_name.toLowerCase().includes(Search.toLowerCase()) 
        // List.last_name.toLowerCase().includes(Search.toLowerCase()) ||
        // List.email.toLowerCase().includes(Search.toLowerCase())
    );
    setFilteredUserList(filteredUsers);
  }, [List, Search]);

  return (
    <>
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
      <ToastContainer />
      <div className="">
        <div className="hover:bg-gray-200 cursor-pointer mx-3 py-5 mt-5 border rounded-xl grid grid-cols-[14rem,1fr,14rem]">
          <div className="flex justify-center items-center">
            <img
              src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM="
              alt=""
              className="w-28 rounded-full"
            />
          </div>
          <div className="text-gray-800">
            <p className="font-bold text-xl">Mohammed sifan kp</p>
            <p className="font-bold">Full stack python devoloper</p>
            <p>skills : python node </p>
          </div>
          <div className="flex justify-center items-center">
          <button className="bg-green-500 px-5 py-2 rounded-xl text-white font-bold">Accept</button>
            <button className="ms-3 bg-red-400 px-5 py-2 rounded-xl text-white font-bold">Reject</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllDetails;

import React, { useEffect, useState } from "react";
import Loader from "../../../../Loading/Loading";
import { useQuery } from "react-query";
import axios from "axios";
import { Chip, select } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  JobFieldDetails,
  JobFieldListAndCreaterPagination,
  JobFieldListDeleted,
} from "../../../../../services/adminApi";

function BlockedCategoryList() {
  const [Search, setSearch] = useState("");
  const [Posts, setPosts] = useState([]);
  const [Searcheddata, setSearcheddata] = useState([]);
  const [Selectedpost, setSelectedPost] = useState(null);
  const SelectedItem = (id, index) => {
    const sel = Posts.results.find((post) => post.id === id);
    setSelectedPost(sel);
  };
  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  //   For searching
  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    try {
      const res = await JobFieldListDeleted(searchTerm);
      setPosts(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setSearch("");
    handleSearch("");
  };
  // Edit Jobtitle
  const UnblockJobtitle = async () => {
    try {
      handleLoading();
      const data = {
        is_deleted : false
      }
      const res = await JobFieldDetails(data,Selectedpost.id);
      if (res.status === 200) {
        toast.success(` ${res.data.field_name} Unblocked success fully`);
        const Search = "";
        const res2 = await JobFieldListDeleted(Search);
        setPosts(res2.data);
        setSearcheddata(res2.data.results);
      } else {
        toast.error("Something Wrong");
      }
      handleLoading();
    } catch (error) {
      handleLoading();
      console.log(error);
      toast.error("Something Wrong");
    }
  };
  // Fech data backend
  async function GetCompanyPost() {
    try {
      const Search = "";
      const res = await JobFieldListDeleted(Search);
      setPosts(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
      setPosts([]);
      setSearcheddata([]);
    }
  }

  // Next page
  const NextButton = async () => {
    const res = await axios.get(Posts.next);
    setPosts(res.data);
    setSearcheddata(res.data.results);
  };
  const PrevButton = async () => {
    const res = await axios.get(Posts.previous);
    setPosts(res.data);
    setSearcheddata(res.data.results);
  };
  // Update data after deleting and editting
  const updateSearcheddata = (newSearcheddata) => {
    setPosts(newSearcheddata);
    setSearcheddata(newSearcheddata.results);
  };
  //---------------------------- React quary---------------------------------------//

  const { data, isLoading, isError } = useQuery(
    "getCompanypost",
    GetCompanyPost
  );
  if (isLoading) {
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
      <div className="ms-2 sticky top-0">
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
        {Posts.count ? Posts.count : 0} result found
      </p>

      {Searcheddata.map((jobcategory, index) => (
        <div
          key={index}
          className="shadow border mx-5 rounded-xl bg-red-50 my-4 grid grid-cols-2 py-4"
        >
          <>
            <p className="font-bold text-gray-800 text-center ">
              {jobcategory.field_name}
            </p>
            <div className="flex justify-end mx-3">
              <svg
                onClick={() => {
                  UnblockJobtitle(), SelectedItem(jobcategory.id, index);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-400 mx-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </>
        </div>
      ))}
      <div className="flex justify-between py-5">
        <button
          className={`border rounded-xl ms-9 border-purple-400 font-bold text-purple-400 px-4 py-1 ${
            Posts.previous === null ? "opacity-0" : ""
          } `}
          onClick={PrevButton}
        >
          Prev
        </button>
        <button
          className={`bg-purple-400 rounded-xl me-9 font-bold text-white px-4 py-1 border ${
            Posts.next === null ? "opacity-0" : ""
          }`}
          onClick={NextButton}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default BlockedCategoryList;

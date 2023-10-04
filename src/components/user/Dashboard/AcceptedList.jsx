import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Loader from "../../Loading/Loading";

import axios from "axios";
import { UserAcceptedApplyPostList } from "../../../services/userApi";
function AcceptedList() {
  const { UserInfo } = useSelector((state) => state.user);

  const [view, setView] = useState({ view: false, id: "", index: "" });
  const [Search, setSearch] = useState("");
  const [Posts, setPosts] = useState([]);
  const [Searcheddata, setSearcheddata] = useState([]);
  const [Selectedpost, setSelectedPost] = useState(null);

  // Date Schedule
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const SelectedItem = (id, index) => {
    const sel = Posts.results.find((post) => post.id === id);
    setSelectedPost(sel);
    setView({ view: true, id: id, index: index });
  };

  // For seraching
  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    console.log(searchTerm);
    try {
      const res = await UserAcceptedApplyPostList(UserInfo.userinfoid, searchTerm);
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

  // Fech data backend
  async function GetRequsts() {
    try {
      const res = await UserAcceptedApplyPostList(UserInfo.userinfoid, Search);
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

  //---------------------------- React quary---------------------------------------//

  const { data, isLoading, isError } = useQuery("requests", GetRequsts);
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
      {!view.view ? (
        <>
          <div className="ms-2 sticky bg-white top-0">
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
          {Searcheddata.map((Post, index) => (
            <div
              key={index}
              className="grid grid-cols-[11rem,1fr,16rem] cursor-pointer hover:bg-gray-100 text-gray-600 border mx-8 py-3 mt-4  rounded-2xl shadow"
            >
              <div
                className="flex justify-center items-center"
                onClick={() => SelectedItem(Post.id, index)}
              >
                <div className="w-20 border border-purple-400 rounded-full flex justify-center items-center">
                  <img
                    src={Post.Post.companyinfo.userId?.profile_image}
                    alt=""
                    className="w-20 p-1  rounded-full"
                  />
                </div>
              </div>
              <div
                className="capitalize grid grid-rows-[1fr,1rem]"
                onClick={() => SelectedItem(Post.id, index)}
              >
                <div>
                  <p className="font-bold text-xl text-gray-800">
                    {Post.Post.companyinfo.company_name}
                  </p>
                  <p className="font-bold text-gray-800">
                    <p className="text-sm font-normal">Applyes Post</p>
                    {Post.Post?.Jobtitle.title_name}{" "}
                  </p>
                  <div className="flex">
                    <p className="pe-1">Skills :</p>
                    {Post.Post.skills.slice(0, 4).map((skill, index) => (
                      <p key={index} className="pe-1">
                        {skill.skills},{" "}
                      </p>
                    ))}
                    {Post.Post.skills.length > 3 && <p>...</p>}
                  </div>
                </div>
                <div className="flex text-sm pt-1">
                  <p className="text-center">
                    {Post?.days === 0 ? "Today" : `${Post.days} Days ago`}
                  </p>
                </div>
              </div>
              <div className="grid grid-rows-[1fr,1rem]">
                <div className="flex justify-center items-center gap-4">
                  {Post.accepted ? (
                    <>
                      <button className="font-bold text-white bg-green-400 px-2 py-1 rounded-xl">
                        Message
                      </button>
                      <p className="text-green-400 font-bold">Accepted</p>
                    </>
                  ) : (
                    <>
                      {Post.rejected ? (
                        <>
                          <p className="text-red-300 font-bold ">Rejected </p>
                        </>
                      ) : (
                        <p className="font-bold text-yellow-400">Pending</p>
                      )}
                    </>
                  )}
                </div>
                <div className=" text-center font-bold">
                  {Post.schedule ? (
                    <p>Scheduled at : {Post.schedule}</p>
                  ) : (
                    <p>Not scheduled</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {Posts.count === 0 ? (
            <div className="bg-purple-50 h-[29rem] mt-4 mx-5 rounded-xl flex justify-center items-center">
              <p className="font-bold rounded-2xl border flex justify-center items-center text-gray-600 text-2xl">
                <span>Request is empty</span>
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="border mx-10 mt-5  pb-4 rounded-xl shadow">
            <div className="ms-10 mt-3 flex justify-between">
              <div className="">
                <p className="capitalize font-bold ">Post details</p>
              </div>
              <div
                className="me-7 cursor-pointer"
                onClick={() => setView({ ...view, view: !view })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-purple-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-[20rem,1fr,1fr]">
              <div>
                <div className=" flex ms-10 text-gray-700 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                    />
                  </svg>
                  <p className="ms-2">{Selectedpost.Post?.work_time}</p>
                </div>
                <div className="mt-2 ms-10 flex text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <p className="ms-2">
                    {Selectedpost.Post?.companyinfo.country} /{" "}
                    {Selectedpost.Post?.companyinfo.state} /{" "}
                    {Selectedpost.Post?.companyinfo.city}
                  </p>
                </div>
                <div>
                  <div className="mt-2 ms-10">
                    <p className="font-bold text-sm">
                      Role :{" "}
                      <span className="text-gray-900 font-normal">
                        {Selectedpost.Post?.job_category?.field_name}
                      </span>
                    </p>
                    <p className="font-bold text-sm">
                      Role Category :{" "}
                      <span className="text-gray-900 font-normal">
                        Software Development
                      </span>
                    </p>
                    <p className="font-bold text-sm">
                      Experience :{" "}
                      <span className="text-gray-900 font-normal">
                        {Selectedpost.Post?.Jobtitle?.title_name}{" "}
                      </span>
                    </p>
                    <p className="font-bold text-sm">
                      Year of experience :{" "}
                      <span className="text-gray-900 font-normal">
                        {Selectedpost.Post.year_of_experience
                          ? Selectedpost.Post.year_of_experience
                          : 0}{" "}
                        year
                      </span>
                    </p>
                    <p className="font-bold text-sm">
                      Industry Type :{" "}
                      <span className="text-gray-900 font-normal">
                        {Selectedpost.Post.companyinfo.industry}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-1 mx-3 overflow-auto">
                <p className="font-bold text-sm sticky top-0 bg-white">
                  Education
                </p>
                <div className=" overflow-auto scrollbar-thin M scrollbar-thumb-purple-400 h-full">
                  <p className="text-sm">{Selectedpost.Post.education}</p>
                </div>
              </div>
              <div className="my-1 me-10">
                <p className="font-bold text-sm sticky top-0 bg-white">
                  Job description
                </p>
                <div className=" overflow-auto scrollbar-thin M scrollbar-thumb-purple-400 h-full">
                  <p className="text-sm">{Selectedpost.Post.description}</p>
                </div>
              </div>
            </div>
            <div className="flex ms-10 items-center flex-wrap">
              <p className="font-bold text-sm">Key Skills : </p>

              {Selectedpost.Post.skills.map((skill, index) => (
                <p
                  key={index}
                  className="px-2 text-white text-sm bg-purple-300 font-bold rounded-full mx-1 py-1"
                >
                  {skill.skills}{" "}
                </p>
              ))}
            </div>
            <div className="flex justify-center">
              <hr className="my-3 w-5/6" />
            </div>
            <p className=" font-bold capitalize ms-10 my-2">Company Details</p>
            <div className="grid grid-cols-[20rem,1fr,1fr]">
              <div className="ms-10 capitalize">
                <p className="text-sm font-bold">
                  name :{" "}
                  <span className="font-normal">
                    {Selectedpost.Post.companyinfo?.company_name}{" "}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  email :{" "}
                  <span className="font-normal lowercase">
                    {Selectedpost.Post.companyinfo.userId?.email}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  industry :{" "}
                  <span className="font-normal lowercase">
                    {Selectedpost.Post.companyinfo?.industry}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  company size :{" "}
                  <span className="font-normal lowercase">
                    {Selectedpost.Post.companyinfo?.company_size}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  Street address :{" "}
                  <span className="font-normal">
                    {Selectedpost.Post?.companyinfo.streetaddress}
                  </span>
                </p>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-900"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                    />
                  </svg>
                  <p className="text-sm ps-2">
                    {Selectedpost.Post?.companyinfo?.country} /{" "}
                    {Selectedpost.Post?.companyinfo?.state} /{" "}
                    {Selectedpost.Post?.companyinfo?.city}
                  </p>
                </div>
              </div>
              <div className="my-1 me-10">
                <p className="font-bold text-sm sticky top-0 bg-white">
                  Job description
                </p>
                <div className=" overflow-auto scrollbar-thin M scrollbar-thumb-purple-400 h-full">
                  <p className="text-sm">
                    {Selectedpost.Post.companyinfo?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-between my-5">
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

export default AcceptedList;

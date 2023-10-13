import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Loader from "../../Loading/Loading";

import {
  CompanyHomeListing,
} from "../../../services/companyApi";
import PdfIcon from "../../../assets/PdfIcon.png";
import OpenToCv from "../../Profile/MyinfoComponent/Modal/OpenToCv";
import axios from "axios";
import ScheduleModal from "../Dashboard/RequestsComponents/CompanyList/ScheduleModal/ScheduleModal";
import InviteModal from "./InviteModal/InviteModal";
function CompanyHome({}) {
  const { CompanyInfo } = useSelector((state) => state.company);

  const [view, setView] = useState({ view: false, id: "", index: "" });
  const [Search, setSearch] = useState("");
  const [Posts, setPosts] = useState([]);
  const [Searcheddata, setSearcheddata] = useState([]);
  const [Selectedpost, setSelectedPost] = useState(null);

  const SelectedItem = (id, index) => {
    const sel = Posts.results.find((post) => post.id === id);
    setSelectedPost(sel);
    setView({ view: true, id: id, index: index });
  };
  // Invite Job
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  // Cv
  const [openCv, setOpenCv] = useState(false);
  const handleOpenCv = () => setOpenCv(!openCv);
  // For seraching
  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    try {
      const res = await CompanyHomeListing(searchTerm);
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



  async function GetRequsts() {
    try {
      const res = await CompanyHomeListing(Search);
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
  // Rest View
  const resetView = () => {
    setView({ view: false, id: "", index: "" });
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
          <div className="ms-2 me-10 sticky flex items-center bg-white top-0">
            <input
              type="text"
              value={Search}
              placeholder="Search ..."
              className="border py-2 px-3  mx-8 w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button
              className=" border py-2 px-3 rounded-lg bg-purple-400 font-bold text-white"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          <p className="mx-10 font-bold sticky top-10 text-gray-900 text-sm">
            {Posts.count ? Posts.count : 0} result found
          </p>
          {Searcheddata.slice(0, 5).map((Post, index) => (
            <div
            key={index}
            className="grid grid-rows-[6rem,1fr] cursor-pointer hover:bg-gray-100 text-gray-600 border mx-8 mt-4  rounded-2xl shadow"
            onClick={() => SelectedItem(Post.id, index)}
          >
            <div className="flex justify-between ">
              <div className="w-full flex  items-center">
                <div className="ms-9 w-16 h-16 rounded-full flex justify-center items-center border p-1 border-purple-100">
                  <img
                    src={Post.userId?.profile_image}
                    className="rounded-full h-full w-full"
                    alt="Profile"
                  />
                </div>

                <div className="ms-3 ">
                  <p className="font-bold text-gray-700">
                    {Post.userId?.first_name} {Post.userId?.last_name}
                  </p>
                </div>
              </div>
              <div className="me-3 -mt-5 flex justify-center items-center">
                {Post.invited ? (
                  <Chip
                    variant="ghost"
                    color="green"
                    size="sm"
                    value="i n v i t e d"
                    className="me-6"
                  />
                ) : (
                  ""
                )}
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </button>
                <p className="text-sm">Save</p>
              </div>
            </div>{" "}
            <div className="flex ms-9">
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
              <p className="ms-2">{Post.jobTitle?.title_name}</p>
              <p className="mx-2 text-gray-700 ">|</p>
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
                {Post.state} / {Post.city}
              </p>
            </div>
            <div className="ms-9 mt-1 flex  flex-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-gray-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              {Post.skills.slice(0, 7).map((skill, index) => (
                <p className="mb-3 ms-2" key={index}>
                  {skill.skills}
                  {index < 6 && ","}
                </p>
              ))}
              {Post.skills.length > 7 && (
                <p className="mb-3 ms-2">...</p>
              )}
            </div>
          </div>
          ))}
          {Posts.count === 0 ? (
            <p className="text-center font-bold text-xl">Result Not found</p>
          ) : null}
        </>
      ) : (
        <>
          <div className="border mx-10 my-5  rounded-xl shadow">
                  <div className="ms-10 mt-3 flex justify-between">
                    <div>
                      <p className="capitalize font-bold ">
                        {Selectedpost.userId.first_name}{" "}
                        {Selectedpost.userId.last_name}
                      </p>
                    </div>
                    <div
                      className="me-7 flex items-center cursor-pointer"
                      onClick={() => setView({ ...view, view: !view })}
                    >
                      {Selectedpost.invited ? (
                        <Chip
                          variant="ghost"
                          color="green"
                          size="sm"
                          value="i n v i t e d"
                          className="me-6"
                        />
                      ) : (
                        ""
                      )}
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
                  <div className=" mt-2 ms-10 text-gray-700 ">
                    <p className="font-bold text-sm">
                      Role :{" "}
                      <span className="text-gray-900 font-normal">
                        {Selectedpost.jobField.field_name}
                      </span>
                    </p>
                    <p className="font-bold text-sm">
                      Role Category :{" "}
                      <span className="text-gray-900 font-normal">
                        {Selectedpost.jobTitle.title_name}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div className="mt-2 text-sm ms-10 flex text-gray-700 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-900"
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
                      <p className="ms-2 text-gray-900">
                        {Selectedpost.state} / {Selectedpost.city}
                      </p>
                    </div>
                    <div className="me-10">
                      <button className="border border-purple-400 rounded-2xl font-bold text-purple-400 px-2 py-1">
                        Save
                      </button>
                      {!Selectedpost?.invited ? (
                        <button
                          className="font-bold bg-purple-300 text-white rounded-2xl px-2 py-1 ms-2"
                          onClick={handleOpen}
                        >
                          Invite
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <hr className="my-3 w-5/6" />
                  </div>
                  <div className=" gap-3 mx-10">
                    <div className="my-1  overflow-auto h-[7rem] scrollbar-thin border rounded-xl p-1 scrollbar-thumb-purple-400 ">
                      <p className="font-bold text-sm ">Bio</p>
                      <p className="text-sm">{Selectedpost.bio}</p>
                    </div>
                    <div className="me-10 w-5/5 grid grid-rows-[3rem,1fr] mt-5 border h-56 rounded-2xl  overflow-hidden">
                      <div className="flex items-center bg-white ">
                        <p className="ms-5 font-bold">Education</p>
                      </div>
                      <div className="overflow-x-scroll flex scrollbar-thin M scrollbar-thumb-purple-400">
                        {Selectedpost.experience.map((experience) => (
                          <div
                            key={experience.id}
                            className="w-52 border border-gray-400 flex  items-center justify-center rounded-2xl ms-3 mb-2"
                          >
                            <div className="text-center w-52">
                              <p className="font-bold capitalize">
                                {experience.subtitle}
                              </p>
                              <p className="text-md capitalize my-1">
                                {experience.company}
                              </p>
                              <p>
                                {experience.startdate} - {experience.enddate}
                              </p>
                              <p className="text-sm">
                                {experience.state}, {experience.country}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="me-10 w-5/5 grid grid-rows-[3rem,1fr] h-56 mt-5 border rounded-2xl overflow-hidden">
                      <div className="flex items-center bg-white ">
                        <p className="ms-5 font-bold">Education</p>
                      </div>
                      <div className="overflow-x-scroll flex scrollbar-thin M scrollbar-thumb-purple-400">
                        {Selectedpost.education.map((educations, index) => (
                          <div
                            key={index}
                            className="w-52 border  border-gray-400 flex  items-center justify-center  rounded-2xl ms-3 mb-3"
                          >
                            <div className="text-center  w-52 ">
                              <p className="font-bold capitalize mt-">
                                {educations.School}
                              </p>
                              <p className="text-md capitalize my-1">
                                {educations.Degree}
                              </p>
                              <p>
                                {educations.DatesAttended} -{" "}
                                {educations.Datesended}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="my-3">
                      <p className="font-bold text-sm">Key Skills</p>
                      <div className="flex flex-wrap">
                        {Selectedpost.skills.map((skill, index) => (
                          <p
                            key={index}
                            className="rounded-2xl border px-2 bg-purple-300 text-white font-bold me-2 my-1"
                          >
                            <span>{skill.skills}</span>
                          </p>
                        ))}
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
      <InviteModal open={open} handleOpen={handleOpen} Selectedpost={Selectedpost} resetView={resetView}/>
    </>
  );
}

export default CompanyHome;

import React, { useEffect, useState } from "react";
import Loader from "../../../../Loading/Loading";
import { useSelector } from "react-redux";
import { EditPostComponent } from "../EditPostComponent/EditPostComponent";
import { GetListOfCompanyPost } from "../../../../../services/companyApi";
import { DeletePost } from "../BlockUnblock/DeletePost";
import { useQuery } from "react-query";
import axios from "axios";

function PostListingComponents() {
  const { CompanyInfo } = useSelector((state) => state.company);

  const [view, setView] = useState({ view: false, id: "", index: "" });
  const [Search, setSearch] = useState("");
  const [Posts,setPosts] = useState([])
  const [Searcheddata, setSearcheddata] = useState([]);
  const [Selectedpost, setSelectedPost] = useState(null);

  const SelectedItem = (id, index) => {
    const sel = Posts.results.find((post) => post.id === id);
    setSelectedPost(sel);
    setView({ view: true, id: id, index: index });
  };
  // Edit Modal
  const handleOpen = () => setOpen(!open);
  const [open, setOpen] = useState(false);
  // Delete Modal
  const handleOpenDelete = () => setOpenDelete(!openDelete);
  const [openDelete, setOpenDelete] = useState(false);

  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    try {
      const res = await GetListOfCompanyPost(CompanyInfo.companyid, searchTerm);
      setPosts(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClear = () => {
    setSearch('');
    handleSearch('');
  };

  async function GetCompanyPost() {
    try {
      const res = await GetListOfCompanyPost(CompanyInfo.companyid, Search);
      setPosts(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
      setPosts([]);
      setSearcheddata([]);
    }
  }

  // Next page
  const NextButton =async()=>{
    const res = await axios.get(Posts.next)
    setPosts(res.data);
    setSearcheddata(res.data.results);
  }
  const PrevButton = async ()=>{
    const res = await axios.get(Posts.previous)
    setPosts(res.data);
    setSearcheddata(res.data.results);
  }
  // Rest View
  const resetView = () => {
    setView({ view: false, id: "", index: "" });
  };
  // Update data after deleting and editting
  const updateSearcheddata = (newSearcheddata) => {
    setPosts(newSearcheddata);
    setSearcheddata(newSearcheddata.results);
  };
  //---------------------------- React quary---------------------------------------//

  const { data, isLoading, isError } = useQuery("joblist", GetCompanyPost);
  if (isLoading) {
    return (
        <Loader />
    );
  }

  if (isError) {
    return (
      <h1 className="text-center font-bold text-2xl mt-5 text-gray-700">There was an error fetching data</h1>

    );
  }
  //---------------------------- React quary---------------------------------------//


  
  return (
    <>
      {!view.view ? (
        <>
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
          <p className="mx-10 font-bold sticky top-14 text-gray-900 text-sm">{Posts.count?Posts.count:0} result found</p>
          {
            Searcheddata.filter(
              (Post) => !Post.is_blocked && !Post.is_deleted
            ).map((Post, index) => (
              <div
                key={index}
                className="grid grid-rows-[5rem,1fr] cursor-pointer hover:bg-gray-100 text-gray-600 border mx-8 mt-4  rounded-2xl shadow"
                onClick={() => SelectedItem(Post.id, index)}
              >
                <div className="flex justify-between ">
                  <div className="mt-5">
                    <p className="font-bold text-black ms-10 pt-2 capitalize">
                      {Post.Jobtitle.title_name}
                    </p>
                    <p className="font-bold ms-10 text-gray-700">
                      {Post.companyinfo.company_name}
                    </p>
                  </div>
                  <div>
                    <button className="mt-3" onClick={handleOpen}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-purple-400 me-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button onClick={handleOpenDelete}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-400 me-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
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
                  <p className="ms-2">{Post.work_time}</p>
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
                    {Post.companyinfo.country} / {Post.companyinfo.state} /{" "}
                    {Post.companyinfo.city}
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
                  {Post.skills.map((skill, index) => (
                    <p className="mb-3 ms-2" key={index}>
                      {skill.skills}
                      {index === 6 && Post.skills.length > 7 ? "..." : ","}
                    </p>
                  ))}
                </div>
                <div className="ms-10 ">
                  <p className="text-sm text-gray-600 font-bold">
                    Education qualification
                  </p>
                  <div className="md:h-9 p-2 -mt-2">
                    {typeof Post.education === "string"
                      ? Post.education.split(" ").slice(0, 15).join(" ") +
                        (Post.education.split(" ").length > 15 ? "..." : "")
                      : ""}
                  </div>
                  <p className="text-sm text-gray-600 font-bold">Desription </p>
                  <div className="overflow-clip md:h-9  p-2 mb-3 -mt-2">
                    {typeof Post.description === "string"
                      ? Post.description.split(" ").slice(0, 15).join(" ") +
                        (Post.description.split(" ").length > 15 ? "..." : "")
                      : ""}
                  </div>
                </div>
              </div>
              
            ))
         }
          {Posts.count === 0 ? (
            <div className="bg-purple-50 h-[29rem] mt-4 mx-5 rounded-xl flex justify-center items-center">
              <p className="font-bold rounded-2xl border flex justify-center items-center text-gray-600 text-2xl">
                <span>Add Your Post</span>
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="border mx-10 mt-5  rounded-xl shadow">
            <div className="ms-10 mt-3 flex justify-between">
              <div>
                <p className="capitalize font-bold ">
                  {Selectedpost.Jobtitle.title_name}
                </p>
                <p className="capitalize font-bold text-gray-700">
                  {Selectedpost.companyinfo.company_name}
                </p>
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
              <p className="ms-2">{Selectedpost.work_time}</p>
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
                {Selectedpost.companyinfo.country} /{" "}
                {Selectedpost.companyinfo.state} /{" "}
                {Selectedpost.companyinfo.city}
              </p>
            </div>
            <div className="flex justify-center">
              <hr className="my-3 w-5/6" />
            </div>
            <div className="grid md:grid-rows-[7rem,1fr,1fr,1fr] gap-3 mx-10">
              <div>
                <p className="font-bold text-sm">
                  Role :{" "}
                  <span className="text-gray-900 font-normal">
                    {Selectedpost.Jobtitle.title_name}
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
                    {Selectedpost.level_of_experience}
                  </span>
                </p>
                <p className="font-bold text-sm">
                  Year of experience :{" "}
                  <span className="text-gray-900 font-normal">
                    {Selectedpost.year_of_experience
                      ? Selectedpost.year_of_experience
                      : 0}{" "}
                    year
                  </span>
                </p>
                <p className="font-bold text-sm">
                  Industry Type :{" "}
                  <span className="text-gray-900 font-normal">
                    {Selectedpost.companyinfo.industry}
                  </span>
                </p>
                <p className="font-bold text-sm">
                  Employment Type :{" "}
                  <span className="text-gray-900 font-normal">
                    {Selectedpost.work_time}
                  </span>
                </p>
              </div>
              <div className="my-1">
                <p className="font-bold text-sm">Education</p>
                <p className="text-sm">{Selectedpost.education}</p>
              </div>
              <div className="-mt-4">
                <p className="font-bold text-sm">Job description</p>
                <p className="text-sm">{Selectedpost.description}</p>
              </div>
              <div className="">
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
      <button className={`border rounded-xl ms-9 border-purple-400 font-bold text-purple-400 px-4 py-1 ${Posts.previous === null ?'opacity-0':''} `} onClick={PrevButton}>Prev</button>
      <button className={`bg-purple-400 rounded-xl me-9 font-bold text-white px-4 py-1 border ${Posts.next === null ? 'opacity-0':''}`} onClick={NextButton}>Next</button>
      </div>
      <DeletePost
        isOpen={openDelete}
        view={view}
        onClose={handleOpenDelete}
        resetView={resetView}
        updateSearcheddata={updateSearcheddata}
        Selectedpost={Selectedpost}
      />
      <EditPostComponent
        open={open}
        handleOpen={handleOpen}
        Selectedpost={Selectedpost}
        view={view}
        resetView={resetView}
        updateSearcheddata={updateSearcheddata}
      />
    </>
  );
}

export default PostListingComponents;

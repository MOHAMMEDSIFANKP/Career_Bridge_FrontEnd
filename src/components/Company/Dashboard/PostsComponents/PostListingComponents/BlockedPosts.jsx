import React, { useState } from "react";
import Loader from "../../../../Loading/Loading";
// Service
import { GetListOfCompanyPost } from "../../../../../services/companyApi";

// React Query
import { useQuery } from "react-query";
// Redux
import { useSelector } from "react-redux";
function BlockedPosts() {
  const { CompanyInfo } = useSelector((state) => state.company);

  const [view, setview] = useState({ view: "", index: "" });
  const [Search, setSearch] = useState("");
  const [Searcheddata, setSearcheddata] = useState([]);
  const [Selectedpost, SetselectedPost] = useState();
  const [CompanyPosts, setCompanyPosts] = useState([]);

  const SelectedItem = (id) => {
    setview({ ...view, view: !view.view, index: id });
    const sel = CompanyPosts.find((post) => post.id === id);
    SetselectedPost(sel);
  };

  // Searching Datas
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchData = CompanyPosts.filter((post) => {
      const jobCategoryMatch = post.job_category.field_name
        .toLowerCase()
        .includes(Search.toLowerCase());
      const skillsMatch = post.skills.some((skill) =>
        skill.skills.toLowerCase().includes(Search.toLowerCase())
      );
      const titleNameMatch = post.Jobtitle.title_name
        .toLowerCase()
        .includes(Search.toLowerCase());
      return jobCategoryMatch || skillsMatch || titleNameMatch;
    });
    setSearcheddata(searchData);
  };
  // Feching company post in backend
  async function GetCompanyPost() {
    const res = await GetListOfCompanyPost(CompanyInfo.companyid);
    setCompanyPosts(res.data);
    if (Search.trim() === "") {
      setSearcheddata(res.data);
    }
  }

  //---------------------------- React quary---------------------------------------//
  const { data, isLoading, isError } = useQuery("posts", GetCompanyPost);
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
          <div className="ms-2 sticky top-0">
            <input
              type="text"
              value={Search}
              placeholder="Search ..."
              className="border py-2 px-3 mt-4 mx-8 md:w-10/12 w-8/12 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
              onChange={handleSearch}
            />
            <button
              className="-ms-4 border py-2 px-3 rounded-lg bg-purple-400 font-bold text-white"
              onClick={() => {
                setSearch(""), setSearcheddata(CompanyPosts);
              }}
            >
              Clear
            </button>
          </div>
          {Searcheddata.length > 0 ? (
            Searcheddata.filter(
              (Post) => Post.is_blocked
            ).map((Post, index) => (
              <div
                key={index}
                className="grid grid-rows-[5rem,1fr] cursor-pointer hover:bg-gray-100 text-gray-600 border mx-8 mt-4 bg-yellow-100 rounded-2xl shadow"
                onClick={() => SelectedItem(Post.id)}
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
                    {/* <button className="mt-3 border py-1 px-2 me-4 rounded-md bg-green-400 text-white font-bold">
                     Unblock
                    </button> */}
                  </div>
                </div>
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
                <div className="ms-9 mt-1 flex flex-wrap">
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
          ) : (
            <p className="text-center mt-4 font-bold text-xl">
              Result not found
            </p>
          )}
        </>
      ) : (
        <>
          <div className="border mx-10 mt-5 bg-yellow-100 rounded-xl shadow">
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
                className="me-7"
                onClick={() => setview({ ...view, view: !view })}
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
    </>
  )
}

export default BlockedPosts
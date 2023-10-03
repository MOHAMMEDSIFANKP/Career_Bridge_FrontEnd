import React, { useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { Collapse, Chip } from "@material-tailwind/react";
import {
  AdminJobFieldList,
  AdminJobTitlelist,
  AdminSkillsList,
} from "../../../services/adminApi";
import { useQuery } from "react-query";
import Loader from "../../../components/Loading/Loading";
import { UserPostLists } from "../../../services/userApi";
import { useSelector } from "react-redux";
import { ApplyJobsCreation } from "../../../services/companyApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';

function Jobs() {
  const { UserInfo } = useSelector((state) => state.user);
  const [view, setView] = useState({ view: false, id: "", index: "" });
  const [Search, setSearch] = useState("");
  const [Lists, setLists] = useState([]);
  const [Searcheddata, setSearcheddata] = useState([]);
  const [Selectedpost, setSelectedPost] = useState(null);
  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  // Skills
  const [Skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const displaySkills = showAllSkills ? Skills : Skills.slice(0, 7);
  // Job Category
  const [Category, setCategory] = useState([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState([]);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const toggleOpenCategory = () => setOpenCategory((cur) => !cur);
  const displayCategory = showAllCategory ? Category : Category.slice(0, 5);
  // Job Title
  const [JobTitle, setJobTitle] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState([]);
  const [showAllJobTitle, setShowAllJobTitle] = useState(false);
  const [openJobTitle, setOpenJobTitle] = React.useState(false);
  const toggleOpenJobTitle = () => setOpenJobTitle((cur) => !cur);
  const displayJobTitle = showAllJobTitle ? JobTitle : JobTitle.slice(0, 5);
  // Talent type
  const [selectedTalentrype, setSelectedTalentrype] = useState([]);
  const [openTalenttype, setOpenTalenttype] = React.useState(false);
  const toggleOpenTalenttype = () => setOpenTalenttype((cur) => !cur);
  // Skills add and remove
  const handleCheckboxClick = async (skill) => {
    const isSkillSelected = selectedSkills.includes(skill);
    let updatedSelectedSkills;

    if (isSkillSelected) {
      updatedSelectedSkills = selectedSkills.filter(
        (selected) => selected !== skill
      );
    } else {
      updatedSelectedSkills = [...selectedSkills, skill];
    }
    setSelectedSkills(updatedSelectedSkills);
    const skillsQueryParam = updatedSelectedSkills.join(",");
    const jobCategoriesQueryParam = selectedJobCategory.join(",");
    const jobTitleQueryParam = selectedJobTitle.join(",");
    const talenttypeQueryParam = selectedTalentrype.join(",");
    try {
      const search = "";
      const res = await UserPostLists(
        UserInfo.userinfoid,
        search,
        skillsQueryParam,
        jobCategoriesQueryParam,
        jobTitleQueryParam,
        talenttypeQueryParam
      );
      console.log(res.data);
      setLists(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  // Jobcategory add and remove
  const handleCheckboxjobcategory = async (Jobcategory) => {
    const isjobcategorySelected = selectedJobCategory.includes(Jobcategory);
    let updatedSelectedJobcategory;
    if (isjobcategorySelected) {
      updatedSelectedJobcategory = selectedJobCategory.filter(
        (selected) => selected !== Jobcategory
      );
    } else {
      updatedSelectedJobcategory = [...selectedJobCategory, Jobcategory];
    }
    setSelectedJobCategory(updatedSelectedJobcategory);
    const skillsQueryParam = selectedSkills.join(",");
    const jobCategoriesQueryParam = updatedSelectedJobcategory.join(",");
    const jobTitleQueryParam = selectedJobTitle.join(",");
    const talenttypeQueryParam = selectedTalentrype.join(",");
    try {
      const search = "";
      const res = await UserPostLists(
        UserInfo.userinfoid,
        search,
        skillsQueryParam,
        jobCategoriesQueryParam,
        jobTitleQueryParam,
        talenttypeQueryParam
      );
      setLists(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  // JobTitle add and remove
  const handleCheckboxJobTitle = async (JobTitle) => {
    const isJobTitleSelected = selectedJobTitle.includes(JobTitle);
    let updatedSelectedJobTitle;
    if (isJobTitleSelected) {
      updatedSelectedJobTitle = selectedJobTitle.filter(
        (selected) => selected !== JobTitle
      );
    } else {
      updatedSelectedJobTitle = [...selectedJobTitle, JobTitle];
    }
    setSelectedJobTitle(updatedSelectedJobTitle);
    const skillsQueryParam = selectedSkills.join(",");
    const jobCategoriesQueryParam = selectedJobCategory.join(",");
    const jobTitleQueryParam = updatedSelectedJobTitle.join(",");
    const talenttypeQueryParam = selectedTalentrype.join(",");
    try {
      const search = "";
      const res = await UserPostLists(
        UserInfo.userinfoid,
        search,
        skillsQueryParam,
        jobCategoriesQueryParam,
        jobTitleQueryParam,
        talenttypeQueryParam
      );
      setLists(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  // TalentType add and remove
  const handleCheckboxTalentrype = async (Talentrype) => {
    const isTalentrypeSelected = selectedTalentrype.includes(Talentrype);
    let updatedSelectedTalentType;
    if (isTalentrypeSelected) {
      updatedSelectedTalentType = selectedTalentrype.filter(
        (selected) => selected !== Talentrype
      );
    } else {
      updatedSelectedTalentType = [...selectedTalentrype, Talentrype];
    }
    setSelectedTalentrype(updatedSelectedTalentType);
    const skillsQueryParam = selectedSkills.join(",");
    const jobCategoriesQueryParam = selectedJobCategory.join(",");
    const jobTitleQueryParam = selectedJobTitle.join(",");
    const talenttypeQueryParam = updatedSelectedTalentType.join(",");
    try {
      const search = "";
      const res = await UserPostLists(
        UserInfo.userinfoid,
        search,
        skillsQueryParam,
        jobCategoriesQueryParam,
        jobTitleQueryParam,
        talenttypeQueryParam
      );
      console.log(res.data.results);
      setLists(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  //   For searching
  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    try {
      const res = await UserPostLists(
        UserInfo.userinfoid,
        searchTerm,
        selectedSkills,
        selectedJobCategory,
        selectedJobTitle,
        selectedTalentrype
      );
      setLists(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setSearch("");
    handleSearch("");
    setSelectedSkills([]);
    setSelectedJobCategory([]);
    setSelectedJobTitle([]);
    setSelectedTalentrype([]);
  };
  //   Select a Post
  const SelectedItem = (id, index) => {
    const sel = Searcheddata.find((post) => post.id === id);
    setSelectedPost(sel);
    setView({ view: true, id: id, index: index });
  };
  // ApplyForJob
  const ApplyForJob = async () => {
    const data = {
      comanyInfo: Selectedpost.companyinfo.id,
      userInfo: UserInfo.userinfoid,
      Post: Selectedpost.id,
    };
    const res = await ApplyJobsCreation(data);
    setView({ view: false, id: "", index: "" });
    toast.success("Applyed Successfully");
    Filters();
  };
  // Feching data from backend
  const Filters = async (itemName = '') => {
    try {
      handleLoading();
      const search = itemName || '';
      const res4 = await UserPostLists(
        UserInfo.userinfoid,
        search,
        selectedSkills,
        selectedJobCategory,
        selectedJobTitle,
        selectedTalentrype
      );
      const res = await AdminSkillsList(search);
      const res2 = await AdminJobFieldList();
      const res3 = await AdminJobTitlelist();
      setLists(res4.data);
      setSearcheddata(res4.data.results);
      setJobTitle(res3.data);
      setCategory(res2.data);
      setSkills(res.data);
      handleLoading();
    } catch (error) {
      handleLoading();
      console.log(error);
    }
  };
  //---------------------------- React quary---------------------------------------//
  const { itemName } = useParams();

  const { data, isLoading, isError } = useQuery("Filters", () => {
    return itemName ? Filters(itemName) : Filters();
  });

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
      <ToastContainer />
      {loading && <Loader />}
      <div className="grid grid-rows-[7rem,1fr] h-screen w-full">
        <div>
          <NavbarDefault />
        </div>
        <div className="grid grid-cols-[15rem,1fr]  container mx-auto">
          <div className="mx-4 me-7 h-[50rem] scrollbar-none overflow-y-auto">
            <p className="font-bold text-xl sticky top-0 bg-white">Filter by</p>
            <div>
              <div className="flex justify-between mx-5">
                <p className="font-bold ">Skills </p>
                {open ? (
                  <svg
                    onClick={() => {
                      toggleOpen(), setShowAllSkills((cur) => !cur);
                    }}
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
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={toggleOpen}
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
              <Collapse open={open} className="ms-6 ">
                <div className="h-68 overflow-y-auto">
                  {displaySkills.map((skill, index) => (
                    <div className="flex " key={index}>
                      <input
                        type="Checkbox"
                        checked={selectedSkills.includes(skill.skills)}
                        onChange={() => handleCheckboxClick(skill.skills)}
                      />
                      <p
                        className=" text-gray-800 ms-4 cursor-pointer hover:text-blue-gray-400"
                        onClick={() => handleCheckboxClick(skill.skills)}
                      >
                        {skill.skills}
                      </p>
                    </div>
                  ))}
                  {!showAllSkills && (
                    <button
                      className="text-blue-400"
                      onClick={() => setShowAllSkills(true)}
                    >
                      See More
                    </button>
                  )}
                </div>
              </Collapse>
            </div>
            <div>
              <div className="flex justify-between mx-5">
                <p className="font-bold ">Job Category </p>
                {openCategory ? (
                  <svg
                    onClick={() => {
                      toggleOpenCategory(), setShowAllCategory((cur) => !cur);
                    }}
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
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={toggleOpenCategory}
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
              <Collapse open={openCategory} className="ms-6 ">
                <div className="h-68 overflow-y-auto">
                  {displayCategory.map((cat, index) => (
                    <div className="flex " key={index}>
                      <input
                        type="Checkbox"
                        checked={selectedJobCategory.includes(cat.field_name)}
                        onChange={() =>
                          handleCheckboxjobcategory(cat.field_name)
                        }
                      />
                      <p
                        className=" text-gray-800 ms-4 cursor-pointer hover:text-blue-gray-400"
                        onClick={() =>
                          handleCheckboxjobcategory(cat.field_name)
                        }
                      >
                        {cat.field_name}
                      </p>
                    </div>
                  ))}
                  {!showAllCategory && (
                    <button
                      className="text-blue-400"
                      onClick={() => setShowAllCategory(true)}
                    >
                      See More
                    </button>
                  )}
                </div>
              </Collapse>
            </div>
            <div>
              <div className="flex justify-between mx-5">
                <p className="font-bold ">Job TItle </p>
                {openJobTitle ? (
                  <svg
                    onClick={() => {
                      toggleOpenJobTitle(), setShowAllJobTitle((cur) => !cur);
                    }}
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
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={toggleOpenJobTitle}
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
              <Collapse open={openJobTitle} className="ms-6 ">
                <div className="h-68y overflow-y-auto">
                  {displayJobTitle.map((title, index) => (
                    <div className="flex " key={index}>
                      <input
                        type="Checkbox"
                        checked={selectedJobTitle.includes(title.title_name)}
                        onChange={() =>
                          handleCheckboxJobTitle(title.title_name)
                        }
                      />
                      <p
                        className=" text-gray-800 ms-4 cursor-pointer hover:text-blue-gray-400"
                        onClick={() => handleCheckboxJobTitle(title.title_name)}
                      >
                        {title.title_name}
                      </p>
                    </div>
                  ))}
                  {!showAllJobTitle && (
                    <button
                      className="text-blue-400"
                      onClick={() => setShowAllJobTitle(true)}
                    >
                      See More
                    </button>
                  )}
                </div>
              </Collapse>
            </div>
            <div>
              <div className="flex justify-between mx-5 ">
                <p className="font-bold ">Talent Type </p>
                {openTalenttype ? (
                  <svg
                    onClick={toggleOpenTalenttype}
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
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={toggleOpenTalenttype}
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
              <Collapse open={openTalenttype} className="ms-6 ">
                <div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTalentrype.includes("fresher")}
                      onChange={() => handleCheckboxTalentrype("fresher")}
                    />
                    <p
                      className="cursor-pointer hover:text-blue-gray-400"
                      onClick={() => handleCheckboxTalentrype("fresher")}
                    >
                      fresher
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTalentrype.includes("intermediate")}
                      onChange={() => handleCheckboxTalentrype("intermediate")}
                    />
                    <p
                      className="cursor-pointer hover:text-blue-gray-400"
                      onClick={() => handleCheckboxTalentrype("intermediate")}
                    >
                      intermediate
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTalentrype.includes("export")}
                      onChange={() => handleCheckboxTalentrype("export")}
                    />
                    <p
                      className="cursor-pointer hover:text-blue-gray-400"
                      onClick={() => handleCheckboxTalentrype("export")}
                    >
                      expert
                    </p>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          <div className="border rounded-2xl shadow me-10 h-[50rem] scrollbar-thumb-amber-600 overflow-y-auto">
            <div className="ms-2 sticky top-0">
              <input
                type="text"
                value={Search}
                placeholder="Search ..."
                className="border py-2 px-3 mt-4 mx-8 md:w-9/12 w-6/12 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
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
              {Lists.count ? Lists.count : 0} result found
            </p>
            {!view.view ? (
              <>
                {Searcheddata.length > 0 ? (
                  Searcheddata.filter(
                    (Post) => !Post.is_blocked && !Post.is_deleted
                  ).map((Post, index) => (
                    <div
                      key={index}
                      className="grid grid-rows-[6rem,1fr] cursor-pointer hover:bg-gray-100 text-gray-600 border mx-8 mt-4  rounded-2xl shadow"
                      onClick={() => SelectedItem(Post.id, index)}
                    >
                      <div className="flex justify-between ">
                        <div className="w-full flex  items-center">
                          <div className="ms-10 w-20 rounded-full border p-1 borde-purple-100">
                            <img
                              src={Post.user_profile.profile_image}
                              className="rounded-full"
                              alt=""
                            />
                          </div>
                          <div className="ms-3 -mt-4">
                            <p className="font-bold text-black pt-2 capitalize">
                              {Post.Jobtitle.title_name}
                            </p>
                            <p className="font-bold text-gray-700">
                              {Post.companyinfo.company_name}
                            </p>
                          </div>
                        </div>
                        <div className="me-3 -mt-5 flex justify-center items-center">
                         {Post.applied? (<Chip
                            variant="ghost"
                            color="green"
                            size="sm"
                            value="A p p l i e d"
                            className="me-6"
                          />):''}
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
                          {Post.companyinfo.country} / {Post.companyinfo.state}{" "}
                          / {Post.companyinfo.city}
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
                      <div className="ms-10 ">
                        <p className="text-sm text-gray-600 font-bold">
                          Education qualification
                        </p>
                        <div className="md:h-9 p-2 -mt-2">
                          {typeof Post.education === "string"
                            ? Post.education.split(" ").slice(0, 15).join(" ") +
                              (Post.education.split(" ").length > 15
                                ? "..."
                                : "")
                            : ""}
                        </div>
                        <p className="text-sm text-gray-600 font-bold">
                          Desription{" "}
                        </p>
                        <div className="overflow-clip md:h-9  p-2 mb-3 -mt-2">
                          {typeof Post.description === "string"
                            ? Post.description
                                .split(" ")
                                .slice(0, 15)
                                .join(" ") +
                              (Post.description.split(" ").length > 15
                                ? "..."
                                : "")
                            : ""}
                        </div>
                      </div>
                      <div className="flex items-center mx-14 mb-2 -mt-2">
                        <p className="text-gray-600 -ms-7 text-sm ">
                          Posted:{" "}
                          {Post?.days === 0
                            ? "Just now"
                            : `${Post?.days} day ago`}{" "}
                        </p>
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
                      className="me-7 flex items-center cursor-pointer"
                      onClick={() => setView({ ...view, view: !view })}
                    >
                        {Selectedpost.applied? (<Chip
                            variant="ghost"
                            color="green"
                            size="sm"
                            value="A p p l i e d"
                            className="me-6"
                          />):''}
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
                  <div className="flex justify-center items-center">
                    <hr className="my-3 w-5/6" />
                  </div>
                  <div className="flex justify-around">
                    <div>
                      <p className="text-gray-600 -ms-7 text-sm ">
                        Posted:{" "}
                        {Selectedpost?.days === 0
                          ? "Just now"
                          : `${Selectedpost?.days} day ago`}{" "}
                      </p>
                    </div>
                    <div className="">
                      <button className="border border-purple-400 rounded-2xl font-bold text-purple-400 px-2 py-1">
                        Save
                      </button>
                      {!Selectedpost.applied ? (
                        <button
                          className="font-bold bg-purple-300 text-white rounded-2xl px-2 py-1 ms-2"
                          onClick={ApplyForJob}
                        >
                          Apply
                        </button>
                      ) : (
                       <></>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;

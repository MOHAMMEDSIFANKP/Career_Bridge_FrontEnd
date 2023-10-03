import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Select from "react-select";
import {
  AdminJobFieldList,
  AdminJobTitlelist,
  AdminSkillsList,
} from "../../../../../services/adminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../Loading/Loading";
import { CompanyPostlistCreate } from "../../../../../services/companyApi";
// Redux
import { useDispatch, useSelector } from "react-redux";
// React Query
import { useQuery } from "react-query";

export function AddPost({ open, handleOpen }) {
  const { CompanyInfo } = useSelector((state) => state.company);
  const [Form, setForm] = useState({
    companyinfo: "",
    work_time: "",
    Jobtitle: "",
    skills: [],
    job_category: null,
    level_of_experience: "",
    year_of_experience: null,
    education: "",
    description: "",
  });
  const [error, seterror] = useState({
    companyinfo: false,
    work_time: false,
    Jobtitle: false,
    skills: false,
    level_of_experience: false,
    year_of_experience: false,
    education: false,
    description: false,
  });

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  //-------------------------Role searching---------------------------------//

  const [Jobfield, setJobfield] = useState([]);
  const [JobTitle, setJobTitle] = useState([]);
  const [skill, setSkill] = useState([]);
  const [SelectedJobfield, setSelectedJobfield] = useState({});
  const [SelectedJobTitle, setSelectedJobTitle] = useState({});
  const [SelectedSkills, setSelectedSkills] = useState([]);
  const options = Jobfield.map((job) => ({
    value: job.field_name,
    id: job.id,
    label: job.field_name,
  }));
  const option2 = JobTitle.filter(
    (role) => role.field === SelectedJobfield.id
  ).map((job) => ({
    value: job.title_name,
    id: job.id,
    label: job.title_name,
  }));
  const options3 = skill.map((s) => ({
    value: s.skills,
    id: s.id,
    skills: s.skills,
    label: s.skills,
  }));
  const handleSkillsChange = (selectedOption) => {
    if (!SelectedSkills.find((item) => item.value === selectedOption.value)) {
      setSelectedSkills([...SelectedSkills, selectedOption]);
      setForm({ ...Form, skills: [...Form.skills, selectedOption.id] });
      seterror({ ...error, skills: false });
    }
  };

  // Get data
  async function getJoblist() {
    try {
      handleLoading();
      const response = await AdminJobFieldList();
      setJobfield(response.data);
      const response2 = await AdminJobTitlelist();
      setJobTitle(response2.data);
      const response3 = await AdminSkillsList();
      setSkill(response3.data);
      handleLoading();
    } catch (error) {
      handleLoading();
      toast.error("Error fetching job fields:", error);
    }
  }
  //-------------------------End Role searching---------------------------------//

  // Validation
  function Validation() {
    if (Form.work_time === "") {
      toast.error("Work time should not be blank");
      return false;
    } else if (Form.job_category === null) {
      seterror({ ...error, job_category: true });
      toast.error("Job Category should not be blank");
      return false;
    } else if (Form.Jobtitle === null) {
      seterror({ ...error, Jobtitle: true });
      toast.error("Job Title should not be blank");
      return false;
    } else if (Form.skills.length === 0) {
      seterror({ ...error, skills: true });
      toast.error("Atlest Select one skill");
      return false;
    } else if (Form.level_of_experience.trim() === "") {
      seterror({ ...error, level_of_experience: true });
      toast.error("What level of experience will it need?");
      return false;
    } else if (Form.education.trim() === "") {
      seterror({ ...error, education: true });
      toast.error("Education should not be blank");
      return false;
    } else if (Form.description.trim() === "") {
      seterror({ ...error, description: true });
      toast.error("Description should not be blank");
      return false;
    }
    return true;
  }
  const Submited = async () => {
    if (Validation()) {
      handleLoading();
      try {
        const data = {
          companyinfo: CompanyInfo.companyid,
          work_time: Form.work_time,
          Jobtitle: Form.Jobtitle,
          skills: Form.skills,
          job_category: Form.job_category,
          level_of_experience: Form.level_of_experience,
          year_of_experience: Form.year_of_experience,
          education: Form.education,
          description: Form.description,
        };
        const res = await CompanyPostlistCreate(data);
        if (res.status === 201) {
          setForm({
            companyinfo: "",
            work_time: "",
            Jobtitle: "",
            skills: [],
            job_category: "",
            level_of_experience: "",
            year_of_experience: null,
            education: "",
            description: "",
          });
          setSelectedJobTitle({});
          setSelectedJobfield({});
          setSelectedSkills([]);
          handleOpen();
        }
        handleLoading();
      } catch (error) {
        setForm({
          companyinfo: "",
          work_time: "",
          Jobtitle: "",
          skills: [],
          job_category: "",
          level_of_experience: "",
          year_of_experience: null,
          education: "",
          description: "",
        });
        setSelectedJobTitle({});
        setSelectedJobfield({});
        setSelectedSkills([]);
        handleOpen();
        handleLoading();
        console.log(error);
      }
    }
  };
  //---------------------------- React quary---------------------------------------//
  const { data, isLoading, isError } = useQuery("joblist", getJoblist);
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
      <Dialog open={open} handler={handleOpen}>
        {loading && <Loader />}
        <ToastContainer />
        <DialogHeader>Getting started</DialogHeader>
        <DialogBody>
          <div className="">
            <div className="grid grid-rows-[3rem,1fr] mx-6">
              <div>
                <p className=" text-gray-500">What would you like to do?</p>
              </div>
              <div className="grid grid-cols-2 gap-4 -mt-3">
                <div
                  className={`bg-purple-50 rounded-xl hover:border hover:border-purple-400 hover:text-purple-400 ${
                    Form.work_time === "short-term"
                      ? "border border-purple-400 text-purple-400"
                      : " hover:border hover:border-purple-400 hover:text-purple-400 "
                  }`}
                  onClick={() => setForm({ ...Form, work_time: "short-term" })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-16 md:ms-20 ms-10 pt-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-center">
                    Short term or part time <br /> work
                  </p>
                </div>
                <div>
                  <div
                    className={`bg-purple-50 rounded-xl h-full ${
                      Form.work_time === "long-term"
                        ? "border border-purple-400 text-purple-400"
                        : "hover:border hover:border-purple-400 hover:text-purple-400 "
                    }`}
                    onClick={() => setForm({ ...Form, work_time: "long-term" })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-16 md:ms-20 ms-10 pt-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>

                    <p className="text-center mt-2">Longer term work</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 my-3">
                <div>
                  <p className="mb-1 text-gray-500">Job category</p>
                  <Select
                    value={SelectedJobfield ? SelectedJobfield : ""}
                    onChange={(selectedOption) => {
                      setSelectedJobfield(selectedOption);
                      setForm({ ...Form, job_category: selectedOption.id });
                      seterror({ ...error, job_category: false });
                    }}
                    className={`border w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.job_category
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                    placeholder="Select an option"
                    options={options}
                  />
                </div>
                <div>
                  <p className="mb-1 text-gray-500">Job Title</p>
                  <Select
                    value={SelectedJobTitle ? SelectedJobTitle : ""}
                    onChange={(selectedOption) => {
                      setSelectedJobTitle(selectedOption);
                      setForm({ ...Form, Jobtitle: selectedOption.id });
                      seterror({ ...error, Jobtitle: false });
                    }}
                    className={`border w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.Jobtitle
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                    placeholder="Select an option"
                    options={option2}
                  />
                </div>
              </div>
              <div className="">
                <p className="mb-1 text-gray-500">Select skills</p>
                <div className="bg-purple-50 py-2 px-2 rounded-xl flex flex-wrap ">
                  {SelectedSkills.map((value, index) => (
                    <p
                      key={index}
                      className="border my-1 bg-purple-300 rounded-full text-white mx-1 px-2 font-bold pt-1"
                    >
                      {value.value}
                    </p>
                  ))}

                  <Select
                    onChange={handleSkillsChange}
                    placeholder="Select an option"
                    options={options3}
                    className={`border rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.skills
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="mb-1 mt-2 text-gray-500">
                    What level of experience will it need? :
                  </p>
                  <div className="flex">
                    <input
                      type="radio"
                      name="experience"
                      value="fresher"
                      checked={Form.level_of_experience === "fresher"}
                      onChange={(e) =>
                        setForm({
                          ...Form,
                          level_of_experience: e.target.value,
                        })
                      }
                      className={`border rounded-lg text-black placeholder-gray-700 text-sm  ${
                        error.level_of_experience
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                    <p className="ms-2">Fresher</p>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="experience"
                      value="intermediate"
                      checked={Form.level_of_experience === "intermediate"}
                      onChange={(e) =>
                        setForm({
                          ...Form,
                          level_of_experience: e.target.value,
                        })
                      }
                      className={`border rounded-lg text-black placeholder-gray-700 text-sm  ${
                        error.level_of_experience
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                    <p className="ms-2">Intermediate</p>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="experience"
                      value="export"
                      checked={Form.level_of_experience === "export"}
                      onChange={(e) =>
                        setForm({
                          ...Form,
                          level_of_experience: e.target.value,
                        })
                      }
                      className={`border rounded-lg text-black placeholder-gray-700 text-sm  ${
                        error.level_of_experience
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                    <p className="ms-2">Expert</p>
                  </div>
                </div>
                {Form.level_of_experience !== "fresher" && (
                  <div className="mt-1">
                    <p className="mb-1 mt-2 text-gray-500">
                      Year of experience :
                    </p>
                    <input
                      onChange={(e) =>
                        setForm({ ...Form, year_of_experience: e.target.value })
                      }
                      type="number"
                      className={`border ps-2 py-2 w-4/5 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                        error.year_of_experience
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="mb-1 mt-2 text-gray-500">
                  Education Qualifiaction :
                </p>
                <textarea
                  cols="50"
                  rows="4"
                  onChange={(e) => {
                    setForm({ ...Form, education: e.target.value }),
                      seterror({ ...error, education: false });
                  }}
                  className={`border p-1 w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.education
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                ></textarea>
              </div>
              <div>
                <p className="mb-1 mt-2 text-gray-500">Description :</p>
                <textarea
                  cols="50"
                  rows="4"
                  onChange={(e) => {
                    setForm({ ...Form, description: e.target.value }),
                      seterror({ ...error, description: false });
                  }}
                  className={`border p-1 w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.description
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                ></textarea>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <button onClick={handleOpen} className="mr-1 font-bold -mt-4">
            <span>Cancel</span>
          </button>
          <button
            variant="gradient"
            color="green"
            className="ms-2 me-5 -mt-4 bg-purple-400 text-white font-bold px-3 py-1 rounded-2xl"
            onClick={Submited}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

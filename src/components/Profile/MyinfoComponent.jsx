import { useState, useEffect } from "react";
import { AccountEdit } from "./Modal/AccountEdit";
import { Document, Page } from 'react-pdf';

// Images
import EditIcon from "../../assets/Edit.png";
import Defaultprofile from "../../assets/ProfileImg.jpeg";
import DeleteImg from "../../assets/DeleteImg.png";

// Redex
import { useDispatch } from "react-redux";
import { setExperiences } from "../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

function MyinfoComponent() {
  const { UserInfo } = useSelector((state) => state.user);
  const { experiences } = useSelector((state) => state.user);
  const { Education } = useSelector((state) => state.user);
  const { JobTitleRedex } = useSelector((state) => state.user);
  const { Skills } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    document.title = "Profile | Career Bridge";
  }, [UserInfo]);
  return (
    <>
      <div className="w-full flex">
        <div className="lg:visible invisible">
          <p className="lg:text-3xl text-xl font-bold ms-24"> My info</p>
          <p className=" mb-3 ps-14">This is a client account</p>
        </div>
      </div>
      <div className="me-10 h-60 rounded-2xl border border-purple-400">
        <div className="flex justify-between">
          <div className="flex items-end ms-5 text-xl font-bold">
            <p>Account</p>
          </div>
          <div>
            <div
              onClick={handleOpen}
              className="w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center"
            >
              <img src={EditIcon} className="w-5" alt="" />
            </div>
            <AccountEdit isOpen={open} onClose={handleOpen} />
          </div>
        </div>
        <div className="mx-5 md:flex items-center">
          <div className="w-1/5">
            <div className="mt-4">
              <img
                className="w-48 md:w-24 border border-purple-400 rounded-full"
                src={UserInfo == "" ? UserInfo.profile_image : Defaultprofile}
                alt="Profile image"
              />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm">Client</p>
            <p className="font-bold text-xl capitalize">
              {UserInfo.first_name} {UserInfo.last_name}
            </p>
            <p className="text-sm">Email</p>
            <p className="text-xl">{UserInfo.email} </p>
            <p className="text-sm">Position</p>
            <p className="font-bold text-md">{JobTitleRedex}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-rows-[2rem,1fr] me-10 border rounded-2xl border-purple-400">
        <div className="font-bold m-2">Add bio</div>
        {UserInfo.bio === "Add bio" ? (
          <div className="rounded-xl mx-3 my-3 border border-gray-300 flex justify-center items-center bg-purple-50 ">
            <div className="my-6 rounded-full text-white px-2 bg-purple-500 border border-purple-500">
              <p className="text-3xl">+</p>
            </div>
          </div>
        ) : (
          <div className="mx-3 my-2">
            <p className="ms-3 break-all">{UserInfo.bio}</p>
          </div>
        )}
      </div>
      <div className="mt-5 grid grid-rows-[2rem,1fr] me-10 border rounded-2xl border-purple-400">
        <div className="font-bold m-2">Add Skills</div>
        {!UserInfo.bio === "Add bio" ? (
          <div className="rounded-xl mx-3 my-3 border border-gray-300 flex justify-center items-center bg-purple-50 ">
            <div className="my-6 rounded-full text-white px-2 bg-purple-500 border border-purple-500">
              <p className="text-3xl">+</p>
            </div>
          </div>
        ) : (
          <div className="mx-3 my-2 mb-3">
            <div className="flex flex-wrap ">
              {Skills.map((skills, index) => (
                <p className="border rounded-full px-3 mx-1 bg-purple-400 text-white">
                  {skills.skills}
                </p>
              ))}
              <input
                type="text"
                placeholder="Add skills"
                className="ms-4 w-32 placeholder:text-sm  focus:border-x-white focus:outline-none focus:ring focus:ring-white "
              />
            </div>
          </div>
        )}
      </div>
      <div className="border border-purple-400 rounded-xl me-10 mt-5">
        <Document></Document>
      </div>
      <div className="me-10 w-5/5 grid grid-rows-[3rem,1fr] h-64 mt-5 border rounded-2xl border-purple-400 overflow-hidden">
        <div className="flex items-center bg-white ">
          <p className="ms-5 font-bold">Experience</p>
        </div>
        <div className="overflow-x-scroll flex scrollbar-thin scrollbar-thumb-purple-400">
          <div className="flex justify-center items-center">
            <div className="sm:col-span-12 md:col-span-6 px-24 md:px-28 shadow-xl bg-purple-50 lg:col-span-4 border md:h-48 mx-3 sm:h-40 sm:w-full h-11 w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer">
              <div className="-ms-20 rounded-full h-10 w-10 sm:bg-purple-400">
                <p
                  variant="gradient"
                  className="text-4xl ps-2 sm:text-white text-purple-400"
                >
                  +
                </p>
                <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                  Add Experience
                </p>
              </div>
            </div>
          </div>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="w-52 border  border-gray-400 rounded-2xl ms-3"
            >
              <div className="h-8  mt-2  me-2 flex justify-end sticky top-2 bg-white">
                <div className="w-8 flex justify-center items-center rounded-full border-purple-400 border ">
                  <img src={EditIcon} className="w-5" alt="" />
                </div>
                <div className="w-8 flex ms-3 justify-center items-center rounded-full border-purple-400 border ">
                  <img src={DeleteImg} className="w-5" alt="" />
                </div>
              </div>
              <div className="text-center mt-4 w-52 ">
                <p className="font-bold capitalize mt-">
                  {experience.subtitle}
                </p>
                <p className="text-md capitalize my-1">{experience.company}</p>
                <p>
                  {experience.startdate} - {experience.enddate}
                </p>
                <p className="text-sm">
                  {experience.state} , {experience.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="me-10 w-5/5 grid grid-rows-[3rem,1fr] h-64 mt-5 border rounded-2xl border-purple-400 overflow-hidden">
        <div className="flex items-center bg-white ">
          <p className="ms-5 font-bold">Education</p>
        </div>
        <div className="overflow-x-scroll flex scrollbar-thin scrollbar-thumb-purple-400">
        <div className="flex justify-center items-center">
            <div className="sm:col-span-12 md:col-span-6 px-24 md:px-28 shadow-xl bg-purple-50 lg:col-span-4 border md:h-48 mx-3 sm:h-40 sm:w-full h-11 w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer">
              <div className="-ms-20 rounded-full h-10 w-10 sm:bg-purple-400">
                <p
                  variant="gradient"
                  className="text-4xl ps-2 sm:text-white text-purple-400"
                >
                  +
                </p>
                <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                  Add Education
                </p>
              </div>
            </div>
          </div>
          {Education.map((educations, index) => (
            <div
              key={index}
              className="w-52 border  border-gray-400 rounded-2xl ms-3"
            >
              <div className="h-8  mt-2  me-2 flex justify-end sticky top-2 bg-white">
                <div className="w-8 flex justify-center items-center rounded-full border-purple-400 border ">
                  <img src={EditIcon} className="w-5" alt="" />
                </div>
                <div className="w-8 flex ms-3 justify-center items-center rounded-full border-purple-400 border ">
                  <img src={DeleteImg} className="w-5" alt="" />
                </div>
              </div>
              <div className="text-center mt-7 w-52 ">
                <p className="font-bold capitalize mt-">{educations.School}</p>
                <p className="text-md capitalize my-1">{educations.Degree}</p>
                <p>
                  {educations.DatesAttended} - {educations.Datesended}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>5</div>
    </>
  );
}

export default MyinfoComponent;

import { useState, useEffect, useRef } from "react";

// Modal
import { AccountEdit } from "./Modal/AccountEdit";
import OpenToCv from "./Modal/OpenToCv";

// Images
import EditIcon from "../../assets/Edit.png";
import Defaultprofile from "../../assets/ProfileImg.jpeg";
import DeleteImg from "../../assets/DeleteImg.png";
import PdfIcon from "../../assets/PdfIcon.png";

// Redex
import { useDispatch } from "react-redux";
import { UpdateUserDetails } from "../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

// Serviece
import { UpdateUserInfoDetails } from "../../services/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyinfoComponent() {
  const dispatch = useDispatch();
  // Redux destructure
  const [bio, setBio] = useState();
  const [EditBioBoolian, setEditBioBoolian] = useState(false);
  const { UserInfo } = useSelector((state) => state.user);
  const { experiences } = useSelector((state) => state.user);
  const { Education } = useSelector((state) => state.user);
  const { JobTitleRedex } = useSelector((state) => state.user);
  const { Skills } = useSelector((state) => state.user);

  // Modal user info edit
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // Modal view cv
  const [openCv, setOpenCv] = useState(false);
  const handleOpenCv = () => setOpenCv(!openCv);

  const addbioinput = useRef(null);

  const BioAddBtn = async () => {
    try {
      const res = await UpdateUserInfoDetails(
        { bio: bio },
        UserInfo.userinfoid
      );
      if (res.status === 200) {
        toast.success("Bio updated successfully");
        dispatch(
          UpdateUserDetails({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            bio: res.data.bio,
          })
        );
      }
    } catch (error) {
      toast.error("something wrong");
    }
  };
  // Edit Bio
  const BioEditBtn = async () => {
    setEditBioBoolian(false)
    try {
      const response = await UpdateUserInfoDetails(
        { bio: bio },
        UserInfo.userinfoid
      );
      if (response.status === 200) {
        toast.success("Bio updated successfully");
        dispatch(
          UpdateUserDetails({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            bio: response.data.bio,
          })
        );
      }
    } catch (error) {
      toast.error("something wrong");
    }
  };
  useEffect(() => {
    document.title = "Profile | Career Bridge";
  }, [UserInfo]);
  return (
    <>
      <ToastContainer />
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
        <div className="mx-5 flex items-center ms-14">
          <div className="w-1/5">
            <div className="mt-4">
              <img
                className="w-48 md:w-24 p-1 -ms-6 md:ms-0 border border-purple-400 rounded-full"
                src={
                  UserInfo === null ? Defaultprofile : UserInfo.profile_image
                }
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
      {/* Bio */}
      {!EditBioBoolian ? (
        <div className="mt-5 grid grid-rows-[2rem,1fr] me-10 border rounded-2xl border-purple-400">
          <div className="flex justify-between">
            <div className="font-bold ms-5 mt-3 capitalize">bio</div>
            {UserInfo.bio === "Add bio" ? (
              bio ? (
                <svg
                  onClick={BioAddBtn}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-9 h-9 font-bold text-purple-400 me-3 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                ""
              )
            ) : (
              <div
                onClick={() => setEditBioBoolian(true)}
                className="w-8 h-8 rounded-full border border-purple-400 me-4 mt-2 flex justify-center items-center"
              >
                <img src={EditIcon} className="w-5" alt="" />
              </div>
            )}
          </div>
          {/* Add Bio */}
          {UserInfo.bio === "Add bio" ? (
            <div className="rounded-xl mx-3 my-3  h-24 border border-gray-300 flex justify-center items-center bg-purple-50 ">
              {!bio ? (
                <>
                  <div
                    onClick={() => {
                      setBio("values"), addbioinput.current.focus();
                    }}
                    className="h-8 w-8 flex justify-center items-center rounded-full text-white bg-purple-400 border border-purple-500 cursor-pointer"
                  >
                    <p className="text-3xl">+</p>
                  </div>
                  <p className="text-xl text-gray-500 font-sans ms-2">
                    Add bio
                  </p>
                </>
              ) : (
                <>
                  <textarea
                    ref={addbioinput}
                    placeholder=" Add Bio"
                    onChange={(e) => setBio(e.target.value)}
                    className="border w-full py-2 placeholder:text-md placeholder:font-bold ps-3  mx-2 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100  border-gray-400"
                    id=""
                    cols="50"
                    rows="3"
                  />
                </>
              )}
            </div>
          ) : (
            <div className="rounded-xl mx-3 my-3  h-24 border border-gray-300 bg-purple-50 ">
              <p className="ms-3 break-all">{UserInfo.bio}</p>
            </div>
          )}
        </div>
      ) : (
         // Edit Bio
        <div className="mt-5 grid grid-rows-[2rem,1fr] me-10 border rounded-2xl border-purple-400">
          <div className="flex justify-between">
            <div className="font-bold ms-5 mt-3 capitalize">bio</div>
            <svg
              onClick={BioEditBtn}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9 font-bold text-purple-400 me-3 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="rounded-xl mx-3 my-3  h-24 border border-gray-300 flex justify-center items-center bg-purple-50 ">
            <>
              <textarea
                ref={addbioinput}
                defaultValue={UserInfo.bio}
                placeholder=" Add Bio"
                onChange={(e) => setBio(e.target.value)}
                className="border w-full py-2 placeholder:text-md placeholder:font-bold ps-3  mx-2 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100  border-gray-400"
                id=""
                cols="50"
                rows="3"
              />
            </>
          </div>
        </div>
      )}
{/* Skills */}
      <div className="mt-5 grid grid-rows-[2rem,1fr] me-10 border rounded-2xl border-purple-400">
        <div className="font-bold ms-4 mt-2">Add Skills</div>
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
              {/* <input
                type="text"
                placeholder="Add skills"
                className="ms-4 w-32 placeholder:text-sm  focus:border-x-white focus:outline-none focus:ring focus:ring-white "
              /> */}
            </div>
          </div>
        )}
      </div>
      <div className="border border-purple-400 grid grid-rows-[2.5rem,1fr] rounded-xl me-10 mt-5">
        <div>
          <p className="font-bold ms-4 mt-2">Cv</p>
        </div>
        {!UserInfo.cv ? (
          <div className="bg-purple-50 flex justify-center items-center h-24 mx-3 mb-3 rounded-xl border border-gray-300">
            <div className=" rounded-full border bg-purple-400 h-9 w-9 flex items-center justify-center text-3xl text-white">
              {" "}
              <p>+</p>
            </div>
            <p className="text-xl ms-3 text-gray-500">Add Cv</p>
          </div>
        ) : (
          <div className="flex justify-around   mb-3">
            <div>
              <div onClick={handleOpenCv}>
                <img
                  src={PdfIcon}
                  alt="Pdf Icon"
                  className="w-24 z-1 opacity-75"
                />
                <p className="text-sm text-gray-700  text-center">Click here</p>
              </div>
              <OpenToCv
                isOpen={openCv}
                onClose={handleOpenCv}
                path={UserInfo.cv}
              />
            </div>
            <div className="-me-7">
              <p className="font-bold">Update Cv</p>
              <input
                className="relative mt-5 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
              />
            </div>
          </div>
        )}
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

      <div className="border me-10 rounded-xl mt-3 mb-20 border-purple-400 grid grid-rows-[3rem,1fr]">
        <div className="flex justify-between">
          <div>
            <p className="font-bold m-2">Address</p>
          </div>
          <div className="m-3 flex justify-center items-center border-purple-400 border rounded-full w-8 h-8">
            <img src={EditIcon} alt="" className="w-5 rounded-full" />
          </div>
        </div>
        <div className="mx-5 mb-4">
          <p className="font-bold capitalize">{UserInfo.streetaddress}</p>
          <p className="text-md">{UserInfo.city}</p>
          <p className="text-sm">{UserInfo.state}</p>
          <p className="text-sm">{UserInfo.zipcode}</p>
        </div>
      </div>
    </>
  );
}

export default MyinfoComponent;

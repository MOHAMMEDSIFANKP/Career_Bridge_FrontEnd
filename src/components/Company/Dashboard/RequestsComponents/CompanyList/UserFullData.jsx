import { useState, useEffect } from "react";
import OpenToCv from "../../../../Profile/MyinfoComponent/Modal/OpenToCv";
import PdfIcon from "../../../../../assets/PdfIcon.png";

// Modal
import { AccountEdit } from "../../../../../components/Profile/MyinfoComponent/Modal/AccountEdit";

// Images
import EditIcon from "../../../../../assets/Edit.png";
import Defaultprofile from "../../../../../assets/ProfileImg.jpeg";

// Redex
import { useDispatch } from "react-redux";
import { UpdateUserDetails } from "../../../../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

// Serviece
import { UpdateUserInfoDetails } from "../../../../../services/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import SkillComponents from "../../../../Profile/MyinfoComponent/SkillComponents/SkillComponents";
import BioComponents from "../../../../Profile/MyinfoComponent/BioComponents/BioComponents";
import CvComponents from "../../../../Profile/MyinfoComponent/CvComponents/CvComponents";
import ExperienceComponents from "../../../../Profile/MyinfoComponent/ExperienceComponents/ExperienceComponents";
import EducationsComponents from "../../../../Profile/MyinfoComponent/EducationsComponents/EducationsComponents";
import AddressComponents from "../../../../Profile/MyinfoComponent/AddressComponents";
import { NavbarDefault } from "../../../../Navbar/NavBar";

function UserFullData() {
  // Modal view cv
  const [openCv, setOpenCv] = useState(false);
  const handleOpenCv = () => setOpenCv(!openCv);
  // Redux destructure

  const { UserInfo } = useSelector((state) => state.user);
  const { JobTitleRedex } = useSelector((state) => state.user);

  // Modal user info edit
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    document.title = "Profile | Career Bridge";
  }, [UserInfo]);
  return (
    <>
      <ToastContainer />
      <div className="grid h-screen grid-rows-[5rem,1fr] w-full">
        <NavbarDefault />
        <div className="container mx-auto">
          <div className="flex justify-between h-[7rem] items-center mx-20">
            <p className="font-bold text-3xl capitalize">User Details</p>
            <button className="bg-purple-400 px-5 py-2 rounded-xl text-white font-bold">
              Back
            </button>
          </div>
          <div className="mx-20 rounded-2xl border border-purple-400">
            <div className="flex justify-between">
              <div className="flex items-end ms-5 text-xl font-bold">
                <p>Account</p>
              </div>
            </div>
            <div className="mx-5 flex mb-4 pb-3 items-center ms-4 mt-2 bg-purple-50 rounded-xl">
              <div className="w-1/5">
                <div className="mt-4 ms-2 ">
                  <div className="xl:ms-10 border-2 flex justify-center items-center border-purple-400 h-24 w-24 rounded-full">
                    <img
                      className="w-full h-full p-1 rounded-full"
                      src={
                        UserInfo.profile_image === null
                          ? Defaultprofile
                          : UserInfo.profile_image
                      }
                      alt="Profile image"
                    />
                  </div>
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
          <div>
            <div className="border-purple-400 mx-20 p-4 mt-7 border rounded-2xl">
              <p className=" ms-2 text-xl font-bold">Bio</p>
              <div className="rounded-xl   h-24 border border-gray-300 bg-purple-50 ">
                <p className="ms-3 break-all">{UserInfo?.bio}dsd</p>
              </div>
            </div>
          </div>
          <div>
            <div className="border-purple-400 mx-20 p-4 mt-7 border rounded-2xl">
              <p className=" ms-2 text-xl font-bold">Skills</p>
              <div className="rounded-xl   h-24 border border-gray-300 bg-purple-50 ">
                <p className="ms-3 break-all">{UserInfo?.bio}dsd</p>
              </div>
            </div>
            <div>
              <div className="border-purple-400 mx-20 p-4 mt-7 border rounded-2xl">
                <p className=" ms-2 text-xl font-bold">Languages</p>
                <div className="rounded-xl   h-24 border border-gray-300 bg-purple-50 ">
                  <p className="ms-3 break-all">{UserInfo?.bio}dsd</p>
                </div>
              </div>
              <div className="border-purple-400 mx-20 p-4 mt-7 border rounded-2xl">
                <p className=" ms-2 text-xl font-bold">Cv</p>
                <div className="rounded-xl   h-24 border border-gray-300 bg-purple-50 ">
                  <div>
                    <div onClick={handleOpenCv}>
                      <img
                        src={PdfIcon}
                        alt="Pdf Icon"
                        className="w-24 z-1 opacity-75"
                      />
                    </div>
                    <OpenToCv
                      isOpen={openCv}
                      onClose={handleOpenCv}
                      path={UserInfo.cv}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
{/* 
      <ExperienceComponents />

      <EducationsComponents />

      <AddressComponents /> */}
    </>
  );
}

export default UserFullData;

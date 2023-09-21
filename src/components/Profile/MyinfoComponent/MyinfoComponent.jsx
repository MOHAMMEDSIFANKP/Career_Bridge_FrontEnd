import { useState, useEffect } from "react";

// Modal
import { AccountEdit } from "./Modal/AccountEdit";

// Images
import EditIcon from "../../../assets/Edit.png";
import Defaultprofile from "../../../assets/ProfileImg.jpeg";

// Redex
import { useDispatch } from "react-redux";
import { UpdateUserDetails } from "../../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

// Serviece
import { UpdateUserInfoDetails } from "../../../services/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import SkillComponents from "./SkillComponents/SkillComponents";
import BioComponents from "./BioComponents/BioComponents";
import CvComponents from "./CvComponents/CvComponents";
import ExperienceComponents from "./ExperienceComponents/ExperienceComponents";
import EducationsComponents from "./EducationsComponents/EducationsComponents";
import AddressComponents from "./AddressComponents";

function MyinfoComponent() {
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
      <div className="w-full flex">
        <div className="lg:visible invisible">
          <p className="lg:text-3xl text-xl font-bold ms-24"> My info</p>
          <p className=" mb-3 ps-14">This is a client account</p>
        </div>
      </div>
      <div className="me-10 rounded-2xl border border-purple-400">
        <div className="flex justify-between">
          <div className="flex items-end ms-5 text-xl font-bold">
            <p>Account</p>
          </div>
          <div>
            <div
              onClick={handleOpen}
              className="cursor-pointer w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center"
            >
              <img src={EditIcon} className="w-5" alt="" />
            </div>
            <AccountEdit isOpen={open} onClose={handleOpen} />
          </div>
        </div>
        <div className="mx-5 flex mb-4 pb-3 items-center ms-4 mt-2 bg-purple-50 rounded-xl">
          <div className="w-1/5">
            <div className="mt-4 ms-2 ">
              <div className="xl:ms-10 border-2 flex justify-center items-center border-purple-400 h-24 w-24 rounded-full">
              <img
                className="w-full h-full p-1 rounded-full"
                src={
                  UserInfo.profile_image === null ? Defaultprofile : UserInfo.profile_image
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

      <BioComponents UserInfo={UserInfo} />

      <SkillComponents />

      <CvComponents />

      <ExperienceComponents />

      <EducationsComponents />

      <AddressComponents />
    </>
  );
}

export default MyinfoComponent;

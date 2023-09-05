import EditIcon from "../../assets/Edit.png";
import Defaultprofile from "../../assets/ProfileImg.jpeg";
import { useState, useEffect } from "react";
// Redex
import { useDispatch } from "react-redux";
import { setExperiences } from "../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

function MyinfoComponent() {
  const { UserInfo } = useSelector((state) => state.user);

  useEffect(() => {}, [UserInfo]);
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
            <div className="w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center">
              <img src={EditIcon} className="w-5" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-5 flex items-center">
          <div className="w-1/5">
            <div className="mt-4">
              <img
                className="w-24 border border-purple-400 rounded-full"
                src={UserInfo == "" ? UserInfo.profile_image : Defaultprofile}
                alt="Profile image"
              />
            </div>
          </div>
          <div>
            <p className="text-sm">Client</p>
            <p className="font-bold text-xl">
              {UserInfo.first_name} {UserInfo.last_name}
            </p>
            <p className="text-sm">Email</p>
            <p className="text-xl">{UserInfo.email} </p>
          </div>
        </div>
      </div>
      <div className="me-10 mt-5 border rounded-2xl border-purple-400">
        <div>
          
        </div>
      </div>
      <div>4</div>
      <div>5</div>
    </>
  );
}

export default MyinfoComponent;

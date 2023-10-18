import React, { useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import HomeJoblist from "../../../components/user/Home/HomeJoblist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserHomePage() {
  const navigate = useNavigate()
  const { UserInfo, JobTitleRedex ,Education,Skills,experiences} = useSelector((state) => state.user);
  let WidthLine = '';
  let percentageText = '';
 
  if (UserInfo.cv) {
    WidthLine = 'w-6/6';
    percentageText = 100;
  } else if (UserInfo.bio) {
    WidthLine = 'w-5/6';
    percentageText = 90;
  } else if (Skills.length > 0) {
    WidthLine = 'w-4/6';
    percentageText = 80;
  } else if (experiences.length > 0) {
    WidthLine = 'w-4/6';
    percentageText = 70;
  } else if (Education.length > 0) {
    WidthLine = 'w-3/6';
    percentageText = 60;
  } else if (UserInfo) {
    WidthLine = 'w-2/6';
    percentageText = 50;
  }
  const [selected, setSelect] = useState("home");
  return (
    <>
      <div className="h-screen w-full grid grid-rows-[5rem,1fr] gap-1 md:gap-10">
        <div className="sticky top-0">
          <NavbarDefault />
        </div>
        <div className="grid grid-cols-[10rem,1fr,10rem] container xl:mx-auto xl:px-0 px-10 ">
          <div className="grid grid-rows-[3rem,3rem,3rem] gap-2 sticky">
            <div
              className={`border cursor-pointer rounded-3xl shadow flex justify-center items-center hover:bg-gray-100 font-bold ${
                selected === "home" ? "bg-gray-200 border border-gray-300" : ""
              }`}
              onClick={() => setSelect("home")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p className="ms-4 ont-bold text-sm text-gray-800">Home</p>
            </div>
            <div
              className={`border cursor-pointer rounded-3xl shadow flex justify-center items-center hover:bg-gray-100 font-bold ${
                selected === "jobs" ? "bg-gray-200 border border-gray-300" : ""
              }`}
              onClick={() => setSelect("jobs")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>

              <p className="ms-4 ont-bold text-sm text-gray-800">Jobs</p>
            </div>
            <div
              className={`border cursor-pointer rounded-3xl shadow flex justify-center items-center hover:bg-gray-100 font-bold ${
                selected === "company"
                  ? "bg-gray-200 border border-gray-300"
                  : ""
              }`}
              onClick={() => setSelect("company")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
              <p className="ms-4 ont-bold text-sm text-gray-800">Company</p>
            </div>
          </div>
          <div className="h-[50rem]  scrollbar-none overflow-y-auto ">
            {selected === "home" ? (
              <HomeJoblist />
            ) : selected === "jobs" ? (
              navigate('/user/jobs/')
            ) : (
              navigate('/user/companylist')
            )}
          </div>
          <div className="flex justify-center">
            <div className="border hover:bg-gray-100 cursor-pointer w-full h-52 rounded-xl shadow-md grid grid-rows-[6rem,1fr,1fr]"
            onClick={()=>navigate('/user/profile')}>
              <div className="flex justify-center mt-3">
                <div className="w-20 flex justify-center p-1 h-20 rounded-full border-purple-400 border">
                  <img
                    src={UserInfo?.profile_image}
                    className="rounded-full w-20"
                    alt=""
                  />
                </div>
              </div>
              <div className="">
                <p className="font-bold capitalize text-center pt-1">
                  {UserInfo.first_name} {UserInfo.last_name}
                </p>
                <p className="text-sm text-center">{JobTitleRedex}</p>
              </div>
              <div className="pt-5">
              <hr className={`border border-purple-400 mx-2 ${WidthLine}`}/>
              <p className="text-sm text-center text-purple-400 font-bold">{percentageText}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHomePage;

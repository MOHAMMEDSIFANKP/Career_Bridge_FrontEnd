import React, { useState } from "react";

// Redex
import { useDispatch } from "react-redux";
import { UpdateUserDetails } from "../../../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
// Service
import { UpdateUserInfoDetails } from "../../../../services/userApi";
// Modal
import OpenToCv from "../Modal/OpenToCv";
// Images
import PdfIcon from "../../../../assets/PdfIcon.png";
// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CvComponents() {
  const dispatch = useDispatch();
  const [Cv, setCv] = useState(null);
  // Redux distructure
  const { UserInfo } = useSelector((state) => state.user);

  // Modal view cv
  const [openCv, setOpenCv] = useState(false);
  const handleOpenCv = () => setOpenCv(!openCv);

  const UploadCv = async () => {
    const CvForm = new FormData();
    CvForm.append("cv", Cv);
    try {
      if (Cv) {
        const CvForm = new FormData();
        CvForm.append("cv", Cv);
        const res = await UpdateUserInfoDetails(CvForm, UserInfo.userinfoid);
        if (res.status === 200) {
          toast.success("Cv updated succesfully")
          dispatch(
            UpdateUserDetails({
              first_name: UserInfo.first_name,
              last_name: UserInfo.last_name,
              bio: res.data.bio,
              streetaddress: res.data.streetaddress,
              city: res.data.city,
              state: res.data.state,
              zipcode: res.data.zipcode,
              cv: res.data.cv,
            })
          );
        }
      } else {
        toast.error("Please select a file.");
      }
    } catch (error) {
      toast.error("some think wrong");
    }
  };
  return (
    <>
      <ToastContainer />
      {!UserInfo.cv ? (
        <div className="border border-purple-400 grid grid-rows-[2.5rem,1fr] rounded-xl me-10 mt-5">
          <div className="flex justify-between">
            <p className="font-bold ms-4 mt-2">Cv</p>
            {Cv ? (
              <div>
                <svg
                  onClick={UploadCv}
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
            ) : (
              ""
            )}
          </div>
          <div className="bg-purple-50 flex justify-center items-center h-24 mx-3 mb-3 rounded-xl border border-gray-300 ">
            {!Cv ? (
              <>
                <div
                  className=" rounded-full border bg-purple-400 h-9 w-9 flex items-center justify-center text-3xl text-white cursor-pointer"
                  onClick={() => setCv("value")}
                >
                  {" "}
                  <p>+</p>
                </div>
                <p className="text-xl ms-3 text-gray-500">Add Cv</p>
              </>
            ) : (
              <div className="border border-purple-300 rounded-xl  ring ring-purple-100">
                <input
                  type="file"
                  id="formFile"
                  className="border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setCv(e.target.files[0]);
                    } else {
                      setCv(null);
                    }
                  }}
                  accept=".pdf, .doc, .xls"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border border-purple-400 grid grid-rows-[2.5rem,1fr] rounded-xl me-10 mt-5">
          <div className="flex justify-between">
            <p className="font-bold ms-4 mt-2">Cv</p>
            <div>
              <svg
                onClick={UploadCv}
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
          </div>
          <div className="flex justify-around pt-2 bg-purple-50 mx-4 rounded-xl  mb-3">
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
                type="file"
                id="formFile"
                className="border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setCv(e.target.files[0]);
                  } else {
                    setCv(null);
                  }
                }}
                accept=".pdf, .doc, .xls"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CvComponents;

{
  /* <div className="border border-purple-400 grid grid-rows-[2.5rem,1fr] rounded-xl me-10 mt-5">
<div>
  <p className="font-bold ms-4 mt-2">Cv</p>
</div>
{!UserInfo.cv ? (
  <div className="bg-purple-50 flex justify-center items-center h-24 mx-3 mb-3 rounded-xl border border-gray-300 ">
    <div className=" rounded-full border bg-purple-400 h-9 w-9 flex items-center justify-center text-3xl text-white cursor-pointer"
    onClick={()=>setCv("value")}>
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
</div> */
}

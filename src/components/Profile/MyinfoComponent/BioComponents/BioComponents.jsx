import React, { useState, useRef } from "react";
import EditIcon from "../../../../assets/Edit.png";

// Service
import { UpdateUserInfoDetails } from "../../../../services/userApi";

// Redex
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UpdateUserDetails } from "../../../../Redux/UserSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BioComponents() {
  // Redux Distructuring
  const { UserInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [bio, setBio] = useState();
  const [EditBioBoolian, setEditBioBoolian] = useState(false);
  const addbioinput = useRef(null);

  //   Add bio
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
    } catch (error) {
      toast.error("something wrong");
    }
  };
  // Edit Bio
  const BioEditBtn = async () => {
    setEditBioBoolian(false);
    try {
      const response = await UpdateUserInfoDetails(
        { bio: bio },
        UserInfo.userinfoid
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("Bio updated successfully");
        dispatch(
          UpdateUserDetails({
            first_name: UserInfo.first_name,
            last_name: UserInfo.last_name,
            bio: response.data.bio,
            streetaddress: response.data.streetaddress,
            city: response.data.city,
            state: response.data.state,
            zipcode: response.data.zipcode,
            cv: response.data.cv,
          })
        );
      }
    } catch (error) {
      toast.error("something wrong");
    }
  };
  return (
    <>
      <ToastContainer />
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
            <div className="rounded-xl mx-3 my-3 overflow-auto scrollbar-thin M scrollbar-thumb-purple-400 h-24 border border-gray-300 bg-purple-50 ">
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
                placeholder=" Edit Bio"
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
    </>
  );
}

export default BioComponents;

import React, { useState } from "react";
import Editimg from "../../../../assets/Edit.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loading/Loading";
import { Rest_Password } from "../../../../services/userApi";
import { useSelector } from "react-redux";
export function PasswordAndSecurity() {
    const { CompanyInfo } = useSelector((state) => state.company);
    const [view, setview] = useState(false);
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [error, seterror] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  // Validation
  function validatePassword(password) {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return passwordPattern.test(password);
  }
  const Validation = () => {
    if (password.old_password.trim() === "") {
      seterror({ ...error, old_password: true });
      toast.error("Old Password filed cannot be black");
      return false;
    } else if (password.new_password.trim() === "") {
      seterror({ ...error, new_password: true });
      toast.error("New Password filed cannot be black");
      return false;
    } else if (password.new_password.length < 6) {
      seterror({ ...error, new_password: true });
      toast.error("New Password must be at least 6 characters long");
      return false;
    } else if (!validatePassword(password.new_password)) {
      seterror({ ...error, new_password: true });
      toast.error(
        "Please choose a stronger password with a combination of letters, numbers, and symbols."
      );
      return false;
    } else if (password.new_password.length > 50) {
      seterror({ ...error, new_password: true });
      toast.error("New Password is too long, maximum length is 50 characters");
      return false;
    } else if (password.confirm_password.trim() === "") {
      seterror({ ...error, confirm_password: true });
      toast.error("Confirm Password filed cannot be black");
      return false;
    } else if (password.confirm_password.length < 6) {
      seterror({ ...error, confirm_password: true });
      toast.error("Confirm Password must be at least 6 characters long");
      return false;
    } else if (password.new_password !== password.confirm_password) {
      seterror({ ...error, confirm_password: true });
      toast.error("The new password and confirm password do not match.");
      return false;
    } else if (password.confirm_password.length > 50) {
      seterror({ ...error, confirm_password: true });
      toast.error(
        "Confirm Password is too long, maximum length is 50 characters"
      );
      return false;
    }

    return true;
  };
  const submit = async () => {
    if (Validation()) {
      try {
        handleLoading()
        const res = await Rest_Password(CompanyInfo.id,password)
        if (res.status===200){
          toast.success(res.data.message)
        }
        setview(false)
        handleLoading()
      } catch (error) {
        handleLoading()
        if (error && error.response.data){
          toast.error(error.response.data.message)
        }else{
          toast.error('Something wrong')
        }
      }
    }
  };
  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="grid grid-rows-[5rem,1fr]">
        <div>
          <p className="text-3xl font-bold">Password & security</p>
        </div>
        <div className="border me-10 rounded-xl border-purple-400 grid grid-rows-[4rem,1fr]">
          <div>
            <p className="ms-10 my-4 font-bold text-gray-700 text-xl">
              Authentication options
            </p>
          </div>
          <div>
            <div className="flex justify-between mx-6">
              {view ? (
                <p className="font-bold text-gray-700">Set Password</p>
              ) : (
                <p className="font-bold text-gray-700">Password</p>
              )}
              {!view ? (
                <div
                  className="rounded-full w-8 flex justify-center items-center h-8 border border-purple-400 "
                  onClick={() => setview(!view)}
                >
                  <img
                    src={Editimg}
                    className="w-full h-full p-[6px] "
                    alt=""
                  />
                </div>
              ) : (
                <svg
                  onClick={submit}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="text-gray-800 mx-5 mb-6">
              {view ? (
                <>
                  <div className="me-10 ">
                    <p className="text-sm my-1 text-gray-700 font-bold">
                      old password
                    </p>
                    <input
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          old_password: e.target.value,
                        });
                        seterror({ ...error, old_password: false });
                      }}
                      type="text"
                      placeholder="Enter old password"
                      className={`border w-full py-2 px-2 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                        error.old_password
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                    <p className="text-sm my-1 text-gray-700 font-bold">
                      New password
                    </p>
                    <input
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          new_password: e.target.value,
                        });
                        seterror({ ...error, new_password: false });
                      }}
                      type="text"
                      placeholder="Enter New password"
                      className={`border w-full py-2 px-2 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                        error.new_password
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                    <p className="text-sm my-1 text-gray-700 font-bold">
                      Confirm password
                    </p>
                    <input
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          confirm_password: e.target.value,
                        });
                        seterror({ ...error, confirm_password: false });
                      }}
                      type="text"
                      placeholder="Enter Confirm password"
                      className={`border w-full py-2 px-2 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                        error.confirm_password
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p className="ms-3 font-bold">Password has been set</p>
                  </div>
                  <p className="ms-8">
                    Choose a strong, unique password that’s at least 8
                    characters long.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

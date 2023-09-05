import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loading/Loading";

function RestPassword() {
  const navigate = useNavigate();
  const [password, setpassword] = useState({
    password: "",
  });
  const [error, seterror] = useState({ password: "" });

  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  return (
    <>
      {loading && <Loader />}
      <div className="h-screen grid grid-rows-[.08fr]">
        <div>
          <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">
            Career Bridge
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-white  w-full sm:w-10/12 md:w-6/12 xl:w-3/12 rounded-2xl sm:border border-purple-400 sm:m-0 -mt-36">
            <h3 className="md:text-3xl text-2xl text-purple-400  font-bold my-10 text-center">Update your Password</h3>
            <p className="text-center -mb-4 sm:font-bold">Tips for creating a strong password</p>
            <div className="m-10">
              <ToastContainer />
              <form >
                <div>
                  <input
                    type="password"
                    id="passowrd"
                    name="passowrd"
                    className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.password
                        ? "focus:ring-red-200 border-2 border-red-300"
                        : "border-gray-400"
                    }`}
                    placeholder="Password"
                    onChange={(e) =>
                      setPassword({ ...password, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className=" my-4">
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                        error.confirmpassword
                          ? "focus:ring-red-200 border-2 border-red-300"
                          : "border-gray-400"
                      }`}
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      setPassword({ ...password, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="flex mt-10 justify-center">
                  <button
                    type="submit"
                    className="butt p px-8 p-2 rounded-3xl font-semibold bg-purple-300 flex justify-center items-center"
                  >
                    Update Password
                  </button>
                </div>
              </form>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RestPassword;

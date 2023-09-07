import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loading/Loading";
import { Restpassword } from "../../services/userApi";

function RestPassword() {
  const navigate = useNavigate();
  const [Password, setpassword] = useState({
    password: "",
    confirmpassword: "",
  });

  const [error, seterror] = useState({
    password: false,
    confirmpassword: false,
  });

  const PasswordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  useEffect(() => {
    PasswordInputRef.current.focus();
    document.title = "Reset Password | Career Bridge";
  }, []);

  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  function Validation() {
    if (Password.password.trim() === "") {
      PasswordInputRef.current.focus();
      toast.warn("password is empty");
      seterror({ ...error, password: true });
      return false;
    } else if (Password.password.length <= 5) {
      PasswordInputRef.current.focus();
      toast.warn("password too short");
      seterror({ ...error, password: true });
      return false;
    } else if (Password.confirmpassword.trim() === "") {
      toast.warn("Confirm password is empty");
      seterror({ ...error, confirmpassword: true });
      confirmPasswordInputRef.current.focus();
      return false;
    } else if (Password.password.trim() !== Password.confirmpassword.trim()) {
      PasswordInputRef.current.focus();
      toast.warn("password does not match");
      seterror({ ...error, password: true });
      return false;
    }
    return true;
  }
  const ButtonSubmit = async () => {
    if (Validation()) {
      try {
        handleLoading();
        const UserId = localStorage.getItem("UserId");
        const response = await Restpassword(Password, UserId);
        if (response.data.status === "success") {
          toast.success(response.data.msg);
          const token = JSON.stringify(response.data.token);
          localStorage.setItem("token", token);
          localStorage.removeItem("UserId");
          localStorage.removeItem("email");
          handleLoading();
          navigate("/user/");
        } else {
          handleLoading();
          toast.error(response.data.msg);
          setpassword({ password: "", confirmpassword: "" });
        }
      } catch (error) {
        setpassword({ password: "", confirmpassword: "" });
        handleLoading();
        toast.error("Some think wrong");
      }
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="h-screen grid grid-rows-[.08fr]">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">
            Career Bridge
          </h1>
          <p onClick={() => navigate("/login")} className="p-4">
            Login
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-white  w-full sm:w-10/12 md:w-6/12 xl:w-3/12 rounded-2xl sm:border border-purple-400 sm:m-0 -mt-36">
            <h3 className="md:text-3xl text-2xl text-purple-400  font-bold my-10 text-center">
              Update your Password
            </h3>
            <p className="text-center -mb-4 sm:font-bold">
              Tips for creating a strong password
            </p>
            <div className="m-10">
              <ToastContainer />
              <div>
                <input
                  ref={PasswordInputRef}
                  value={Password.password}
                  type="password"
                  id="passowrd"
                  name="password"
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.password
                      ? "focus:ring-red-200 border-2 border-red-300"
                      : "border-gray-400"
                  }`}
                  placeholder="Password"
                  onChange={(e) => {
                    setpassword({
                      ...Password,
                      [e.target.name]: e.target.value,
                    }),
                      seterror({ ...error, password: false });
                  }}
                />
              </div>
              <div className=" my-4">
                <input
                  ref={confirmPasswordInputRef}
                  value={Password.confirmpassword}
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.confirmpassword
                      ? "focus:ring-red-200 border-2 border-red-300"
                      : "border-gray-400"
                  }`}
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setpassword({
                      ...Password,
                      [e.target.name]: e.target.value,
                    }),
                      seterror({ ...error, confirmpassword: false });
                  }}
                />
              </div>
              <div className="flex mt-10 justify-center">
                <button
                  onClick={ButtonSubmit}
                  className="butt p px-8 p-2 rounded-3xl text-white font-semibold bg-purple-300 flex justify-center items-center"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RestPassword;

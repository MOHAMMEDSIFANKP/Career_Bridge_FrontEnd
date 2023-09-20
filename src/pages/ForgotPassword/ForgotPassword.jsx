import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loading/Loading";
import EmailImg from "../../assets/EmailImg/EmailClose.png";
import { UserUrl } from "../../constants/constants";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setemail] = useState({
    email: "",
  });
  const [error, seterror] = useState({ email: "" });
// UseRef for Focus
  const emailInputRef = useRef(null);

  // Loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
    emailInputRef.current.focus();
    document.title = "Forgot Password | Career Bridge";
  }, []);

  // Validation for email
  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }

  const Validation = () => {
    if (email.email.trim() === "") {
      emailInputRef.current.focus();
      seterror({ ...error, email: true });
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(email.email.trim())) {
      emailInputRef.current.focus();
      seterror({ ...error, email: true });
      toast.warn("Enter a valid email");
      return false;
    }
    return true;
  };
  
  // click handler then send message 
  const SendMail = async () => {
    if (Validation()) {
      handleLoading()
      try {
        const response = await axios.post(UserUrl + "/api/forgotpassword/", email);
        if (response.data.status === 'success' ){
          handleLoading()
          toast.success(response.data.msg)
          setemail({email:''})
          localStorage.setItem('UserId',response.data.user)
          navigate('/forgot-resendmail')
        }else{
          handleLoading()
          toast.error(response.data.msg)
          setemail({email:''})
        }
      } catch (error) {
        handleLoading()
        toast.error('Some think wrong')
      }
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <div className="h-screen grid grid-rows-[.08fr]">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">
            Career Bridge
          </h1>
          <Link to="/login" className="mt-4 me-3">Login</Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-white  w-full sm:w-10/12 md:w-6/12 xl:w-3/12 rounded-2xl sm:border border-purple-400">
            <div className="flex justify-center  -mt-20 -ms-4">
              <img src={EmailImg} alt="" />
            </div>
            <div className="flex justify-center text-xl mt-4">
              <p className="font-bold text-2xl text-purple-400">
                Forgot your password
              </p>
            </div>
            <div className="mx-5 mt-5">
              <p className="text-sm">
                Enter your email address and select{" "}
                <span className="font-bold"> Send Email.</span>
              </p>
            </div>
            <div className="mx-4 mt-4">
              <input
                ref={emailInputRef}
                type="email"
                value={email.email}
                id="email"
                name="email"
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.email
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
                placeholder="Email"
                onChange={(e) => {
                  setemail({ ...email, [e.target.name]: e.target.value });
                  seterror({ ...error, email: false });
                }}
              />
            </div>
            <div className="flex justify-end mx-5  my-10">
              <button
                className="text-purple-400 font-bol me-4"
                onClick={() => navigate("/login")}
              >
                Cancel
              </button>
              <button
                className="rounded-full border bg-purple-400 text-white  py-1 text-md px-4 flex justify-center items-center "
                onClick={SendMail}
              >
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserGoogleSignin, userSignin } from "../services/userApi";
import { useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImage from "../assets/icons8-google.svg";
import Loader from "../components/Loading/Loading";
import axios from "axios";
import { UserInfoDetails } from "../services/userApi";
import { UserDetail } from "../services/userApi";

// Redux
import { useDispatch } from "react-redux";
import {
  setRole,
  setExperiences,
  SetEducation,
  SetLanguage,
  SetSkills,
  setUserDetails,
} from "../Redux/UserSlice";
import { GetCompanyDetails } from "../services/companyApi";
import { setCompanyDetails } from "../Redux/CompanySlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });

  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
    emailInputRef.current.focus();
    document.title = "Login | Career Bridge";
    const searchParams = new URLSearchParams(window.location.search);
    const tokens = searchParams.get("token");
    if (tokens) {
      const decoded = jwtDecode(tokens);
      console.log(decoded);
      if (decoded.role === "user") {
        localStorage.setItem("token", tokens);
        fetchUserInfo(decoded);
        if (decoded.is_compleated) {
          navigate("/user/");
        } else {
          navigate("/user/position");
        }
      } else if (decoded.role === "company") {
        localStorage.setItem("token", tokens);
        FechCompanyInfo(decoded);
        if (decoded.is_compleated) {
          navigate("/company/");
        } else {
          navigate("/company/createcompany");
        }
      } else {
        toast.error("Invalid role");
      }
    }
  }, []);

  // Validations
  const Validation = () => {
    if (user.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser({ email: "" });
      emailInputRef.current.focus();
      toast.warn("Enter a valid email");
      return false;
    } else if (user.password.trim() === "") {
      passInputRef.current.focus();
      toast.error("Password should not be empty");
      return false;
      // } else if (user.password.trim().length<6){
      //   passInputRef.current.focus();
      //  toast.warn('Password should be 6 letters')
      return false;
    }
    return true;
  };
  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }
  async function fetchUserInfo(token) {
    if (!token.userInfoId) {
      try {
        const UserDetails = await UserDetail(token.user_id);
        const userInformation = {
          id: UserDetails.data.id,
          profile_image: UserDetails.data.profile_image,
          email: UserDetails.data.email,
          first_name: UserDetails.data.first_name,
          last_name: UserDetails.data.last_name,
          is_active: UserDetails.data.is_active,
          is_compleated: UserDetails.data.is_compleated,
          id_admin: UserDetails.data.is_admin,
          role: UserDetails.data.role,
        };
        if (userInformation) {
          dispatch(setUserDetails({ UserInfo: userInformation }));
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      try {
        const res = await UserInfoDetails(token.userInfoId);
        const UserDetails = await UserDetail(token.user_id);
        dispatch(
          setRole({
            JobFiledRedex: res.data.jobField.field_name,
            JobTitleRedex: res.data.jobTitle.title_name,
          })
        );
        res.data.experience.map((values, index) => {
          dispatch(setExperiences(values));
        });
        res.data.education.map((values, index) => {
          dispatch(SetEducation(values));
        });
        res.data.languages.map((values, index) => {
          dispatch(SetLanguage(values));
        });
        res.data.skills.map((values, index) => {
          dispatch(SetSkills(values));
        });
        const userInformation = {
          id: UserDetails.data.id,
          profile_image: UserDetails.data.profile_image,
          email: UserDetails.data.email,
          first_name: UserDetails.data.first_name,
          last_name: UserDetails.data.last_name,
          is_active: UserDetails.data.is_active,
          is_compleated: UserDetails.data.is_compleated,
          id_admin: UserDetails.data.is_admin,
          role: UserDetails.data.role,
          streetaddress: res.data.streetaddress,
          userinfoid: res.data.id,
          city: res.data.city,
          state: res.data.state,
          zipcode: res.data.zipcode,
          bio: res.data.bio,
          cv: res.data.cv,
        };
        if (userInformation) {
          dispatch(setUserDetails({ UserInfo: userInformation }));
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  }
  async function FechCompanyInfo(token) {
    try {
      if (!token.companyInfoId) {
        const UserDetails = await UserDetail(token.user_id);
        const userInformation = {
          id: UserDetails.data.id,
          profile_image: UserDetails.data.profile_image,
          email: UserDetails.data.email,
          first_name: UserDetails.data.first_name,
          last_name: UserDetails.data.last_name,
          is_active: UserDetails.data.is_active,
          is_compleated: UserDetails.data.is_compleated,
          id_admin: UserDetails.data.is_admin,
          role: UserDetails.data.role,
        };
        if (userInformation) {
          dispatch(setCompanyDetails({ CompanyInfo: userInformation }));
        }
      } else {
        const UserDetails = await UserDetail(token.user_id);
        const CompanyDetails = await GetCompanyDetails(token.companyInfoId);
        const userInformation = {
          id: UserDetails.data.id,
          profile_image: UserDetails.data.profile_image,
          email: UserDetails.data.email,
          first_name: UserDetails.data.first_name,
          last_name: UserDetails.data.last_name,
          is_active: UserDetails.data.is_active,
          is_compleated: UserDetails.data.is_compleated,
          id_admin: UserDetails.data.is_admin,
          role: UserDetails.data.role,
          companyid: CompanyDetails.data.id,
          company_name: CompanyDetails.data.company_name,
          industry: CompanyDetails.data.industry,
          company_size: CompanyDetails.data.company_size,
          company_type: CompanyDetails.data.company_type,
          gst: CompanyDetails.data.gst,
          description: CompanyDetails.data.description,
          streetaddress: CompanyDetails.data.streetaddress,
          country: CompanyDetails.data.country,
          state: CompanyDetails.data.state,
          city: CompanyDetails.data.city,
          zipcode: CompanyDetails.data.zipcode,
          is_verify: CompanyDetails.data.is_verify,
        };
        if (userInformation) {
          dispatch(setCompanyDetails({ CompanyInfo: userInformation }));
         
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (Validation()) {
      try {
        const res = await userSignin(user);
        console.log(res);
        if (res.status === 200) {
          const token = JSON.stringify(res.data);
          const decoded = jwtDecode(token);
          if (decoded.role === "user") {
            localStorage.setItem("token", token);
            fetchUserInfo(decoded);
            if (decoded.is_compleated) {
              navigate('/user/', { state: { user_id: decoded?.userInfoId?decoded?.userInfoId:null} })
            } else {
              navigate("/user/position");
            }
          } else if (decoded.role === "company") {
            localStorage.setItem("token", token);
            FechCompanyInfo(decoded);
            if (decoded.is_compleated) {
              navigate("/company/");
            } else {
              navigate("/company/createcompany");
            }
          } else {
            toast.error("Invalid role");
          }
        } else {
          console.log(res.status);
          toast.error("Invalid login credentials or verify your email");
        }
      } catch (error) {
        toast.error("An error occurred during login. Please try again later.");
      }
    }
  };

  // For google registratin
  const [guser, setgUser] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setgUser(codeResponse)
      console.log(gUser, "jdsjkjasdjjbdskk")
    },
    onError: (error) => console.log("Login Failed:", error)
  });
  
  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        handleLoading();
        if (!guser) return;
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${guser.access_token}`,
              Accept: "application/json",
            },
          }
        );
        

        const res = await UserGoogleSignin(response.data);
        const token = JSON.stringify(res.data);
        const decoded = jwtDecode(token);
        if (decoded.role === "user") {
          localStorage.setItem("token", token);
          fetchUserInfo(decoded);
          navigate('/user/', { state: { user_id: decoded?.userInfoId?decoded?.userInfoId:null} })
        } else if (decoded.role === "company") {
          localStorage.setItem("token", token);
          FechCompanyInfo(decoded);
          navigate("/company/");
        }
        setgUser([]);
        handleLoading();
      } catch (error) {
        handleLoading();
        if (error.response && error.response.data) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("An error occurred during signup.");
        }
      }
    }

    if (guser){
      handleGoogleAuth();
    }},[guser]);

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
          <div className="bg-white  w-full sm:w-10/12 md:w-6/12 xl:w-3/12 rounded-2xl sm:border border-purple-400">
            <h3 className="text-3xl font-bold my-10 text-center">Login</h3>
            <div className="m-10">
              <ToastContainer />
              <form onSubmit={FormHandlerLogin}>
                <div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={user.email}
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-400 w-full p-2 rounded-xl focus:outline-none focus:border-purple-500"
                    placeholder="Email"
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className=" my-4">
                  <input
                    ref={passInputRef}
                    type="password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-400  w-full p-2 rounded-xl  focus:outline-none focus:border-purple-500"
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end ">
                  <Link
                    to="/forgotpassword"
                    className="text-gray-500 text-sm pointer-events-auto"
                  >
                    Forgot Password ?
                  </Link>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="butt px-8 p-2 rounded-3xl font-semibold bg-purple-300 flex justify-center items-center"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className="flex justify-between my-3">
                <hr className="m-5 w-44 border-1 border-purple-400" />
                <p className="text-gray-500 pt-2">or</p>
                <hr className="m-5 w-44 border-1 border-purple-400" />
              </div>
              <div
                onClick={() => login()}
                className="flex rounded-3xl py-2 cursor-pointer bg-purple-300 items-center"
              >
                <img
                  src={userImage}
                  alt="Google logo"
                  className="ml-2 rounded-full h-8"
                />
                <span className="flex-1 text-center font-bold text-white">
                  Continue with Google
                </span>
              </div>
              <div
                id="signInDiv"
                className="flex rounded-3xl mt-5 py-2 bg-purple-300 items-center"
              >
                <img
                  src={userImage}
                  alt="Google logo"
                  className="ml-2 rounded-full h-8"
                />
                <span className="flex-1 text-center font-bold text-white">
                  Continue with Google
                </span>
              </div>
              <div className="flex justify-center my-3 ">
                <p className="text-gray-500 sm:text-sm px-3 text-xs pt-3">
                  <Link to="/choose"> Don't have an account?</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;

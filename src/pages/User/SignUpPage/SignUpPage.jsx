import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import Loader from "../../../components/Loading/Loading";
import userImage from "../../../assets/icons8-google.svg";
import { UserDetail, UserGoogleSignup, UserInfoDetails } from "../../../services/userApi";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { SetEducation, SetLanguage, SetSkills, setExperiences, setRole, setUserDetails } from "../../../Redux/UserSlice";
import { useDispatch } from "react-redux";

function SignUpPage() {
  useEffect(() => {
    FirstInputRef.current.focus();
    document.title = "SignUp | Career Bridge";
  }, []);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [other, setOther] = useState({ cpassword: "", check: false });
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
    role: "company",
  });
  // For google registratin
  const [guser, setgUser] = useState([]);

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const FirstInputRef = useRef(null);
  const emailInputRef = useRef(null);

  // Validations
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    if (user.first_name.trim() === "") {
      toast.error("First name should not be empty");
      return false;
    } else if (user.last_name.trim() === "") {
      toast.error("Last name should not be empty");
      return false;
    } else if (user.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser((prevUser) => ({ ...prevUser, email: "" }));
      toast.error("Enter a valid Email");
      return false;
    } else if (user.password.trim() === "") {
      toast.error("Password should not be empty");
      return false;
    } else if (user.password.trim().length < 6) {
      toast.warn("Password should be at least 6 characters");
      return false;
    } else if (other.cpassword === "") {
      toast.error("Confirm Password should not be empty");
      return false;
    } else if (user.password !== other.cpassword) {
      toast.error("Password didn't match");
      return false;
    } else if (!other.check) {
      toast.error("Checkbox should be checked");
      return false;
    }
    return true;
  };

  //   After form submition
  const FormHandlerSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      user.username = user.email;
      handleLoading();
      try {
        const response = await axios.post(
          import.meta.env.VITE_BASE_USER_URL + "/api/register/",
          user
        );
        localStorage.setItem('email',user.email)
        console.log(response);
        toast.success(response.data.msg);
        setUser({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          username: "",
        });
        setOther({ cpassword: "", check: false });
        handleLoading();
        navigate('/register-resendmail')
      } catch (error) {
        handleLoading();
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.email) {
            toast.error(errorData.email[0]);
          }
        } else {
          toast.error("An error occurred during registration.");
        }
      }
    }
    // else {
    //     toast.error('Some think wrong .');
    // }
  };

  // Redux storing
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setgUser(codeResponse);
      GoogleAuth();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const GoogleAuth = async () => {
    try {
      if (!guser) return;
      handleLoading();
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${guser.access_token}`,
            Accept: "application/json",
          },
        }
      );
      const res = await UserGoogleSignup(response.data);
      handleLoading();
      toast.success(res.data.msg);
      setgUser([]);
      const token = JSON.stringify(res.data.token)
      localStorage.setItem('token',token)
      const decoded = jwtDecode(token);
      if (decoded.is_compleated){
        fetchUserInfo(decoded);
        navigate('/user/', { state: { user_id: decoded?.userInfoId?decoded?.userInfoId:null} })
      }else{
        navigate("/user/position");
      }
    } catch (error) {
      handleLoading();
      console.log(error.response);
      if (error.response && error.response.data && error.response.data.email) {
        toast.error(error.response.data.email[0]);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  };

  
  return (
    <>
      {loading && <Loader />}

      <div
        className={`h-screen flex flex-col items-start ${
          loading ? "pointer-events-none" : ""
        }`}
      >
        <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">
          Career Bridge
        </h1>

        <div className="bg-white rounded-2xl w-12/12 sm:w-6/12 xl:w-3/12 lg:w-5/12 sm:border border-purple-400 mx-auto sm:mt-28 grid grid-row-8 gap-2">
          <div>
            <h3 className="text-2xl font-bold font-serif mt-8 mb-4 text-center">
              Sign up to find work you love
            </h3>
          </div>
          <div
            onClick={() => login()}
            className="flex mx-10 rounded-3xl py-1 bg-purple-300 items-center"
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
          <div className="mx-10 my-3 flex items-center">
            <hr
              className="me-3 w-full
                  border-1 border-purple-400"
            />
            <p className="text-sm">or</p>
            <hr className="ms-3 w-full border-1 border-purple-400" />
          </div>

          <form onSubmit={FormHandlerSignup}>
            <div>
              <div className="mx-10 grid grid-cols-2 gap-5">
                <div>
                  <input
                    ref={FirstInputRef}
                    value={user.first_name}
                    type="text"
                    name="first_name"
                    className="bg-gray-50 border focus:outline-none focus:border-purple-500 border-gray-300 w-full p-2 rounded-xl"
                    placeholder="first name"
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl focus:outline-none focus:border-purple-500"
                    placeholder="last name"
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mx-10 my-3">
                <input
                  type="email"
                  name="email"
                  ref={emailInputRef}
                  value={user.email}
                  className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Email"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="mx-10 my-3">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Password"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="mx-10 mt-3">
                <input
                  type="password"
                  name="cpassword"
                  value={other.cpassword}
                  className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Confim password"
                  onChange={(e) =>
                    setOther({ ...other, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mx-10 my-3 flex justify-between">
              <input
                type="checkbox"
                checked={other.check}
                name="check"
                onChange={(e) =>
                  setOther({ ...other, [e.target.name]: e.target.checked })
                }
              />
              <p className="text-xs ms-3 mt-3">
                Yes, I understand and agree to the{" "}
                <span className="text-purple-400 p-2"> Terms of Service,</span>{" "}
                including the{" "}
                <span className="text-purple-400">
                  User Agreement and Privacy Policy.{" "}
                </span>
              </p>
            </div>
            <div className="mx-10 mb-2 mt-5">
              <button
                type="submit"
                className="w-full p-2 bg-purple-300 rounded-3xl font-bold"
              >
                Create My account
              </button>
            </div>
          </form>
          <div className="mx-10 mt-3 flex justify-center items-center mb-9">
            <hr className="flex-grow border-t-1 border-purple-400" />
            <p className="text-xs px-2">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400">
                Log in
              </Link>
            </p>
            <hr className="flex-grow border-t-1 border-purple-400" />
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
export default SignUpPage;

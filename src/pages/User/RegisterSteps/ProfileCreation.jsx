import React, { useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import countriesList from "countries-list";
import defaultprofileImg from "../../../assets/ProfileImg.jpeg";
import { useSelector } from "react-redux";
import { UserInfo } from "../../../services/userApi";
import { UserProfileUpdate } from "../../../services/userApi";
import { UserIs_compleatedUpdate } from "../../../services/userApi";
import { TokenRefresh } from "../../../services/userApi";
import jwt_decode from "jwt-decode";
import Loader from "../../../components/Loading/Loading";

// Redux
import { useDispatch } from "react-redux";
import {
  setUserDetails,
  setExperiences,
  SetEducation,
  SetLanguage,
  SetSkills,
  CleatExperiences,
  ClearEducation,
  ClearLanguage,
  ClearSkills,
} from "../../../Redux/UserSlice";

function ProfileCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Form, setForm] = useState({
    profileImg: null,
    country: "",
    streetaddress: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [error, seterror] = useState({
    profileImg: false,
    country: false,
    streetaddress: false,
    city: false,
    state: false,
    zipcode: false,
    cv: false,
  });
  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const Validation = () => {
    if (Form.profileImg === null) {
      seterror({ ...error, profileImg: true });
      return false;
    } else if (Form.country.trim() === "") {
      seterror({ ...error, country: true });
      return false;
    } else if (Form.streetaddress.trim() === "") {
      seterror({ ...error, streetaddress: true });
      return false;
    } else if (Form.city.trim() === "") {
      seterror({ ...error, city: true });
      return false;
    } else if (Form.state.trim() === "") {
      seterror({ ...error, state: true });
      return false;
    } else if (Form.zipcode.trim() === "") {
      seterror({ ...error, zipcode: true });
      return false;
    }
    return true;
  };
  const countries = Object.keys(countriesList.countries).map((countryCode) => ({
    name: countriesList.countries[countryCode].name,
    value: countryCode,
  }));

  const Skill = useSelector((state) => state.user.Skills);
  const { JobFiledRedex, JobTitleRedex } = useSelector((state) => state.user);
  const { experiences } = useSelector((state) => state.user);
  const { Education } = useSelector((state) => state.user);
  const { Language } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);
  const accessToken = tokenData.refresh;
  const decode = jwt_decode(token);

  const ConformButton = async () => {
    try {
      if (Validation()) {
        const pictureForm = new FormData();
        pictureForm.append("profile_image", Form.profileImg);
        handleLoading();
        const resimg = await UserProfileUpdate(pictureForm, decode.user_id);
        const data = {
          jobField: { field_name: JobFiledRedex },
          jobTitle: { field: 10, title_name: JobTitleRedex },
          experience: experiences,
          education: Education,
          languages: Language,
          skills: Skill,
          userId: decode.user_id,
          streetaddress: Form.streetaddress,
          city: Form.city,
          state: Form.state,
          zipcode: Form.zipcode,
        };
        const Token = {
          refresh: accessToken,
        };
        const resp = await UserInfo(data);
        await UserIs_compleatedUpdate({ is_compleated: true }, decode.user_id);
        await TokenRefresh(Token).then((res) => {
          const token = JSON.stringify(res.data);
          localStorage.setItem("token", token);
          const decode = jwt_decode(token);
          const userInformation = {
            id: decode.user_id,
            profile_image: resimg.data.profile_image,
            email: decode.email,
            first_name: decode.first_name,
            last_name: decode.last_name,
            is_active: decode.is_active,
            is_compleated: decode.is_compleated,
            id_admin: decode.is_admin,
            role: decode.role,
            streetaddress: resp.data.streetaddress,
            userinfoid: resp.data.id,
            city: resp.data.city,
            state: resp.data.state,
            zipcode: resp.data.zipcode,
            bio: resp.data.bio,
            cv: resp.data.cv,
          };
          if (userInformation) {
            dispatch(CleatExperiences());
            dispatch(ClearEducation());
            dispatch(ClearLanguage());
            dispatch(ClearSkills());
            dispatch(setUserDetails({ UserInfo: userInformation }));

            resp.data.experience.map((values, index) => {
              dispatch(setExperiences(values));
            });
            resp.data.education.map((values, index) => {
              dispatch(SetEducation(values));
            });
            resp.data.languages.map((values, index) => {
              dispatch(SetLanguage(values));
            });
            resp.data.skills.map((values, index) => {
              dispatch(SetSkills(values));
            });
          }
        });
        handleLoading();
        navigate("/user/");
      }
    } catch (error) {
      handleLoading();
      if (
        error.response &&
        error.response.data &&
        error.response.data.length > 0
      ) {
        toast.error(error.response.data[0]);
        navigate("/user/");
      } else {
        toast.error("Something went wrong.");
      }
      console.error("Error updating profile and user info:", error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <NavbarDefault />
      <ToastContainer />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <p className="text-sm">7/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            A few last details, then you can check and <br />
            publish your profile & CV.
          </p>
          <p className="mt-3">
            A professional photo helps you build trust with your clients. To
            keep things safe and simple, they’ll
            <br />
            pay you through us - which is why we need your personal information.
          </p>
        </div>
        <div className="sm:flex">
          <div className="mt-10 ">
            <div className="flex justify-center mb-6">
              <img
                className="w-24 rounded-full border-purple-400 border-2 p-2"
                src={
                  Form.profileImg
                    ? URL.createObjectURL(Form.profileImg)
                    : defaultprofileImg
                }
                alt=""
              />
            </div>
            <div className="flex justify-center mt-3">
              <input
                type="file"
                name="profileImg"
                placeholder=""
                accept="image/*"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.files[0] });
                  seterror({ ...error, profileImg: false });
                }}
                className={`border w-full mx-2 py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.profileImg
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
            {/* <div className="mx-2 mt-3">
              <p className="text-black pb-1">Upload cv *</p>
              <input
                type="file"
                accept=".pdf, .xlsx, .xls, .docx"
                name="cv"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]:  e.target.files[0] });
                  seterror({ ...error, cv: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.cv
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div> */}
          </div>
          <div className="sm:mt-10 ms:mt-0 w-full h-96 pt-5">
            <div className="mx-3 w-2/6">
              <label htmlFor="countrySelect" className="block text-black pb-1">
                Country
              </label>
              <select
                name="country"
                id="countrySelect"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, country: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.country
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              >
                <option value="">Choose</option>
                {Object.keys(countries).map((countryCode) => (
                  <option
                    key={countryCode}
                    value={countries[countryCode].name}
                    className="m-10"
                    style={{ paddingLeft: "10px !importent" }}
                  >
                    {countries[countryCode].name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-2 mt-3">
              <p className="text-black pb-1">Street Address *</p>
              <input
                type="text"
                name="streetaddress"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, streetaddress: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.streetaddress
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
            <div className="mx-2 mt-3 flex">
              <div className="w-4/12 me-3">
                <p className="text-black pb-1">City *</p>
                <input
                  type="text"
                  name="city"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, city: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.city
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div className="w-4/12 me-3">
                <p className="text-black pb-1">State *</p>
                <input
                  type="text"
                  name="state"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, state: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.state
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div className="w-4/12">
                <p className="text-black pb-1">Zip code *</p>
                <input
                  type="number"
                  name="zipcode"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, zipcode: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.zipcode
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
        <div className="bg-white md:h-20 h-16 w-full shadow-xl border ">
          <div className="flex justify-between">
            <div className="w-24 ms-4 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => navigate("/user/skills")}
                className="  text-purple-500 bg-purple-50 px-6 py-2 rounded-full"
              >
                Prev
              </button>
            </div>
            <div className="w-24 me-3 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={ConformButton}
                className="bg-purple-300 sm:bg-purple-400 px-6 py-2 rounded-full "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCreation;

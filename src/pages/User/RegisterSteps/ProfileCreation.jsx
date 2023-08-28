import React, { useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import countriesList from "countries-list";
import defaultprofileImg from '../../../assets/ProfileImg.jpeg'
import { useSelector } from "react-redux";

function ProfileCreation() {
 
  const navigate = useNavigate();
  const [Form, setForm] = useState({
    country: "",
    streetaddress: "",
    city: "",
    state: "",
    zipcode: "",
  });
  
  const [error, seterror] = useState({
    country: false,
    streetaddress: false,
    city: false,
    state: false,
    zipcode: false,
  });
  const countries = Object.keys(countriesList.countries).map((countryCode) => ({
    name: countriesList.countries[countryCode].name,
    value: countryCode,
  }));
 
  const Skill = useSelector((state) => state.user.Skills);
  const { JobFiledRedex, JobTitleRedex } = useSelector((state) => state.user);
  const { experiences } = useSelector((state) => state.user);
  const { Education } = useSelector((state) => state.user);
  const { Language } = useSelector((state) => state.user);
  
  const ConformButton = () =>{
  }
  return (
    <>
      <NavbarDefault />
      <ToastContainer />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <p className="text-sm">7/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            A few last details, then you can check and <br />
            publish your profile.
          </p>
          <p className="mt-3">
            A professional photo helps you build trust with your clients. To
            keep things safe and simple, they’ll
            <br />
            pay you through us - which is why we need your personal information.
          </p>
        </div>
        <div className="sm:flex">
          <div className="mt-10">
            <div className="flex justify-center">
              <img
                className="w-20"
                src={defaultprofileImg}
                alt=""
              />
            </div>
            <div className="flex justify-center mt-3">
              <input
                type="file"
                name="company"
                placeholder=""
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, company: false });
                }}
                className={`border w-full mx-2 py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.company
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
          </div>
          <div className="sm:mt-10 ms:mt-0 w-full h-96 ">
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
                name="company"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, company: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.company
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
                name="company"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, company: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.company
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
             </div>
             <div className="w-4/12 me-3">
             <p className="text-black pb-1">State *</p>
              <input
                type="text"
                name="company"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, company: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.company
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
             </div>
             <div className="w-4/12">
             <p className="text-black pb-1">Zip code *</p>
              <input
                type="text"
                name="company"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, company: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.company
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

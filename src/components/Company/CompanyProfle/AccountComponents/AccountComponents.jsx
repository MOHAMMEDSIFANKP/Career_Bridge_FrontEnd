import { useState, useEffect, useRef } from "react";
// Images
import EditIcon from "../../../../assets/Edit.png";
import Defaultprofile from "../../../../assets/ProfileImg.jpeg";

// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdateCompanyDetails } from "../../../../Redux/CompanySlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Service
import { UpdateUseaccount } from "../../../../services/userApi";


function AccountComponents() {
  const dispatch = useDispatch();
  const { CompanyInfo } = useSelector((state) => state.company);
  const [edit, setEdit] = useState(false);
  const [Form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [error, seterror] = useState({
    first_name: false,
    last_name: false,
    email: false,
  });
  // Useref
  const first_nameInput = useRef(null);
  const last_nameInput = useRef(null);
  const emailInput = useRef(null);

  //  Validations
  function Validation() {
    if (Form.first_name.trim() === "") {
      seterror({ ...error, first_name: true });
      first_nameInput.current.focus();
      return false;
    } else if (Form.last_name.trim() === "") {
      seterror({ ...error, last_name: true });
      last_nameInput.current.focus();
      return false;
    } else if (Form.email.trim() === "") {
      seterror({ ...error, email: true });
      emailInput.current.focus();
      return false;
    }
    return true;
  }

  const Submit = async () => {
    if (Validation()) {
      try {
        const res = await UpdateUseaccount(Form, CompanyInfo.id);
        if (res.status === 200) {
          toast.success("Updated");
          setEdit(!edit);
          dispatch(
            UpdateCompanyDetails({
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              profile_image: CompanyInfo.profile_image,
              company_name: CompanyInfo.company_name,
              industry: CompanyInfo.industry,
              company_size: CompanyInfo.company_size,
              company_type: CompanyInfo.company_type,
              gst: CompanyInfo.gst,
              description: CompanyInfo.description,
              streetaddress: CompanyInfo.streetaddress,
              country: CompanyInfo.country,
              state: CompanyInfo.state,
              city: CompanyInfo.city,
              zipcode: CompanyInfo.zipcode,
              is_verify: CompanyInfo.is_verify,
            })
          );
        }
      } catch (error) {
        setEdit(!edit)
        console.log(error);
        toast.error("Something wrong");
      }
    }
  };
  useEffect(() => {
    setForm({
      first_name: CompanyInfo.first_name,
      last_name: CompanyInfo.last_name,
      email: CompanyInfo.email,
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="w-full flex">
        <div className="lg:visible invisible">
          <p className="lg:text-3xl text-xl font-bold ms-24"> My info</p>
          <p className=" mb-3 ps-14">This is a company account</p>
        </div>
      </div>
      {!edit ? (
        <div className="me-10 rounded-2xl border border-purple-400">
          <div className="flex justify-between">
            <div className="flex items-end ms-5 text-xl font-bold">
              <p>Account</p>
            </div>
            <div>
              <div
                className="w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center"
                onClick={() => setEdit(!edit)}
              >
                <img src={EditIcon} className="w-5" alt="" />
              </div>
            </div>
          </div>
          <div className="mx-5 flex mb-4 pb-3 items-center ms-4 mt-2 bg-purple-50 rounded-xl">
            <div className="w-1/5">
              <div className="mt-4 ms-2">
                <img
                  className="w-48 md:w-24 p-1 -ms-6 md:ms-0 border border-purple-400 rounded-full"
                  src={
                    CompanyInfo.profile_image
                      ? CompanyInfo.profile_image
                      : Defaultprofile
                  }
                  alt="Profile image"
                />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm capitalize">Full name</p>
              <p className="font-bold text-xl capitalize">
                {CompanyInfo.first_name} {CompanyInfo.last_name}
              </p>
              <p className="text-sm ">Email</p>
              <p className="text-xl font-bold">{CompanyInfo.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="me-10 rounded-2xl border border-purple-400">
          <div className="flex justify-between">
            <div className="flex items-end ms-5 text-xl font-bold">
              <p>Account</p>
            </div>
            <div>
              <svg
                onClick={Submit}
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
          <div className="mx-5 flex mb-4 pb-3 items-center ms-4 mt-2 bg-purple-50 rounded-xl">
            <div className="w-1/5">
              <div className="mt-4 ms-2">
                <img
                  className="w-48 md:w-24 p-1 -ms-6 md:ms-0 border border-purple-400 rounded-full"
                  src={
                    CompanyInfo.profile_image
                      ? CompanyInfo.profile_image
                      : Defaultprofile
                  }
                  alt="Profile image"
                />
              </div>
            </div>
            <div className="mt-3 grid grid-rows-2 gap-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm mb-1 text-gray-600">First Name (required)</p>
                  <input
                    ref={first_nameInput}
                    type="text"
                    placeholder="Ex: First Nmae "
                    defaultValue={CompanyInfo.first_name}
                    name="first_name"
                    onChange={(e) => {
                      setForm({ ...Form, [e.target.name]: e.target.value });
                      seterror({ ...error, first_name: false });
                    }}
                    className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.first_name
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm mb-1 text-gray-600">Last Name (required)</p>
                  <input
                    ref={last_nameInput}
                    type="text"
                    placeholder="Ex: First Nmae "
                    defaultValue={CompanyInfo.last_name}
                    name="last_name"
                    onChange={(e) => {
                      setForm({ ...Form, [e.target.name]: e.target.value });
                      seterror({ ...error, last_name: false });
                    }}
                    className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.last_name
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm mb-1 text-gray-600">Email</p>
                <input
                  readOnly
                  ref={emailInput}
                  type="text"
                  placeholder="Ex: Email "
                  defaultValue={CompanyInfo.email}
                  name="email"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, email: false });
                  }}
                  className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.email
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountComponents;

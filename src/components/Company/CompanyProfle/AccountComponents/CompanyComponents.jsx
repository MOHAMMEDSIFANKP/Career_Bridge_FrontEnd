import React, { useState, useRef, useEffect } from "react";
import VerifyImage from "../../../../assets/VerificationImg/VerifyImage.png";
import UnverifyImage from "../../../../assets/VerificationImg/UnverifyImage.png";
import EditIcon from "../../../../assets/Edit.png";
// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditCompanyDetails } from "../../../../services/companyApi";
function CompanyComponents() {
  const { CompanyInfo } = useSelector((state) => state.company);
  const [editCompany, setEditCompany] = useState(false);
  const dispatch = useDispatch();
  const [Form, setForm] = useState({
    company_name: "",
    industry: "",
    company_size: "",
    company_type: "",
    gst: "",
    description: "",
    userId:""
  });
  const [error, seterror] = useState({
    company_name: false,
    industry: false,
    company_size: false,
    company_type: false,
    gst: false,
    description: false,
  });
  const company_nameInput = useRef(null);
  const industryInput = useRef(null);
  const company_sizeInput = useRef(null);
  const company_typeInput = useRef(null);
  const gstInput = useRef(null);
  const descriptionInput = useRef(null);

  useEffect(() => {
    setForm({
      company_name: CompanyInfo.company_name,
      industry: CompanyInfo.industry,
      company_size: CompanyInfo.company_size,
      company_type: CompanyInfo.company_type,
      gst: CompanyInfo.gst,
      description: CompanyInfo.description,
      userId: CompanyInfo.id,
    });
  },[]);

//  Validations
function Validations(){
    if (Form.company_name.trim() === ""){
        seterror({...error,company_name:true})
        company_nameInput.current.focus()
        return false
    }else if (Form.industry.trim() === ""){
        seterror({...error,industry:true})
        industryInput.current.focus()
        return false
    }else if (Form.company_size.trim() === ""){
        seterror({...error,company_size:true})
        company_sizeInput.current.focus()
        return false
    }else if (Form.company_type.trim() === ""){
        seterror({...error,company_type:true})
        company_typeInput.current.focus()
        return false
    }else if (Form.gst.trim() === ""){
        seterror({...error,gst:true})
        gstInput.current.focus()
        return false
    }else if (Form.description.trim() === ""){
        seterror({...error,description:true})
        descriptionInput.current.focus()
        return false
    }return true
}
const Submit =  async() =>{
    if (Validations()){
       try {
        const res = await EditCompanyDetails(Form,CompanyInfo.companyid)
        setEditCompany(!editCompany)
        toast.success("suceess")
        console.log(res);
       } catch (error) {
        console.log(error);
       }
    }
}
  return (
    <>
      <ToastContainer />
      <div className="me-10 border border-purple-400 rounded-2xl grid grid-rows-[3rem,1fr] mt-5">
        <div className="flex justify-between">
          <p className="font-bold ms-5 mt-5 text-xl">Company</p>

          {editCompany ? (
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
          ) : (
            <div
              className="w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center"
              onClick={() => setEditCompany(!editCompany)}
            >
              <img src={EditIcon} className="w-5" alt="" />
            </div>
          )}
        </div>
        {!editCompany ? (
          <div className="bg-purple-50 mx-4 rounded-xl mt-2 flex justify-between mb-4 py-4">
            <div className="capitalize flex-wrap">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm mx-5"> comapny name</p>
                  <p className="font-bold mx-10">{CompanyInfo.company_name}</p>
                  <p className="text-sm mx-5"> industry</p>
                  <p className="font-bold mx-10">{CompanyInfo.industry}</p>
                  <p className="text-sm mx-5"> company size</p>
                  <p className="font-bold mx-10">{CompanyInfo.company_size}</p>
                  <p className="text-sm mx-5"> company type</p>
                  <p className="font-bold mx-10">{CompanyInfo.company_type}</p>
                  <p className="text-sm mx-5"> gst no</p>
                  <p className="font-bold mx-10">{CompanyInfo.gst}</p>
                </div>
                <div>
                  {CompanyInfo.is_verify ? (
                    <img
                      src={VerifyImage}
                      className="w-36 rounded-3xl me-6 mt-2 "
                      alt=""
                    />
                  ) : (
                    <img
                      src={UnverifyImage}
                      className="w-36 rounded-3xl me-6 mt-2 "
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm mx-5"> description</p>
                <p className="font-bold mx-10">{CompanyInfo.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-4 bg-purple-50 mb-5 mt-3 rounded-xl py-5 grid grid-rows-8 gap-3">
            <div className="mx-5">
              <p className="text-sm pb-1 text-gray-700">
                Company name (Required)
              </p>
              <input
                ref={company_nameInput}
                type="text"
                defaultValue={Form.company_name}
                name="company_name"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, company_name: false });
                }}
                className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.company_name
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
            <div className="grid grid-cols-2 mx-5 gap-3">
              <div>
                <p className="text-sm pb-1 text-gray-700">
                  Industry (Required)
                </p>
                <input
                  ref={industryInput}
                  type="text"
                  defaultValue={Form.industry}
                  name="industry"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, industry: false });
                  }}
                  className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.industry
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm pb-1 text-gray-700">
                  company size (Required)
                </p>
                <input
                  ref={company_sizeInput}
                  type="text"
                  defaultValue={Form.company_size}
                  name="company_size"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, company_size: false });
                  }}
                  className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.company_size
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 mx-5 gap-3">
              <div>
                <p className="text-sm pb-1 text-gray-700">
                  company type (Required)
                </p>
                <input
                  ref={company_typeInput}
                  type="text"
                  defaultValue={Form.company_type}
                  name="company_type"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, company_type: false });
                  }}
                  className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.company_type
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm pb-1 text-gray-700">gst (Required)</p>
                <input
                  ref={gstInput}
                  type="text"
                  defaultValue={Form.gst}
                  name="gst"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, gst: false });
                  }}
                  className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.gst
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
            </div>
            <div className="mx-5">
              <p className="text-sm pb-1 text-gray-700">
                description (Required)
              </p>
              <textarea name="description" cols="30" rows="7"
              ref={descriptionInput}
              defaultValue={Form.description}
              onChange={(e) => {
                setForm({ ...Form, [e.target.name]: e.target.value });
                seterror({ ...error, description: false });
              }}
              className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.description
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}></textarea>
            </div>
          </div>
        )}
      </div>
      <div className="border border-purple-400 rounded-2xl me-10 h-10 mt-5"></div>
    </>
  );
}

export default CompanyComponents;

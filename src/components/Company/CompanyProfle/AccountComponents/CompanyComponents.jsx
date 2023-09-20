import React, { useState, useRef, useEffect } from "react";
import VerifyImage from "../../../../assets/VerificationImg/VerifyImage.png";
import UnverifyImage from "../../../../assets/VerificationImg/UnverifyImage.png";
import EditIcon from "../../../../assets/Edit.png";
import { Select, Option } from "@material-tailwind/react";
// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { UpdateCompanyDetails } from "../../../../Redux/CompanySlice";
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
    userId: "",
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
  }, []);

  //  Validations
  function Validations() {
    if (Form.company_name.trim() === "") {
      seterror({ ...error, company_name: true });
      company_nameInput.current.focus();
      return false;
    } else if (Form.industry.trim() === "") {
      seterror({ ...error, industry: true });
      industryInput.current.focus();
      return false;
    } else if (Form.company_size.trim() === "") {
      seterror({ ...error, company_size: true });
      company_sizeInput.current.focus();
      return false;
    } else if (Form.company_type.trim() === "") {
      seterror({ ...error, company_type: true });
      company_typeInput.current.focus();
      return false;
    } else if (Form.gst.trim() === "") {
      seterror({ ...error, gst: true });
      gstInput.current.focus();
      return false;
    } else if (Form.description.trim() === "") {
      seterror({ ...error, description: true });
      descriptionInput.current.focus();
      return false;
    }
    return true;
  }
  const Submit = async () => {
    if (Validations()) {
      try {
        const res = await EditCompanyDetails(Form, CompanyInfo.companyid);
        setEditCompany(!editCompany);
        toast.success("suceess");
        if (res.status === 200) {
          dispatch(
            UpdateCompanyDetails({
              first_name: CompanyInfo.first_name,
              last_name: CompanyInfo.last_name,
              profile_image: CompanyInfo.profile_image,
              company_name: res.data.company_name,
              industry: res.data.industry,
              company_size: res.data.company_size,
              company_type: res.data.company_type,
              gst: res.data.gst,
              description: res.data.description,
              streetaddress: CompanyInfo.streetaddress,
              country: CompanyInfo.country,
              state: CompanyInfo.state,
              city: CompanyInfo.city,
              zipcode: CompanyInfo.zipcode,
              is_verify: res.data.is_verify
            })
          );
        }
      } catch (error) {
        console.log(error);
        setEditCompany(!editCompany);
        toast.error("Somethink wrong")
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="me-10 border border-purple-400 rounded-2xl grid grid-rows-[3rem,1fr] mt-5">
        <div className="flex justify-between">
          <p className="font-bold ms-5 mt-5 text-xl">Company</p>

          {editCompany ? (
            <div className="cursor-pointer">
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
          <div className="bg-purple-50 mx-4 rounded-xl mt-2 mb-4 py-4">
            <div className="capitalize">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm mx-5 text-gray-700"> comapny name</p>
                  <p className="font-bold mx-10">{CompanyInfo.company_name}</p>
                  <p className="text-sm mx-5 text-gray-700"> industry</p>
                  <p className="font-bold mx-10">{CompanyInfo.industry}</p>
                  <p className="text-sm mx-5 text-gray-700"> company size</p>
                  <p className="font-bold mx-10">{CompanyInfo.company_size}</p>
                  <p className="text-sm mx-5 text-gray-700"> company type</p>
                  <p className="font-bold mx-10">{CompanyInfo.company_type}</p>
                  <p className="text-sm mx-5 text-gray-700"> gst no</p>
                  <p className="font-bold mx-10">{CompanyInfo.gst}</p>
                </div>
                <div className="">
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
                <p className="text-sm mx-5 text-gray-700"> description</p>
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
                <Select
                  name="industry"
                  label="Choose Industry"
                  ref={industryInput}
                  value={Form.industry}
                  onChange={(value) => {
                    setForm({
                      ...Form,
                      industry: value,
                    });
                    seterror({ ...error, industry: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm  focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.industry
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                >
                  <Option value="Aerospace">Aerospace</Option>
                  <Option value="Agriculture & Forestry">
                    Agriculture & Forestry
                  </Option>
                  <Option value="Art & Design">Art & Design</Option>
                  <Option value="Automotive">Automotive</Option>
                  <Option value="Aviation">Aviation</Option>
                  <Option value="Education">Education</Option>
                  <Option value="Energy & Utilities">Energy & Utilities</Option>
                  <Option value="Engineering & Architecture">
                    Engineering & Architecture
                  </Option>
                  <Option value="Fashion & Beauty">Fashion & Beauty</Option>
                  <Option value="Finance & Accounting">
                    Finance & Accounting
                  </Option>
                  <Option value="Food & Beverage">Food & Beverage</Option>
                  <Option value="Government & Public Sector">
                    Government & Public Sector
                  </Option>
                  <Option value="Health & Fitness">Health & Fitness</Option>
                  <Option value="HR & Business Services">
                    HR & Business Services
                  </Option>
                  <Option value="Legal">Legal</Option>
                  <Option value="Manufacturing & Construction">
                    Manufacturing & Construction
                  </Option>
                  <Option value="Media & Entertainment">
                    Media & Entertainment
                  </Option>
                  <Option value="Military & Defense">Military & Defense</Option>
                  <Option value="Mining">Mining</Option>
                  <Option value="Real Estate">Real Estate</Option>
                  <Option value="Retail & Consumer Goods">
                    Retail & Consumer Goods
                  </Option>
                  <Option value="Sales & Marketing">Sales & Marketing</Option>
                  <Option value="Science & Medicine">Science & Medicine</Option>
                  <Option value="Sports & Recreation">
                    Sports & Recreation
                  </Option>
                  <Option value="Supply Chain & Logistics">
                    Supply Chain & Logistics
                  </Option>
                  <Option value="Tech & IT">Tech & IT</Option>
                  <Option value="Transportation & Warehousing">
                    Transportation & Warehousing
                  </Option>
                  <Option value="Travel & Hospitality">
                    Travel & Hospitality
                  </Option>
                </Select>
              </div>
              <div>
                <p className="text-sm pb-1 text-gray-700">
                  company size (Required)
                </p>
                <Select
                  ref={company_sizeInput}
                  name="company_size"
                  id=""
                  label="Choose Company Size"
                  value={Form.company_size}
                  onChange={(value) => {
                    setForm({
                      ...Form,
                      company_size: value,
                    });
                    seterror({ ...error, company_size: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm  focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.company_size
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                >
                  <Option value="Just me">Just me (1 employee)</Option>
                  <Option value="2-9 employees">2-9 employees</Option>
                  <Option value="10-99 employees">10-99 employees</Option>
                  <Option value="100-1,000 employees">
                    100-1,000 employees
                  </Option>
                  <Option value="More than 1,000 employees">
                    More than 1,000 employees
                  </Option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 mx-5 gap-3">
              <div>
                <p className="text-sm pb-1 text-gray-700">
                  company type (Required)
                </p>
                <Select
                  ref={company_typeInput}
                  name="company_type"
                  id=""
                  value={Form.company_type}
                  label="Choose Company Type"
                  onChange={(value) => {
                    setForm({
                      ...Form,
                      company_type: value,
                    });
                    seterror({ ...error, company_type: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm  focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.company_type
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                >
                  <Option value="Corporation">Corporation</Option>
                  <Option value="Limited Liability Company (LLC)">
                    Limited Liability Company (LLC)
                  </Option>
                  <Option value="Partnership">Partnership</Option>
                  <Option value="Sole Proprietorship">
                    Sole Proprietorship
                  </Option>
                  <Option value="Nonprofit Organization">
                    Nonprofit Organization
                  </Option>
                  <Option value="Cooperative">Cooperative</Option>
                  <Option value="Franchise">Franchise</Option>
                  <Option value="Joint Venture">Joint Venture</Option>
                  <Option value="Publicly Traded Company">
                    Publicly Traded Company
                  </Option>
                  <Option value="Private Company">Private Company</Option>
                  <Option value="Family-Owned Business">
                    Family-Owned Business
                  </Option>
                  <Option value="Startup">Startup</Option>
                  <Option value="Holding Company">Holding Company</Option>
                  <Option value="Subsidiary">Subsidiary</Option>
                  <Option value="Professional Corporation (PC)">
                    Professional Corporation (PC)
                  </Option>
                  <Option value="Social Enterprise">Social Enterprise</Option>
                  <Option value="B Corporation (Benefit Corporation)">
                    B Corporation (Benefit Corporation)
                  </Option>
                  <Option value="C Corporation">C Corporation</Option>
                  <Option value="S Corporation">S Corporation</Option>
                  <Option value="Limited Partnership (LP)">
                    Limited Partnership (LP)
                  </Option>
                  <Option value="Limited Liability Partnership (LLP)">
                    Limited Liability Partnership (LLP)
                  </Option>
                  <Option value="Real Estate Investment Trust (REIT)">
                    Real Estate Investment Trust (REIT)
                  </Option>
                  <Option value="Cooperative Corporation">
                    Cooperative Corporation
                  </Option>
                  <Option value="Mutual Fund">Mutual Fund</Option>
                  <Option value="Government-Owned Enterprise">
                    Government-Owned Enterprise
                  </Option>
                  <Option value="Freelance/Sole Proprietor">
                    Freelance/Sole Proprietor
                  </Option>
                  <Option value="Online Business">Online Business</Option>
                  <Option value="Manufacturing Company">
                    Manufacturing Company
                  </Option>
                  <Option value="Retail Company">Retail Company</Option>
                  <Option value="Technology Company">Technology Company</Option>
                </Select>
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
              <textarea
                name="description"
                cols="30"
                rows="7"
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
                }`}
              ></textarea>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CompanyComponents;

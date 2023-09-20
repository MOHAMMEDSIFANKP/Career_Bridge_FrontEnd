import React, { useState, useRef, useEffect } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import CompanyProfileImg from "../../../assets/CompanyProfile.png";
import { Select, Option } from "@material-tailwind/react";
import Loader from "../../../components/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

// Service
import { CompanyInfoCreate } from "../../../services/companyApi";
import { useNavigate } from "react-router-dom";
import { UserProfileUpdate } from "../../../services/userApi";
import { UserIs_compleatedUpdate } from "../../../services/userApi";
// Redex
import { useDispatch } from "react-redux";
import { setCompanyDetails } from "../../../Redux/CompanySlice";

function CompanyCreations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get id
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);

  const [companyDetail, setCompanyDetail] = useState({
    company_name: "",
    companyProfile: null,
    industry: "",
    company_size: null,
    company_type: "",
    gst: "",
    description: "",
    userId: decode.user_id,
  });
  const [checkbox, setChecbox] = useState(false);

  const [error, seterror] = useState({
    company_name: false,
    companyProfile: false,
    industry: false,
    company_size: false,
    company_type: false,
    gst: false,
    description: false,
    checkbox: false,
  });
  const company_nameInputRef = useRef(null);
  const CompayProfileInput = useRef(null);
  const IndustryInput = useRef(null);
  const company_sizeInput = useRef(null);
  const gstInput = useRef(null);
  const company_typeInput = useRef(null);
  const descriptionInput = useRef(null);
  const CheckboxInput = useRef(null);

  useEffect(() => {
    company_nameInputRef.current.focus();
    document.title = "Create Company | Career Bridge";
  }, []);

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  // Validation
  function Validation() {
    if (companyDetail.company_name === "") {
      seterror({ ...error, company_name: true });
      company_nameInputRef.current.focus();
      return false;
    } else if (companyDetail.industry === "") {
      seterror({ ...error, industry: true });
      IndustryInput.current.focus();
      return false;
    } else if (companyDetail.companyProfile === null) {
      seterror({ ...error, companyProfile: true });
      CompayProfileInput.current.focus();
      return false;
    } else if (companyDetail.company_size === null) {
      seterror({ ...error, company_size: true });
      company_sizeInput.current.focus();
      return false;
    } else if (companyDetail.company_type === "") {
      seterror({ ...error, company_type: true });
      company_typeInput.current.focus();
      return false;
    } else if (companyDetail.gst === "") {
      seterror({ ...error, gst: true });
      gstInput.current.focus();
      return false;
    } else if (companyDetail.description === "") {
      seterror({ ...error, description: true });
      descriptionInput.current.focus();
      return false;
    } else if (checkbox === false) {
      seterror({ ...error, checkbox: true });
      CheckboxInput.current.focus();
      return false;
    }
    return true;
  }
  const FileSubmit = async () => {
    if (Validation()) {
      try {
        handleLoading();
  
        const res = await CompanyInfoCreate(companyDetail);
        const res2 = await UserIs_compleatedUpdate(companyDetail.userId);
        const pictureForm = new FormData();
        pictureForm.append("profile_image", companyDetail.companyProfile);
        const profile = await UserProfileUpdate(pictureForm, companyDetail.userId);
  
        const token = JSON.stringify(res2.data.token);
        localStorage.setItem("token", token);
        const decode = jwt_decode(token);
  
        const data = {
          id: res.data.userId,
          companyid:res.data.id,
          company_name:res.data.company_name,
          company_size:res.data.company_size,
          company_type:res.data.company_type,
          gst:res.data.gst,
          description:res.data.description,
          industry:res.data.industry,
          profile_image: profile.data.profile_image,
          first_name: decode.first_name,
          last_name: decode.last_name,
          email: decode.email,
          role: decode.role,
          is_compleated: decode.is_compleated,
          is_active: decode.is_active,
          is_admin: decode.is_admin,
        };
        dispatch(setCompanyDetails({ CompanyInfo: data }));
        handleLoading();
        navigate("/company/");
      } catch (error) {
        console.log(error);
        handleLoading();
        toast.error("Something went wrong");
      }
    }
  };
  

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="h-screen ">
        <div>
          <NavbarDefault />
        </div>
        <div className="flex h-5/6 justify-center items-center mt-10">
          <div className="sm:border rounded-2xl border-purple-400 ">
            <div className="flex items-center justify-center my-10 ">
              <p className="font-bold text-2xl">Company Details</p>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <div className="mx-4 mb-4">
                  <input
                    name="company_name"
                    placeholder="Company Name"
                    type="text"
                    ref={company_nameInputRef}
                    onChange={(e) => {
                      setCompanyDetail({
                        ...companyDetail,
                        [e.target.name]: e.target.value,
                      });
                      seterror({ ...error, company_name: false });
                    }}
                    className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.company_name
                        ? "focus:ring-red-200 border-2 border-red-300"
                        : "border-gray-400"
                    }`}
                  />
                </div>
                <div className="mx-4 mb-4">
                  <Select
                    name="industry"
                    label="Choose Industry"
                    ref={IndustryInput}
                    onChange={(value) => {
                      setCompanyDetail({
                        ...companyDetail,
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
                    <Option value="Energy & Utilities">
                      Energy & Utilities
                    </Option>
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
                    <Option value="Military & Defense">
                      Military & Defense
                    </Option>
                    <Option value="Mining">Mining</Option>
                    <Option value="Real Estate">Real Estate</Option>
                    <Option value="Retail & Consumer Goods">
                      Retail & Consumer Goods
                    </Option>
                    <Option value="Sales & Marketing">Sales & Marketing</Option>
                    <Option value="Science & Medicine">
                      Science & Medicine
                    </Option>
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
                <div className="mx-4 mb-4">
                  <Select
                    ref={company_sizeInput}
                    name="company_size"
                    id=""
                    label="Choose Company Size"
                    onChange={(value) => {
                      setCompanyDetail({
                        ...companyDetail,
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
              <div>
                <div className="w-28 flex justify-center items-center ms-10 rounded-full border border-purple-400">
                  <img
                    src={
                      companyDetail.companyProfile
                        ? URL.createObjectURL(companyDetail.companyProfile)
                        : CompanyProfileImg
                    }
                    className="rounded-full w-24 opacity-75"
                    alt=""
                  />
                </div>
                <div className="ms-12 mt-2">
                  <input
                    placeholder="companyProfile"
                    ref={CompayProfileInput}
                    name="companyProfile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setCompanyDetail({
                        ...companyDetail,
                        [e.target.name]: e.target.files[0],
                      });
                      seterror({ ...error, companyProfile: false });
                    }}
                    className={`border w-24  py-2 px-1 -mt-2 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.companyProfile
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mx-4 mb-4">
                <Select
                  ref={company_typeInput}
                  name="company_type"
                  id=""
                  label="Choose Company Type"
                  onChange={(value) => {
                    setCompanyDetail({
                      ...companyDetail,
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
              <div className="mx-4 mb-4">
                <input
                  ref={gstInput}
                  placeholder="Gst No"
                  name="gst"
                  type="text"
                  onChange={(e) => {
                    setCompanyDetail({
                      ...companyDetail,
                      [e.target.name]: e.target.value,
                    });
                    seterror({ ...error, gst: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.gst
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div className="mx-4 mb-3">
                <textarea
                  ref={descriptionInput}
                  name="description"
                  placeholder="Descripation"
                  id=""
                  cols="full"
                  rows="4"
                  onChange={(e) => {
                    setCompanyDetail({
                      ...companyDetail,
                      description: e.target.value,
                    }),
                      seterror({ ...error, description: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.description
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                ></textarea>
              </div>
              <div className="mx-7 flex">
                <div>
                  <input
                    type="checkbox"
                    ref={CheckboxInput}
                    onChange={() => setChecbox(!checkbox)}
                    className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.checkbox
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
                <div className="ms-4">
                  <p className="text-gray-800 text-sm">
                    Yes, I understand and agree to the Terms of Service,
                    including the <br /> User Agreement and Privacy Policy.{" "}
                  </p>
                </div>
              </div>
              <div className="mx-8 flex justify-center items-center h-20">
                <button
                  onClick={FileSubmit}
                  className="border rounded-full w-full py-2 bg-purple-400 font-bold"
                >
                  Create My Company
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyCreations;

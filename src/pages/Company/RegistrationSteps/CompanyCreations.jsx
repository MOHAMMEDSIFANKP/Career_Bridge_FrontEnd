import React, { useState, useRef, useEffect } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import CompanyProfileImg from "../../../assets/CompanyProfile.png";
import { Select, Option } from "@material-tailwind/react";

function CompanyCreations() {
  const [companyDetail, setCompanyDetail] = useState({
    companyname: "",
    companyProfile: null,
    industry: "",
    companysize: "",
    companytype: "",
    gstno: "",
    companydescripation: "",
  });

  const [error, seterror] = useState({
    companyname: false,
    companyProfile: false,
    industry: false,
    companysize: false,
    companytype: false,
    gstno: false,
    companydescripation: false,
  });

  const CompanynameInputRef = useRef(null);
  const CompayProfileInput = useRef(null);
  const IndustryInput = useRef(null);
  const CompanysizeInput = useRef(null);
  const GstnoInput = useRef(null);
  const companytypeInput = useRef(null);
  const CompanydescripationInput = useRef(null);

  useEffect(() => {
    CompanynameInputRef.current.focus();
    document.title = "Create Company | Career Bridge";
  }, []);

  const FileSubmit = () => {
    if (companyDetail.companyname === "") {
      seterror({ ...error, companyname: true });
      CompanynameInputRef.current.focus();
    } else if (companyDetail.industry === "") {
      seterror({ ...error, industry: true });
      IndustryInput.current.focus();
    } else if (companyDetail.companyProfile === null) {
      seterror({ ...error, companyProfile: true });
      CompayProfileInput.current.focus();
    }  else if (companyDetail.companysize === null) {
      seterror({ ...error, companysize: true });
      CompanysizeInput.current.focus();
    }
  };
  console.log(companyDetail);
  return (
    <>
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
                    name="companyname"
                    placeholder="Company Name"
                    type="text"
                    ref={CompanynameInputRef}
                    onChange={(e) => {
                      setCompanyDetail({
                        ...companyDetail,
                        [e.target.name]: e.target.value,
                      });
                      seterror({ ...error, companyname: false });
                    }}
                    className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.companyname
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
                  ref={CompanysizeInput}
                    name="companysize"
                    id=""
                    label="Choose Company Size"
                    onChange={(value) => {
                      setCompanyDetail({
                        ...companyDetail,
                        companysize: value,
                      });
                      seterror({ ...error, companysize: false });
                    }}
                    className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm  focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.companysize
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
                <input
                  placeholder="Company Type"
                  name="companytype"
                  type="text"
                  onChange={(e) => {
                    setCompanyDetail({
                      ...companyDetail,
                      [e.target.name]: e.target.value,
                    });
                    seterror({ ...error, companytype: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.companytype
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div className="mx-4 mb-4">
                <input
                  placeholder="Gst No"
                  name="gstno"
                  type="text"
                  onChange={(e) => {
                    setCompanyDetail({
                      ...companyDetail,
                      [e.target.name]: e.target.value,
                    });
                    seterror({ ...error, gstno: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.gstno
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div className="mx-4 mb-3">
                <textarea
                  name="companydescripation"
                  placeholder="Descripation"
                  id=""
                  cols="full"
                  rows="4"
                  onChange={(e) => {
                    setCompanyDetail({
                      ...companyDetail,
                      [e.target.name]: e.target.value,
                    }),
                      seterror({ ...error, companydescripation: false });
                  }}
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.companydescripation
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                ></textarea>
              </div>
              <div className="mx-7 flex">
                <div>
                  <input type="checkbox" />
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

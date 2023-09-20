import { useState, useEffect, useRef } from "react";
import EditIcon from "../../../../assets/Edit.png";
// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdateCompanyDetails } from "../../../../Redux/CompanySlice";
// List
import { Country, State, City } from "country-state-city";

import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditCompanyDetails } from "../../../../services/companyApi";
function CompanyAddressComponents() {
  const dispatch = useDispatch();
  // Redux destructure
  const { CompanyInfo } = useSelector((state) => state.company);
  const [edit, setEdit] = useState(false);
  // Forms
  const [Form, setForm] = useState({
    streetaddress: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    company_name:"",
    userId:"",
  });
  console.log(Form);
  const [error, seterror] = useState({
    streetaddress: false,
    state: false,
    city: false,
    zipcode: false,
  });
  //  ----------------county , state and city filtring-------------------------/
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    save: country.name,
    label: country.name,
  }));
  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
        (city) => ({
          value: city.name,
          label: city.name,
        })
      )
    : [];

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setForm({ ...Form, country: selectedOption.label });
    setSelectedState(null);
    setSelectedCity(null);
    seterror({...error,country:false})
  };
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setForm({ ...Form, state: selectedOption.label });
    setSelectedCity(null);
    seterror({...error,state:false})

  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setForm({ ...Form, city: selectedOption.label });
    seterror({...error,city:false})

  };
  useEffect(() => {
    setForm({
      streetaddress: CompanyInfo.streetaddress,
      country: CompanyInfo.country,
      state: CompanyInfo.state,
      city: CompanyInfo.city,
      zipcode: CompanyInfo.zipcode,
      company_name: CompanyInfo.company_name,
      userId: CompanyInfo.id,
    });
    if (CompanyInfo.country){
      const selectedCountryOption = countryOptions.find(
        (option) =>
          option.label.toLowerCase() === CompanyInfo.country.toLowerCase()
      );
      if (selectedCountryOption) {
        setSelectedCountry(selectedCountryOption);
      }
      const selectedStateOption = State.getStatesOfCountry(
        selectedCountryOption.value
      ).find(
        (state) => state.name.toLowerCase() === CompanyInfo.state.toLowerCase()
      );
  
      if (selectedStateOption) {
        setSelectedState({
          value: selectedStateOption.isoCode,
          label: selectedStateOption.name,
        });
      }
      setSelectedCity({
        value: CompanyInfo.city,
        label: CompanyInfo.city,
      });
    }
  }, []);
    //  ----------------county , state and city filtring-------------------------/

    const Streetaddresinput = useRef(null)
    const Contryinput = useRef(null)
    const Stateinput = useRef(null)
    const Cityinput = useRef(null)
    const Zipcodesinput = useRef(null)
    // Validation
    function Validation (){
      if (!Form.streetaddress || Form.streetaddress.trim() === ''){
        seterror({...error,streetaddress:true})
        Streetaddresinput.current.focus()
        return false
      }else if (!Form.country || Form.country.trim() === ''){
        seterror({...error,country:true})
        Contryinput.current.focus()
        return false
      }else if (!Form.state || Form.state.trim() === ''){
        seterror({...error,state:true})
        Stateinput.current.focus()
        return false
      }else if (!Form.city || Form.city.trim() === ''){
        seterror({...error,city:true})
        Cityinput.current.focus()
        return false
      }else if (!Form.zipcode || Form.zipcode === ''){
        seterror({...error,zipcode:true})
        Zipcodesinput.current.focus()
        return false
      }return true
    }
    const Submit = async () => {
      if (Validation()) {
        try {
          const res = await EditCompanyDetails(Form, CompanyInfo.companyid);
          console.log(res);
          setEdit(!edit);
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
                streetaddress: res.data.streetaddress,
                country: res.data.country,
                state: res.data.state,
                city: res.data.city,
                zipcode: res.data.zipcode,
                is_verify: res.data.is_verify,
              })
            );
          }
        } catch (error) {
          console.log(error);
          setEdit(!edit);
          toast.error("Somethink wrong")
        }
      }
    };
  return (
    <>
      {!edit ? (
        <div className="border mb-10 border-purple-400 rounded-2xl me-10 mt-5 grid grid-rows-[3rem]">
          <div className="flex justify-between">
            <p className="font-bold ms-5 text-xl mt-5 ">Address</p>
            <div
              className="w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center"
              onClick={() => setEdit(!edit)}
            >
              <img src={EditIcon} className="w-5" alt="" />
            </div>
          </div>
          {CompanyInfo.streetaddress ? (
            <div className="bg-purple-50 mx-5 mt-2 rounded-2xl py-4 mb-4">
              <p className="ms-5 text-gray-600 text-sm">Street Address</p>
              <p className="ms-10 font-bold capitalize">
                {CompanyInfo.streetaddress}
              </p>
              <p className="ms-10 capitalize">{CompanyInfo.city}  {CompanyInfo.zipcode} </p>
              <p className="ms-10 capitalize">{CompanyInfo.state}  {CompanyInfo.country}</p>
            </div>
          ) : (
            <div className="bg-purple-50 mt-2 mx-5 py-7 flex justify-center items-centerrounded-2xl rounded-xl mb-4">
              <div className="flex">
                <div
                  className=" rounded-full border bg-purple-400 h-9 w-9 flex items-center justify-center text-3xl text-white cursor-pointer"
                  onClick={() => setEdit(true)}
                >
                  <p>+</p>
                </div>
                <p className="text-xl ms-3 text-gray-500 mt-1">Add Address</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="border mb-10 border-purple-400  pb-4 rounded-2xl me-10 mt-5 grid grid-rows-[3rem]">
            <div className="flex justify-between">
              <p className="font-bold ms-5 text-xl mt-5">Address</p>
              <svg
                onClick={Submit}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="cursor-pointer w-9 h-9 font-bold text-purple-400 me-3 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="bg-purple-50 mx-4 rounded-xl pb-4 mt-2 pt-2 grid grid-rows-1 md:grid-rows-3  gap-2">
              <div className="mx-4">
                <p className="text-sm mb-1 text-gray-600 capitalize">
                  street address(required)
                </p>
                <input
                  ref={Streetaddresinput}
                  type="text"
                  placeholder="Ex: First Nmae "
                  defaultValue={
                    CompanyInfo.streetaddress ? CompanyInfo.streetaddress : ""
                  }
                  name="streetaddress"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, streetaddress: false });
                  }}
                  className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.streetaddress
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div className="md:flex gap-2 mx-4">
                <div className="w-full">
                  <p className="text-sm mb-1 text-gray-600 capitalize">
                    Country (required)
                  </p>
                  <Select
                  ref={Contryinput}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    placeholder="Select a Country"
                    className={`border bg-gray-200 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.country
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm mb-1 text-gray-600 capitalize">
                    State (required)
                  </p>
                  <Select
                  ref={Stateinput}
                    value={selectedState}
                    onChange={handleStateChange}
                    options={stateOptions}
                    placeholder="Select a State"
                    className={`border bg-gray-200 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.state
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
              </div>
              <div className="md:flex gap-2 mx-4">
                <div className="w-full">
                  <p className="text-sm mb-1 text-gray-600 capitalize">
                    City(required)
                  </p>
                  <Select
                  ref={Cityinput}
                    value={selectedCity}
                    onChange={handleCityChange}
                    options={cityOptions}
                    placeholder="Select a City"
                    className={`border bg-gray-200 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.city
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm mb-1 text-gray-600 capitalize">
                    zip code (required)
                  </p>
                  <input
                    ref={Zipcodesinput}
                    type="number"
                    defaultValue={
                      CompanyInfo.zipcode ? CompanyInfo.zipcode : ""
                    }
                    name="zipcode"
                    onChange={(e) => {
                      setForm({ ...Form, [e.target.name]: e.target.value });
                      seterror({ ...error, zipcode: false });
                    }}
                    className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.zipcode
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CompanyAddressComponents;

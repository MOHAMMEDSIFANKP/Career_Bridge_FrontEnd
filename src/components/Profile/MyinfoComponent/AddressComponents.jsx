import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Redex
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UpdateUserDetails } from "../../../Redux/UserSlice";
import { useDispatch } from "react-redux";
// Images
import EditIcon from "../../../assets/Edit.png";
import { UpdateUserInfoDetails } from "../../../services/userApi";

function AddressComponents() {
    const dispatch = useDispatch()
  const { UserInfo } = useSelector((state) => state.user);

  const [edit, setEdit] = useState(false);
  const [Form, setFrom] = useState({
    streetaddress: "",
    city: "",
    state: "",
    zipcode: null,
  });
  const [error, seterror] = useState({
    streetaddress: false,
    city: false,
    state: false,
    zipcode: false,
  });

  const StreetaddressInput = useRef(null);
  const CityInput = useRef(null);
  const StateInput = useRef(null);
  const ZipcodeInput = useRef(null);

  //  Validation
  const Validation = () => {
    if (Form.streetaddress.trim() === "") {
      seterror({ ...error, streetaddress: true });
      StreetaddressInput.current.focus();
      return false;
    } else if (Form.city.trim() === "") {
      seterror({ ...error, city: true });
      CityInput.current.focus();
      return false;
    } else if (Form.state.trim() === "") {
      seterror({ ...error, state: true });
      StateInput.current.focus();
      return false;
    } else if (Form.zipcode === null) {
      seterror({ ...error, zipcode: true });
      ZipcodeInput.current.focus();
      return false;
    }
    return true;
  };
  const EditButton = () => {
    setEdit(true);
  };

  const SubmitButton = async () => {
   try {
    if (Validation()){
        const res = await UpdateUserInfoDetails(Form,UserInfo.userinfoid)
        console.log(res);
        dispatch(
            UpdateUserDetails({
              first_name: UserInfo.first_name,
              last_name: UserInfo.last_name,
              bio: res.data.bio,
              streetaddress: res.data.streetaddress,
              city: res.data.city,
              state: res.data.state,
              zipcode: res.data.zipcode,
              cv: res.data.cv,
            })
          );
          setEdit(!edit)
    }
   } catch (error) {
    toast.error("Something wrong")
   }
  };

  useEffect(() => {
    setFrom({
      streetaddress: UserInfo.streetaddress,
      city: UserInfo.city,
      state: UserInfo.state,
      zipcode: UserInfo.zipcode,
    });
  }, []);

  return (
    <>
      <div className="border me-10 rounded-xl mt-5 mb-20 border-purple-400 grid grid-rows-[3rem,1fr]">
        {edit === false ? (
          <>
            <div className="flex justify-between">
              <div>
                <p className="font-bold m-2">Address</p>
              </div>
              <div
                className="m-3 flex justify-center items-center border-purple-400 border rounded-full w-8 h-8"
                onClick={EditButton}
              >
                <img src={EditIcon} alt="" className="w-5" />
              </div>
            </div>
            <div className="mx-3 mb-4 bg-purple-50 rounded-xl">
              <div className="mx-4 py-2">
                <p className="font-bold capitalize">{UserInfo.streetaddress}</p>
                <p className="text-md">{UserInfo.city}</p>
                <p className="text-sm">{UserInfo.state}</p>
                <p className="text-sm">{UserInfo.zipcode}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <div>
                <p className="font-bold m-2">Address</p>
              </div>
              <div onClick={SubmitButton}>
                <svg
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
            <div className="mx-3 mb-4 bg-purple-50 rounded-xl">
              <div className="mx-4 py-2 grid grid-rows-3 gap-2">
                <div>
                  <input
                    ref={StreetaddressInput}
                    name="streetaddress"
                    type="text"
                    placeholder="Street Address"
                    onChange={(e) => {
                      setFrom({ ...Form, streetaddress: e.target.value }),
                        seterror({ ...error, streetaddress: false });
                    }}
                    defaultValue={Form.streetaddress}
                    className={`border w-full mt-2 py-1 px-3 rounded-lg text-black placeholder-gray-700 bg-purple-50 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.streetaddress
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      ref={CityInput}
                      placeholder="City"
                      name="city"
                      onChange={(e) => {
                        setFrom({ ...Form, city: e.target.value });
                        seterror({ ...error, city: false });
                      }}
                      type="text"
                      defaultValue={Form.city}
                      className={`border me-3 w-full py-1 px-3 rounded-lg text-black placeholder-gray-700 bg-purple-50 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                        error.city
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      ref={StateInput}
                      placeholder="State"
                      type="text"
                      name="state"
                      onChange={(e) => {
                        setFrom({ ...Form, state: e.target.value });
                        seterror({ ...error, state: false });
                      }}
                      defaultValue={Form.state}
                      className={`border w-full me-2 py-1 px-3 rounded-lg text-black placeholder-gray-700 bg-purple-50 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                        error.state
                          ? "focus:ring-red-200 border-2 border-red-400"
                          : "border-gray-400"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <input
                    ref={ZipcodeInput}
                    placeholder="Zipcode"
                    type="number"
                    name="zipcode"
                    onChange={(e) => {
                      setFrom({ ...Form, zipcode: e.target.value });
                      seterror({ ...error, zipcode: false });
                    }}
                    defaultValue={Form.zipcode}
                    className={`border w-6/12 py-1 px-3 -mt-4  rounded-lg text-black placeholder-gray-700 bg-purple-50 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                      error.zipcode
                        ? "focus:ring-red-200 border-2 border-red-400"
                        : "border-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AddressComponents;

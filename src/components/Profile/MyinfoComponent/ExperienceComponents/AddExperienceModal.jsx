import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import countriesList from "countries-list";
import { toast } from "react-toastify";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setExperiences,CleatExperiences  } from "../../../../Redux/UserSlice";
import { UpdateUserInfoDetails } from "../../../../services/userApi";

function AddExperienceModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { UserInfo } = useSelector((state) => state.user);

  const [Form, setForm] = useState({
    title: "",
    subtitle: "",
    company: "",
    state: "",
    country: "",
    startdate: "",
    enddate: "",
    Description: "",
  });

  const [error, seterror] = useState({
    title: false,
    subtitle: false,
    company: false,
    state: false,
    country: false,
    startdate: false,
    enddate: false,
    Description: false,
  });

  const Validation = () => {
    if (Form.title.trim() === "") {
      seterror({ ...error, title: true });
      return false;
    } else if (Form.subtitle.trim() === "") {
      seterror({ ...error, subtitle: true });
      return false;
    } else if (Form.company.trim() === "") {
      seterror({ ...error, company: true });
      return false;
    } else if (Form.state.trim() === "") {
      seterror({ ...error, state: true });
      return false;
    } else if (Form.country.trim() === "") {
      seterror({ ...error, country: true });
      return false;
    } else if (Form.startdate.trim() === "") {
      seterror({ ...error, startdate: true });
      return false;
    } else if (Form.enddate.trim() === "") {
      seterror({ ...error, enddate: true });
      return false;
    } else if (Form.Description.trim() === "") {
      seterror({ ...error, Description: true });
      return false;
    }
    return true;
  };
  const countries = Object.keys(countriesList.countries).map((countryCode) => ({
    name: countriesList.countries[countryCode].name,
    value: countryCode,
  }));
  const ConformModal = async () => {
    if (Validation()) {
      try {
        const res = await UpdateUserInfoDetails(
          { experience: [Form] },
          UserInfo.userinfoid
        );
        dispatch(CleatExperiences())
        toast.success("Experiende added succesfully")
        res.data.experience.map((values, index) => {
          dispatch(setExperiences(values));
        });
      } catch (error) {
        toast.error("Something wrong");
      }
      onClose();
      setForm({
        title: "",
        subtitle: "",
        company: "",
        state: "",
        country: "",
        startdate: "",
        enddate: "",
        Description: "",
      })
    }
  };

  return (
    <>
      <Dialog open={isOpen} handler={onClose}>
        <DialogHeader className="text-2xl">Add Work Experience </DialogHeader>
        <DialogBody>
          <div class="grid grid-rows-4 gap-4">
            <div className="mx-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-black pb-1">Title *</p>
                <input
                  type="text"
                  name="title"
                  placeholder="Ex: Full Stack"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, title: false });
                  }}
                  class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.title
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-black pb-1">Sub Title *</p>
                <input
                  type="text"
                  name="subtitle"
                  placeholder="Ex: Python django"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, subtitle: false });
                  }}
                  class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.subtitle
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
            </div>
            <div className="mx-2">
              <p className="text-black pb-1">Company *</p>
              <input
                type="text"
                name="company"
                placeholder="Ex: Microsoft"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, company: false });
                }}
                class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.company
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
            <div className="mx-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-black pb-1">State</p>
                <input
                  type="text"
                  name="state"
                  placeholder="Ex: London"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, state: false });
                  }}
                  class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.state
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="countrySelect"
                  className="block text-black pb-1"
                >
                  Country
                </label>
                <select
                  name="country"
                  id="countrySelect"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, country: false });
                  }}
                  class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.country
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                  className="border w-full py-2 border-gray-400 bg-white rounded-lg text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
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
            </div>
            <div className="mx-3 grid grid-cols-2 gap-5">
              <div>
                <p className="text-black pb-1">Start date</p>
                <input
                  name="startdate"
                  type="date"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, startdate: false });
                  }}
                  class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.startdate
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-black pb-1">End date</p>
                <input
                  name="enddate"
                  type="date"
                  onChange={(e) => {
                    setForm({ ...Form, [e.target.name]: e.target.value });
                    seterror({ ...error, enddate: false });
                  }}
                  class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.enddate
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
              </div>
            </div>
            <div className="mx-2">
              <p className="text-black pb-1">Description</p>
              <textarea
                name="Description"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, Description: false });
                }}
                class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.Description
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
                rows="5"
              ></textarea>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={onClose} className="mr-1">
            <span className="text-gray-800">Cancel</span>
          </Button>
          <button
            className="bg-purple-300 rounded-2xl py-1 px-3 text-center text-white font-bold"
            onClick={ConformModal}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddExperienceModal;

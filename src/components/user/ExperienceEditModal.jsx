import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";


const ExperienceEditModal = ({ isOpen, onClose, id }) =>{

console.log(id);
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

    return(
        <Dialog open={isOpen} handler={onClose}>
        <DialogHeader className="text-2xl">Add Work Experience </DialogHeader>
        <DialogBody>
          <div className="grid grid-rows-4 gap-4">
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
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
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
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
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
                placeholder="Ex: Full Stack"
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
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.state
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                />
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
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
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
                  className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
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
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
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
            onClick={onClose}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    )
}

export {ExperienceEditModal}
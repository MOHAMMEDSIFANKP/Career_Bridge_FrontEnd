import React, { useState, useEffect } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Education() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Add your Education | Career Bridge";
  }, []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <NavbarDefault />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <p className="text-sm">4/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            Clients like to know what you know - add
            <br /> your education here.
          </p>
          <p className="mt-3">
            You don’t have to have a degree. Adding any relevant education helps
            make your profile more visible.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-32 ">
          <div className="sm:col-span-12 md:col-span-6 shadow-xl bg-purple-50 lg:col-span-4 border md:h-56 sm:h-40 sm:w-full w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer">
            <div className="rounded-full h-10 w-10 sm:bg-purple-400">
              <p
                onClick={handleOpen}
                variant="gradient"
                className="text-4xl ps-2 sm:text-white text-purple-400"
              >
                +
              </p>
              <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                Add education
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl relative">
            <div className="absolute inset-0 flex items-center justify-center"></div>
            <div className="p-6">sdfsadfsad</div>
          </div>
          <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl"></div>
          <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl"></div>
          <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl"></div>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Education History</DialogHeader>
        <DialogBody>
          <div className="mx-3 grid grid-rows-3 gap-3">
            <div>
              <p className="text-black pb-1">School *</p>
              <input
                type="text"
                placeholder="Ex: calicut "
                class="border w-full py-2 px-3 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
              />
            </div>
            <div>
              <p className="text-black pb-1">Degree</p>
              <input
                type="text"
                placeholder="Ex: Computer science"
                class="border w-full py-2 px-3 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-black pb-1">Dates Attended</p>
                <input
                  type="number"
                  placeholder="Only allowed year"
                  class="border w-full py-2 px-3 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                />
              </div>
              <div>
                <p className="mt-7"></p>
                <input
                  type="number"
                  placeholder="Ex: To (or expected graduation year)"
                  class="border w-full py-2 px-3 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                />
              </div>
            </div>
            <div>
            <p className="text-black pb-1">Description</p>
              <textarea
                className="border w-full px-3 py-2 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                rows="4"
              ></textarea>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-1">
            <span className="text-gray-800">Cancel</span>
          </Button>
          <button
            className="bg-purple-300 rounded-2xl py-1 px-3 text-center text-white font-bold"
            onClick={handleOpen}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
      <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
        <div className="bg-white md:h-20 h-16 w-full shadow-xl border ">
          <div className="flex justify-between">
            <div className="w-24 ms-4 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => navigate("/user/experience")}
                className="  text-purple-500 bg-purple-50 px-6 py-2 rounded-full"
              >
                Prev
              </button>
            </div>
            <div className="w-24 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => navigate("/user/languages")}
                className="bg-purple-300 sm:bg-purple-400 px-6 py-2 rounded-full "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Education;

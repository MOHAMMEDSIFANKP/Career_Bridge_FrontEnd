import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function InviteModal({open,handleOpen,Selectedpost}) {

   
    return (
      <>
        <Dialog open={open} handler={handleOpen}>
            <ToastContainer/>
          <DialogHeader>Invite User</DialogHeader>
          <DialogBody >
            <div>
                <div className='font-bold text-gray-800 text-xl'>
                    <p>Select Post</p>
                    <div className="me-10 w-5/5 grid grid-rows-[3rem,1fr] h-[18rem] border rounded-2xl border-purple-400 overflow-hidden">
                    <div className="ms-2 me-10 sticky  flex items-center bg-white top-0">
                    <input
                      type="text"
                      //   value={Search}
                      placeholder="Search ..."
                      className="border py-2 px-3  mx-8 w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
                      //   onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button
                      className=" border py-2 px-3 rounded-lg bg-purple-400 font-bold text-white"
                      //   onClick={handleClear}
                    >
                      Clear
                    </button>
                  </div>
                <div className="overflow-x-scroll mt-2 px-2 flex scrollbar-thin scrollbar-thumb-purple-400">
                  <div className="flex justify-center items-center"></div>
                  {/* {Selectedpost.experience.map((experience, index) => (
                    <div
                      key={index}
                      className="w-52 border  border-gray-400 rounded-2xl ms-3 mb-3"
                    >
                      <div className="text-center mt-4 w-52 ">
                        <p className="font-bold capitalize mt-">
                          {experience.subtitle}
                        </p>
                        <p className="text-md capitalize my-1">
                          {experience.company}
                        </p>
                        <p>
                          {experience.startdate} - {experience.enddate}
                        </p>
                        <p className="text-sm">
                          {experience.state} , {experience.country}
                        </p>
                      </div>
                      <div className="overflow-auto h-16 scrollbar-thin M scrollbar-thumb-purple-400 mx-2">
                        <p className="font-bold text-sm">Description</p>
                        <p>{experience.Description}</p>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
                </div>
                <div>dfds</div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
  )
}

export default InviteModal
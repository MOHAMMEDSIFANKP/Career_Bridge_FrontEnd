import React, { useState, useEffect } from "react";
import biginer from "../../../assets/biginer.png";
import someexpert from "../../../assets/someexpert.png";
import expert from "../../../assets/expert.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setPosition } from "../../../Redux/UserSlice";

function Position() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pos, setPos] = useState("");
  const [selectedDiv, setSelectedDiv] = useState(-1);
  useEffect(() => {
    document.title = "Add your Position | Career Bridge";
  }, []);
  const SelectionSubmit = () => {
    if (selectedDiv === -1) {
      toast.warn("choose an option");
    } else {
      if (selectedDiv === 0) {
        dispatch(setPosition({ position: pos }));
      } else if (selectedDiv === 1) {
        dispatch(setPosition({ position: pos }));
      } else {
        dispatch(setPosition({ position: pos }));
      }
      navigate("/user/role");
    }
  };
  return (
    <>
      <NavbarDefault />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <ToastContainer />
        <p className="text-sm">1/7</p>
        <div className="sm:mt-8 mt-5">
          <h4 className="font-bold text-2xl md:text-4xl font-serif">
            A few quick questions: first, have you <br /> freelanced before?
          </h4>
          <p className="text-sm lg:pt-4 pt-3 md:text-base">
            This lets us know how much help to give you along the way. We won’t
            share your answer with anyone <br /> else, including potential
            clients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 -mx-3 mb-20">
          <div
            className={`rounded-xl border shadow-xl relative mt-3 mx-2 ${
              selectedDiv === 0 ? "bg-purple-100 border-gray-400" : ""
            }`}
            onClick={() => {
              setSelectedDiv(0);
              setPos('fresher');
            }}
          >
            <div className="flex-auto mb-5">
              <img src={biginer} className="h-40 m-5 sm:h-40" alt="" />
              <p className="text-2xl font-serif font-bold ms-8 mb-2">
                I am new to this
              </p>
            </div>
          </div>
          <div
            className={`rounded-xl border shadow-xl relative mt-3 mx-2 ${
              selectedDiv === 1 ? "bg-purple-100 border-gray-400" : ""
            }`}
            onClick={() => {
              setSelectedDiv(1);
              setPos('experience')
            }}
          >
            <div className="flex-auto mb-5">
              <img src={someexpert} className="h-40 m-5 sm:h-40" alt="" />
              <p className="text-2xl font-serif font-bold ms-8 mb-2">
                Some experience
              </p>
            </div>
          </div>

          <div
            className={`rounded-xl border shadow-xl relative mt-3 mx-2 ${
              selectedDiv === 2 ? "bg-purple-100 border-gray-400" : ""
            }`}
            onClick={() =>{
              setSelectedDiv(2);
              setPos('expert')
            }}
          >
            <div className="flex-auto mb-5">
              <img src={expert} className="h-40 m-5 sm:h-40" alt="" />
              <p className="text-2xl font-serif font-bold ms-8 mb-2 ">
                I am an expert
              </p>
            </div>
          </div>
        </div>
        <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
          <div className="bg-white md:h-20 h-16 w-full shadow-xl border flex justify-end">
            <div className="flex">
              {/* <div className="w-24 me-4 flex">
                <button
                  onClick={() => navigate("/user/profile")}
                  className="  text-purple-500"
                >
                  Skip for now
                </button>
              </div> */}
              <div className="w-24 ms:pt-5 mt-3 sm:mt-5">
                <button
                  onClick={SelectionSubmit}
                  className="bg-purple-400 px-6 py-2 rounded-full "
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Position;

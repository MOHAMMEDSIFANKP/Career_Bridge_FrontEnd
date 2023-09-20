import React, { useState } from "react";
// Redex
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
// Images
import EditIcon from "../../../../assets/Edit.png";
import DeleteImg from "../../../../assets/DeleteImg.png";

// Modal
import { AddEducationsModal } from "./AddEducationsModal";
import { EditEducationsModal } from "./EditEducationsModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteEducationModal } from "./DeleteEducationModal";

function EducationsComponents() {
    const [id, setId] = useState({id:'',index:''})
  // Add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

//   Edit modal
const [EditModal, setEditModal] = useState(false);
const handleEditModal = () => {
    if (EditModal) {
      setId({ id: '', index: '' });
    } 
    setEditModal(!EditModal);
  };

//  Delete Modal
const [DltModal, setDltModal] = useState(false);
const handleDltModal = () => {
    if (DltModal) {
      setId({ id: '', index: '' });
    } 
    setDltModal(!DltModal);
  };
  const { Education } = useSelector((state) => state.user);

  return (
    <>
    <ToastContainer />
      <div className="me-10 w-5/5 grid grid-rows-[3rem,1fr] h-64 mt-5 border rounded-2xl border-purple-400 overflow-hidden">
        <div className="flex items-center bg-white ">
          <p className="ms-5 font-bold">Education</p>
        </div>
        <div className="overflow-x-scroll flex scrollbar-thin M scrollbar-thumb-purple-400">
          <div className="flex justify-center items-center">
            <div
              className="sm:col-span-12 md:col-span-6 px-24 md:px-28 shadow-xl bg-purple-50 lg:col-span-4 border md:h-48 mx-3 sm:h-40 sm:w-full h-11 w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer"
              onClick={handleOpen}
            >
              <div className="-ms-20 rounded-full h-10 w-10 sm:bg-purple-400">
                <p
                  variant="gradient"
                  className="text-4xl ps-2 sm:text-white text-purple-400"
                >
                  +
                </p>
                <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                  Add Education
                </p>
              </div>
            </div>
          </div>
          {Education.map((educations, index) => (
            <div
              key={index}
              className="w-52 border  border-gray-400 rounded-2xl ms-3"
            >
              <div className="h-8  mt-2  me-2 flex justify-end sticky top-2 bg-white">
                <div className="cursor-pointer w-8 flex justify-center items-center rounded-full border-purple-400 border "
                onClick={()=>{handleEditModal(),setId({id:educations.id,index:index})}}>
                  <img src={EditIcon} className="w-5" alt="" />
                </div>
                <div className="cursor-pointer w-8 flex ms-3 justify-center items-center rounded-full border-purple-400 border "
                onClick={()=>{handleDltModal(),setId({id:educations.id,index:index})}}>
                  <img src={DeleteImg} className="w-5" alt="" />
                </div>
              </div>
              <div className="text-center mt-7 w-52 ">
                <p className="font-bold capitalize mt-">{educations.School}</p>
                <p className="text-md capitalize my-1">{educations.Degree}</p>
                <p>
                  {educations.DatesAttended} - {educations.Datesended}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddEducationsModal isOpen={open} onClose={handleOpen} />
      <EditEducationsModal isOpen={EditModal} onClose={handleEditModal} id={id}/>
      <DeleteEducationModal isOpen={DltModal} onClose={handleDltModal} id={id}/>
    </>
  );
}

export default EducationsComponents;

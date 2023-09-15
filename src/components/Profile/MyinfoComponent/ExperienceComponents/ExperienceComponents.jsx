import React, { useState } from "react";

// Redex
import { useSelector } from "react-redux/es/hooks/useSelector";
// Images
import EditIcon from "../../../../assets/Edit.png";
import DeleteImg from "../../../../assets/DeleteImg.png";
// Modal
import { EditExperienceModal } from "./EditExperienceModal";
import { DeleteExperienceModal } from "./DeleteExperienceModal";
import AddExperienceModal from "./AddExperienceModal";
function ExperienceComponents() {
  const [EditId, setEditId] = useState({ id: "", index: "" });

  // Add Modal
  const [Addopen, setAddOpen] = useState(false);
  const AddhandleOpen = () => setAddOpen(!Addopen);
  // Modal Edit
  const [Editopen, setEditOpen] = useState(false);
  const EdithandleOpen = () => {
    if (Editopen) {
      setEditId({ id: '', index: '' });
    }
    setEditOpen(!Editopen);
  };
  // Modal Delete
  const [Deleteopen, setDeleteOpen] = useState(false);
  const DeleterhandleOpen = () => setDeleteOpen(!Deleteopen);

  const { experiences } = useSelector((state) => state.user);
  return (
    <>
      <div className="me-10 w-5/5 grid grid-rows-[3rem,1fr] h- mt-5 border rounded-2xl border-purple-400 overflow-hidden">
        <div className="flex items-center bg-white ">
          <p className="ms-5 font-bold">Experience</p>
        </div>
        <div className="overflow-x-scroll flex scrollbar-thin scrollbar-thumb-purple-400">
          <div className="flex justify-center mb-3 items-center">
            <div className="sm:col-span-12 md:col-span-6  px-24 md:px-28 shadow-xl bg-purple-50 lg:col-span-4 border md:h-48 mx-3 sm:h-40 sm:w-full h-11 w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer">
              <div
                className="-ms-20 rounded-full h-10 w-10 sm:bg-purple-400"
                onClick={AddhandleOpen}
              >
                <p
                  variant="gradient"
                  className="text-4xl ps-2 sm:text-white text-purple-400"
                >
                  +
                </p>
                <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                  Add Experience
                </p>
              </div>
            </div>
          </div>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="w-52 border  border-gray-400 rounded-2xl ms-3 mb-3"
            >
              <div className="h-8  mt-2  me-2 flex justify-end sticky top-2 bg-white">
                <div
                  className="w-8 flex justify-center items-center rounded-full border-purple-400 border "
                  onClick={() => {
                    EdithandleOpen();
                    setEditId({ ...EditId, id: experience.id, index: index });
                  }}
                >
                  <img src={EditIcon} className="w-5" alt="" />
                </div>
                <div
                  className="w-8 flex ms-3 justify-center items-center rounded-full border-purple-400 border "
                  onClick={() => {
                    DeleterhandleOpen();
                    setEditId({ ...EditId, id: experience.id, index: index });
                  }}
                >
                  <img src={DeleteImg} className="w-5" alt="" />
                </div>
              </div>
              <div className="text-center mt-4 w-52 ">
                <p className="font-bold capitalize mt-">
                  {experience.subtitle}
                </p>
                <p className="text-md capitalize my-1">{experience.company}</p>
                <p>
                  {experience.startdate} - {experience.enddate}
                </p>
                <p className="text-sm">
                  {experience.state} , {experience.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddExperienceModal isOpen={Addopen} onClose={AddhandleOpen} />
      <DeleteExperienceModal
        isOpen={Deleteopen}
        id={EditId}
        onClose={DeleterhandleOpen}
      />
      <EditExperienceModal
        isOpen={Editopen}
        id={EditId}
        onClose={EdithandleOpen}
      />
    </>
  );
}

export default ExperienceComponents;

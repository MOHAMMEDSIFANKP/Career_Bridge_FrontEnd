import React, { useState, useEffect } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { useNavigate } from "react-router-dom";
import FileImage from "../../../assets/fileimage.png";
import EditImage from "../../../assets/Edit.png";
import DeleteImg from "../../../assets/DeleteImg.png";
import { AddEducation } from "../../../components/user/EducatinModals/AddEducation";
import { EditEducationModal } from "../../../components/user/EducatinModals/EditEducation";
import { DltEducationModal } from "../../../components/user/EducatinModals/DltEducationModal";
import countriesList from "countries-list";
import { ToastContainer, toast } from "react-toastify";

// Redux
import { useSelector } from "react-redux/es/hooks/useSelector";

function Education() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add your Education | Career Bridge";
  }, []);

  const { Education } = useSelector((state) => state.user);
  const {positions} = useSelector((state) => state.user)

  // Add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // Edit modal
  const [Editopen, setEditOpen] = useState(false);
  const [id,setId] = useState('')

  const EdithandleOpen = (index) =>{
    setId(index)
    setEditOpen(!Editopen)
  };

  // Delete modal
  const [Dltopen, setDltopen] = useState(false)

  const DlthandleOpen = (index) =>{
    setDltopen(!Dltopen)
    setId(index)
  }

  const NextButton = () =>{
    if (!Education[0]==''){
      navigate("/user/languages")
    }else{
      toast.warn('Add Your education')
    }
  }

  return (
    <>
      <NavbarDefault />
      <ToastContainer />
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
          <div onClick={handleOpen} className="sm:col-span-12 md:col-span-6 shadow-xl bg-purple-50 lg:col-span-4 border md:h-56 sm:h-40 sm:w-full w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer">
            <div className="rounded-full h-10 w-10 sm:bg-purple-400">
              <p
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
          {Education.map((education, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl flex"
            >
              <div className="w-2/6 ms-6 mt-6 ">
                <img src={FileImage} alt="" className="w-20 opacity-75" />
              </div>
              <div className="w-full">
                <div className="flex justify-end h-10">
                  <div onClick={()=>EdithandleOpen(index)} className="rounded-full border border-purple-400 me-2 p-2 mt-2">
                    <img src={EditImage} alt="" className="w-4" />
                  </div>
                  <div onClick={()=>DlthandleOpen(index)} className="flex justify-center items-center rounded-full border border-purple-400 w-8 h-8 mt-2 me-3">
                    <img src={DeleteImg} className="w-5" alt="" />  
                  </div>
                </div>
                <div className="text-center mt-3">
                  <h3 className="font-bold text-lg">{education.School}</h3>
                  <p className="text-lg">{education.Degree}</p>
                  <div className="overflow-auto scrollbar-thin  rounded-xl scrollbar-thumb-purple-400 h-24 me-2">
                  <p className="text-sm font-bold ">Descrption : </p>
                  <p className="text-gray-700">{education.Description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddEducation isOpen={open} onClose={handleOpen} />
      <EditEducationModal isOpen={Editopen} onClose={EdithandleOpen} id={id}/>
      <DltEducationModal isOpen={Dltopen} onClose={DlthandleOpen} id={id} />
      <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
        <div className="bg-white md:h-20 h-16 w-full shadow-xl border ">
          <div className="flex justify-between">
            <div className="w-24 ms-4 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => {
                  if (positions === 'fresher'){
                    navigate('/user/role')
                  }else{
                    navigate("/user/experience")
                  }
                }}
                className="  text-purple-500 bg-purple-50 px-6 py-2 rounded-full"
              >
                Prev
              </button>
            </div>
            <div className="w-24 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={NextButton}
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

import { useState, useEffect } from "react";
import { AccountEdit } from "./Modal/AccountEdit";

// Images
import EditIcon from "../../assets/Edit.png";
import Defaultprofile from "../../assets/ProfileImg.jpeg";
import FileImage from "../../assets/fileimage.png";
import DeleteImg from "../../assets/DeleteImg.png";

// Redex
import { useDispatch } from "react-redux";
import { setExperiences } from "../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

function MyinfoComponent() {
  const { UserInfo } = useSelector((state) => state.user);
  const { experiences } = useSelector((state) => state.user);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  
  useEffect(() => {}, [UserInfo]);
  return (
    <>
      <div className="w-full flex">
        <div className="lg:visible invisible">
          <p className="lg:text-3xl text-xl font-bold ms-24"> My info</p>
          <p className=" mb-3 ps-14">This is a client account</p>
        </div>
      </div>
      <div className="me-10 h-60 rounded-2xl border border-purple-400">
        <div className="flex justify-between">
          <div className="flex items-end ms-5 text-xl font-bold">
            <p>Account</p>
          </div>
          <div>
            <div  onClick={handleOpen} className="w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center">
              <img src={EditIcon} className="w-5" alt="" />
            </div>
            <AccountEdit  isOpen={open} onClose={handleOpen} />
          </div>
        </div>
        <div className="mx-5 md:flex items-center">
          <div className="w-1/5">
            <div className="mt-4">
              <img
                className="w-48 md:w-24 border border-purple-400 rounded-full"
                src={UserInfo == "" ? UserInfo.profile_image : Defaultprofile}
                alt="Profile image"
              />
            </div>
          </div>
          <div>
            <p className="text-sm">Client</p>
            <p className="font-bold text-xl">
              {UserInfo.first_name} {UserInfo.last_name}
            </p>
            <p className="text-sm">Email</p>
            <p className="text-xl">{UserInfo.email} </p>
          </div>
        </div>
      </div>
      <div className="me-10 h-64 overflow-x-auto mt-5 border rounded-2xl border-purple-400">
        <div className="">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="col-span-12 flex  md:col-span-6 shadow-lg mt-4 mx-2 lg:col-span-4 border md:h-56 h-56 rounded-2xl relative"
             >
              <div className="w-0 md:w-3/6 flex items-center justify-center sm:visible invisible">
                <img src={FileImage} alt="" className="w-32 h-32 opacity-75" />
              </div>
              <div className="w-full">
                <div className="h-10 flex justify-end ">
                  <button>
                    <div
                      onClick={() => toggleModal(index)}
                      className="rounded-full border border-purple-400 m-2 p-2"
                    >
                      <img src={EditIcon} alt="" className="w-4" />
                    </div>
                  </button>
                  <div onClick={()=>DeleteModal(index)} className="flex justify-center items-center rounded-full border border-purple-400 w-8 h-8 mt-2 me-3">
                    <img src={DeleteImg} className="w-5" alt="" />
                   
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl">{experience.title}</h3>
                  <p className="text-lg">{experience.subtitle}</p>
                  <p className="text-gray-600">
                    {experience.state}{" "}
                    <span>
                      <br />
                    </span>
                    {experience.country}{" "}
                  </p>
                  <p className="text-gray-600">{experience.Description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>4</div>
      <div>5</div>
    </>
  );
}

export default MyinfoComponent;

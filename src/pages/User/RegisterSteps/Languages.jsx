import React, { useState, useEffect } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { AddLanguageModal } from "../../../components/user/LanguageModal/AddLanguageModal";
import DeleteImg from "../../../assets/DeleteImg.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Redux
import { useDispatch } from "react-redux";
import { DeleteLanguage } from "../../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Languages() {
  useEffect(() => {
    document.title = "Add your Languages | Career Bridge";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Destructure
  const { Language } = useSelector((state) => state.user);

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const DltLanguage = (index) => {
    dispatch(DeleteLanguage(index))
  };

  const NextButton = () =>{
    if(!Language[0]==''){
      navigate('/user/skills')
    }else{
      toast.warn('Add Your languages')
    }
  }
  return (
    <>
      <NavbarDefault />
      <ToastContainer />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <p className="text-sm">5/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            Looking good. Next, tell us which languages
            <br />
            you speak.
          </p>
          <p className="mt-3">
            Upwork is global, so clients are often interested to know what
            languages you speak. English is a <br />
            must, but do you speak any other languages?
          </p>
        </div>
        <div className="mt-10 grid grid-row">
          <div className="grid grid-cols-3 gap-3 font-bold">
            <div>
              <p>Language</p>
            </div>
            <div>
              <p>Proficiency</p>
            </div>
          </div>
          <hr className="mt-2 border " />
          {Language.map((lang, index) => (
            <div key={index} className="grid grid-cols-3 mt-2 text-gray-800 ">
              <div>{lang.language}</div>
              <div>{lang.proficiency}</div>
              <div
                onClick={()=>DltLanguage(index)}
                className="rounded-full border w-8 h-8 flex justify-center items-center border-purple-400"
              >
                <img src={DeleteImg} className="w-5" alt="" />
              </div>
            </div>
          ))}
          <div onClick={handleOpen} className="mt-10">
            <div className="cursor-pointer flex gap-3 border-purple-400 w-48 h-10 justify-center items-center rounded-full font-bold text-purple-400 border-2">
              <div>+</div>
              <div>Add languages</div>
            </div>
          </div>
        </div>
      </div>
      <AddLanguageModal isOpen={open} onClose={handleOpen} />
      <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
        <div className="bg-white md:h-20 h-16 w-full shadow-xl border ">
          <div className="flex justify-between">
            <div className="w-24 ms-4 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => navigate("/user/education")}
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

export default Languages;

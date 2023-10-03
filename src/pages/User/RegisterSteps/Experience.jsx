import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { Country, State, City } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { useNavigate } from "react-router-dom";
import FileImage from "../../../assets/fileimage.png";
import EditImage from "../../../assets/Edit.png";
import DeleteImg from "../../../assets/DeleteImg.png";
import { ExperienceEditModal } from "../../../components/user/ExperienceModals/ExperienceEditModal";
import { DeleteExpModal } from "../../../components/user/ExperienceModals/DeleteExpModal";
import Select from "react-select";

// Redux
import { useDispatch } from "react-redux";
import { setExperiences } from "../../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Experience() {
  const dispatch = useDispatch();

  // Redux destructure in experiences
  const { experiences } = useSelector((state) => state.user);

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

  const navigate = useNavigate();

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // Edit Modal
  const [modalStates, setModalStates] = useState(false);
  const [id, setId] = useState(null);

  // Delete Modal

  const [Dltopen, setDltOpen] = useState(false);

  const toggleModal = (index) => {
    setId(index);
    setModalStates(!modalStates);
  };

  const DeleteModal = (index) => {
    setId(index);
    setDltOpen(!Dltopen);
  };
  //  ----------------county and state filtring-------------------------/

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    save: country.name,
    label: country.name,
  }));
  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setForm({ ...Form, country: selectedOption.label });
    seterror({ ...error, country: false });
    setSelectedState(null);

  };
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setForm({ ...Form, state: selectedOption.label });
    seterror({ ...error, state: false });

  };
  //  ----------------county and state filtring-------------------------/

  useEffect(() => {
    document.title = "Add your Experience | Career Bridge";
  }, []);

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
    }else if (Form.country.trim() === "") {
      seterror({ ...error, country: true });
      return false;
    }  else if (Form.state.trim() === "") {
      seterror({ ...error, state: true });
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

  const ConformModal = () => {
    if (Validation()) {
      dispatch(setExperiences(Form));
      handleOpen();
    }
  };

  const NextButton = () => {
    if (!experiences[0] == "") {
      navigate("/user/education");
    } else {
      toast.warn("Add Your experience");
    }
  };
  return (
    <>
      <NavbarDefault />
      <ToastContainer />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <p className="text-sm">3/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            If you have relevant work experience, add it <br /> here.
          </p>
          <p className="mt-3">
            Freelancers who add their experience are twice as likely to win
            work. But if you’re just starting out,
            <br /> you can still create a great profile. Just head on to the
            next page.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-28 ">
          <div
            onClick={handleOpen}
            className="sm:col-span-12 md:col-span-6 shadow-xl bg-purple-50 lg:col-span-4 border md:h-56 sm:h-40 sm:w-full w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer"
          >
            <div className="rounded-full h-10 w-10 sm:bg-purple-400">
              <p
                variant="gradient"
                className="text-4xl ps-2 sm:text-white text-purple-400"
              >
                +
              </p>
              <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                Add experience
              </p>
            </div>
          </div>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="col-span-12 flex  md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-56 rounded-2xl relative"
            >
              <div className="w-2/6 ms-6 mt-6 ">
                <img src={FileImage} alt="" className="w-20 opacity-75" />
              </div>
              <div className="w-full">
                <div className="h-10 flex justify-end">
                  <button>
                    <div
                      onClick={() => toggleModal(index)}
                      className="rounded-full border border-purple-400 m-2 p-2"
                    >
                      <img src={EditImage} alt="" className="w-4" />
                    </div>
                  </button>
                  <div
                    onClick={() => DeleteModal(index)}
                    className="flex justify-center items-center rounded-full border border-purple-400 w-8 h-8 mt-2 me-3"
                  >
                    <img src={DeleteImg} className="w-5" alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl">{experience.title}</h3>
                  <p className="text-lg">{experience.subtitle}</p>
                  <p className="text-gray-600">
                  {experience.country},{" "}{experience.state}{" "}
                   
                  </p>
                 <div className="overflow-auto scrollbar-thin  rounded-xl scrollbar-thumb-purple-400 h-24 me-2">
                  <p className="text-sm font-bold ">Descrption : </p>
                 <p className="text-gray-600">{experience.Description}</p>
                 </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add Modal */}
      <Dialog open={open} handler={handleOpen}>
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
                <label
                  htmlFor="countrySelect"
                  className="block text-black pb-1"
                >
                  Country
                </label>
                <Select
                value={selectedCountry}
                  options={countryOptions}
                  onChange={handleCountryChange}
                  className={`border w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                    error.country
                      ? "focus:ring-red-200 border-2 border-red-400"
                      : "border-gray-400"
                  }`}
                ></Select>
              </div>
              <div>
                <p className="text-black pb-1">State</p>
                <Select options={stateOptions}
                onChange={handleStateChange}
                className={`border w-full  rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.state
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}></Select>
                {/* <input
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
                /> */}
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
          <Button variant="text" onClick={handleOpen} className="mr-1">
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
      <ExperienceEditModal id={id} isOpen={modalStates} onClose={toggleModal} />
      <DeleteExpModal id={id} isOpen={Dltopen} onClose={DeleteModal} />

      <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
        <div className="bg-white md:h-20 h-16 w-full shadow-xl border ">
          <div className="flex justify-between">
            <div className="w-24 ms-4 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => navigate("/user/role")}
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

export default Experience;

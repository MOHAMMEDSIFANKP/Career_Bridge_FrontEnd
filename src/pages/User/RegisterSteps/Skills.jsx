import React, { useState, useEffect } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { AdminSkillsList } from "../../../services/adminApi";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@material-tailwind/react";
import Select from "react-select";

// Redux
import { useDispatch } from "react-redux";
import { SetSkills } from "../../../Redux/UserSlice";
import { DeleteSkills } from "../../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Skills() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [skill, setSkill] = useState([]);
  const [showskill, setShowskills] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [Form, setForm] = useState([]);
  const [show, setShow] = useState(false);

    // Redux destructure in experiences
    const { Skills } = useSelector((state) => state.user);

  // Feching data in backend and stored
  async function getSkillslist() {
    try {
      const response = await AdminSkillsList();
      setSkill(response.data);
    } catch (error) {
      toast.error("Error fetching Skills fields:", error);
    }
  }

  useEffect(() => {
    document.title = "Add your Skills | Career Bridge";
    getSkillslist();
  }, []);

  useEffect(()=>{
    const extractedSkills = Skills.map(item => item.skills);
    setForm(extractedSkills);
  }, [skill])
  useEffect(() => {
    const skillToshow = skill.slice(0, 6);
    setShowskills(skillToshow);
  }, [skill]);

  // Filtering
  const filterFields = skill.filter(
    (item) =>
      item.skills.toLowerCase().includes(keyword.toLowerCase()) &&
      !Form.includes(item.skills)
  );

  const ShowFUnc = () => {
    setShow(!show);
  };

  // Skill removed
  const DeleteFunc = (skill,index) => {
    setForm((prevForm) => prevForm.filter((prevSkill) => prevSkill !== skill));
    setShowskills((prevSkills) => [...prevSkills, { skills: skill }]);
    dispatch(DeleteSkills(index))
  };

  const option = filterFields.map((skill, index) => ({
    value: skill.skills,
    id: skill.id,
    label:skill.skills
  }))
 console.log(option);
  // From array checking Limit end or not
  const checkSkills = (skill,id) => {
    if (Form.length >= 10) {
      toast.warn("Limit reached");
    } else if (!Form.includes(skill)) {
      setForm([...Form, skill]);
      dispatch(SetSkills({skills:skill,id:id}));
    } else {
      toast.warn("Skill already added");
    }
  };
  
  // Next Button
  const NextButton = () => {
    if (!Form[0] == "") {
      navigate("/user/profilecreation");
    } else {
      toast.warn("At least one skill must be selected");
    }
  };

  return (
    <>
      <NavbarDefault />
      <ToastContainer />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <p className="text-sm">6/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            Nearly there! What work are you here to do?
          </p>
          <p className="mt-3">
            Your skills show clients what you can offer, and help us choose
            which jobs to recommend to you. Add
            <br />
            or remove the ones we’ve suggested, or start typing to pick more.
            It’s up to you.
          </p>
        </div>
        <div className="z-10 mt-10">
          <p className="font-semibold">Your skills</p>
          <div className="mt-3 w-full lg:w-5/6 xl:w-7/12">
            <div className="border-2 rounded-xl border-gray-300 flex flex-wrap items-center py-1">
              {Form.map((skill, index) => (
                <div className="cursor-default flex my-1 items-center rounded-full text-white ms-2 bg-purple-300">
                  <div>
                    {" "}
                    <p key={index} className="ps-3">
                      {skill}
                    </p>
                  </div>
                  <div
                    className="ps-2 pe-3 font-bold text-xl cursor-pointer"
                    onClick={() => DeleteFunc(skill,index)}
                  >
                    x{" "}
                  </div>
                </div>
              ))}
                <Select options={option} onChange={(handleChange)=>{
                  checkSkills(handleChange.label,handleChange.id);
                }} className="ms-3 "></Select>
            </div>

            <div className="font-bold text-gray-800 text-xs text-right mt-4">
              Max 10 Skills
            </div>
          </div>
          <div>
            <div>
              <p className="font-semibold">Suggested skills</p>
            </div>
            <div className="flex flex-wrap mt-3 w-full lg:w-5/6 xl:w-7/12">
              {showskill.map((skill, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    checkSkills(skill.skills,skill.id);
                    setShowskills((prevSkills) =>
                      prevSkills.filter(
                        (prevSkill) => prevSkill.skills !== skill.skills
                      )
                    );
                  }}
                  className="cursor-pointer flex rounded-full border-2 text-purple-400 border-purple-400 px-3 mb-2 mr-2"
                >
                  <div className="text-2xl me-1">
                    <p>+</p>
                  </div>
                  <div className="flex items-center">
                    <p>{skill.skills}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
        <div className="bg-white md:h-20 h-16 w-full shadow-xl border ">
          <div className="flex justify-between">
            <div className="w-24 ms-4 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => navigate("/user/languages")}
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

export default Skills;

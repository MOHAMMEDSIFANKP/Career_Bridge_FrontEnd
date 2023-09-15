import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Select from "react-select";
// Servies
import { AdminSkillsList } from "../../../../services/adminApi";
import {
  UpdateUserInfoDetails,
  Remove_skill,
} from "../../../../services/userApi";

// Redux
import { SetSkills, DeleteSkills, ClearSkills } from "../../../../Redux/UserSlice";
import { useDispatch } from "react-redux";

function SkillComponents() {
  const dispatch = useDispatch();
  const { UserInfo } = useSelector((state) => state.user);
  const { Skills } = useSelector((state) => state.user);
  const [skill, setSkill] = useState([]);

  // Feching data in backend and stored
  async function getSkillslist() {
    try {
      const response = await AdminSkillsList();
      setSkill(response.data);
    } catch (error) {
      toast.error("Error fetching Skills fields:", error);
    }
  }

  const options = skill.map((s) => ({
    value: s.skills,
    id: s.id,
    label: s.skills,
  }));
  // Add skills
  const handleSelectChange = async (selectedOption) => {
    const array = [];
    array.push({ skills: selectedOption.value });
    const res = await UpdateUserInfoDetails(
      { skills: array },
      UserInfo.userinfoid
    );
    dispatch(ClearSkills());
    res.data.skills.map((values, index) => {
      dispatch(SetSkills(values));
    });
  };

  // Delete skills
  const DltSkills = async (skills, index) => {
    const data = {UserInfoId: UserInfo.userinfoid, SkillsId: skills}
    const res = await Remove_skill(data)
    dispatch(DeleteSkills(index))

  };
  useEffect(() => {
    document.title = "Add your Skills | Career Bridge";
    getSkillslist();
  }, []);

  return (
    <div className="mt-5 grid grid-rows-[2rem,1fr] me-10 border rounded-2xl border-purple-400">
      <div className="font-bold ms-4 mt-2">Add Skills</div>
      {!UserInfo.bio === "Add bio" ? (
        <div className="rounded-xl mx-3 my-3 border border-gray-300 flex justify-center items-center bg-purple-50 ">
          <div className="my-6 rounded-full text-white px-2 bg-purple-500 border border-purple-500">
            <p className="text-3xl">+</p>
          </div>
        </div>
      ) : (
        <div className="mx-3 my-2 mb-3 bg-purple-50 rounded-xl py-2">
          <div className="flex flex-wrap ">
            {Skills.map((skills, index) => (
              <p className="border rounded-full px-3 py-1 mx-2 my-1 bg-purple-400 text-white">
                {skills.skills}
                <span
                  className="ms-1 font-bold text-sm cursor-pointer"
                  onClick={() => DltSkills(skills.id, index)}
                >
                  X
                </span>
              </p>
            ))}
            <Select onChange={handleSelectChange} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillComponents;

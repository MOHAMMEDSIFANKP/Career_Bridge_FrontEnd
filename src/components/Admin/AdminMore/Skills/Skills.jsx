import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import SkillsList from "./SkillsList/SkillsList";
import BlockedSkillsList from "./BlockedSkillsList/BlockedSkillsList";
import { AddSkillsModal } from "./AddSkillsModal/AddSkillsModal";

function Skills() {
  const [selected, setSelected] = useState("All Skills List");
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
 useEffect(()=>{
  document.title='Skills | Career Bridge'
 },[])
  return (
    <>
      <div className="mx-5 mt-5 border shadow rounded-xl grid grid-rows-[8rem,39rem]">
        <div className="flex justify-between mx-4 mt-3 ">
          <div>
            <p className="font-bold text-2xl">
              {" "}
              {selected === "All Skills List" ? (
                <>All Skills List</>
              ) : (
                <>Deleted Skills List</>
              )}
            </p>
            <p>See information about all posts</p>
            <button className="bg-purple-400 px-3 mt-2 rounded-full py-[3px] font-bold text-2xl text-white"
            onClick={handleOpen}>
              +
            </button>
          </div>
          <div className="mt-10">
            {" "}
            <Select label="Select Option ">
              <Option onClick={() => setSelected("All Skills List")}>
              All Skills List
              </Option>
              <Option onClick={() => setSelected("Blocked Skills List")}>
                Blocked Skills List
              </Option>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto border-t">
          <div>
            {selected === "All Skills List" ? (
              <SkillsList/>
            ) : (
            <BlockedSkillsList/>
            )}
          </div>
        </div>
      </div>
      <AddSkillsModal open={open} handleOpen={handleOpen}/>
    </>
  );
}

export default Skills;

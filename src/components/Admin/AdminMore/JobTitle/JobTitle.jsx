import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import AllJobTitle from "./AllJobTitle";

function JobTitle() {
  const [selected, setSelected] = useState("Job TItle List");
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
 useEffect(()=>{
  document.title='Add Job Title Feature'
 },[])
  return (
    <>
      <div className="mx-5 mt-5 border shadow rounded-xl grid grid-rows-[8rem,39rem]">
        <div className="flex justify-between mx-4 mt-3 ">
          <div>
            <p className="font-bold text-2xl">
              {" "}
              {selected === "Job TItle List" ? (
                <>All Job Title List</>
              ) : (
                <>Deleted Job Title List</>
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
              <Option onClick={() => setSelected("Job TItle List")}>
                All Job TItle
              </Option>
              <Option onClick={() => setSelected("Delete Job TItle")}>
                Delete Job TItle List
              </Option>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto border-t">
          <div>
            {selected === "Job TItle List" ? (
             <AllJobTitle/>
            ) : (
            <>delteted</>
            )}
          </div>
        </div>
      </div>
     
    </>
  );
}

export default JobTitle;

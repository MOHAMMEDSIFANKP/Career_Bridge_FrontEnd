import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import AllCategoryList from "./AllCategoryList/AllCategoryList";
import BlockedCategoryList from "./BlockedCategoryList/BlockedCategoryList";
import { AddJobCategoryModal } from "./AddJobCategory/AddJobCategoryModal";

function JobCategory() {
  const [selected, setSelected] = useState("Category List");
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
 useEffect(()=>{
  document.title='Add Job Category Feature'
 },[])
  return (
    <>
      <div className="mx-5 mt-5 border shadow rounded-xl grid grid-rows-[8rem,39rem]">
        <div className="flex justify-between mx-4 mt-3 ">
          <div>
            <p className="font-bold text-2xl">
              {" "}
              {selected === "Category List" ? (
                <>All Category List</>
              ) : (
                <>Deleted Category List</>
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
              <Option onClick={() => setSelected("Category List")}>
                All Category
              </Option>
              <Option onClick={() => setSelected("Delete Category")}>
                Delete Category List
              </Option>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto border-t">
          <div>
            {selected === "Category List" ? (
              <AllCategoryList/>
            ) : (
             <BlockedCategoryList/>
            )}
          </div>
        </div>
      </div>
      <AddJobCategoryModal open={open} handleOpen={handleOpen}/>
    </>
  );
}

export default JobCategory;

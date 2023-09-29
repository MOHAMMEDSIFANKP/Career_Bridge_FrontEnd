import React, { useState } from "react";
import AdminCompanyManagemen from "../Admin_CompanyManagement/AdminCompanyLIst/AdminCompanyList";
import AdminPostManagement from "../Admin_CompanyManagement/AdminPostManagement/AdminPostManagement";
import JobCategory from "./JobCategory/JobCategory";
import JobTitle from "./JobTitle/JobTitle";

function AdminMore() {
  const [selected, setselected] = useState("Job Category");
  return (
    <>
      <div className="grid grid-rows-[4rem,1fr] mx-5 mt-5">
        <div className="flex justify-center">
          <div className="bg-purple-50 h-10 w-3/5 rounded-xl grid grid-cols-3 shadow-md">
            <div
              className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                selected === "Job Category"
                  ? "bg-purple-200 text-white rounded-xl"
                  : "hover:text-purple-400"
              }`}
              onClick={() => setselected("Job Category")}
            >
              Job Category
            </div>
            <div
              className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                selected === "Job Titles"
                  ? "bg-purple-200 text-white rounded-xl"
                  : "hover:text-purple-400"
              }`}
              onClick={() => setselected("Job Titles")}
            >
              Job Titles
            </div>
            <div
              className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                selected === "Skills"
                  ? "bg-purple-200 text-white rounded-xl"
                  : "hover:text-purple-400"
              }`}
              onClick={() => setselected("Skills")}
            >
              Skills
            </div>
          </div>
        </div>
        <div>
         <div>
            {selected === 'Job Category'?(
                <JobCategory/>
            ): selected === 'Job Titles'?(
                <JobTitle/>
            ):(
                <>skills</>
            )}
         </div>
        </div>
      </div>
    </>
  );
}

export default AdminMore;

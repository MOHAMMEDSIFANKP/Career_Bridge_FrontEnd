import React, { useState } from "react";
import AdminCompanyManagemen from "./AdminCompanyLIst/AdminCompanyList";

function Admin_CompanyManagement() {
  const [selected, setselected] = useState("Company List");
  return (
    <>
      <div className="grid grid-rows-[4rem,1fr] mx-5 mt-5">
        <div className="flex justify-center">
          <div className="bg-purple-50 h-10 w-2/5 rounded-xl grid grid-cols-2 shadow-md">
            <div
              className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                selected === "Company List"
                  ? "bg-purple-200 text-white rounded-xl"
                  : "hover:text-purple-400"
              }`}
              onClick={() => setselected("Company List")}
            >
              Company List
            </div>
            <div
              className={`flex items-center cursor-pointer  justify-center text-gray-700 font-bold ${
                selected === "Post Management"
                  ? "bg-purple-200 text-white rounded-xl"
                  : "hover:text-purple-400"
              }`}
              onClick={() => setselected("Post Management")}
            >
              Post Management
            </div>
          </div>
        </div>
        <div>
          <div>
            { selected === "Company List" ? (
              <AdminCompanyManagemen/>
            ) : (
              <>Post Management</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_CompanyManagement;

import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import AdminAllCompanyList from "./AdminAllCompanyList/AdminAllCompanyList";
import AdminVerifiedList from "./AdminVerifiedList/AdminVerifiedList";
import AdminCompanyBlockedList from "./AdminCompanyBlockedList/AdminCompanyBlockedList";
function AdminCompanyManagemen() {
  const [selected, setSelected] = useState("All List");
 
  return (
    <>
      <div className="mx-5 mt-5 border shadow rounded-xl grid grid-rows-[7rem,43rem]">
        <div className="flex justify-between mx-4 mt-3">
          <div>
            <p className="font-bold text-2xl"> {selected === "All List" ? (
              <>All Company List</>
            ) : selected === "Unblock List" ? (
              <>Unblocked Company List</>
            ) : (
              <>Blocked Company List</>
            )}</p>
            <p>See information about all posts</p>
          </div>
          <div className="mt-7">
            {" "}
            <Select label="Select Option ">
              <Option onClick={() => setSelected("All List")}>All List</Option>
              <Option onClick={() => setSelected("Unblock List")}>
                Verified List
              </Option>
              <Option onClick={() => setSelected("Block LIst")}>
                Block LIst
              </Option>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto border-t ">
          <div className="">
            {selected === "All List" ? (
              <AdminAllCompanyList />
            ) : selected === "Unblock List" ? (
             <AdminVerifiedList  />
            ) : (
              <AdminCompanyBlockedList />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCompanyManagemen;

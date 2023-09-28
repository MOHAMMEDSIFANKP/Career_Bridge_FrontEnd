import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import AdminAllPostList from "./AdminAllPostList/AdminAllPostList";
import AdminPostBlockedList from "./AdminPostBlockedList/AdminPostBlockedList";
function AdminPostManagement() {
  const [selected, setSelected] = useState("All List");
  useEffect(()=>{
    document.title = 'Company Posts | Career Bridge'
  },[])
  return (
    <>
      <div className="mx-5 mt-5 border shadow rounded-xl grid grid-rows-[7rem,40rem]">
        <div className="flex justify-between mx-4 mt-3">
          <div>
            <p className="font-bold text-2xl"> {selected === "All List" ? (
              <>All Company Posts</>
            ) : selected === "Block LIst" ? (
              <>Blocked Company Post</>
            ) : (
              <>Reports List</>
            )}</p>
            <p>See information about all posts</p>
          </div>
          <div className="mt-7">
            {" "}
            <Select label="Select Option ">
              <Option onClick={() => setSelected("All List")}>All List</Option>
              <Option onClick={() => setSelected("Block LIst")}>
              Block LIst
              </Option>
              <Option onClick={() => setSelected("Reports")}>
                Reports
              </Option>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto border-t ">
          <div className="">
            {selected === "All List" ? (
             <AdminAllPostList />
            ) : selected === "Block LIst" ? (
            <AdminPostBlockedList/>
            ) : (
             <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPostManagement;

import React, { useState } from "react";
import Loader from "../../Loading/Loading";
import { Select, Option } from "@material-tailwind/react";
import AllUsersList from "./AllUsersList/AllUsersList";
import BlockedUsersList from "./BlockedUsersList/BlockedUsersList";
import AllCompanyUsersList from "./AllCompanyUsersList/AllCompanyUsersList";
import BlockCompanyUserList from "./BlockCompanyUserList/BlockCompanyUserList";
function Admin_UserManagement() {
  const [selected, setSelected] = useState("All List");

  return (
    <>
      <div className="mx-5 mt-5 border shadow rounded-xl grid grid-rows-[7rem,46rem]">
        <div className="flex justify-between mx-4 mt-3 ">
          <div>
            <p className="font-bold text-2xl">
              {" "}
              {selected === "All List" ? (
                <>All Users List</>
              ) : selected === "All Company List" ? (
                <>All Company Users List</>
              ) : selected === "Block User List" ? (
                <>Blocked Users List</>
              ) : (
                <>Blocked Company Users List</>
              )}
            </p>
            <p>See information about all posts</p>
          </div>
          <div className="mt-10">
            {" "}
            <Select label="Select Option ">
              <Option onClick={() => setSelected("All List")}>
                All User List
              </Option>
              <Option onClick={() => setSelected("All Company List")}>
                All Company User List
              </Option>
              <Option onClick={() => setSelected("Block User List")}>
                Block User List
              </Option>
              <Option onClick={() => setSelected("Block Company LIst")}>
                Block Company LIst
              </Option>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto border-t">
          <div className="">
            {selected === "All List" ? (
              <AllUsersList />
            ) : selected === "All Company List" ? (
              <AllCompanyUsersList />
            ) : selected === "Block User List" ? (
              <BlockedUsersList />
            ) : (
              <BlockCompanyUserList/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_UserManagement;

import React, { useState } from "react";
import { UsersList } from "../../../services/adminApi";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../../Loading/Loading";
import { Select, Option } from "@material-tailwind/react";
import AllUsersList from "./AllUsersList/AllUsersList";
import UnblockuserList from "./UnblockuserList/UnblockuserList";
import BlockedUsersList from "./BlockedUsersList/BlockedUsersList";
function Admin_UserManagement() {
  const [selected, setSelected] = useState("All List");
  const [UserList, setList] = useState([]);
  async function GetUsersList() {
    try {
      const res = await UsersList();
      setList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const ResetUserList = (data) => {
    setList(data);
  };
  // ---------------------------------react quary-------------------------------------//
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["usersjoblist"],
    queryFn: () => GetUsersList(),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <h1 className="text-center mt-20 font-bold text-2xl text-purple-400">
        Something went Wrong
      </h1>
    );
  }
  // ---------------------------------react quary-------------------------------------//

  return (
    <>
      <div className="mx-5 mt-5 border shadow rounded-xl grid grid-rows-[7rem,46rem]">
        <div className="flex justify-between mx-4 mt-3 ">
          <div>
            <p className="font-bold text-2xl"> {selected === "All List" ? (
              <>All Users List</>
            ) : selected === "Unblock List" ? (
              <>Unblocked Users List</>
            ) : (
              <>Blocked Users List</>
            )}</p>
            <p>See information about all posts</p>
          </div>
          <div className="mt-10">
            {" "}
            <Select label="Select Option ">
              <Option onClick={() => setSelected("All List")}>All List</Option>
              <Option onClick={() => setSelected("Unblock List")}>
                Unblock List
              </Option>
              <Option onClick={() => setSelected("Block LIst")}>
                Block LIst
              </Option>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto border-t">
          <div className="">
            {selected === "All List" ? (
              <AllUsersList UserList={UserList} ResetUserList={ResetUserList} />
            ) : selected === "Unblock List" ? (
             <UnblockuserList UserList={UserList} ResetUserList={ResetUserList}/>
            ) : (
              <BlockedUsersList UserList={UserList} ResetUserList={ResetUserList}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_UserManagement;

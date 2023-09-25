import React, { useState } from "react";
import { CompanyList } from "../../../../services/adminApi";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../../../Loading/Loading";
import { Select, Option } from "@material-tailwind/react";
import AdminAllCompanyList from "./AdminAllCompanyList/AdminAllCompanyList";
import AdminVerifiedList from "./AdminVerifiedList/AdminVerifiedList";
import AdminCompanyBlockedList from "./AdminCompanyBlockedList/AdminCompanyBlockedList";
function AdminCompanyManagemen() {
  const [selected, setSelected] = useState("All List");
  const [List, setList] = useState([]);
  async function GetCompanysList() {
    try {
      const res = await CompanyList();
      setList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const ResetCompanyList = (data) => {
    setList(data);
  };
  // ---------------------------------react quary-------------------------------------//
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["Companylist"],
    queryFn: () => GetCompanysList(),
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
              <AdminAllCompanyList List={List} ResetCompanyList={ResetCompanyList} />
            ) : selected === "Unblock List" ? (
             <AdminVerifiedList  List={List} ResetCompanyList={ResetCompanyList} />
            ) : (
              <AdminCompanyBlockedList  List={List} ResetCompanyList={ResetCompanyList}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCompanyManagemen;

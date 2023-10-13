import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loading/Loading";
import { useQuery } from "react-query";
import {
  GetListOfCompanyPost,
  InviteUserCreate,
} from "../../../../services/companyApi";
import { useSelector } from "react-redux";
function InviteModal({ open, handleOpen, Selectedpost, resetView }) {
  const { CompanyInfo } = useSelector((state) => state.company);
  const [datas, setDatas] = useState({
    comanyInfo: "",
    userInfo: "",
    Post: "",
  });
  const [Search, setSearch] = useState("");
  const [Posts, setPosts] = useState([]);
  const [Searcheddata, setSearcheddata] = useState([]);

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  // Search
  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    try {
      const res = await GetListOfCompanyPost(CompanyInfo.companyid, searchTerm);
      setPosts(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setDatas({
      comanyInfo: CompanyInfo.companyid,
      userInfo: Selectedpost?.id,
      Post: "",
    });
  }, [open]);
  const handleClear = () => {
    setSearch("");
    handleSearch("");
  };
  const InviteUser = async () => {
    if (datas.Post === "") {
      toast.error("Select a Post");
    } else {
      try {
        handleLoading()
        const res = await InviteUserCreate(datas);
        if (res.status) {
          toast.success("User invited successfully");
          setDatas({
            comanyInfo: "",
            userInfo: "",
            Post: "",
          });
        }
        handleLoading()
        resetView()
        handleOpen()
      } catch (error) {
        handleLoading()
        console.log(error);
      }
    }
  };
  // Get data backend
  async function GetCompanyPost() {
    try {
      const res = await GetListOfCompanyPost(CompanyInfo.companyid, Search);
      setPosts(res.data);
      setSearcheddata(res.data.results);
    } catch (error) {
      console.log(error);
      setPosts([]);
      setSearcheddata([]);
    }
  }

  //---------------------------- React quary---------------------------------------//

  const { data, isLoading, isError } = useQuery("joblist", GetCompanyPost);
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <h1 className="text-center font-bold text-2xl mt-5 text-gray-700">
        There was an error fetching data
      </h1>
    );
  }
  //---------------------------- React quary---------------------------------------//

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
      {loading && <Loader />}
        <ToastContainer />
        <DialogHeader>Invite User</DialogHeader>
        <DialogBody>
          <div>
            <div className=" text-gray-800 text-xl">
              <p className="mx-3 text-sm my-1">Choose a Post</p>
              <div className="ms-2 me-10  flex items-center bg-white top-0">
                <input
                  type="text"
                  value={Search}
                  placeholder="Search ..."
                  className="border py-1 px-3  mx-1 w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                  className=" border px-2 py-1 rounded-lg bg-purple-400 font-bold text-sm text-white"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
              <p className="text-sm font-bold ms-4">
                {Posts.count} result found
              </p>
              <div className="overflow-x-scroll mt-4 cursor-pointer px-2 flex text-sm scrollbar-thin scrollbar-thumb-purple-400">
                {Searcheddata.length > 0 ? (
                  Searcheddata?.map((Post, index) => (
                    <div
                      key={index}
                      className={`w-3/5 border border-gray-400 hover:bg-gray-100 hover:shadow rounded-2xl ms-3 mb-3 ${
                        datas.Post ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setDatas({ ...datas, Post: Post.id })}
                    >
                      <div className="flex justify-center ">
                        <div className="mt-5">
                          <p className="font-bold text-black  pt-2 capitalize">
                            {Post.Jobtitle.title_name}
                          </p>
                          <p className="font-bold text-center text-gray-700">
                            {Post.companyinfo.company_name}
                          </p>
                        </div>
                      </div>{" "}
                      <div className="flex  justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-700"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        <p className="ms-2">{Post.work_time}</p>
                        <p className="mx-2 text-gray-700 ">|</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-700"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        <p className="ms-2">
                          {Post.companyinfo.country} / {Post.companyinfo.state}{" "}
                          / {Post.companyinfo.city}
                        </p>
                      </div>
                      <div className=" mt-1 flex justify-center flex-wrap">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 text-gray-700"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                        {Post.skills.map((skill, index) => (
                          <p className="mb-3 ms-2" key={index}>
                            {skill.skills}
                            {index === 6 && Post.skills.length > 7
                              ? "..."
                              : ","}
                          </p>
                        ))}
                      </div>
                      <div className=" text-center">
                        <p className="text-sm text-gray-600 font-bold">
                          Education qualification
                        </p>
                        <div className=" p-2 -mt-2">
                          {typeof Post.education === "string"
                            ? Post.education.split(" ").slice(0, 15).join(" ") +
                              (Post.education.split(" ").length > 15
                                ? "..."
                                : "")
                            : ""}
                        </div>
                        <p className="text-sm text-gray-600 font-bold">
                          Desription{" "}
                        </p>
                        <div className="text-center overflow-clip  p-2 mb-3 -mt-2">
                          {typeof Post.description === "string"
                            ? Post.description
                                .split(" ")
                                .slice(0, 15)
                                .join(" ") +
                              (Post.description.split(" ").length > 15
                                ? "..."
                                : "")
                            : ""}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="font-bold text-xl text-center w-full">
                    Result not fount
                  </p>
                )}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <button
            className="bg-purple-300 font-bold text-white px-2 py-1 rounded-xl"
            variant="gradient"
            color="green"
            onClick={InviteUser}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default InviteModal;

import React, { useEffect, useState } from "react";
import { AddPost } from "./AddPost/AddPost";
import { Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PostListingComponents from "./PostListingComponents/PostListingComponents";
import { useSelector } from "react-redux";
import ArchivePosts from "./PostListingComponents/ArchivePosts";
import BlockedPosts from "./PostListingComponents/BlockedPosts";
function PostList() {
  const { CompanyInfo } = useSelector((state) => state.company);
  const [TypesofPost, setTypesofPost] = useState("Posts");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.title = "Your Post | Career Bridge";
  }, []);
  const handleOpen = () => setOpen(!open);
  console.log("sifan daxo");
  return (
    <>
      <div className="flex justify-center">
        <div className="border h-[44rem] w-full mt-4 rounded-xl mx-5 shadow-lg grid grid-rows-[9rem,1fr]">
          <div className="flex justify-between border-b">
            <div>
              <p className="font-bold text-2xl ms-10 mt-4">
                {TypesofPost === "Posts" ? (
                  <>Post list</>
                ) : TypesofPost === "Archive Posts" ? (
                  <>Archive Posts</>
                ) : (
                  <>Blocked Posts</>
                )}
              </p>
              <p className="ms-10">See information about all posts</p>
              {CompanyInfo.is_verify ? (
                <button
                  onClick={handleOpen}
                  className={`ms-10 mt-2 ${
                    TypesofPost === "Posts" ? "visible" : "invisible"
                  }`}
                >
                  <p className="text-white font-bold text-3xl rounded-full bg-purple-300 w-9">
                    +
                  </p>
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="md:w-1/5 w-2/5 flex justify-center items-center me-5">
              <div className="border border-purple-400 rounded-xl">
                <Select label="Select Option">
                  <Option onClick={() => setTypesofPost("Posts")}>Posts</Option>
                  <Option onClick={() => setTypesofPost("Archive Posts")}>
                    Archive Posts
                  </Option>
                  <Option onClick={() => setTypesofPost("Blocked Posts")}>
                    Blocked Posts
                  </Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto">
            {CompanyInfo.is_verify ? (
              <>
                {TypesofPost === "Posts" ? (
                  <PostListingComponents />
                ) : TypesofPost === "Archive Posts" ? (
                  <ArchivePosts />
                ) : (
                  <BlockedPosts />
                )}
              </>
            ) : (
              <div className="bg-purple-50 mx-10 my-10 rounded-2xl border h-[30rem] flex justify-center items-center">
                <div>
                  <p className="font-bold text-gray-600 text-3xl capitalize">
                    Company not verified
                  </p>
                  <div className="flex justify-center items-center bg-purple-400 text-white font-bold mt-3 rounded-full mx-20 py-2">
                    <Link to="/company/profile" className="">
                      Goto Profile
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddPost open={open} handleOpen={handleOpen} />
    </>
  );
}

export default PostList;

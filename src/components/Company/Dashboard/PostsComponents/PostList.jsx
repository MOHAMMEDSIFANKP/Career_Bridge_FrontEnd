import React, { useEffect, useState } from "react";
import { AddPost } from "./AddPost/AddPost";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import PostListingComponents from "./PostListingComponents/PostListingComponents";
function PostList() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.title = "Your Post | Career Bridge";
  }, []);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className="flex justify-center">
        <div className="border h-[44rem] w-full mt-4 rounded-xl mx-5 shadow-lg grid grid-rows-[9rem,1fr]">
          <div className="flex justify-between border-b">
            <div>
              <p className="font-bold text-2xl ms-10 mt-4">Post list</p>
              <p className="ms-10">See information about all posts</p>
              <button onClick={handleOpen} className="ms-10 mt-2">
                <p className="text-white font-bold text-3xl rounded-full bg-purple-300 w-9">
                  +
                </p>
              </button>
            </div>
            <div>sorted by</div>
          </div>
          <div>
            <PostListingComponents />
          </div>
        </div>
      </div>
      <AddPost open={open} handleOpen={handleOpen} />
    </>
  );
}

export default PostList;

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ListBlockPost,
  PostBlockedUnblocked,
} from "../../../../../services/adminApi";
import Loader from "../../../../Loading/Loading";
const AdminUnblockModal = ({
  isOpen,
  view,
  onClose,
  resetView,
  updateSearcheddata,
  Selectedpost,
  BlockUnblock,
}) => {
  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const ConfirmButton = async () => {
    try {
      const data = {
        is_blocked: BlockUnblock,
      };
      handleLoading();
      const res = await PostBlockedUnblocked(data, Selectedpost.id);

      if (res.status === 200) {
        resetView();
        const search = "";
        const res2 = await ListBlockPost(search);
        updateSearcheddata(res2.data);
        toast.success("Post Deleted successfully");
      }
      handleLoading()
    } catch (error) {
        handleLoading()
      console.log(error);
    }
    onClose();
  };
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <Dialog open={isOpen} handler={onClose} size={"xs"}>
        <DialogHeader>Block Post</DialogHeader>
        <DialogBody>
          <p>
            Are you sure you want to block '{BlockUnblock}
            <span className="font-bold">
              {Selectedpost?.Jobtitle.title_name}
            </span>
            ' from{" "}
            <span className="font-bold">
              {Selectedpost?.companyinfo.company_name}
            </span>{" "}
            Post?
          </p>{" "}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={onClose}
            className="mr-1 text-gray-700"
          >
            <span>Cancel</span>
          </Button>
          <button
            variant="gradient"
            className="rounded-full bg-purple-400 text-white font-bold px-2 py-1"
            onClick={ConfirmButton}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export { AdminUnblockModal };

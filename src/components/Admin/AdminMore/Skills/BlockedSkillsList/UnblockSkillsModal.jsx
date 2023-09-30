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
import {BlockedSkillsLists, SkillsDetails } from "../../../../../services/adminApi";
import Loader from "../../../../Loading/Loading";
const UnblockSkillsModal = ({
  isOpen,
  onClose,
  updateSearcheddata,
  Selectedpost
}) => {
  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const ConfirmButton = async () => {
    try {
      const data = {
        is_deleted: false,
      };
      handleLoading();
      const res = await SkillsDetails(data, Selectedpost.id);

      if (res.status === 200) {
        const search = "";
        const res2 = await BlockedSkillsLists(search);
        updateSearcheddata(res2.data);
        toast.success(`${res.data.skills} Unblocked successfully`);
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
            Are you sure you want to block '
            <span className="font-bold">
              {Selectedpost?.skills}
            </span>{" "}
            ?
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
export { UnblockSkillsModal };

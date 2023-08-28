import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { DeteteExperience } from "../../../Redux/UserSlice";

const DeleteExpModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const { experiences } = useSelector((state) => state.user);
  const experienceToDlt = experiences.find((experience, index) => index === id);
  const ConfirmButton=()=>{
    dispatch(DeteteExperience(id))
    onClose()
  }
  return (
    <>
      <Dialog open={isOpen} handler={onClose} size={"xs"}>
        <DialogHeader>Remove Work Experience</DialogHeader>
        <DialogBody>
          <p>
            Are you sure you want to remove{" "}
            '<span className="font-bold">{experienceToDlt && experienceToDlt.company}</span>' from your
            profile?
          </p>{" "}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={onClose} className="mr-1 text-gray-700">
            <span>Cancel</span>
          </Button>
          <button variant="gradient" className="rounded-full bg-purple-400 text-white font-bold px-2 py-1" onClick={ConfirmButton}>
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export { DeleteExpModal };

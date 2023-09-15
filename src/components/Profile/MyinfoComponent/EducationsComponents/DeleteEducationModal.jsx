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
import { DeleteEducation } from "../../../../Redux/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Service
import { DeleteEducationDetails } from "../../../../services/userApi";

const DeleteEducationModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const { Education } = useSelector((state) => state.user);
  const educationToDlt = Education.find((education, index) => index === id.index);

 const ConfirmButton= async ()=>{
    try {
        const res = await DeleteEducationDetails(id.id)
        toast.success("Eduction Deleted successfully")
        dispatch(DeleteEducation(id.index))
    } catch (error) {
        toast.error("Something wrong") 
    }
    onClose()
  }
  return (
    <>
      <Dialog open={isOpen} handler={onClose} size={"xs"}>
        <DialogHeader>Remove Education</DialogHeader>
        <DialogBody>
          <p>
            Are you sure you want to remove{" "}
            '<span className="font-bold">{educationToDlt && educationToDlt.School}</span>' from your
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
export { DeleteEducationModal };

import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Loader from "../../../../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkillsCreate } from "../../../../../services/adminApi";

export function AddSkillsModal({ open, handleOpen }) {
  const [Form, setForm] = useState({ skills: "" });

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const SubmitButton = async () => {
    if (Form.skills.trim() === "") {
      toast.error("Skills filed connot be blank");
    } else {
      try {
        handleLoading();
        const res = await SkillsCreate(Form);
        if (res.status === 201) {
          toast.success(`${res.data.skills} added succesfully`);
        }
        handleOpen()
        handleLoading();
      } catch (error) {
        handleOpen()
        console.log(error);
        handleLoading();
        if (error && error.response.data) {
          toast.error(error.response.data[0]);
        } else {
          toast.error("Something wrong");
        }
      }
    }
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        {loading && <Loader />}
        <ToastContainer />
        <DialogHeader>Add Skills</DialogHeader>
        <DialogBody>
          <div className="mx-5 ">
            <p className="text-sm pb-2">Skills</p>
            <input
              type="text"
              placeholder="eg: python"
              onChange={(e) => setForm({ ...Form, skills: e.target.value })}
              className="border w-full px-2 py-2  rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <button onClick={handleOpen} className="me-3">
            <span>Cancel</span>
          </button>
          <button
            className="bg-purple-400 px-2 py-1 rounded-2xl font-bold text-white "
            onClick={SubmitButton}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

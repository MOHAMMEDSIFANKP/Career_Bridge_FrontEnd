import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Loader from "../../../../Loading/Loading";
import { JobFieldCreater } from "../../../../../services/adminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function AddJobCategoryModal({ open, handleOpen }) {
  const [Form, setForm] = useState({ field_name: "" });
  const addinputfield = useRef(null);
  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const ConformButton = async () => {
    if (Form.field_name.trim() === "") {
      toast.error("Field connt be blank");
    } else {
      try {
        handleLoading()
        const res = await JobFieldCreater(Form);
        if (res.status === 201) {
          toast.success(`${res.data.field_name} created successfully`);
          handleOpen();
        }
        handleLoading()
      } catch (error) {
        console.log(error);
        if (error && error.response) {
          toast.error(error.response.data[0]);
        } else {
          toast.error("Something wrong");
        }
        handleOpen();
        handleLoading()
      }
    }
  };
  useEffect(() => {
    if (open) {
      addinputfield.current.focus();
    }
  }, [open]);
  return (
    <>
     {loading && <Loader />}
      <ToastContainer />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Job Category</DialogHeader>
        <DialogBody>
          <div>
            <p className="mx-8">Add Job Category</p>
            <input
              type="text"
              ref={addinputfield}
              onChange={(e) => setForm({ ...Form, field_name: e.target.value })}
              className="border py-2 px-3 mx-8 md:w-10/12 w-8/12 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <button onClick={handleOpen} className="mx-5">
            <span>Cancel</span>
          </button>
          <button
            className="bg-purple-400 px-2 py-1 rounded-xl font-bold text-white"
            onClick={ConformButton}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

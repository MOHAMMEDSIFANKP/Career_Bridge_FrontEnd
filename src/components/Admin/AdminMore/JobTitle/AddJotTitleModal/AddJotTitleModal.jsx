import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Select from "react-select";
import Loader from "../../../../Loading/Loading";
import { useQuery } from "react-query";
import {
  JobFieldListAndCreaterPagination,
  JobTitleCreate,
} from "../../../../../services/adminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function AddJotTitleModal({ open, handleOpen }) {
  const [Form, setForm] = useState({ title_name: "", field: null });
  const [JobCategory, setJobCategory] = useState([]);

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  // Options
  const options = JobCategory.map((job) => {
    const value = job.field_name;
    const id = job.id;
    const label = job.field_name;
    return { value, id, label };
  });

  const getJobList = async () => {
    try {
      const Search = "";
      const res = await JobFieldListAndCreaterPagination(Search);
      setJobCategory(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const SubmitButton = async () => {
    if (Form.field === null) {
      toast.error("Job Title field connot be empty");
    } else if (Form.title_name.trim() === "") {
      toast.error("Job Title field connot be empty");
    } else {
      try {
        handleLoading();
        const res = await JobTitleCreate(Form);
        if (res.status === 201) {
          toast.success(`${title_name} created successfully`);
          handleOpen();
        }
        setForm({ title_name: "", field: null });
        handleLoading();
      } catch (error) {
        handleLoading();
        console.log(error);
        if (error && error.response.data) {
          toast.error(`${error.response.data[0]}`);
        } else {
          toast.error("something wrong");
        }
        handleOpen();
        setForm({ title_name: "", field: null });
      }
    }
  };
  //---------------------------- React quary---------------------------------------//

  const { data, isLoading, isError } = useQuery("getJobList", getJobList);
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
  //
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        {loading && <Loader />}
        <ToastContainer />
        <DialogHeader>Add Job Title</DialogHeader>
        <DialogBody>
          <div className="mx-5 my-2">
            <p className="text-sm">Job Category</p>
            <Select
              options={options}
              onChange={(handleChange) =>
                setForm({ ...Form, field: handleChange.id })
              }
            />
          </div>
          <div className="mx-5 my-2">
            <p className="text-sm">Job Title</p>
            <input
              type="text"
              onChange={(e) => setForm({ ...Form, title_name: e.target.value })}
              className="border w-full px-2 py-2  rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <button onClick={handleOpen} className="me-6">
            <span>Cancel</span>
          </button>
          <button
            className="bg-purple-400 rounded-2xl px-2 py-1 font-bold text-white"
            onClick={SubmitButton}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

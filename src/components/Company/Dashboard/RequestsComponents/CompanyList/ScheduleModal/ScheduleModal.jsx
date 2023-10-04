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
import Loader from "../../../../../Loading/Loading";
import { ScheduleDate } from "../../../../../../services/companyApi";

function ScheduleModal({ open, handleOpen, user, refechData }) {
  const [date, setdate] = useState("");
  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const SubmitDate = async () => {
    if (date === "") {
      toast.error("Please select a date");
    } else {
      const data = {
        schedule: date,
      };
      try {
        handleLoading();
        const res = await ScheduleDate(data, user.id);
        if (res.status === 200) {
          toast.success('date scheduled at ');
          setdate("");
          refechData();
          handleOpen();
        }
        handleLoading();
      } catch (error) {
        if (error && error.response.data) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("Something wrong");
        }
        setdate("");
        handleLoading();
        console.log(error);
      }
    }
  };

  return (
    <>
      <Dialog open={open} size={"xs"} handler={handleOpen}>
        {loading && <Loader />}
        <ToastContainer />
        <DialogHeader>Schedule Time</DialogHeader>
        <DialogBody>
          <input
            type="date"
            name=""
            className="border p-3 py-2 mx-8 md:w-10/12 w-8/12 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 border-gray-400"
            id=""
            value={date?date:user.schedule?user.schedule:''}
            onChange={(e) => setdate(e.target.value)}
          />
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
          <Button variant="gradient" color="green" onClick={SubmitDate}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ScheduleModal;

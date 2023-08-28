import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

// Redux
import { useDispatch } from "react-redux";
import { EditEducation } from "../../../Redux/UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

const EditEducationModal = ({ isOpen, onClose, id }) => {

  const dispatch = useDispatch();
  const { Education } = useSelector((state) => state.user);

  const [Form, setForm] = useState({
    School: "",
    Degree: "",
    DatesAttended: "",
    Datesended: "",
    Description: "",
  });

  const [error, seterror] = useState({
    School: false,
    Degree: false,
    DatesAttended: false,
    Datesended: false,
    Description: false,
  });

  useEffect(() => {

    if (!isOpen){
      setForm({
        School: "",
        Degree: "",
        DatesAttended: "",
        Datesended: "",
        Description: "",
      });
    }
    const educationToEdit = Education.find(
      (education, index) => index === id
    );

    if (educationToEdit) {
      setForm({
        School: educationToEdit.School || "",
        Degree: educationToEdit.Degree || "",
        DatesAttended: educationToEdit.DatesAttended || "",
        Datesended: educationToEdit.Datesended || "",
        Description: educationToEdit.Description || "",
      });
    }
  }, [Education, id]);
  //   Validation
  const Validation = () => {
    if (Form.School.trim() === "") {
      seterror({ ...error, School: true });
      return false;
    } else if (Form.Degree.trim() === "") {
      seterror({ ...error, Degree: true });
      return false;
    } else if (Form.DatesAttended.trim() === "") {
      seterror({ ...error, DatesAttended: true });
      return false;
    } else if (Form.Datesended.trim() === "") {
      seterror({ ...error, Datesended: true });
      return false;
    } else if (Form.Description.trim() === "") {
      seterror({ ...error, Description: true });
      return false;
    }
    return true;
  };

  const ConfirmButton = () => {
    if (Validation()) {
        dispatch(EditEducation({index:id, updatedEducation:Form}))
        onClose()
    }
  };
  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Edit Education History</DialogHeader>
      <DialogBody>
        <div className="mx-3 grid grid-rows-3 gap-3">
          <div>
            <p className="text-black pb-1">School *</p>
            <input
              type="text"
              placeholder="Ex: calicut "
              name="School"
              defaultValue={Form.School}
              onChange={(e) => {
                setForm({ ...Form, [e.target.name]: e.target.value });
                seterror({ ...error, School: false });
              }}
              className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.School
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}
            />
          </div>
          <div>
            <p className="text-black pb-1">Degree</p>
            <input
              type="text"
              name="Degree"
              placeholder="Ex: Computer science"
              defaultValue={Form.Degree}
              onChange={(e) => {
                setForm({ ...Form, [e.target.name]: e.target.value });
                seterror({ ...error, Degree: false });
              }}
              className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.Degree
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-black pb-1">Dates Attended</p>
              <input
                type="date"
                name="DatesAttended"
                defaultValue={Form.DatesAttended}
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, DatesAttended: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.DatesAttended
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
            <div>
              <p className="mt-7"></p>
              <input
                type="date"
                name="Datesended"
                defaultValue={Form.Datesended}
                placeholder="Ex: To (or expected graduation year)"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, Datesended: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.Datesended
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
          </div>
          <div>
            <p className="text-black pb-1">Description</p>
            <textarea
              name="Description"
              defaultValue={Form.Description}
              onChange={(e) => {
                setForm({ ...Form, [e.target.name]: e.target.value });
                seterror({ ...error, Description: false });
              }}
              className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.Description
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}
              rows="4"
            ></textarea>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} className="mr-1">
          <span className="text-gray-800">Cancel</span>
        </Button>
        <button
          className="bg-purple-300 rounded-2xl py-1 px-3 text-center text-white font-bold"
          onClick={ConfirmButton}
        >
          <span>Confirm</span>
        </button>
      </DialogFooter>
    </Dialog>
  );
};
export { EditEducationModal };

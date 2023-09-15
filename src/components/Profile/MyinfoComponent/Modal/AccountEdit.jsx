import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import Select from "react-select";

// Serviece
import {
  AdminJobFieldList,
  AdminJobTitlelist,
} from "../../../../services/adminApi";
import { UpdateUseaccount } from "../../../../services/userApi";
import { UpdateUserInfoDetails } from "../../../../services/userApi";

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UpdateUserDetails } from "../../../../Redux/UserSlice";
import { setRole } from "../../../../Redux/UserSlice";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountEdit = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Redux Destructuring
  const { UserInfo } = useSelector((state) => state.user);
  const { JobFiledRedex, JobTitleRedex } = useSelector((state) => state.user);

  // user Info
  const [Form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [error, seterror] = useState({
    first_name: false,
    last_name: false,
    email: false,
  });

  // Useref
  const first_nameInput = useRef(null);
  const last_nameInput = useRef(null);
  const emailInput = useRef(null);

  //-------------------------Role searching---------------------------------//

  const [Jobfield, setJobfield] = useState([]);
  const [JobTitle, setJobTitle] = useState([]);
  const [SelectedJobfield, setSelectedJobfield] = useState({});
  const [SelectedJobTitle, setSelectedJobTitle] = useState({});
  const options = Jobfield.map((job) => ({
    value: job.field_name,
    id: job.id,
    label: job.field_name,
  }));
  const option2 = JobTitle.filter(
    (role) => role.field === SelectedJobfield.id
  ).map((job) => ({
    value: job.title_name,
    label: job.title_name,
  }));
  // Get data
  async function getJoblist() {
    try {
      const response = await AdminJobFieldList();
      setJobfield(response.data);
      const response2 = await AdminJobTitlelist();
      setJobTitle(response2.data);
    } catch (error) {
      toast.error("Error fetching job fields:", error);
    }
  }
  //-------------------------End Role searching---------------------------------//

  //   Validation
  const Validation = () => {
    if (Form.first_name.trim() === "") {
      seterror({ ...error, first_name: true });
      first_nameInput.current.focus();
      return false;
    } else if (Form.last_name.trim() === "") {
      seterror({ ...error, last_name: true });
      last_nameInput.current.focus();
      return false;
    } else if (Form.email.trim() === "") {
      seterror({ ...error, email: true });
      emailInput.current.focus();
      return false;
    }
    return true;
  };
// Change first_name and last_name
  const ConfirmButton = async () => {
    if (Validation()) {
      try {
        const res = await UpdateUseaccount(Form, UserInfo.id);
        if (res.status === 200) {
         
          dispatch(
            UpdateUserDetails({
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              bio: UserInfo.bio,
              streetaddress: UserInfo.streetaddress,
              city: UserInfo.city,
              state: UserInfo.state,
              zipcode: UserInfo.zipcode,
              cv: UserInfo.cv,
            })
          );
          toast.success("Updated Successfully");
        }
      } catch (error) {
        toast.error("something wrong");
      }
      try{ 
        const data = {
          jobField: {field_name:SelectedJobfield.value},
          jobTitle: {field:10,title_name:SelectedJobTitle.value},
        }
        const resp = await UpdateUserInfoDetails(data, UserInfo.userinfoid)
        if (resp.status === 200){
          dispatch(
            setRole({
              JobFiledRedex: resp.data.jobField.field_name,
              JobTitleRedex: resp.data.jobTitle.title_name,
            })
          );
        }
      }catch(error){
        console.log(error);
        toast.error("Something wrong")
      }
      onClose();
    }
  };

  useEffect(() => {
    setForm({
      first_name: UserInfo.first_name,
      last_name: UserInfo.last_name,
      email: UserInfo.email,
    });
    setSelectedJobfield({ value: JobFiledRedex, label: JobFiledRedex });
    setSelectedJobTitle({ value: JobTitleRedex, label: JobTitleRedex });
    getJoblist();
  }, []);
  return (
    <Dialog open={isOpen} handler={onClose}>
      <ToastContainer />
      <DialogHeader>Edit Account</DialogHeader>
      <DialogBody>
        <div className="mx-3 grid grid-rows-3 gap-3">
          <div className="grid grid-cols-2">
            <div className="mx-2">
              <p className="text-black pb-1">First name</p>
              <input
                ref={first_nameInput}
                type="text"
                placeholder="Ex: john "
                defaultValue={Form.first_name}
                name="first_name"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, first_name: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.first_name
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
            <div className="mx-2">
              <p className="text-black pb-1">Last name</p>
              <input
                ref={last_nameInput}
                type="text"
                placeholder="Ex: calicut "
                defaultValue={Form.last_name}
                name="last_name"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, last_name: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.last_name
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
            </div>
          </div>
          <div className="mx-2">
            <p className="text-black pb-1">Email</p>
            <input
              readOnly
              ref={emailInput}
              type="text"
              placeholder="Ex: calicut "
              defaultValue={Form.email}
              name="email"
              onChange={(e) => {
                setForm({ ...Form, [e.target.name]: e.target.value });
                seterror({ ...error, email: false });
              }}
              className={`border bg-gray-200 w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.email
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}
            />
          </div>
          <div className="grid grid-cols-2 mx-2 gap-5">
            <div>
              {" "}
              <Select
                value={SelectedJobfield ? SelectedJobfield : ""}
                onChange={(selectedOption) =>
                  setSelectedJobfield(selectedOption)
                }
                options={options}
              />
            </div>
            <div>
              <Select
                value={SelectedJobTitle ? SelectedJobTitle : ""}
                onChange={(selectedOption) =>
                  setSelectedJobTitle(selectedOption)
                }
                options={option2}
              />
            </div>
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
export { AccountEdit };

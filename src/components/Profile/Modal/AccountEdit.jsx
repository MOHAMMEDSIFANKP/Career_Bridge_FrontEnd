import { useEffect, useState, useRef} from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const AccountEdit = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {UserInfo} = useSelector((state) => state.user);

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

  const first_nameInput = useRef(null);
  const last_nameInput = useRef(null);
  const emailInput = useRef(null);

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

  const ConfirmButton = () => {
    if (Validation()) {
    //   dispatch(SetEducation(Form));
      onClose();
    }
  };

  useEffect(()=>{
    setForm({first_name:UserInfo.first_name, last_name:UserInfo.last_name, email:UserInfo.email})
  },[])
  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Edit Account</DialogHeader>
      <DialogBody>
        <div className="mx-3 grid grid-rows-2 gap-3">
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
              ref={emailInput}
                type="text"
                placeholder="Ex: calicut "
                defaultValue={Form.email}
                name="email"
                onChange={(e) => {
                  setForm({ ...Form, [e.target.name]: e.target.value });
                  seterror({ ...error, email: false });
                }}
                className={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                  error.email
                    ? "focus:ring-red-200 border-2 border-red-400"
                    : "border-gray-400"
                }`}
              />
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
{
  /* <div>
<p className="text-black pb-1">School *</p>
<input
  type="text"
  placeholder="Ex: calicut "
  name="School"
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
</div> */
}

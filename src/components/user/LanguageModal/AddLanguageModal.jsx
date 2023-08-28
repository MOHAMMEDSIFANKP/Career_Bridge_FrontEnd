import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import LanguageList from "countries-list";
import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { SetLanguage } from "../../../Redux/UserSlice";

const AddLanguageModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [Form, setForm] = useState({ language: "", proficiency: "" });
  const [error, seterror] = useState({ language: false, proficiency: false });

  const languages = Object.keys(LanguageList.languagesAll).map((LangCode) => ({
    name: LanguageList.languagesAll[LangCode].name,
    value: LangCode,
  }));

  const Validation = () => {
    if (Form.language.trim() === "") {
      seterror({ ...error, language: true });
      return false;
    } else if (Form.proficiency.trim() === "") {
      seterror({ ...error, proficiency: true });
      return false;
    }
    return true;
  };

  const ConfirmButton = () => {
    if (Validation()) {
      dispatch(SetLanguage(Form));
      onClose(); 
    }
  };
  

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader className="text-2xl">Add languages</DialogHeader>
      <DialogBody>
        <div class="grid grid-rows-2 gap-4 mx-2">
          <div>
            <label htmlFor="countrySelect" className="block text-black pb-1">
              Language
            </label>
            <select
              name="language"
              onChange={(e) => {
                setForm({ ...Form, [e.target.name]: e.target.value });
                seterror({ ...error, language: false });
              }}
              class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.language
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}
            >
               <option value=''>Choose an option</option>
              {languages.map((lang, index) => (
                <option key={index} value={lang.name}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div className="">
            <p className="text-black pb-1">Proficiency *</p>
            <select
              name="proficiency"
              onChange={(e) => {
                setForm({ ...Form, [e.target.name]: e.target.value });
                seterror({ ...error, proficiency: false });
              }}
              class={`border w-full py-2 px-3 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.proficiency
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}
            >  <option value=''>Choose an option</option>
              <option value="Basic">Basic </option>
              <option value="Conversational">Conversational</option>
              <option value="Fluent">Fluent</option>
              <option value="Native or Bilingual">Native or Bilingual</option>
            </select>
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
export { AddLanguageModal };

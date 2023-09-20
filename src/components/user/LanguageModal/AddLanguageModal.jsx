import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import LanguageList from "countries-list";
import { useState } from "react";
import Select from "react-select";

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

  const options = languages.map((lang, index) => ({
    value: lang.name,
    label: lang.name,
  }));
  const options2 = [
    { value: "Basic", label: "Basic" },
    { value: "Conversational", label: "Conversational" },
    { value: "Fluent", label: "Fluent" },
    { value: "Native or Bilingual", label: "Native or Bilingual" },
  ];

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
      setForm({ language: "", proficiency: "" })
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

            <Select
              options={options}
              onChange={(handleChange) => {
                setForm({ ...Form, language: handleChange.value });
                seterror({ ...error, language: false });
              }}
              className={`border w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.language
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}
            ></Select>
          </div>
          <div >
            <p className="text-black pb-1">Proficiency *</p>
            <Select
              options={options2}
              onChange={(handleChange) => {
                setForm({ ...Form, proficiency: handleChange.value });
                seterror({ ...error, proficiency: false });
              }}
              className={`border w-full rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100 ${
                error.proficiency
                  ? "focus:ring-red-200 border-2 border-red-400"
                  : "border-gray-400"
              }`}
            ></Select>
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

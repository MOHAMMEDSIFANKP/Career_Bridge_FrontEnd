import React, { useState, useEffect } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import {Dialog,DialogHeader,DialogBody,DialogFooter,Button} from "@material-tailwind/react";

function Languages() {
  useEffect(() => {
    document.title = "Add your Languages | Career Bridge";
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  //   <ul>
  //   {Object.keys(languages).map((code) => (
  //     <li key={code}>{languages[code].name}</li>
  //   ))}
  // </ul>
  return (
    <>
      <NavbarDefault />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <p className="text-sm">5/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            Looking good. Next, tell us which languages
            <br />
            you speak.
          </p>
          <p className="mt-3">
            Upwork is global, so clients are often interested to know what
            languages you speak. English is a <br />
            must, but do you speak any other languages?
          </p>
        </div>
        <div className="mt-10 grid grid-row">
          <div className="grid grid-cols-2 gap-3 font-bold">
            <div>
              <p>Language</p>
            </div>
            <div>
              <p>Proficiency</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>dsasa</div>
            <div>dassssas</div>
          </div>
          <div onClick={handleOpen} className="mt-10">
            <div className="flex gap-3 border-purple-400 w-48 h-10 justify-center items-center rounded-full font-bold text-purple-400 border-2">
              <div>+</div>
              <div>Add languages</div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-2xl">Add Work Experience</DialogHeader>
        <DialogBody>
          <div class="grid grid-rows-4 gap-4">
            <div className="mx-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-black pb-1">Title *</p>
                <input
                  type="text"
                  placeholder="Ex: Full Stack"
                  class="border w-full py-2 px-3 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                />
              </div>
              <div>
                <p className="text-black pb-1">Sub Title *</p>
                <input
                  type="text"
                  placeholder="Ex: Microsoft"
                  class="border w-full py-2 px-3 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                />
              </div>
            </div>
            <div className="mx-2">
              <p className="text-black pb-1">Company *</p>
              <input
                type="text"
                placeholder="Ex: Full Stack"
                class="border w-full py-2 px-3 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
              />
            </div>
            <div className="mx-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-black pb-1">State</p>
                <input
                  type="text"
                  placeholder="Ex: London"
                  class="border py-2 px-3 w-full border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                />
              </div>
            </div>
            <div className="mx-3 grid grid-cols-2 gap-5">
              <div>
                <p className="text-black pb-1">Start date</p>
                <input
                  type="date"
                  className="me-3 px-3 border w-full py-2 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                />
              </div>
              <div>
                <p className="text-black pb-1">End date</p>
                <input
                  type="date"
                  className=" me-3 px-3 border w-full py-2 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                />
              </div>
            </div>
            <div className="mx-2">
              <p className="text-black pb-1">Description</p>
              <textarea
                className="border w-full px-3 py-2 border-gray-400 rounded-lg text-black placeholder-gray-700 text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                rows="5"
              ></textarea>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-1">
            <span className="text-gray-800">Cancel</span>
          </Button>
          <button
            className="bg-purple-300 rounded-2xl py-1 px-3 text-center text-white font-bold"
            onClick={handleOpen}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Languages;
{
  /* <select
value={selectedLanguage}
onChange={handleLanguageChange}
className="border"
>
<option value="">Select a language</option>
{Object.keys(languages).map((languageCode) => (
  <option key={languageCode} value={languageCode}>
    {languages[languageCode].name}
  </option>
))}
</select> */
}

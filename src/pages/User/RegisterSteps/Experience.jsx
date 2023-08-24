import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import countriesList from "countries-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { useNavigate } from "react-router-dom";

function Experience() {
  useEffect(() => {
    document.title = "Add your Experience | Career Bridge";
  }, []);

  const countries = Object.keys(countriesList.countries).map((countryCode) => ({
    name: countriesList.countries[countryCode].name,
    value: countryCode,
  }));

  const navigate = useNavigate();
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <NavbarDefault />
      <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
        <p className="text-sm">3/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            If you have relevant work experience, add it <br /> here.
          </p>
          <p className="mt-3">
            Freelancers who add their experience are twice as likely to win
            work. But if you’re just starting out,
            <br /> you can still create a great profile. Just head on to the
            next page.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-28 ">
          <div className="sm:col-span-12 md:col-span-6 shadow-xl bg-purple-50 lg:col-span-4 border md:h-56 sm:h-40 sm:w-full w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer">
            <div className="rounded-full h-10 w-10 sm:bg-purple-400">
              <p
                onClick={handleOpen}
                variant="gradient"
                className="text-4xl ps-2 sm:text-white text-purple-400"
              >
                +
              </p>
              <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                Add experience
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl relative"></div>
          <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl"></div>
          <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl"></div>
          <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl"></div>
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
              <div>
                <label
                  htmlFor="countrySelect"
                  className="block text-black pb-1"
                >
                  Country
                </label>
                <select
                  id="countrySelect"
                  className="border w-full py-2 border-gray-400 bg-white rounded-lg text-sm focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-100"
                >
                  {Object.keys(countries).map((countryCode) => (
                    <option
                      key={countryCode}
                      value={countryCode}
                      className="m-10"
                      style={{ paddingLeft: "10px !importent" }}
                    >
                      {countries[countryCode].name}
                    </option>
                  ))}
                </select>
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
      <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
        <div className="bg-white md:h-20 h-16 w-full shadow-xl border ">
          <div className="flex justify-between">
            <div className="w-24 ms-4 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => navigate("/user/role")}
                className="  text-purple-500 bg-purple-50 px-6 py-2 rounded-full"
              >
                Prev
              </button>
            </div>
            <div className="w-24 ms:pt-5 mt-3 sm:mt-5">
              <button
                onClick={() => navigate("/user/education")}
                className="bg-purple-300 sm:bg-purple-400 px-6 py-2 rounded-full "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Experience;

import { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Card } from "@material-tailwind/react";
import {
  AdminJobFieldList,
  AdminJobTitlelist,
} from "../../../services/adminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redex
import { useDispatch } from "react-redux";
import { setRole } from "../../../Redux/UserSlice";
import { useSelector } from "react-redux";
function Role() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redex destructure
  const { JobFiledRedex, JobTitleRedex } = useSelector((state) => state.user);
  const {positions} = useSelector((state) => state.user)

  
  const [Jobfield, setJobfield] = useState([]);
  const [JobTitle, setJobTitle] = useState([]);
  const [showList, setShowList] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [selectedField, setSelectedField] = useState(
    JobFiledRedex !== "" ? JobFiledRedex : ""
  );
  const [selectedTitle, setSelectedTitle] = useState(
    JobTitleRedex !== "" ? JobTitleRedex : ""
  );
  const [selectedId, setSelectedId] = useState("");

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

  const filterFields = Jobfield.filter((item) =>
    item.field_name.toLowerCase().includes(selectedField.toLowerCase())
  );

  const filterJobTitle = JobTitle.filter(
    (item) =>
      item.field === selectedId &&
      item.title_name.toLowerCase().includes(selectedTitle.toLowerCase())
  );

  useEffect(() => {
    document.title = "Add your Role | Career Bridge";
    getJoblist();
  }, []);

  const NextButton = () => {
    if (selectedField === "" || selectedTitle === "") {
      toast.error("Field should not be empty");
    } else {
      dispatch(
        setRole({
          JobFiledRedex: selectedField,
          JobTitleRedex: selectedTitle,
        })
      );
      if (positions === 'fresher'){
        navigate('/user/education')
      }else{
      navigate("/user/experience");
      }
    }
  };
  return (
    <>
      <NavbarDefault />
      <ToastContainer />
      <div className="sm:container sm:px-8 mt-10 lg:mx-auto mx-8 lg:mt-32 sm:mt-14 ">
        <p className="text-sm">2/7</p>
        <div className="sm:mt-8 mt-5">
          <p className="font-bold text-2xl md:text-4xl font-serif">
            Got it. Now, add a title to tell the world <br /> what you do.
          </p>
          <p className="mt-3">
            It’s the very first thing clients see, so make it count. Stand out
            by describing your <br /> expertise in your own words.
          </p>
          <p className="mt-3">Your professional role</p>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-32">
          <div className="col-span-12 sm:col-span-6 ">
            <div className="">
              <Input
                type="text"
                placeholder="JobField"
                value={selectedField}
                onClick={() => setShowList(!showList)}
                onChange={(e) => setSelectedField(e.target.value)}
                className="h-14 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              {showList && (
                <Card className="w-full overflow-y-auto border-2 shadow-2xl">
                  <List>
                  {filterFields.map((item) => (
                    <ListItem
                      key={item.id}
                      className={`cursor-pointer hover:text-purple-400 ${
                        selectedField === item.field_name
                          ? "font-bold"
                          : "text-gray-800"
                      }`}
                      onClick={() => {
                        setSelectedField(item.field_name);
                        setSelectedId(item.id);
                        setShowList(false);
                      }}
                    >
                      {item.field_name}
                    </ListItem>
                  ))}
                  </List>
                </Card>
              )}
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 ">
            <div className="flex-grow">
              <Input
                type="email"
                value={selectedTitle}
                placeholder="JobTitle"
                className="h-14 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                onChange={(e) => setSelectedTitle(e.target.value)}
                onClick={() => setShowTitle(!showTitle)}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              {showTitle && (
                <Card className="w-full overflow-y-auto border-2 shadow-2xl">
                   <List>
                  {filterJobTitle.map((item) => (
                    <ListItem
                      key={item.id}
                      onClick={() => {
                        setSelectedTitle(item.title_name);
                        setShowTitle(!showTitle);
                      }}
                      className={` cursor-pointer hover:text-purple-400 ${
                        selectedTitle === item.title_name
                      }}
                      ? "font-bold"
                      : "text-black"
                  }`}
                    >
                      {item.title_name}
                    </ListItem>
                  ))}
                  </List>
                </Card>
              )}
            </div>
          </div>
          <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
            <div className="bg-white md:h-20 h-16 w-full shadow-xl border ">
              <div className="flex justify-between">
                <div className="w-24 ms-4 ms:pt-5 mt-3 sm:mt-5">
                  <button
                    onClick={() => navigate("/user/position")}
                    className="text-purple-500 bg-purple-50 px-6 py-2 rounded-full"
                  >
                    Prev
                  </button>
                </div>
                <div className="w-24 ms:pt-5 mt-3 sm:mt-5">
                  <button
                    onClick={NextButton}
                    className="bg-purple-300 sm:bg-purple-400 px-6 py-2 rounded-full"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Role;

import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { AdminJobTitlelist } from "../../../services/adminApi";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../../Loading/Loading";
import { Country, State, City } from "country-state-city";
function HomeSeachBox({setSeatchstate}) {
  const [searchKeys,setSearchKeys] = useState({jobtitle:'',location:''})
  const [Jobtitle, setJobtitle] = useState([]);
  // Search Jobtitle
  const items = Jobtitle.map((job) => ({
    name: job.title_name,
  }));
  const handleOnSelect = (item) => {
    setSearchKeys({...searchKeys,jobtitle:item.name})
  };
  const handleOnSelectLocation = (items2)=>{
    setSearchKeys({...searchKeys,location:items2.name})
  }
  //   Get userrelated Post in backend
  async function SearchingBackend() {
    const res = await AdminJobTitlelist();
    setJobtitle(res.data);
  }
  // -----------------------------city and county options-----------------------------//
  const countryOptions = Country.getAllCountries().map((country) => ({
    name: country.name,
  }));
  
  const stateOptions = State.getAllStates().map((state) => ({
    name: state.name,
  }));
  
  const items2 = [...countryOptions, ...stateOptions];
  

  // SelectItems
  const SelectItems =() =>{
    setSeatchstate(searchKeys)
  }
  // ----------------------------React quary-----------------------------------------//
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["jobtitlelist"],
    queryFn: () => SearchingBackend(),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <h1 className="text-center mt-20 font-bold text-2xl text-purple-400">
        Something went Wrong
      </h1>
    );
  }
  // ----------------------------React quary-----------------------------------------//

  return (
    <>
      <div className=" w-full grid grid-cols-[1fr,1fr,10rem] gap-2 mx-5">
        <div>
          <ReactSearchAutocomplete
            items={items}
            placeholder="Job Title"
            onSelect={handleOnSelect}
            autoFocus
          />
        </div>
        <div>
          <ReactSearchAutocomplete
            items={items2}
            placeholder="Location"
            onSelect={handleOnSelectLocation}
          />
        </div>
        <div className="flex justify-start items-center">
          <button className="bg-purple-300 hover:shadow px-3 py-2 rounded-full text-white font-bold "
          onClick={SelectItems}>
            Find Jobs
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeSeachBox;

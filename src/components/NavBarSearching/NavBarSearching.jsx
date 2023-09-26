import React, { useState } from "react";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import { Country, State }  from 'country-state-city';
import { useQuery, useQueryClient } from "react-query";
import { AdminJobFieldList, AdminJobTitlelist, AdminSkillsList } from "../../services/adminApi";
import Loader from "../Loading/Loading";

function NavBarSearching() {
  const [JobField,setJobfield] = useState([])
  const [JobTitle,setJobTitle] = useState([])
  const [Skills,setSkills] = useState([])
  const countryOptions = Country.getAllCountries().map((country) => ({
    name: country.name,
  }));
  
  const stateOptions = State.getAllStates().map((state) => ({
    name: state.name,
  }));
  const jobFieldNames = JobField.map((job) => ({
    type: 'Job Field',
    name: job.field_name,
  }));
  const JobTitleNames = JobTitle.map((job) => ({
    type: 'Job Field',
    name: job.title_name,
  }));
  const SkillsNames = Skills.map((Skill) => ({
    type: 'Skills',
    name: Skill.skills,
  }));
  const items = [
    ...jobFieldNames,
    ...JobTitleNames,
    ...SkillsNames,
    // ...Jobtitle.map((job) => ({ type: 'Job Title', name: job.title_name })),
    ...countryOptions.map((country) => ({ type: 'Country', name: country.name })),
    ...stateOptions.map((state) => ({ type: 'State', name: state.name })),
  ];

  const handleOnSelect = (item) => {
    console.log(item);
    
  };
  async function GetJobSkillList(){
    const res = await AdminJobFieldList()
    setJobfield(res.data)
    const res2 = await AdminJobTitlelist()
    setJobTitle(res2.data)
    const res3 = await AdminSkillsList()
    setSkills(res3.data)
  }
 // ---------------------------------react quary-------------------------------------//
 const queryClient = useQueryClient();
 const { isLoading, error, data } = useQuery({
   queryKey: ["GetJobSkillList"],
   queryFn: () => GetJobSkillList(),
 });

 if (isLoading) {
   return <></>;
 }
 if (error) {
   return (
     <></>
   );
 }
 // ---------------------------------react quary-------------------------------------//

  return (
    <div >
      <ReactSearchAutocomplete
        items={items}
        onSelect={handleOnSelect}
        placeholder="Seach..."
        fuseOptions={{ keys: ["name"] }}
      />
    </div>
  );
}

export default NavBarSearching;

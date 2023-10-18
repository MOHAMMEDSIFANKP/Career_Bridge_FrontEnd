import React, { useEffect, useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useQuery } from "react-query";
import { AllCompanyList } from "../../../services/adminApi";
import Loader from "../../../components/Loading/Loading";
function CompanyLIst() {
    const [Search, setSearch] = useState("");
    const [Searchlist, setSearchlist] = useState([]);
    const [alllist, setalllist] = useState([]);
    const GetCompanyList = async ()=>{
    try {
        const res = await AllCompanyList(Search)
        if (res.status === 200){
            setalllist(res.data)
            setSearchlist(res.data.results)
        }
    } catch (error) {
        
    }
    }
      //---------------------------- React quary---------------------------------------//
  const { data, isLoading, isError } = useQuery(
    "GetCompanyList",
    GetCompanyList
  );
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>There was an error fetching data</h1>;
  }
  //---------------------------- React quary---------------------------------------//

  return (
    <>
      <div className="grid grid-rows-[5rem,1fr]">
        <NavbarDefault />
        <div className="container mx-auto grid grid-rows-[6rem,1fr]">
          <div className=" mx-5 flex items-center justify-center">
            <p className="text-2xl font-bold">Company List</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {Searchlist?.map((serchlist,index)=>(
            <div className="mt-10 " key={index}>
            <Card className="mt-6 w-96">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  UI/UX Review Check
                </Typography>
                <Typography>
                  The place is close to Barceloneta Beach and bus stop just 2
                  min by walk and near to &quot;Naviglio&quot; where you can
                  enjoy the main night life in Barcelona.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button>Read More</Button>
              </CardFooter>
            </Card>
            
          </div>
         )) }
         
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyLIst;

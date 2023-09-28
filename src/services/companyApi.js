import { CompanyAxiosInstant } from "../utils/axiosUtils";

const CompanyGoogleSignup = (value) => {
  const values = {
    email: value.email,
    username: value.email,
    first_name: value.given_name,
    last_name: value.family_name,
    password: value.id,
  };
  return CompanyAxiosInstant.post("googleregistration/", values, {
    withCredentials: true,
  });
};

const CompanyInfoCreate = (values) => {
  return CompanyAxiosInstant.post("companyinfolistcreateapview/", values, {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};

const CompanyPostlistCreate = (values) =>{
  return CompanyAxiosInstant.post("companyPostlistCreateapiview/", values, {
    withCredentials:true,
  }).catch((error) => {
    throw error;
  });
}
const ApplyJobsCreation = (values) =>{
  return CompanyAxiosInstant.post("applyjobscreation/", values, {
    withCredentials:true,
  }).catch((error) => {
    throw error;
  });
}

//------------------------------------Get methods--------------------------------------/
const GetCompanyDetails = (id) => {
  return CompanyAxiosInstant.get(`companydetails/${id}/`, {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};
// GetPostList
const GetListOfCompanyPost = (id,search) =>{
  return CompanyAxiosInstant.get(`listofcompanypost/${id}/?page=1&search=${search}`,{
    withCredentials:true
  }).catch((error) => {
    throw error;
  });
}
// Get Company Archive PostList
const listofcompanypostarchived = (id,search) =>{
  return CompanyAxiosInstant.get(`listofcompanypostarchived/${id}/?page=1&search=${search}`,{
    withCredentials:true
  }).catch((error) => {
    throw error;
  });
}
// Get Company Blocked PostList
const ListofcompanypostBlocked = (id,search) =>{
  return CompanyAxiosInstant.get(`listofcompanypostblocked/${id}/?page=1&search=${search}`,{
    withCredentials:true
  }).catch((error) => {
    throw error;
  });
}

const CompanyPostDetails = (id) =>{
  return CompanyAxiosInstant.get(`companypostdetails/${id}`,{
    withCredentials:true
  }).catch((error) => {
    throw error;
  });
}
const CompanyApplyPostList = (id) =>{
  return CompanyAxiosInstant.get(`companyapplypostList/${id}/`,{
    withCredentials:true
  }).catch((error) => {
    throw error;
  });
}

//-----------------------------------Put or Patch methods-------------------------------/
const EditCompanyDetails = (value, id) => {
  return CompanyAxiosInstant.put(`companydetails/${id}/`, value, {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};

const EditCompanyPostDetails = (value, id) => {
  return CompanyAxiosInstant.put(`companypostupdate/${id}/`, value, {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};
const CompanyPostBolckUnblock = (value, id) => {
  return CompanyAxiosInstant.put(`companypostbolckUnblock/${id}/`, value, {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};

export {
  CompanyGoogleSignup,
  CompanyInfoCreate,
  CompanyPostlistCreate,
  ApplyJobsCreation,
  GetCompanyDetails,
  GetListOfCompanyPost,
  listofcompanypostarchived,
  ListofcompanypostBlocked,
  CompanyApplyPostList,
  CompanyPostDetails,
  EditCompanyDetails,
  EditCompanyPostDetails,
  CompanyPostBolckUnblock,
};

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

//------------------------------------Get methods--------------------------------------/
const GetCompanyDetails = (id) => {
  return CompanyAxiosInstant.get(`companydetails/${id}/`, {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};

//-----------------------------------Put or Patch methods-------------------------------/
const EditCompanyDetails = (value, id) => {
  return CompanyAxiosInstant.put(`companydetails/${id}/`, value, {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};
export {
  CompanyGoogleSignup,
  CompanyInfoCreate,
  GetCompanyDetails,
  EditCompanyDetails,
};

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
export { CompanyGoogleSignup, CompanyInfoCreate };

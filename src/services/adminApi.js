import { adminAxiosInstant } from "../utils/axiosUtils";

const AdminSignin = (values) => {
  return adminAxiosInstant.post("token/", values, { withCredentials: true });
};

const GetLanguages = () => {
  return adminAxiosInstant.get("LanguageListCreateAPIView", {
    withCredentials: true,
  });
};

const AdminJobFieldList = () =>{
    return adminAxiosInstant.get('JobFieldListAndCreater/', {withCredentials:true})
}

const AdminJobTitlelist = () => {
  return adminAxiosInstant.get("JobTitledListAndCreater/", { withCredentials: true});
};
export { AdminSignin, GetLanguages, AdminJobFieldList, AdminJobTitlelist };

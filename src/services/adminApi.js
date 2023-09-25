import { adminAxiosInstant } from "../utils/axiosUtils";
// ---------------------------------------Post Methoda-------------------------------//
const AdminSignin = (values) => {
  return adminAxiosInstant.post("token/", values, { withCredentials: true });
};
// ---------------------------------------Get Methoda-------------------------------//
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

const AdminSkillsList = () =>{
  return adminAxiosInstant.get('SkillsListCreateAPIView/' ,{withCredentials: true})
}
const UsersList = () => {
  return adminAxiosInstant.get('userslist/',  {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};
const CompanyList = () => {
  return adminAxiosInstant.get('companylist/',  {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};

// ---------------------------------------Put or Patch Methoda-------------------------------//
const UserBlockUnBlock = (values,id) => {
  return adminAxiosInstant.put(`userblockunblock/${id}/`, values ,{
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};
const VerifyAndBlock = (values,id) => {
  return adminAxiosInstant.put(`verifyandblock/${id}/`, values ,{
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};

export { AdminSignin, GetLanguages, AdminJobFieldList, AdminJobTitlelist ,AdminSkillsList,UsersList,CompanyList,UserBlockUnBlock,VerifyAndBlock};

import { adminAxiosInstant } from "../utils/axiosUtils";
// ---------------------------------------Post Methoda-------------------------------//
const AdminSignin = (values) => {
  return adminAxiosInstant
    .post("token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};
const JobFieldCreater = (values) => {
  return adminAxiosInstant
    .post("JobFieldListAndCreater/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};
const JobTitleCreate = (values) => {
  return adminAxiosInstant
    .post("JobTitledListAndCreater/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};
const SkillsCreate = (values) => {
  return adminAxiosInstant
    .post("SkillsListCreateAPIView/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};

// ---------------------------------------Get Methoda-------------------------------//
const GetLanguages = () => {
  return adminAxiosInstant.get("LanguageListCreateAPIView", {
    withCredentials: true,
  });
};

const AdminJobFieldList = () => {
  return adminAxiosInstant.get("JobFieldListAndCreater/", {
    withCredentials: true,
  })
  .catch((error) => {
    throw error;
  });
};

const AdminJobTitlelist = () => {
  return adminAxiosInstant.get("JobTitledListAndCreater/", {
    withCredentials: true,
  });
};

const AdminSkillsList = () => {
  return adminAxiosInstant.get("SkillsListCreateAPIView/", {
    withCredentials: true,
  });
};
// Get all UserList
const UsersList = (search) => {
  return adminAxiosInstant
    .get(`userslist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Get Company User List
const CompanyUsersList = (search) => {
  return adminAxiosInstant
    .get(`companyuserslist/?page=1&search=${search}`, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};
// Get Block User List
const BlockUsersList = (search) => {
  return adminAxiosInstant
    .get(`blockuserslist/?page=1&search=${search}`, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};
// Get Block Company User List
const BlockCompanyUserLists = (search) => {
  return adminAxiosInstant
    .get(`blockcompanyuserlist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Get All Company List
const AllCompanyList = (search) => {
  return adminAxiosInstant
    .get(`companylist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Get All Company Verified List
const CompanyVerifiedList = (search) => {
  return adminAxiosInstant
    .get(`CompanyVerifiedList/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Get All Company Blocked List
const CompanyBlockedList = (search) => {
  return adminAxiosInstant
    .get(`companyblockedlist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

// Admin Notificarion
const AdminNotification = () => {
  return adminAxiosInstant
    .get("adminnotification/", {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// All Company Post List
const AllCompanyPostlist = (search) => {
  return adminAxiosInstant
    .get(`allpostlist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Blocked Company Post List
const ListBlockPost = (search) => {
  return adminAxiosInstant
    .get(`listblockpost/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Jobfield List With pagination
const JobFieldListAndCreaterPagination = (search) => {
  return adminAxiosInstant
    .get(`jobfieldlistandcreaterpagination/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Jobfield deleted list with pagination
const JobFieldListDeleted = (search) => {
  return adminAxiosInstant
    .get(`jobfieldlistdeleted/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// JobTitle list with pagination
const JobTitledListAndpagiantions = (search) => {
  return adminAxiosInstant
    .get(`jobtitledlistandpagiantions/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// JobTitle Deleted list with pagination
const JobTitledBlockedList = (search) => {
  return adminAxiosInstant
    .get(`jobtitledblockedlist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// All skills list with pagination
const SkilLslist = (search) => {
  return adminAxiosInstant
    .get(`skillslist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Skills Deleted list with pagination
const BlockedSkillsLists = (search) => {
  return adminAxiosInstant
    .get(`blockedskillslist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Chart in dashboard
const GetChartData = () => {
  return adminAxiosInstant
    .get('get_chart_data/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};


// ---------------------------------------Put or Patch Methoda-------------------------------//
// User Block Unblock
const UserBlockUnBlock = (values, id) => {
  return adminAxiosInstant
    .put(`userblockunblock/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Company Verify and Block
const VerifyAndBlock = (values, id) => {
  return adminAxiosInstant
    .put(`verifyandblock/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Company Post Block unblock
const PostBlockedUnblocked = (values, id) => {
  return adminAxiosInstant
    .put(`postblockedunblocked/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const AdminNotificationRead = (values, id) => {
  return adminAxiosInstant
    .patch(`adminnotificationread/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const JobFieldDetails = (values, id) => {
  return adminAxiosInstant
    .patch(`JobFieldDetails/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const JobTitledDetails = (values, id) => {
  return adminAxiosInstant
    .patch(`JobTitledDetails/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const SkillsDetails = (values, id) => {
  return adminAxiosInstant
    .patch(`SkillsDetails/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

export {
  AdminSignin,
  JobFieldCreater,
  JobTitleCreate,
  SkillsCreate,
  GetLanguages,
  AdminJobFieldList,
  AdminJobTitlelist,
  AdminSkillsList,
  AdminNotification,
  UsersList,
  CompanyUsersList,
  BlockUsersList,
  BlockCompanyUserLists,
  AllCompanyList,
  CompanyVerifiedList,
  CompanyBlockedList,
  AllCompanyPostlist,
  JobFieldListAndCreaterPagination,
  ListBlockPost,
  JobFieldListDeleted,
  JobTitledListAndpagiantions,
  JobTitledBlockedList,
  SkilLslist,
  BlockedSkillsLists,
  GetChartData,
  UserBlockUnBlock,
  VerifyAndBlock,
  PostBlockedUnblocked,
  AdminNotificationRead,
  JobFieldDetails,
  JobTitledDetails,
  SkillsDetails,
};

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

// ---------------------------------------Get Methoda-------------------------------//
const GetLanguages = () => {
  return adminAxiosInstant.get("LanguageListCreateAPIView", {
    withCredentials: true,
  });
};

const AdminJobFieldList = () => {
  return adminAxiosInstant.get("JobFieldListAndCreater/", {
    withCredentials: true,
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
  return adminAxiosInstant.get(
    `companyuserslist/?page=1&search=${search}`,
    { withCredentials: true } ).catch((error) => {
      throw error;
    })

};
// Get Block User List
const BlockUsersList = (search) => {
  return adminAxiosInstant.get(
    `blockuserslist/?page=1&search=${search}`,
    { withCredentials: true } ).catch((error) => {
      throw error;
    })

};
// Get Block Company User List
const BlockCompanyUserLists = (search) => {
  return adminAxiosInstant.get(
    `blockcompanyuserlist/?page=1&search=${search}`,
    { withCredentials: true } ).catch((error) => {
      throw error;
    })

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
const ListBlockPost= (search) => {
  return adminAxiosInstant
    .get(`listblockpost/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const JobFieldListAndCreaterPagination= (search) => {
  return adminAxiosInstant
    .get(`jobfieldlistandcreaterpagination/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const JobFieldListDeleted= (search) => {
  return adminAxiosInstant
    .get(`jobfieldlistdeleted/?page=1&search=${search}`, {
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

export {
  AdminSignin,
  JobFieldCreater,
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
  UserBlockUnBlock,
  VerifyAndBlock,
  PostBlockedUnblocked,
  AdminNotificationRead,
  JobFieldDetails,
};

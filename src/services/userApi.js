import { userAxiosInstant } from "../utils/axiosUtils";

//------------------------------ POST METHODS-------------------------------------------

// User Signin
const userSignin = (values) => {
  return userAxiosInstant
    .post("api/token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};

// User Google signup
const UserGoogleSignup = (value) => {
  const values = {
    email: value.email,
    username: value.email,
    first_name: value.given_name,
    last_name: value.family_name,
    password: value.id,
  };
  return userAxiosInstant
    .post("api/googleregistration/", values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

// User Google signin
const UserGoogleSignin = (value) => {
  const values = {
    email: value.email,
    password: value.id,
  };
  return userAxiosInstant.post("api/token/", values, { withCredentials: true });
};

// User Token refresh
const TokenRefresh = (value) => {
  return userAxiosInstant
    .post("api/token/refresh/", value, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};

// Create User into
const UserInfo = (value) => {
  return userAxiosInstant.post("api/UserInfoListCreateAPIView/", value, {
    withCredentials: true,
  });
};

//-----------------------------Get Methods--------------------------------------------

//  Get userInfo Details
const UserInfoDetails = (id) => {
  return userAxiosInstant.get("api/UserInfoDetails/" + id + "/");
};

// Get User Details
const UserDetail = (id) => {
  return userAxiosInstant.get("api/user-detail/" + id + "/", {
    withCredentials: true,
  });
};

// Get Related Jobs Post
const UserRelatedJobs = (id) => {
  return userAxiosInstant.get(`api/userrelatedjobs/${id}`, {
    withCredentials: true,
  });
};
// Get User Details
const NotificationConut = (id) => {
  return userAxiosInstant.get(`api/notificationconut/${id}`, {
    withCredentials: true,
  });
};
// Get User Details
const UserPostLists = (
  id,
  search,
  skillsQueryParam,
  jobCategoriesQueryParam,
  jobTitleQueryParam,
  talenttypeQueryParam
) => {
  if (search) {
    return userAxiosInstant.get(
      `api/userpostlist/${id}/?search=${search}&?skills=${skillsQueryParam}&job_categories=${jobCategoriesQueryParam}&job_title=${jobTitleQueryParam}&talent_type=${talenttypeQueryParam}`,
      {
        withCredentials: true,
      }
    );
  } else {
    return userAxiosInstant.get(
      `api/userpostlist/${id}/?skills=${skillsQueryParam}&job_categories=${jobCategoriesQueryParam}&job_title=${jobTitleQueryParam}&talent_type=${talenttypeQueryParam}`,
      {
        withCredentials: true,
      }
    );
  }
};
// User Notifications
const usernotification = (id) => {
  return userAxiosInstant
    .get(`api/usernotification/${id}/`, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};
// User Applyied List
const UserApplyPostList = (id,search) => {
  return userAxiosInstant
    .get(`api/UserApplyPostList/${id}/?search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};
// User Applyied Accepted List
const UserAcceptedApplyPostList = (id,search) => {
  return userAxiosInstant
    .get(`api/UserAcceptedApplyPostList/${id}/?search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};
// User Applyied Pending List
const UserPendingApplyPostList = (id,search) => {
  return userAxiosInstant
    .get(`api/UserPendingApplyPostList/${id}/?search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};

//--------------------------Put or Patch Methods (for Updation)-------------------------------

// Update User Profile
const UserProfileUpdate = (value, id) => {
  return userAxiosInstant.put("api/UserProfileUpdate/" + id + "/", value, {
    withCredentials: true,
  });
};

// Update User is_compleated
const UserIs_compleatedUpdate = (id) => {
  return userAxiosInstant
    .put(`api/Is_compleatedUpdate/${id}/`, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};

// Forgot Passsword (Reset Password)
const Restpassword = (values, id) => {
  return userAxiosInstant
    .put(`api/restpassword/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Update UserProfle (first_name,last_name)
const UpdateUseaccount = (values, id) => {
  return userAxiosInstant
    .put(`api/updateuseaccount/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

// Update Userinfo table
const UpdateUserInfoDetails = (values, id) => {
  return userAxiosInstant
    .put(`api/UserInfoDetails/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

// Edit Experience
const ExperienceDetails = (values, id) => {
  return userAxiosInstant
    .put(`api/ExperienceDetails/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

// Edit Educations
const EducationDetails = (values, id) => {
  return userAxiosInstant
    .put(`api/EducationDetails/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
// Notificaton read
const NotificationRead = (values, id) => {
  return userAxiosInstant
    .patch(`api/NotificationRead/${id}/`, values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

//------------------------------Delete Methods------------------------------//
// Delete skill in Userinfo table
const Remove_skill = (values) => {
  return userAxiosInstant
    .post("api/remove_skill/", values, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const DeleteExperienceDetails = (id) => {
  return userAxiosInstant
    .delete(`api/ExperienceDetails/${id}/`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const DeleteEducationDetails = (id) => {
  return userAxiosInstant
    .delete(`api/EducationDetails/${id}/`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

export {
  userSignin,
  UserGoogleSignup,
  UserGoogleSignin,
  UserInfoDetails,
  UserInfo,
  UserDetail,
  UserRelatedJobs,
  NotificationConut,
  UserProfileUpdate,
  UserIs_compleatedUpdate,
  TokenRefresh,
  Restpassword,
  UpdateUseaccount,
  UserPostLists,
  usernotification,
  UserApplyPostList,
  UserAcceptedApplyPostList,
  UserPendingApplyPostList,
  // Put or pach methods
  UpdateUserInfoDetails,
  ExperienceDetails,
  EducationDetails,
  NotificationRead,
  // delete methods
  Remove_skill,
  DeleteExperienceDetails,
  DeleteEducationDetails,
};

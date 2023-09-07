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
  return userAxiosInstant.post("api/googleregistration/", values, {
    withCredentials: true})
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
  return userAxiosInstant.post("api/token/refresh/", value, {
    withCredentials: true,
  })
  .catch((error) => error.response);
};

// Create User into 
const UserInfo = (value) => {
  return userAxiosInstant.post("api/UserInfoListCreateAPIView/", value, {
    withCredentials: true,
  })
};



//-----------------------------Get Methods--------------------------------------------

//  Get userInfo Details 
const UserInfoDetails = (id)=>{
  return userAxiosInstant.get('api/UserInfoDetails/'+id+'/')
}

// Get User Details
const UserDetail = (id) => {
  return userAxiosInstant.get('api/user-detail/'+id+'/', {
    withCredentials: true,
  })
};




//--------------------------Put or Patch Methods (for Updation)-------------------------------

// Update User Profile
const UserProfileUpdate = (value, id) => {
  return userAxiosInstant.put("api/UserProfileUpdate/" + id + "/", value, {
    withCredentials: true,
  });
};

// Update User is_compleated
const UserIs_compleatedUpdate = (value, id) => {
  return userAxiosInstant.put("api/Is_compleatedUpdate/" + id + "/", value, {
    withCredentials: true,
  })
  .catch((error) => error.response);
};

// Forgot Passsword (Reset Password)
const Restpassword = (values, id) => {
  return userAxiosInstant.put(`api/restpassword/${id}/`, values, {
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
  UserProfileUpdate,
  UserIs_compleatedUpdate,
  TokenRefresh,
  Restpassword,
};

import { userAxiosInstant } from "../utils/axiosUtils";

const userSignup = (values) => {
  return userAxiosInstant.post("/api/register/", values, {
    withCredentials: true,
  });
};

const UserInfoDetails = (id)=>{
  return userAxiosInstant.get('/api/UserInfoDetails/'+id+'/')
}
const UserGoogleSignup = (value) => {
  const values = {
    email: value.email,
    username: value.email,
    first_name: value.given_name,
    last_name: value.family_name,
    password: value.id,
  };
  return userAxiosInstant.post("/api/googleregistration/", values, {
    withCredentials: true,
  });
};

const userSignin = (values) => {
  return userAxiosInstant
    .post("api/token/", values, { withCredentials: true })
    .catch((error) => {
      throw error; 
    });
};

const UserGoogleSignin = (value) => {
  const values = {
    email: value.email,
    password: value.id,
  };
  return userAxiosInstant.post("api/token/", values, { withCredentials: true });
};
const TokenRefresh = (value) => {
  return userAxiosInstant.post("api/token/refresh/", value, {
    withCredentials: true,
  })
  .catch((error) => error.response);
};
const UserInfo = (value) => {
  return userAxiosInstant.post("api/UserInfoListCreateAPIView/", value, {
    withCredentials: true,
  })
};
const UserProfileUpdate = (value, id) => {
  return userAxiosInstant.put("/api/UserProfileUpdate/" + id + "/", value, {
    withCredentials: true,
  });
};
const UserIs_compleatedUpdate = (value, id) => {
  return userAxiosInstant.put("api/Is_compleatedUpdate/" + id + "/", value, {
    withCredentials: true,
  })
  .catch((error) => error.response);
};
export {
  userSignup,
  userSignin,
  UserGoogleSignup,
  UserGoogleSignin,
  UserInfoDetails,
  UserInfo,
  UserProfileUpdate,
  UserIs_compleatedUpdate,
  TokenRefresh,
};

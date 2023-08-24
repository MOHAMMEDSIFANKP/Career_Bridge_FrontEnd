import { userAxiosInstant } from "../utils/axiosUtils";

const userSignup = (values) =>{
    return userAxiosInstant.post('/api/register/', values, {withCredentials: true})
}

const UserGoogleSignup = (value) =>{
    const values = {
        email: value.email,
        username: value.email,
        first_name: value.given_name,
        last_name: value.family_name,
        password: value.id,
    };
    return userAxiosInstant.post("/api/googleregistration/", values, {withCredentials:true}) 
}

const userSignin = (values) => {
    return userAxiosInstant.post('api/token/', values, { withCredentials: true })
      .catch((error) => error.response);
  };

const UserGoogleSignin = (value) =>{
    const values = {
        email: value.email,
        password: value.id,
    };
    return userAxiosInstant.post('api/token/', values, {withCredentials: true})
}


export {userSignup, userSignin, UserGoogleSignup, UserGoogleSignin}
import { CompanyAxiosInstant } from "../utils/axiosUtils";

const CompanySignup = (values) =>{
    return CompanyAxiosInstant.post('register/', values, {withCredentials: true})
}

const CompanyGoogleSignup = (value) =>{
    const values = {
        email: value.email,
        username: value.email,
        first_name: value.given_name,
        last_name: value.family_name,
        password: value.id,
    };
    return CompanyAxiosInstant.post("googleregistration/", values, {withCredentials:true}) 
}

export {CompanyGoogleSignup}
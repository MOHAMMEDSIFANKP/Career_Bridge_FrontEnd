import { UserInfoDetails, UserDetail } from '../services/userApi';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {
  setUserDetails,
  setExperiences,
  setEducation,
  setLanguages,
  setSkills,
} from '../Redux/UserSlice';

export const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const dispatch = useDispatch();

    if (!decoded.userInfoId) {
      const UserDetails = await UserDetail(decoded.user_id);
      const userInformation = {
        id: UserDetails.data.id,
        profile_image: UserDetails.data.profile_image,
        email: UserDetails.data.email,
        first_name: UserDetails.data.first_name,
        last_name: UserDetails.data.last_name,
        is_active: UserDetails.data.is_active,
        is_compleated: UserDetails.data.is_compleated,
        id_admin: UserDetails.data.is_admin,
        role: UserDetails.data.role,
      };
      if (userInformation) {
        dispatch(setUserDetails({ UserInfo: userInformation }));
      }
    } else {
      const res = await UserInfoDetails(decoded.userInfoId);
      const UserDetails = await UserDetail(decoded.user_id);
      dispatch(
        setRole({
          JobFiledRedex: res.data.jobField.field_name,
          JobTitleRedex: res.data.jobTitle.title_name,
        })
      );
      res.data.experience.map((values, index) => {
        dispatch(setExperiences(values));
      });
      res.data.education.map((values, index) => {
        dispatch(setEducation(values));
      });
      res.data.languages.map((values, index) => {
        dispatch(setLanguages(values));
      });
      res.data.skills.map((values, index) => {
        dispatch(setSkills(values));
      });
      const userInformation = {
        id: UserDetails.data.id,
        profile_image: UserDetails.data.profile_image,
        email: UserDetails.data.email,
        first_name: UserDetails.data.first_name,
        last_name: UserDetails.data.last_name,
        is_active: UserDetails.data.is_active,
        is_compleated: UserDetails.data.is_compleated,
        id_admin: UserDetails.data.is_admin,
        role: UserDetails.data.role,
        streetaddress: res.data.streetaddress,
        userinfoid: res.data.id,
        city: res.data.city,
        state: res.data.state,
        zipcode: res.data.zipcode,
        bio: res.data.bio,
        cv: res.data.cv,
      };
      if (userInformation) {
        dispatch(setUserDetails({ UserInfo: userInformation }));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  profile_image: "",
  role: "",
  is_compleated: "",
  is_google: "",
  UserInfo: {email:''},
  JobFiledRedex: "",
  JobTitleRedex: "",
  positions : "",
  experiences: [],
  Education: [],
  Language: [],
  Skills: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      // state.UserInfo = action.payload.UserInfo;
      state.email = action.payload.email
    },
    LogoutDetails: (state, action) => {
      // state.id = "";
      // state.first_name = "";
      // state.last_name = "";
      // state.email = "";
      // state.profile_image = "";
      // state.role = "";
      // state.is_compleated = "";
      // state.is_google = "";
    },
    // Role
    setRole: (state, action) => {
      state.JobFiledRedex = action.payload.JobFiledRedex;
      state.JobTitleRedex = action.payload.JobTitleRedex;
    },
    ClearRole: (state, action) => {
      state.JobFiledRedex = "";
      state.JobTitleRedex = "";
    },
    // Position
    setPosition: (state, action)=>{
        state.positions = action.payload.position;
    },
    ClearPosition: (state)=>{
      state.positions = ''
    },
    // Experience
    setExperiences: (state, action) => {
      state.experiences.push(action.payload);
    },  
    EditExpeience: (state, action) => {
      const { index, updatedExperience } = action.payload;
      state.experiences[index] = updatedExperience;
    },
    DeteteExperience: (state, action) => {
      const index = action.payload;
      state.experiences.splice(index, 1);
    },
    CleatExperiences : (state)=>{
        state.experiences = [];
    },
    // Education
    SetEducation: (state, action) => {
      state.Education.push(action.payload);
    },
    EditEducation: (state, action) => {
      const { index, updatedEducation } = action.payload;
      state.Education[index] = updatedEducation;
    },
    DeleteEducation: (state, action) => {
      const index = action.payload;
      state.Education.splice(index, 1);
    },
    ClearEducation: (state)=>{
        state.Education = [];
    },
    // Language
    SetLanguage: (state, action) => {
      state.Language.push(action.payload);
    },
    DeleteLanguage: (state, action) => {
      const index = action.payload;
      state.Language.splice(index, 1);
    },
    ClearLanguage: (state)=>{
        state.Language = []
    },
    // Skills
    SetSkills: (state, action) => {
      state.Skills.push(action.payload);
    },
    DeleteSkills: (state, action) => {
      const index = action.payload;
      state.Skills.splice(index, 1);
    },
    ClearSkills: (state)=>{
        state.Skills = []
    },
  },
});

export const {
  setUserDetails,
  setRole,
  setPosition,
  setExperiences,
  EditExpeience,
  DeteteExperience,
  SetEducation,
  EditEducation,
  DeleteEducation,
  SetLanguage,
  DeleteLanguage,
  SetSkills,
  DeleteSkills,
  AfterConfirm,
  LogoutDetails,
  ClearRole,
  ClearPosition,
  CleatExperiences,
  ClearEducation,
  ClearLanguage,
  ClearSkills,
} = userSlice.actions;
export default userSlice.reducer;

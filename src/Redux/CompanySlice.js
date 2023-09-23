import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CompanyInfo: {},
  Posts: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyDetails: (state, action) => {
      state.CompanyInfo = action.payload.CompanyInfo;
    },
    UpdateCompanyDetails: (state, action) => {
      state.CompanyInfo = {
        ...state.CompanyInfo,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        profile_image: action.payload.profile_image,
        company_name: action.payload.company_name,
        industry: action.payload.industry,
        company_size: action.payload.company_size,
        company_type: action.payload.company_type,
        gst: action.payload.gst,
        description: action.payload.description,
        streetaddress: action.payload.streetaddress,
        contry: action.payload.contry,
        state: action.payload.state,
        city: action.payload.city,
        zipcode: action.payload.zipcode,
      };
    },
    // Post
    setPosts: (state, action) => {
      state.Posts.push(action.payload);
    },
    EditPosts: (state, action) => {
      const { index, updatedPosts } = action.payload;
      state.Posts[index] = updatedPosts;
    },
    DetetePosts: (state, action) => {
      const index = action.payload;
      state.Posts.splice(index, 1);
    },
    CleartPosts: (state) => {
      state.Posts = [];
    },
    LogoutCompanyDetails: (state, action) => {
      state.CompanyInfo = {};
    },
  },
});

export const {
  setCompanyDetails,
  LogoutCompanyDetails,
  UpdateCompanyDetails,
  setPosts,
  EditPosts,
  DetetePosts,
  CleartPosts,
} = companySlice.actions;
export default companySlice.reducer;

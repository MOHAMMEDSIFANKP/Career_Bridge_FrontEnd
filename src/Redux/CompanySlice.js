import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CompanyInfo: {},
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyDetails: (state, action) => {
      state.CompanyInfo = action.payload.CompanyInfo;
    },
    UpdateCompanyDetails: (state, action) =>{
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
        district: action.payload.district,
        zipcode: action.payload.zipcode,
      };
    },
    LogoutCompanyDetails: (state, action) => {
      state.CompanyInfo = {};
    },
  },
});

export const { setCompanyDetails, LogoutCompanyDetails,UpdateCompanyDetails } = companySlice.actions;
export default companySlice.reducer;

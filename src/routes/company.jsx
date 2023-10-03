import { Routes, Route } from "react-router-dom";
import Company_Register_Page from "../pages/Company/CompanyRegister_Page";
import CompanyHomePage from "../pages/Company/CompanyHomePage";
import CompanyProtected from "../ProtectedRoutes/CompanyProtexted";
import PrivateRoutes from "../ProtectedRoutes/PrivateRoutes";
import CompanyCreations from "../pages/Company/RegistrationSteps/CompanyCreations";
import CompanyProfile from "../pages/Company/CompanyProfile/CompanyProfile";
import CompanyDashboard from "../pages/Company/CompanyDashboard/CompanyDashboard";
import UserFullData from "../components/Company/Dashboard/RequestsComponents/CompanyList/UserFullData";
function CompanyRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/signup" element={<Company_Register_Page />} />
      </Route>
      <Route element={<CompanyProtected />}>
        <Route path="/" element={<CompanyHomePage />} />
        <Route path="/createcompany" element={<CompanyCreations />} />
        <Route path="/profile" element={<CompanyProfile />} /> 
        <Route path="/dashboard" element={<CompanyDashboard />} /> 
        <Route path="/userdetails" element={<UserFullData />} /> 
      </Route>
    </Routes>
  );
}
export default CompanyRoutes;

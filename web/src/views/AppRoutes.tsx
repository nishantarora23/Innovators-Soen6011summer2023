import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Home from "./Student/Home/Home";
import AddJobOffer from "./AddJobOffer/AddJobOffer";
import EmployerBaseHome from "./EmployerDashboard/Home";
import EmployeeJobOffers from "../components/EmployerDashboard/EmployerJobOffers/EmployeeJobOffers";
import ApplicantsComponent from "./Applicants/Applicants";
import ViewJobOfferComponent from "./ViewJobOffer/ViewJobOfferComponent";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="admin/home" element={<AdminDashboard />} />
        <Route path="student/home" element={<Home />} />

        <Route path="/employer/addJobOffer" element={<AddJobOffer />} />
        <Route path="/employer/home" element={<EmployerBaseHome />} />

        <Route path="/employer/addJobOffer/:jobId?" element={<AddJobOffer />} />
        <Route path="/employer/home" element={<EmployerBaseHome />} />
        <Route path="/employer/jobOffers" element={<EmployeeJobOffers />} />
        <Route
          path="/employer/jobOffers/:jobId"
          element={<ViewJobOfferComponent />}
        />
        <Route
          path="/employer/applicants/:id?"
          element={<ApplicantsComponent />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

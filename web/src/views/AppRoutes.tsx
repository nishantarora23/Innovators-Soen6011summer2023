import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Student/Home/Home'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="student/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

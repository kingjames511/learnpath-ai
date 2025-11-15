import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/login";
import { paths } from "./path";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GlassmorphismLogin from "./pages/SIgn_In";
import AuthCallback from "./pages/AuthCallback";
import ForgotPassword from "./pages/ForgettPassword";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./components/OnBoarding";
import ProtectedRoute from "./components/ProtectedRooute";

export default function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path={paths.landingpage} element={<Home />} />
        <Route path={paths.signUp} element={<SignUpPage />} />
        <Route path={paths.signIn} element={<GlassmorphismLogin />} />
        <Route path={paths.callback} element={<AuthCallback />} />
        <Route path={paths.passwordReset} element={<ForgotPassword />} />
        <Route path={paths.ResetPassword} element={<ResetPassword />} />

        {/* Protected Routes - All under one wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route path={paths.dashbaord} element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
}

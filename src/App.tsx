import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/login";
import { paths } from "./path";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GlassmorphismLogin from "./pages/SIgn_In";
import AuthCallback from "./pages/AuthCallback";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path={paths.landingpage} element={<Home />} />
        <Route path={paths.dashbaord} element={<Dashboard />} />
        <Route path={paths.signUp} element={<SignUpPage />} />
        <Route path={paths.callback} element={<AuthCallback/>}/>
        <Route path={paths.signIn} element={<GlassmorphismLogin />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
}

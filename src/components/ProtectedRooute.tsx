import type { ReactNode } from "react";
import { useAuth } from "../Services/contextApi/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../path";
interface ProtectedRouteProps {
  childern: ReactNode;
}

const ProtectedRoute = ({ childern }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={paths.signIn} replace />;
  }
  return childern ? childern : <Outlet />;
};
export default ProtectedRoute;

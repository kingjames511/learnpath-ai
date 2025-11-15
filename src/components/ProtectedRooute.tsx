import type { ReactNode } from "react";
import { useAuth } from "../Services/contextApi/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../path";

interface ProtectedRouteProps {
  children?: ReactNode; // Fixed typo: "childern" -> "children"
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to sign-in page
  if (!user) {
    return <Navigate to={paths.signIn} replace />;
  }

  // If children are provided, render them; otherwise render Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

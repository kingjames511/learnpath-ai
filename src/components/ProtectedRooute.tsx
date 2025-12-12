import type { ReactNode } from "react";
import { useAuth } from "../Services/contextApi/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../path";

interface ProtectedRouteProps {
  children?: ReactNode; 
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={paths.signIn} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

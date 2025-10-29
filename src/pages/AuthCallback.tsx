import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Services/contextApi/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Wait small for auth state to update
    const timer = setTimeout(() => {
      if (user) {
        // User successfully authenticated!
        console.log("✅ User authenticated:", user.email);
        navigate("/dashboard");
      } else {
        // Something went wrong
        console.log("❌ No user found, redirecting to login");
        navigate("/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-bg-purple-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Completing sign in...
        </h2>
        <p className="text-gray-500">Please wait while we log you in</p>
      </div>
    </div>
  );
}

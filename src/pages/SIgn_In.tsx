import { useState } from "react";
import illustration from "../assets/undraw_online-test_cqv0.svg";
import { useAuth } from "../Services/contextApi/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { paths } from "../path";

const SignInPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    if (error) {
      toast.error("oops something went wrong");
      setError(
        "opps something went wrong please double-check your email and password"
      );
      setLoading(false);
    } else {
      toast.success("welcome back redirecting now");
      setLoading(false);
      setTimeout(() => navigate(paths.dashbaord), 3000);
    }
  };
  // const Reset = async (email: string) => {
  //   const { error } = resetPassword(email);
  //   if (error) {
  //     setError("oops something occured");
  //   } else {
  //     toast.success("check your email for a reset link");
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
              Welcome Back Starts Now Grow Faster.
            </h1>

            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Just an intelligent roadmap tailored to your skills and ambitions.
            </p>

            {/* Email Sign Up Form - Step 1 */}

            <div className="flex gap-3 mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-purple-500"
              />
            </div>

            {/* Full Name and Password Form - Step 2 */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-purple-500 mb-3"
              />
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`w-full px-8 py-3 bg-purple-600 text-white border-0 rounded-lg text-sm font-semibold cursor-pointer hover:bg-purple-700 transition-colors ${
                  loading ? "animate-pulse" : ""
                }`}
              >
                {loading ? "loading..." : "sign-in"}
              </button>
              {error && (
                <div
                  mt-4
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
                >
                  {error}
                </div>
              )}
            </div>

            {/* Terms */}
            <p className="text-sm text-gray-400 leading-relaxed">
              Dont have any account yet !!{" "}
              <a href="/sign-up" className="text-black underline">
                signUp
              </a>{" "}
              Here
            </p>

            <p className="text-sm text-purple-600 leading-relaxed">
              Forgotten Password ?
              <a href="/sign-up" className="text-black underline">
                Reset
              </a>{" "}
              Here
            </p>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:block">
            <img src={illustration} alt="" />
          </div>
        </div>
      </div>
      <style>{`
        /* Hide the browser scrollbar globally for this page */
        html, body, #root {
          height: 100%;
          overflow: hidden;
        }

        /* Page wrapper centers content both vertically and horizontally */
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        /* Container holds the layout and constrains width */
        .center-container {
          width: 100%;
          max-width: 1200px;
        }

        .grid-2 {
          display: grid;
          gap: 2rem;
          align-items: center;
          width: 100%;
          grid-template-columns: 1fr; /* mobile fallback */
        }

        @media (min-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SignInPage;

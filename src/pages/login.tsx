import { useState } from "react";
import illustration from "../assets/undraw_online-test_cqv0.svg";
import { useAuth } from "../Services/contextApi/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSucess] = useState<string>("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { signUp, signWithGoogle } = useAuth();
  const handleSignUp = () => {
    if (!email.includes("@gmail.com")) {
      toast.error("Double-check your email something’s off");
    } else {
      setStep(2);
      console.log(loading);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await signUp(email, password, {
      full_name: fullName,
    });
    if (error) {
      toast.error("oops something went wrong");
      setError(error);
      setLoading(false);
    } else {
      setSucess("Check your email to confirm your account");
      setLoading(false);
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");
    const { error } = await signWithGoogle();

    if (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
              Smarter Learning Starts Here Grow Faster.
            </h1>

            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Just an intelligent roadmap tailored to your skills and ambitions.
            </p>

            {/* Google Sign Up Button */}
            <button
              onClick={() => handleGoogleSignUp()}
              disabled={loading}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-center gap-3 text-sm font-medium text-gray-800 mb-6 hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M19.8 10.2273C19.8 9.51823 19.7364 8.83641 19.6182 8.18186H10.2V12.0501H15.6109C15.3727 13.3001 14.6545 14.3592 13.5864 15.0682V17.5773H16.8273C18.7182 15.8364 19.8 13.2728 19.8 10.2273Z"
                  fill="#4285F4"
                />
                <path
                  d="M10.2 20C12.9 20 15.1636 19.1046 16.8273 17.5773L13.5864 15.0682C12.6909 15.6682 11.5545 16.0228 10.2 16.0228C7.59545 16.0228 5.38182 14.2637 4.58636 11.9H1.22727V14.4909C2.88182 17.7591 6.30909 20 10.2 20Z"
                  fill="#34A853"
                />
                <path
                  d="M4.58636 11.9C4.38636 11.3 4.27273 10.6591 4.27273 10C4.27273 9.34091 4.38636 8.7 4.58636 8.1V5.50909H1.22727C0.445455 7.05909 0 8.48182 0 10C0 11.5182 0.445455 12.9409 1.22727 14.4909L4.58636 11.9Z"
                  fill="#FBBC04"
                />
                <path
                  d="M10.2 3.97727C11.6773 3.97727 13.0091 4.48182 14.0727 5.47273L17.0045 2.54091C15.1591 0.859091 12.8955 0 10.2 0C6.30909 0 2.88182 2.24091 1.22727 5.50909L4.58636 8.1C5.38182 5.73636 7.59545 3.97727 10.2 3.97727Z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with your Google account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Email Sign Up Form - Step 1 */}
            {step === 1 && (
              <div className="flex gap-3 mb-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleSignUp}
                  className="px-8 py-3 bg-[#6c63ff] text-white border-0 rounded-lg text-sm font-semibold cursor-pointer hover:bg-purple-700 transition-colors"
                >
                  Sign up
                </button>
              </div>
            )}

            {/* Full Name and Password Form - Step 2 */}
            {step === 2 && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-purple-500 mb-3"
                />
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
                  {loading ? "loading..." : "confirm"}
                </button>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                  </div>
                )}
              </div>
            )}

            {/* Terms */}
            <p className="text-sm text-gray-400 leading-relaxed">
              By signing up, you agree to the{" "}
              <a href="#" className="text-black underline">
                Terms of use
              </a>{" "}
              and{" "}
              <a href="#" className="text-black underline">
                Privacy Policy.
              </a>
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

export default SignUpPage;

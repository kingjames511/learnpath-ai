import React, { useState } from "react";
import group from "../assets/Group.png";
const GlassmorphismLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center">
      {/* Radiant Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full opacity-15 blur-3xl"></div>

        {/* Decorative floating images */}
        <img
          src={group}
          alt=""
          className="floating-shape absolute top-20 left-32 w-32 h-32 opacity-30 object-contain"
        />

        <img
          src={group}
          alt=""
          className="floating-shape-delayed absolute top-64 left-20 w-24 h-24 opacity-40 object-contain"
        />

        <img
          src="YOUR_IMAGE_URL_3"
          alt=""
          className="floating-shape absolute bottom-40 left-1/4 w-28 h-28 opacity-30 object-contain"
        />

        <img
          src="YOUR_IMAGE_URL_4"
          alt=""
          className="floating-shape-delayed absolute top-1/3 right-32 w-36 h-36 opacity-25 object-contain"
        />

        <img
          src={group}
          alt=""
          className="floating-shape absolute bottom-32 right-40 w-64 h-32 opacity-35 object-contain"
        />

        {/* Additional ambient circles */}
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-blue-400 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-cyan-300 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-card rounded-3xl p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-bold">C</span>
            </div>
          </div>

          <div className="text-center mb-2">
            <p className="text-blue-200 text-sm font-medium">Your logo</p>
          </div>

          <h2 className="text-white text-3xl font-bold mb-8 text-center">
            Login
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@gmail.com"
                className="w-full px-4 py-3 bg-white bg-opacity-90 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white bg-opacity-90 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div className="text-right">
              <button
                onClick={(e) => e.preventDefault()}
                className="text-blue-200 text-sm hover:text-blue-100 transition-colors bg-transparent border-none cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-900 bg-opacity-80 hover:bg-opacity-100 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Sign in
            </button>
          </div>

          <div className="mt-6">
            <p className="text-center text-blue-200 text-sm mb-4">
              or continue with
            </p>
            <div className="flex justify-center gap-3">
              <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all shadow-md cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all shadow-md cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
              <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all shadow-md cursor-pointer">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-blue-200 text-sm">
              Don't have an account yet?{" "}
              <button
                onClick={(e) => e.preventDefault()}
                className="text-white font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Register for free
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes floatDelayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }

        .floating-shape-delayed {
          animation: floatDelayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default GlassmorphismLogin;

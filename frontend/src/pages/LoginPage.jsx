import { useState } from "react";
import { Video, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-indigo-400/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-indigo-800/80 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-indigo-500/30 backdrop-blur-sm">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col bg-indigo-900/30">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2 animate-fade-in">
            <Video className="h-9 w-9 text-indigo-300 animate-spin-slow" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 tracking-wider">
             StreamSync
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="bg-rose-500/20 border border-rose-400 text-rose-100 px-4 py-3 rounded-lg mb-4 flex items-center animate-shake">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="animate-fade-in-up delay-100">
                  <h2 className="text-2xl font-bold text-indigo-100">Welcome Back</h2>
                  <p className="text-sm text-indigo-300/80">
                    Sign in to your account to continue To Meet YourNew Partners🌏✨💫
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2 animate-fade-in-up delay-200">
                    <label className="label">
                      <span className="label-text text-indigo-200">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input w-full bg-indigo-900/50 border-indigo-600/50 text-indigo-100 placeholder-indigo-400/50 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-200"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2 animate-fade-in-up delay-300 relative">
                    <label className="label">
                      <span className="label-text text-indigo-200">Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input w-full bg-indigo-900/50 border-indigo-600/50 text-indigo-100 placeholder-indigo-400/50 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-200 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-300 hover:text-indigo-100 transition-colors"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 animate-fade-in-up delay-400 disabled:opacity-50"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4 animate-fade-in-up delay-500">
                    <p className="text-sm text-indigo-300">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-indigo-200 hover:underline hover:text-white transition-colors"
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-indigo-700/10 items-center justify-center bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
          <div className="max-w-md p-8 animate-fade-in">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto transform hover:scale-105 transition-transform duration-500">
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-2xl font-bold text-indigo-100">
                Connect with Your Partner's In StreamSync💫
              </h2>
              <p className="text-indigo-300/80">
               Stay Connected With Your Partners🌏✨💫
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
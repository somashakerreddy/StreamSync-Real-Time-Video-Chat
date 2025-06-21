import { useState } from "react";
import { Video } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-indigo-400/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-indigo-800/80 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-indigo-500/30 backdrop-blur-sm">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col bg-indigo-900/30">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2 animate-fade-in">
            <Video className="h-9 w-9 text-indigo-300 animate-spin-slow" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 tracking-wider">
              StreamSync
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
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
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div className="animate-fade-in-up delay-100">
                  <h2 className="text-2xl font-bold text-indigo-100">Create an Account</h2>
                  <p className="text-sm text-indigo-300/80">
                    Join Our Application and start Conersation With New Friends🤩!!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="form-control w-full animate-fade-in-up delay-200">
                    <label className="label">
                      <span className="label-text text-indigo-200">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input w-full bg-indigo-900/50 border-indigo-600/50 text-indigo-100 placeholder-indigo-400/50 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-200"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full animate-fade-in-up delay-300">
                    <label className="label">
                      <span className="label-text text-indigo-200">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input w-full bg-indigo-900/50 border-indigo-600/50 text-indigo-100 placeholder-indigo-400/50 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-200"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full animate-fade-in-up delay-400">
                    <label className="label">
                      <span className="label-text text-indigo-200">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input w-full bg-indigo-900/50 border-indigo-600/50 text-indigo-100 placeholder-indigo-400/50 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-200"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs text-indigo-400/70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control animate-fade-in-up delay-500">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm bg-indigo-900/50 border-indigo-400/50 checked:border-indigo-400 checked:bg-indigo-400/20"
                        required
                      />
                      <span className="text-xs text-indigo-200 leading-tight">
                        I agree to the{" "}
                        <Link to="/terms" className="text-indigo-300 hover:underline hover:text-indigo-200 transition-colors">
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-indigo-300 hover:underline hover:text-indigo-200 transition-colors">
                          privacy policy
                        </Link>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="btn w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 animate-fade-in-up delay-600 disabled:opacity-50"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4 animate-fade-in-up delay-700">
                  <p className="text-sm text-indigo-300">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-indigo-200 hover:underline hover:text-white transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
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
                Connect with WorldWide Friends Using StreamSync
              </h2>
              <p className="text-indigo-300/80">
              Find Your On StreamSync Partners🌏✨💫
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
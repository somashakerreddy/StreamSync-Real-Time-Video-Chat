import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Video } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center gap-2.5 group hover:scale-105 transition-all duration-200 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                <div className="relative">
                  <Video className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                </div>
                <span className="hidden sm:block text-2xl lg:text-3xl font-bold font-mono bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent tracking-wider group-hover:tracking-widest transition-all duration-300">
              StreamSync
                </span>
              </Link>
            </div>
          )}

          {/* RIGHT SIDE CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* NOTIFICATIONS */}
            <div className="relative">
              <Link to={"/notifications"}>
                <button className="group relative p-2.5 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                  <BellIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                  {/* Notification badge */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                  {/* Hover effect ring */}
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                </button>
              </Link>
            </div>

            {/* THEME SELECTOR */}
            <div className="flex items-center">
              <ThemeSelector />
            </div>

            {/* USER AVATAR */}
            <div className="relative group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-300 hover:scale-110">
                <img 
                  src={authUser?.profilePic} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-200"></div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {authUser?.fullName || 'Profile'}
              </div>
            </div>

            {/* LOGOUT BUTTON */}
            <button 
              className="group relative p-2.5 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900" 
              onClick={logoutMutation}
            >
              <LogOutIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200" />
              
              {/* Hover effect ring */}
              <div className="absolute inset-0 rounded-full bg-red-500/20 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Logout
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Animated border bottom */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    </nav>
  );
};

export default Navbar;
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, Video, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 hidden lg:flex flex-col h-screen sticky top-0 shadow-2xl backdrop-blur-xl">
      {/* Header Section */}
      <div className="p-5 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2.5 group transition-all duration-300 hover:scale-105">
          <div className="relative">
            <Video className="size-9 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-45 drop-shadow-lg" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-blue-300/30 transition-all duration-300"></div>
          </div>
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-wider group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300 animate-pulse">
          StreamSync
          </span>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`relative overflow-hidden btn btn-ghost justify-start w-full gap-3 px-4 py-3 normal-case transition-all duration-300 group hover:scale-105 hover:shadow-lg ${
            currentPath === "/" 
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300 shadow-lg shadow-blue-500/20" 
              : "hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:border-slate-500/30 text-slate-300 hover:text-white"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <HomeIcon className={`size-5 transition-all duration-300 group-hover:scale-110 ${
            currentPath === "/" ? "text-blue-400" : "text-slate-400 group-hover:text-white"
          }`} />
          <span className="relative z-10 font-medium">Home</span>
          {currentPath === "/" && (
            <div className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
          )}
        </Link>

        <Link
          to="/friends"
          className={`relative overflow-hidden btn btn-ghost justify-start w-full gap-3 px-4 py-3 normal-case transition-all duration-300 group hover:scale-105 hover:shadow-lg ${
            currentPath === "/friends" 
              ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-300 shadow-lg shadow-emerald-500/20" 
              : "hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:border-slate-500/30 text-slate-300 hover:text-white"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <UsersIcon className={`size-5 transition-all duration-300 group-hover:scale-110 ${
            currentPath === "/friends" ? "text-emerald-400" : "text-slate-400 group-hover:text-white"
          }`} />
          <span className="relative z-10 font-medium">Friends</span>
          {currentPath === "/friends" && (
            <div className="absolute right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
          )}
        </Link>

        <Link
          to="/notifications"
          className={`relative overflow-hidden btn btn-ghost justify-start w-full gap-3 px-4 py-3 normal-case transition-all duration-300 group hover:scale-105 hover:shadow-lg ${
            currentPath === "/notifications" 
              ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-amber-300 shadow-lg shadow-amber-500/20" 
              : "hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:border-slate-500/30 text-slate-300 hover:text-white"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <BellIcon className={`size-5 transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce ${
            currentPath === "/notifications" ? "text-amber-400" : "text-slate-400 group-hover:text-white"
          }`} />
          <span className="relative z-10 font-medium">Notifications</span>
          {currentPath === "/notifications" && (
            <div className="absolute right-2 w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></div>
          )}
        </Link>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-700/50 mt-auto bg-gradient-to-t from-slate-800/50 to-transparent">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-slate-900/50 hover:scale-105">
          <div className="avatar relative">
            <div className="w-10 rounded-full ring-2 ring-slate-600 group-hover:ring-blue-400/50 transition-all duration-300">
              <img src={authUser?.profilePic} alt="User Avatar" className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-slate-800 shadow-lg animate-pulse"></div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors duration-300">{authUser?.fullName}</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="size-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 inline-block animate-pulse shadow-lg shadow-emerald-400/50" />
              Online
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-slate-500 group-hover:bg-blue-400 transition-all duration-300 animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
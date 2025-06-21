import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <div className="container mx-auto space-y-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-800/80 via-purple-800/60 to-indigo-800/80 backdrop-blur-xl rounded-2xl border border-slate-600/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
              Your Friends
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-50"></div>
          </div>
          
          <Link 
            to="/notifications" 
            className="group relative overflow-hidden inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:scale-105 transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <UsersIcon className="mr-2 size-5 group-hover:animate-bounce" />
            <span className="relative z-10">Friend Requests</span>
          </Link>
        </div>

        {/* Friends Section */}
        {loadingFriends ? (
          <div className="flex justify-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200/30 border-t-purple-400"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-purple-400/50"></div>
            </div>
          </div>
        ) : friends.length === 0 ? (
          <div className="transform hover:scale-105 transition-transform duration-300">
            <NoFriendsFound />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend, index) => (
              <div 
                key={friend._id} 
                className="transform hover:scale-105 transition-all duration-300 hover:z-10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FriendCard friend={friend} />
              </div>
            ))}
          </div>
        )}

        {/* Recommended Users Section */}
        <section className="relative">
          <div className="mb-8 p-6 bg-gradient-to-r from-slate-800/80 via-emerald-800/60 to-teal-800/80 backdrop-blur-xl rounded-2xl border border-slate-600/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-pulse">
                  Meet New Learners
                </h2>
                <p className="text-slate-300 mt-2 text-lg">
                  Discover perfect language exchange partners based on your profile
                </p>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200/30 border-t-emerald-400"></div>
                <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-emerald-400/50"></div>
              </div>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-xl rounded-2xl p-8 text-center border border-slate-600/30 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 transform hover:scale-105">
              <h3 className="font-bold text-2xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                No recommendations available
              </h3>
              <p className="text-slate-300 text-lg">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedUsers.map((user, index) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="group relative bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 backdrop-blur-xl rounded-2xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-slate-600/30 hover:border-purple-400/50 transform hover:-translate-y-2 hover:scale-105"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Animated border glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative p-6 space-y-5">
                      {/* User Profile Section */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-slate-600/50 group-hover:ring-purple-400/50 transition-all duration-300">
                            <img 
                              src={user.profilePic} 
                              alt={user.fullName} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-slate-800 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xl text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 truncate">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-sm text-slate-400 group-hover:text-slate-300 mt-1 transition-colors duration-300">
                              <MapPinIcon className="size-4 mr-1 flex-shrink-0 group-hover:text-purple-400 transition-colors duration-300" />
                              <span className="truncate">{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages Section */}
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-400/30 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 group-hover:scale-105 max-w-full">
                          {getLanguageFlag(user.nativeLanguage)}
                          <span className="ml-1 truncate">Native: {capitialize(user.nativeLanguage)}</span>
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 border border-emerald-400/30 hover:from-emerald-500/30 hover:to-emerald-600/30 transition-all duration-300 group-hover:scale-105 max-w-full">
                          {getLanguageFlag(user.learningLanguage)}
                          <span className="ml-1 truncate">Learning: {capitialize(user.learningLanguage)}</span>
                        </span>
                      </div>

                      {/* Bio Section */}
                      {user.bio && (
                        <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600/30 group-hover:bg-slate-700/70 transition-all duration-300">
                          <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300 break-words">
                            {user.bio}
                          </p>
                        </div>
                      )}

                      {/* Action Button */}
                      <button
                        className={`relative overflow-hidden w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                          hasRequestBeenSent 
                            ? "bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 text-emerald-100 border border-emerald-400/30 cursor-not-allowed shadow-lg shadow-emerald-500/20" 
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/30 hover:shadow-xl"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center">
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-5 mr-2 animate-bounce" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-5 mr-2 group-hover:animate-pulse" />
                              Send Friend Request
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    
    </div>
    
  );
};

export default HomePage;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <div className="container mx-auto max-w-4xl space-y-8 relative z-10">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-r from-slate-800/80 via-purple-800/60 to-indigo-800/80 backdrop-blur-xl rounded-2xl border border-slate-600/30 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
            Notifications
          </h1>
          <div className="absolute -bottom-2 left-6 w-48 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-50"></div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200/30 border-t-purple-400"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-purple-400/50"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Incoming Friend Requests Section */}
            {incomingRequests.length > 0 && (
              <section className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-emerald-800/60 via-teal-700/50 to-cyan-800/60 backdrop-blur-xl rounded-xl border border-emerald-500/30 shadow-lg">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                    <div className="relative">
                      <UserCheckIcon className="h-6 w-6 text-emerald-400 animate-bounce" />
                      <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg animate-pulse"></div>
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-300">
                      Friend Requests
                    </span>
                    <span className="inline-flex items-center justify-center min-w-8 h-6 px-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                      {incomingRequests.length}
                    </span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {incomingRequests.map((request, index) => (
                    <div
                      key={request._id}
                      className="group bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 border border-slate-600/30 hover:border-emerald-400/50 transform hover:-translate-y-1 hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Animated border glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      
                      <div className="relative p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-slate-600/50 group-hover:ring-emerald-400/50 transition-all duration-300">
                                <img 
                                  src={request.sender.profilePic} 
                                  alt={request.sender.fullName}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-slate-800 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                            </div>
                            
                            <div className="min-w-0 flex-1">
                              <h3 className="font-bold text-lg text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300 truncate">
                                {request.sender.fullName}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-400/30 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 group-hover:scale-105">
                                  <span className="truncate">Native: {request.sender.nativeLanguage}</span>
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border border-purple-400/30 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 group-hover:scale-105">
                                  <span className="truncate">Learning: {request.sender.learningLanguage}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10">
                              {isPending ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2"></div>
                                  Accepting...
                                </div>
                              ) : (
                                'Accept'
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Requests Section */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-amber-800/60 via-orange-700/50 to-red-800/60 backdrop-blur-xl rounded-xl border border-amber-500/30 shadow-lg">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                    <div className="relative">
                      <BellIcon className="h-6 w-6 text-amber-400 animate-bounce" />
                      <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse"></div>
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300">
                      New Connections
                    </span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {acceptedRequests.map((notification, index) => (
                    <div 
                      key={notification._id} 
                      className="group bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 border border-slate-600/30 hover:border-amber-400/50 transform hover:-translate-y-1 hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Animated border glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      
                      <div className="relative p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden ring-4 ring-slate-600/50 group-hover:ring-amber-400/50 transition-all duration-300 flex-shrink-0">
                              <img
                                src={notification.recipient.profilePic}
                                alt={notification.recipient.fullName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full border-2 border-slate-800 animate-pulse shadow-lg shadow-amber-400/50"></div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-400 transition-all duration-300 truncate">
                              {notification.recipient.fullName}
                            </h3>
                            <p className="text-sm text-slate-300 group-hover:text-slate-200 my-2 transition-colors duration-300 break-words">
                              <span className="truncate">{notification.recipient.fullName}</span> accepted your friend request
                            </p>
                            <p className="text-xs flex items-center text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                              <ClockIcon className="h-3 w-3 mr-1 flex-shrink-0 group-hover:text-amber-400 transition-colors duration-300" />
                              Recently
                            </p>
                          </div>
                          
                          <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-400/30 rounded-full text-sm font-medium group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                            <MessageSquareIcon className="h-3 w-3 mr-1 animate-pulse" />
                            <span className="whitespace-nowrap">New Friend</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Notifications State */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <div className="transform hover:scale-105 transition-transform duration-300">
                <NoNotificationsFound />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
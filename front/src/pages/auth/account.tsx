import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../lib/api";
import { type IResponse, type IAccount, type IUser } from "../../types";
import { ProfileImage } from "../../lib/helpers/profileImage";
import { useHTTP } from "../../lib/hooks/useHTTP";

export const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { loading, data: account, error, refetch } = useHTTP<IAccount>("/account/" + id, { method: "GET" })
  console.log(account)
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get<IResponse<IAccount>>(`/account/${id}`)
  //     .then((response) => {
  //       if (!response.data.payload) {
  //         return navigate("/profile");
  //       }
  //       setAccount(response.data.payload);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // }, [id]);

  const handleFollow = () => {
    Axios.post<IResponse<IUser>>(`/account/follow/${account?.id}`)
    .then(() => refetch())
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  //Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  // User blocked you
  if (account && account.connection.blockedMe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-black/40 backdrop-blur-xl rounded-2xl border border-red-500/30 p-8 shadow-2xl text-center">
          {/* Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold text-red-400 mb-3">
            Access Blocked
          </h2>
          <p className="text-gray-300 text-lg mb-2">
            Oops!{" "}
            <span className="text-yellow-400 font-semibold">
              {account.name}
            </span>{" "}
            has blocked you.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            You cannot view this profile or interact with this user.
          </p>

          {/* Action Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold shadow-lg hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // You blocked user
  if (account && account.connection.didIBlock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-8 shadow-2xl text-center">
          {/* Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold text-orange-400 mb-3">
            User Blocked
          </h2>
          <p className="text-gray-300 text-lg mb-2">
            You have blocked{" "}
            <span className="text-yellow-400 font-semibold">
              {account.name}
            </span>
            .
          </p>
          <p className="text-gray-500 text-sm mb-8">
            You won't see their content and they can't interact with you.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold shadow-lg hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              Unblock User
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 rounded-xl bg-gray-800/80 text-gray-300 font-semibold border border-gray-700 hover:bg-gray-700 hover:text-yellow-400 hover:border-yellow-500/50 transition-all flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {account && (
        <div className="max-w-4xl mx-auto">
          {/* Cover Photo Section */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-80 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-b-3xl overflow-hidden shadow-2xl">
              {account.cover ? (
                <img
                  src={import.meta.env.VITE_BASE + account.cover}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 via-yellow-600/20 to-gray-900"></div>
              )}
            </div>

            {/* Profile Picture Overlay */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <ProfileImage
                  src={account.picture ?? undefined}
                  className="w-32 h-32 rounded-full border-6 border-black shadow-2xl bg-gray-900 object-cover"
                />
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl text-white font-semibold border border-gray-700 hover:bg-black/80 hover:border-yellow-400 transition-all flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="px-6 pb-6 pt-20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-yellow-400 mb-2 tracking-wide">
                {account.name} {account.surname}
              </h1>

              {/* Privacy Status */}
              <div className="flex items-center justify-center mb-6">
                {account.isPrivate === 1 ? (
                  <div className="flex items-center px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
                    <svg
                      className="w-4 h-4 text-red-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="text-red-400 text-sm font-semibold">
                      Private Account
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                    <svg
                      className="w-4 h-4 text-green-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-green-400 text-sm font-semibold">
                      Public Account
                    </span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">
                      {!account.isPrivate ? account.followers?.length ?? 0 : 0}
                  </p>
                  <p className="text-gray-400 text-sm">Followers</p>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">
                    {!account.isPrivate ? account.following?.length ?? 0 : 0}
                  </p>
                  <p className="text-gray-400 text-sm">Following</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="max-w-sm mx-auto space-y-4 mb-12">
              {/* Follow/Unfollow Button */}
              {account.connection.following ? (
                // Already following - show Unfollow
                <button onClick={handleFollow} className="w-full py-3 rounded-xl bg-gray-800/80 text-gray-300 font-semibold border border-gray-700 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                    />
                  </svg>
                  Unfollow
                </button>
              ) : account.isPrivate === 1 && account.connection.requested ?(
                // Private account with pending request - show Cancel Request
                <button onClick={handleFollow} className="w-full py-3 rounded-xl bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/50 hover:bg-orange-500/30 hover:border-orange-500 transition-all flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Cancel Request
                </button>
              ) : account.connection.folloswMe ? (
                // They follow you but you don't follow them - show Follow Back
                <button onClick={handleFollow} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] hover:from-blue-500 hover:via-blue-400 hover:to-blue-300 transition-all flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  Follow Back
                </button>
              ) : (
                // Default - show Follow
                <button onClick={handleFollow} className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold text-lg shadow-lg hover:scale-[1.02] hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 transition-all flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Follow
                </button>
              )}
            </div>

            {/* Private Account-No posts */}
            {account.isPrivate && (
              <div className="flex flex-col items-center justify-center mx-auto bg-black/30 rounded-2xl border border-gray-700 p-8 text-center w-full max-w-md">
                {/* Casual Padlock Icon */}
                <svg
                  className="w-16 h-16 mb-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>

                {/* Title */}
                <h3 className="text-gray-200 font-semibold text-xl mb-2">
                  This account is private
                </h3>

                {/* Subtitle */}
                <p className="text-gray-500 text-sm max-w-xs">
                  Follow this account to see their posts
                </p>
              </div>
            )}


            {/* Posts Section */}
            {(!account.isPrivate && account.posts && account.posts.length > 0) && (
              <div>
                {/* Posts Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                        Posts
                      </h2>
                      <p className="text-gray-400">
                        {account.posts.length}{" "}
                        {account.posts.length === 1 ? "post" : "posts"} shared
                      </p>
                    </div>
                  </div>
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mt-4"></div>
                </div>

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {account.posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:scale-[1.02] group"
                    >
                      {/* Post Image */}
                      <div className="relative overflow-hidden aspect-square bg-gray-800">
                        <img
                          src={import.meta.env.VITE_BASE + post.picture}
                          alt="Post"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        <p className="text-gray-300 leading-relaxed line-clamp-3">
                          {post.title}
                        </p>

                        {/* Post Actions */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <button className="flex items-center hover:text-yellow-400 transition-colors">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              Like
                            </button>
                            <button className="flex items-center hover:text-yellow-400 transition-colors">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              Comment
                            </button>
                          </div>
                          <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          

            {/* No Posts State */}
            {account.posts && account.posts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">
                  No Posts Yet
                </h3>
                <p className="text-gray-500">
                  This user hasn't shared any posts
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

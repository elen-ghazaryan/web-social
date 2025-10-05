import { Link, useNavigate, useOutletContext } from "react-router-dom";
import type { IContext } from "../../types";
import { Axios } from "../../lib/api";
import { ProfileImage } from "../../lib/helpers/profileImage";
import { useState } from "react";
import { Followers } from "./followers";
import { Followings } from "./followings";
import { Requests } from "./requests";
import { Posts } from "./posts";

export const Profile = () => {
  const { account } = useOutletContext<IContext>()
  const [openFlwers, setOpenFlwers] = useState(false)
  const [openFlwings, setOpenFlwings] = useState(false)

  const navigate = useNavigate()
 

  const handleLogout = () => {
    Axios.post("/logout").then(() => navigate("/login"))
  }


return (
    <div className="pb-10 relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-4xl mx-auto mb-20">
        {/* Cover Photo Section */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-80 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-b-3xl overflow-hidden shadow-2xl">
            {account.cover ? (
              <ProfileImage 
                src={account.cover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 via-yellow-600/20 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-yellow-400 font-semibold">Add Cover Photo</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Picture Overlay */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <ProfileImage
                src={account.picture ?? undefined}
                alt="Profile"
                className="w-32 h-32 rounded-full border-6 border-black shadow-2xl bg-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="px-6 pb-6 pt-20">
          <div className="text-center mb-8">
            {/* Username */}
            <h1 className="text-2xl font-semibold text-yellow-400 mb-1 tracking-normal">
              {account.name} {account.surname}
            </h1>
            
            {/* Privacy Status */}
            <div className="flex items-center justify-center mb-4">
              {account.isPrivate ? (
                <div className="flex items-center px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
                  <svg className="w-4 h-4 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-red-400 text-sm font-semibold">Private Account</span>
                </div>
              ) : (
                <div className="flex items-center px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-400 text-sm font-semibold">Public Account</span>
                </div>
              )}
            </div>

            {/* --- FOLLOWERS, FOLLOWING --- */}
            <div className="flex justify-center space-x-8 mt-6 mb-8 text-gray-300">
                <div onClick={() => setOpenFlwers(true)} className="text-center">
                    <p className="text-2xl font-bold text-white">
                        {account.followers.length ?? 0}
                    </p>
                    <p className="text-sm font-medium text-yellow-400/80">Followers</p>
                </div>
                <div onClick={() => setOpenFlwings(true)} className="text-center">
                    <p className="text-2xl font-bold text-white">
                        {account.following.length ?? 0}
                    </p>
                    <p className="text-sm font-medium text-yellow-400/80">Following</p>
                </div>
            </div>
          </div>

         
          {/* Action Buttons */}
          <div className="max-w-sm mx-auto space-y-4">
             {account.isPrivate && <Requests /> } 
             <Link 
              to="/profile/settings" 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold text-lg shadow-lg hover:scale-[1.02] hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 transition-all flex items-center justify-center"
            >
              Edit Profile
            </Link>
            <button 
              onClick={handleLogout} 
              className="w-full py-3 rounded-xl bg-gray-800/80 text-gray-300 font-semibold border border-gray-700 hover:bg-gray-700 hover:text-yellow-400 hover:border-yellow-500/50 transition-all"
            >
              Logout
            </button>
          </div>

         {/* Followers */}
          {openFlwers && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setOpenFlwers(false)}
            >
              <div
                className="w-full max-w-2xl bg-zinc-900 rounded-xl border border-zinc-700 shadow-2xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-yellow-400">Followers</h2>
                    <button
                      onClick={() => setOpenFlwers(false)}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-yellow-400 rounded-lg border border-zinc-700 transition-colors"
                      aria-label="Close"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                  <Followers />
                </div>
              </div>
            </div>
          )}


          {/* Followings */}
          {openFlwings && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setOpenFlwings(false)}
            >
              <div
                className="w-full max-w-2xl bg-zinc-900 rounded-xl border border-zinc-700 shadow-2xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-yellow-400">Following</h2>
                    <button
                      onClick={() => setOpenFlwings(false)}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-yellow-400 rounded-lg border border-zinc-700 transition-colors"
                      aria-label="Close"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                  <Followings />
                </div>
              </div>
            </div>
          )}

          

        </div>
      </div>

      {/*----- POSTS -----*/}
      <Posts />
    </div>
    
  );
};

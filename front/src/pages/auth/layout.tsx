import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";
import { type IUser, type IResponse } from "../../types";
import { ProfileImage } from "../../lib/helpers/profileImage";

export const Layout = () => {
  const navigate = useNavigate()
  const [account, setAccount] = useState<IUser | null>(null)

  useEffect(() => {
    Axios.get<IResponse>("/verify")
    .then(response => {
      setAccount(response.data.payload as IUser)
    })
    .catch(() => 
      navigate("/login")
    )
  }, [])

  return account && (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-2xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
         {/* Logo */}
          <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                MyApp
              </h1>
          </div>
          
          <div className="flex space-x-2">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black shadow-lg shadow-yellow-500/25"
                    : "hover:bg-gray-800 hover:shadow-md text-gray-300 hover:text-yellow-400"
                }`
              }
            >
              Profile
            </NavLink>

             <NavLink
              to="/profile/search"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black shadow-lg shadow-yellow-500/25"
                    : "hover:bg-gray-800 hover:shadow-md text-gray-300 hover:text-yellow-400"
                }`
              }
            >
              Search
            </NavLink>

            <NavLink
              to="/profile/posts"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black shadow-lg shadow-yellow-500/25"
                    : "hover:bg-gray-800 hover:shadow-md text-gray-300 hover:text-yellow-400"
                }`
              }
            >
              Posts
            </NavLink>

            <NavLink
              to="/profile/followers"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black shadow-lg shadow-yellow-500/25"
                    : "hover:bg-gray-800 hover:shadow-md text-gray-300 hover:text-yellow-400"
                }`
              }
            >
              Followers
            </NavLink>

            <NavLink
              to="/profile/followings"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black shadow-lg shadow-yellow-500/25"
                    : "hover:bg-gray-800 hover:shadow-md text-gray-300 hover:text-yellow-400"
                }`
              }
            >
              Followings
            </NavLink>

            <NavLink
              to="/profile/settings"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black shadow-lg shadow-yellow-500/25"
                    : "hover:bg-gray-800 hover:shadow-md text-gray-300 hover:text-yellow-400"
                }`
              }
            >
              Settings
            </NavLink>
          </div>
          
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">{account.name} {account.surname}</p>
              </div>
              <ProfileImage
                src={account.picture ?? undefined}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-yellow-400 transition-colors"
              />
            </div>
          
          </div>
      </nav>

      {/* Page Content */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
        <Outlet 
          context={{ account, setAccount }}
        />
      </div>
    </>
  );
};

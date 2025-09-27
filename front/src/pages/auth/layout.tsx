import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";
import { type IUser, type IResponse } from "../../types";

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
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">MyApp</h1>

          <div className="flex space-x-6">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "hover:bg-gray-700"
                }`
              }
            >
              Profile
            </NavLink>

            <NavLink
              to="/profile/posts"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "hover:bg-gray-700"
                }`
              }
            >
              Posts
            </NavLink>

            <NavLink
              to="/profile/followers"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "hover:bg-gray-700"
                }`
              }
            >
              Followers
            </NavLink>

            <NavLink
              to="/profile/followings"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "hover:bg-gray-700"
                }`
              }
            >
              Followings
            </NavLink>

            <NavLink
              to="/profile/settings"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "hover:bg-gray-700"
                }`
              }
            >
              Settings
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        <Outlet 
          context={{ account }}
        />
      </div>
    </>
  );
};

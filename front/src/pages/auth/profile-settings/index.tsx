import { Link } from "react-router-dom";
import { UpdateLogin } from "./updateLogin";
import { UpdatePassword } from "./updatePassword";
import { ImagePicker } from "./utilities/image-picker";
import { CoverPicker } from "./utilities/cover-picker";
import { UpdateStatus } from "./updateStatus";

export const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4 tracking-wide">
            Settings
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Settings Grid */}
        <div className="grid md:grid-cols-1 gap-8">
          {/* Update Password */}
          <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-yellow-500/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-400">Update Password</h2>
            </div>
            <UpdatePassword />
          </div>

          {/* Update Login */}
          <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-yellow-500/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-400">Update Login</h2>
            </div>
            <UpdateLogin />
          </div>

          {/* Profile Picture */}
          <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-yellow-500/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-400">Profile Picture</h2>
            </div>
            <ImagePicker />
          </div>
        

        {/* Cover Picture */}
          <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-yellow-500/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-400">Cover Picture</h2>
            </div>
            <CoverPicker />
          </div>
        

        
        {/* Account Status */}
          <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-yellow-500/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-400">Cover Picture</h2>
            </div>
            <UpdateStatus />
          </div>
        </div>
       

        {/* Back to Profile Link */}
        <div className="text-center pt-8">
          <Link 
            to="/profile"
            className="inline-flex items-center px-6 py-3 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 hover:border-yellow-500/50 rounded-xl text-gray-300 hover:text-yellow-400 font-semibold transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
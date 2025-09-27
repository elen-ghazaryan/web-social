import { useOutletContext } from "react-router-dom";
import type { IContext } from "../../types";

export const Profile = () => {
  const { account } = useOutletContext<IContext>()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-sm bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 text-center">
        {/* Profile Picture */}
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto shadow-lg border-4 border-gray-700"
        />

        {/* Username */}
        <h2 className="mt-4 text-2xl font-bold text-white">{account.name} {account.surname}</h2>
        <p className="text-gray-400 text-sm">Frontend Developer</p>

        {/* Actions */}
        <div className="mt-6 flex flex-col space-y-3">
          <button className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-[1.02] transition-transform">
            Edit Profile
          </button>
          <button className="w-full py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold border border-gray-700 hover:bg-gray-700 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

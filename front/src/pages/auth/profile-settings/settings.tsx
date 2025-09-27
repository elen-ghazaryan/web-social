import { UpdateLogin } from "./updateLogin";
import { UpdatePassword } from "./updatePassword";

export const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-white mb-4">Settings</h1>

      {/* Update Password */}
      <UpdatePassword />

      {/* Update Login */}
      <UpdateLogin />
    </div>
  );
};

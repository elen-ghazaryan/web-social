import { useForm, type SubmitHandler } from "react-hook-form";
import type { IResponse, UpdateUserPassword } from "../../../types";
import { Axios } from "../../../lib/api";
import axios from "axios";
import { useState } from "react";

export const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserPassword>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false)
  

  const handleUpdatePassword: SubmitHandler<UpdateUserPassword> = (data) => {
    Axios.patch("/update/password", {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
      .then(() => {
        setError("");
        setSuccess(true)
        reset();
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err.response?.data as IResponse;
          setError(responseError.message);
          setSuccess(false);
        }
      });
  };

 return (
    <section className="max-w-xl mx-auto bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Update Password
          </h2>
          <p className="mt-1 text-sm text-gray-300">
            Change your password credentials securely.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleUpdatePassword)}
        className="space-y-6"
      >
        {/* Current Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Password
          </label>
          <input
            {...register("oldPassword", { required: "Current password is required" })}
            placeholder="Enter your current password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-gray-600 py-3 px-4 text-white bg-gray-800/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
          />
          {errors.oldPassword && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* New Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            New Password
          </label>
          <input
            {...register("newPassword", {
              required: "Enter new password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password (min. 8 characters)"
            className="w-full rounded-xl border border-gray-600 py-3 px-4 text-white bg-gray-800/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
          />

          {errors.newPassword && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Password Strength Indicator */}
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">Password Requirements:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li className="flex items-center">
              <svg className="w-3 h-3 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              At least 8 characters long
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mix of letters, numbers recommended
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-xl py-3 bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold shadow-lg hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300"
          >
            Update Password
          </button>
        </div>

        {/* Success or Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-green-400 text-sm font-medium">Password updated successfully!</p>
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <button
            onClick={() => reset()}
            type="button"
            className="text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Form
          </button>
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure password change
          </div>
        </div>
      </form>
    </section>
  );
};

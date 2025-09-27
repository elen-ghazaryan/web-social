import { useForm, type SubmitHandler } from "react-hook-form";
import type { AuthUser, IResponse } from "../../../types";
import { Axios } from "../../../lib/api";
import axios from "axios";
import { useState } from "react";

export const UpdateLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthUser>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdateLogin: SubmitHandler<AuthUser> = (data) => {
    Axios.patch("/update/login", {
      password: data.password,
      newLogin: data.login,
    })
      .then(() => {
        setError("")
        setSuccess(true)
        reset();
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err.response?.data as IResponse;
          setError(responseError.message);
          setSuccess(false)
        }
      });
  };

  return (
    <section className="max-w-xl mx-auto bg-white/5 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-lg mt-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-700">
            Update Login
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Change your login credentials.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleUpdateLogin)}
        className="mt-6 space-y-4 w-full max-w-md mx-auto"
      >
        {/* Login Field */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            New Login
          </label>
          <input
            {...register("login", { required: "Please enter a new login" })}
            placeholder="Enter new login"
            autoComplete="new-login"
            className="w-full rounded-lg border border-gray-700 py-2.5 px-4 text-sm bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.login && (
            <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-700 py-2.5 px-4 text-sm bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full rounded-lg py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-md hover:opacity-95 transition"
          >
            Save
          </button>
        </div>

        {/* Success or Error message */}
        {error && (
          <p className="text-red-500 bg-red-100 border border-red-400 rounded-md px-3 py-2 text-sm mt-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 bg-green-100 border border-green-400 rounded-md px-3 py-2 text-sm mt-2">
            Login updated successfully!
          </p>
        )}


        {/* Bottom actions */}
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={() => reset()}
            type="button"
            className="text-sm text-gray-700 hover:text-black transition"
          >
            Reset
          </button>
          <p className="text-xs text-gray-500">
            Changing login requires your current password.
          </p>
        </div>
      </form>
    </section>
  );
};

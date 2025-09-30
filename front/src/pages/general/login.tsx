import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { type AuthUser, type IResponse} from "../../types";
import { Axios } from "../../lib/api";
import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const {register, handleSubmit, formState: { errors} } = useForm<AuthUser>()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleLogin:SubmitHandler<AuthUser> = (data) => {
    Axios
    .post("/login", data)
    .then(() => {
      navigate("/profile")
    }).catch((err) => {
      if (axios.isAxiosError(err)) {
        const errorResp = err.response?.data as IResponse
        setError(errorResp.message)
      } else if (err instanceof Error) {
        setError(err.message) // handle other JS errors
      } else {
        setError("Unknown error")
      }
    })
  }

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6 tracking-wide">
          Welcome Back
        </h1>
        {error && <p className="text-red-400 my-2">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Login */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Login</label>
            <input
              {...register("login",{ required: "Please fill your login" })}
              type="text"
              placeholder="Enter your login"
              className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.login && <p className="text-red-400 text-sm my-2">{errors.login.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
             {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.password && <p className="text-red-400 text-sm my-2">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold text-lg shadow-lg hover:scale-[1.02] hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link to="/" className="text-yellow-400 hover:text-yellow-300 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
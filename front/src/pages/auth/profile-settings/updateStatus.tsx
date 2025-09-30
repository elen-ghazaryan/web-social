import { useOutletContext } from "react-router-dom"
import { type IContext, type IResponse } from "../../../types"
import { useState } from "react"
import { Axios } from "../../../lib/api"
import axios from "axios"

export const UpdateStatus = () => {
  const { account, setAccount } = useOutletContext<IContext>()
  const [locked, setLocked] = useState(account.isPrivate === 1)
  const [loading, setLoading] = useState(false)

  const handleTogglePrivacy = () => {
    setLoading(true)
    const newPrivacyStatus = locked ? 0 : 1
    Axios
      .patch("/account/set")
      .then(() => {
        setLocked(!locked)
        setAccount({ ...account, isPrivate: newPrivacyStatus })
        setLoading(false)
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          const responseError = err.response?.data as IResponse
          console.error(responseError)
        }
        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Account Privacy</h1>
          <p className="text-gray-400">Control who can see your content</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mt-4"></div>
        </div>

        {/* Privacy Status Card */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 shadow-2xl">
          {/* Current Status */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mb-6 shadow-2xl">
              {locked ? (
                <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ) : (
                <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              )}
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">
              {locked ? "Private Account" : "Public Account"}
            </h2>
            
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${
              locked 
                ? "bg-red-500/20 border border-red-500/30" 
                : "bg-green-500/20 border border-green-500/30"
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                locked ? "bg-red-400" : "bg-green-400"
              } animate-pulse`}></div>
              <span className={`text-sm font-semibold ${
                locked ? "text-red-400" : "text-green-400"
              }`}>
                {locked ? "Content is private" : "Content is visible to everyone"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What this means:
            </h3>
            {locked ? (
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Only approved followers can see your posts
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  You need to approve new follow requests
                </li>
              </ul>
            ) : (
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Anyone can see your posts and profile
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Anyone can follow you without approval
                </li>
              </ul>
            )}
          </div>

          {/* Toggle Privacy Button */}
          <div className="text-center">
            <button
              onClick={handleTogglePrivacy}
              disabled={loading}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-bold text-lg shadow-lg hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Updating...
                </>
              ) : locked ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Switch to Public
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Switch to Private
                </>
              )}
            </button>
          </div>
        </div>

        {/* Warning/Info Box */}
        <div className={`mt-8 rounded-xl p-6 border ${
          locked 
            ? "bg-yellow-500/10 border-yellow-500/30" 
            : "bg-blue-500/10 border-blue-500/30"
        }`}>
          <div className="flex items-start">
            <svg className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
              locked ? "text-yellow-400" : "text-blue-400"
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 className={`font-semibold mb-1 ${
                locked ? "text-yellow-400" : "text-blue-400"
              }`}>
                {locked ? "Note:" : "Tip:"}
              </h4>
              <p className="text-sm text-gray-300">
                {locked 
                  ? "Switching to public will make all your current posts visible to everyone immediately."
                  : "You can switch back to private at any time to control who sees your content."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
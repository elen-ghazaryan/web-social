import { useEffect, useState } from "react"
import { type IResponse, type IUser } from "../../types"
import { Axios } from "../../lib/api"
import { ProfileImage } from "../../lib/helpers/profileImage"
import { Link } from "react-router-dom"
import { useDebounce } from "../../lib/hooks/useDebounce"


export const Search = () => {
  const [text, setText] = useState("")
  const searchText = useDebounce(text, 400);
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!searchText) {
      setUsers([])
      setLoading(false)
      return
    }
    
    setLoading(true)
    Axios.get<IResponse<IUser[]>>(`/search/${searchText}`)
      .then(response => {
          setUsers(response.data.payload)
          setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })

  },[searchText])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Search Users</h1>
          <p className="text-gray-400">Find and connect with friends</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mt-4"></div>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search by name or username..."
              className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-xl border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300" 
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
              <button 
                onClick={() => setText("")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Results Count */}
          {text && (
            <div className="flex items-center mt-3 text-sm">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-gray-400">Searching...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-400">
                    {users.length === 0 ? "No users found" : `${users.length} ${users.length === 1 ? 'user' : 'users'} found`}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">Searching...</h3>
            <p className="text-gray-500">Finding users for you</p>
          </div>
        )}

        {/* Empty State - No Search */}
        {!text && !loading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">Start Searching</h3>
            <p className="text-gray-500">Type a name to find users</p>
          </div>
        )}

        {/* Empty State - No Results */}
        {text && users.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No Users Found</h3>
            <p className="text-gray-500">Try searching with a different name</p>
          </div>
        )}

        {/* User Results List */}
        {text && users.length > 0 && !loading && (
          <div className="space-y-4">
            {users.map(user => (
              <div 
                key={user.id}
                className="bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 p-6 group"
              >
                <div className="flex items-center gap-6">
                  {/* User Avatar */}
                  <div className="relative flex-shrink-0">
                    <ProfileImage
                      className="w-20 h-20 rounded-full object-cover border-4 border-gray-700 group-hover:border-yellow-500/50 transition-all duration-300 shadow-xl" 
                      src={user.picture ?? undefined}
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-yellow-400/0 group-hover:ring-yellow-400/20 transition-all duration-300"></div>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {user.name} {user.surname}
                      </h3>
                      
                      {/* Privacy Badge */}
                      {user.isPrivate === 1 && (
                        <div className="flex items-center px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
                          <svg className="w-3 h-3 text-red-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-red-400 text-xs font-semibold">Private</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <Link 
                    to={`/profile/${user.id}`} 
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold shadow-lg hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300 flex items-center flex-shrink-0"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



import { useEffect, useState } from "react"
import { type IPost, type IResponse} from "../../../types"
import { Axios } from "../../../lib/api"
import axios from "axios"
import { Link } from "react-router-dom"

export const PostList= () => {
  const [posts, setPosts] = useState<IPost[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    Axios
      .get<IResponse<IPost[]>>("/posts")
      .then(response => {
        setPosts(response.data.payload)
        setLoading(false)
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          const responseError = err.response?.data as IResponse
          setError(responseError?.message || "Failed to load posts")
          console.error(responseError)
        }
        setLoading(false)
      })
  }, [])

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading posts...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-8 py-6 max-w-md">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-red-400">Error Loading Posts</h2>
          </div>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    )
  }

  // Empty State
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">No Posts Yet</h2>
          <p className="text-gray-400 text-lg mb-8">Start sharing your moments with the world!</p>
          <Link to="/profile/addPost" className="px-8 py-3 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold shadow-lg hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Post
          </Link>
        </div>
      </div>
    )
  }

  // Posts Grid
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-yellow-400 mb-2">Your Posts</h1>
              <p className="text-gray-400">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} shared
              </p>
            </div>
            <Link to="/profile/addPost" className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold shadow-lg hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300 inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </Link>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mt-4"></div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <article 
              key={post.id} 
              className="bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:scale-[1.02] group"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden aspect-square bg-gray-800">
                <img 
                  src={import.meta.env.VITE_BASE + post.picture} 
                  alt="Post"
                  className="w-full h-full object-cover group-hover:transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed line-clamp-3">
                  {post.title}
                </p>

                {/* Post Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <button className="flex items-center hover:text-yellow-400 transition-colors">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Like
                    </button>
                    <button className="flex items-center hover:text-yellow-400 transition-colors">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Comment
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
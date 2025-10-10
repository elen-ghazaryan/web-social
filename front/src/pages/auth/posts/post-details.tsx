import { useEffect, useState } from 'react';
import { useHTTP } from '../../../lib/hooks/useHTTP';
import { type IResponse, type IComment, type IPost, type IContext } from '../../../types';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Axios } from '../../../lib/api';
import { ProfileImage } from '../../../lib/helpers/profileImage';

export const PostDetails = () => {
  const { id } = useParams()
  const {loading, data: post, error, refetch} = useHTTP<IPost>("/posts/" + id, { method: "GET" })

  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [openLikes, setOpenLikes] = useState(false)
  const navigate = useNavigate()
  
  const { account } = useOutletContext<IContext>()

  useEffect(() => {
    if (post && account) {
      setIsLiked(post.likes.some(user => user.id === account.id));
    }
  }, [post, account]);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      Axios.post<IResponse<IComment>>(`/posts/comment/${post?.id}`, { text: commentText })
      .then(() => {
        refetch()
        setCommentText("")
      })
    }
  };

  const handleDeleteComment = (id: number) => {
    Axios.delete(`/posts/comment/${id}`)
    .then(() => {
      refetch()
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleLike = () => {
    Axios.post(`/posts/react/${post?.id}`)
    .then(() => refetch())
    .catch(err => console.error(err))
  }

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

  return post && (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Post Image Section */}
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800/50">
              <div className="relative aspect-square bg-gray-800">
                <img
                  src={import.meta.env.VITE_BASE + post.picture}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Post Title */}
              <div className="p-6">
                <h1 className="text-xl font-bold text-white mb-4">{post.title}</h1>
                
                {/* Like & Comment Buttons */}
                <div className="flex items-center gap-6 pb-4 border-b border-gray-700/50">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group"
                  >
                    <svg
                      className={`w-6 h-6 group-hover:scale-110 transition-transform ${
                        isLiked ? 'fill-yellow-400 text-yellow-400' : ''
                      }`}
                      fill={isLiked ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="font-medium">
                      {post.likes.length} Likes
                    </span>
                  </button>

                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="font-medium">{post.comments.length} Comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

           {/* Comments Section */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden flex flex-col h-[600px]">
              {/* Comments Header */}
              <div className="p-4 border-b border-gray-700/50">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Comments
                </h2>
              </div>

              {/* Comments List - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {post.comments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm font-medium">No comments yet</p>
                    <p className="text-gray-500 text-xs mt-2">Be the first to comment!</p>
                  </div>
                ) : (
                  post.comments.map((comment) => (
                   <div key={comment.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-600">
                      <ProfileImage
                        src={comment.user.picture}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 relative">
                      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                        <div className="flex justify-between items-center">
                          <p className="text-white font-semibold text-sm">
                            {comment.user.name} {comment.user.surname}
                          </p>

                          {
                            (account.id === comment.user.id) &&                      
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-gray-400 hover:text-red-500 transition text-xs"
                            >
                              ✕
                            </button>
                          }
                          
                        </div>

                        <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-800/50 text-white px-4 py-2 rounded-lg border border-gray-700/50 focus:border-yellow-500 focus:outline-none placeholder-gray-500 text-sm"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!commentText.trim()}
                    className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Trigger Button */}
              <button
                onClick={() => setOpenLikes(!openLikes)}
                className="flex items-center gap-2 px-4 py-2 mt-3 text-white font-semibold rounded-lg hover: hover:text-yellow-600 transition-colors"
              >
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                See who liked ({post.likes.length})
              </button>

              {/* Likes List Container */}
              {openLikes && (
                <div className="mt-4 bg-gray-800 rounded-xl w-full max-w-md shadow-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                      <h2 className="text-l font-bold text-white">
                        Liked by {post.likes.length} {post.likes.length === 1 ? 'person' : 'people'}
                      </h2>
                    </div>
                    <button
                      onClick={() => setOpenLikes(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Likes List */}
                  {post.likes.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto p-4 space-y-3">
                      {post.likes.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:bg-gray-700/50 transition-colors"
                        >
                          {/* Avatar */}
                          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                            <ProfileImage src={user.picture ?? undefined}/>
                          </div>
                          
                          {/* User Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                            <p className="text-gray-400 text-xs truncate">{user.surname}</p>
                          </div>

                          {/* View Button */}
                          <Link to={`/profile/${user.id}`} className="px-3 py-1.5 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors text-xs flex-shrink-0">
                            View
                          </Link>
                        </div>
                      ))}
                    </div>
                          ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-400 text-lg">No likes yet</p>
                      <p className="text-gray-500 text-sm mt-2">Be the first to like this post!</p>
                    </div>
                  )}
                </div>
              )}

          </div>
        </div>
      </div>
    </div>
  );
};
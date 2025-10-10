import { Link } from "react-router-dom";
import type { IPost } from "../../../types";

interface IPostProps {
  post: IPost
  isOwner: boolean
  onDelete?: (id: number) => void 
}

export const PostItem: React.FC<IPostProps> = ({ post, isOwner, onDelete }) => {
  return (
    <>
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
        <Link
          to={`/profile/posts/${post.id}`}
          className="text-gray-400 hover:text-yellow-400 text-sm font-medium transition-colors flex items-center gap-1 group"
        >
          <span>View Details</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        
        {isOwner && onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors flex items-center gap-1 group"
          >
            <svg 
              className="w-4 h-4 group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        )}
      </div>

        </div>
      </article>
    </>
  );
};



              {/* <button className="flex items-center hover:text-yellow-400 transition-colors">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
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
                Like
              </button> */}
              {/* <button className="flex items-center hover:text-yellow-400 transition-colors">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Comment
              </button> */}
            

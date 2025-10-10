import { type IPost, type IResponse } from "../../../types";
import { useRef, useState } from "react";
import { Axios } from "../../../lib/api";
import { useNavigate } from "react-router-dom";

export const AddPost = () => {
  const [content, setContent] = useState("");
  const postInput = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePreview = () => {
    if (postInput.current?.files) {
      const file = postInput.current.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    const file = postInput.current?.files?.[0];
    if (!file || !content.trim()) {
      setError("Both fields are required!");
      return;
    }

    const form = new FormData();
    form.append("photo", file);
    form.append("content", content);
    
    Axios.post<IResponse<IPost>>("/posts", form)
    .then(() => {
      navigate("/profile/posts");
    })
    .catch(err => setError(err.response?.data?.message || err.message || "Something went wrong!"))
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">
            Create New Post
          </h1>
          <p className="text-gray-400">Share your moment with the world</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mt-4"></div>
        </div>

        {/* Form Container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 shadow-2xl">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Post Image *
            </label>

            {/* Upload Area */}
            <div
              onClick={() => postInput.current?.click()}
              className="border-2 border-dashed border-gray-600 rounded-2xl p-12 text-center hover:border-yellow-500/50 transition-all duration-300 cursor-pointer bg-gray-800/30 hover:bg-gray-800/50"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    className="w-10 h-10 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-300 font-semibold mb-2">
                  Click to upload image
                </p>
                <p className="text-gray-500 text-sm">PNG, JPG, GIF</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={postInput}
                onChange={handlePreview}
                required={true}
              />
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="mt-4">
                <div className="relative rounded-2xl overflow-hidden border-4 border-gray-600 shadow-xl">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-96 object-cover"
                  />
                  <button
                    onClick={() => setPreview("")}
                    type="button"
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content/Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Caption *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your caption here... What's on your mind?"
              rows={6}
              required={true}
              className="w-full rounded-xl border border-gray-600 py-3 px-4 text-white bg-gray-800/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">Share your thoughts...</p>
              <p className="text-xs text-gray-400">0 / 500</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleUpload}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-bold text-lg shadow-lg hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Publish Post
            </button>
            <button
              onClick={() => {
                setPreview("");
                setContent("");
              }}
              type="button"
              className="px-8 py-4 rounded-xl bg-gray-800 text-gray-300 font-semibold border border-gray-600 hover:bg-gray-700 hover:text-yellow-400 hover:border-yellow-500/50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gray-800/40 border border-gray-700 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Posting Tips
          </h3>
          <ul className="text-xs text-gray-400 space-y-2">
            <li className="flex items-start">
              <svg
                className="w-3 h-3 text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Choose a clear and high-quality image
            </li>
            <li className="flex items-start">
              <svg
                className="w-3 h-3 text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Write an engaging caption to tell your story
            </li>
            <li className="flex items-start">
              <svg
                className="w-3 h-3 text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Both image and caption are required
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

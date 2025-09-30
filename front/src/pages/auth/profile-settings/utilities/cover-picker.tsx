import { useRef, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { type IResponse, type IContext } from "../../../../types"
import { Axios } from "../../../../lib/api"

export const CoverPicker = () => {
  const coverInput = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState("")
  const navigate = useNavigate()
  const { account, setAccount } = useOutletContext<IContext>()

  const handlePreview = () => {
    if(coverInput.current?.files) {
      const file = coverInput.current.files[0]

      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if(coverInput.current?.files) {
      const file = coverInput.current.files[0]

      const form = new FormData()
      form.append("cover", file)

      Axios.patch<IResponse<string>>("/cover/upload", form)
      .then((response) => {
        setAccount({...account, cover: response.data.payload})
        navigate("/profile")
      })
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl">
      <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
        <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Upload Cover Picture
      </h3>

      <div className="space-y-6">
        {/* Upload Button */}
        <button
          onClick={() => coverInput.current?.click()} 
          className="w-full bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 text-black font-semibold rounded-xl py-4 px-6 hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Choose Picture
        </button>
        
        <input 
          className="hidden"
          type="file"
          ref={coverInput}
          onChange={handlePreview}
          accept="image/*"
        />

        {/* Preview Section */}
        {preview && (
          <div className="space-y-4">
            {/* Divider */}
            <div className="border-t border-gray-700/50 pt-6">
              <p className="text-gray-300 mb-4 font-medium flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview:
              </p>
              
              {/* Image Preview */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img 
                    className="w-56 h-56 object-cover rounded-2xl border-4 border-gray-600 shadow-2xl"
                    src={preview}
                    alt="Preview"
                  />
                  {/* Overlay effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-yellow-400/20"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={handleUpload} 
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl py-3 px-4 hover:from-green-500 hover:to-green-400 hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Upload
                </button>
                <button 
                  onClick={() => setPreview("")} 
                  className="flex-1 bg-gray-800 text-gray-300 font-semibold rounded-xl py-3 px-4 border border-gray-600 hover:bg-gray-700 hover:text-yellow-400 hover:border-yellow-500/50 transition-all duration-300 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
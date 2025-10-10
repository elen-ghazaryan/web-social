import { useEffect, useState } from "react"
import { Axios } from "../../lib/api"
import { type IContext, type IRequest, type IResponse } from "../../types"
import { ProfileImage } from "../../lib/helpers/profileImage";
import { useOutletContext } from "react-router-dom";

export const Requests = () => {
  const { account, setAccount } = useOutletContext<IContext>()
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    Axios.get<IResponse<IRequest[]>>("/requests")
      .then(resp => setRequests(resp.data.payload));
  }, []);

  const handleAccept = (req: IRequest) => {
    Axios.patch("/requests/accept/" + req.id)
    .then(() => {
      setRequests(prev => prev.filter(request => request.id !== req.id))
      setAccount({
        ...account,
        followers: [...account.followers, { id: req.user.id, name: req.user.name, surname: req.user.surname, picture: req.user.picture, isPrivate:req.user.isPrivate, cover: req.user.cover }]
      });
    })
    .catch(err => console.error(err))
  };

  const handleDecline = (req: IRequest) => {
    Axios.patch("/requests/decline/" + req.id)
    .then(() => setRequests(prev => prev.filter(request => request.id !== req.id)))
    .catch(err => console.error(err))
  };



  return (
  <>
    <div className="flex justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-zinc-800/50 hover:bg-zinc-700/70 border border-yellow-400/30 hover:border-yellow-400 text-yellow-400 hover:text-yellow-300 font-semibold text-lg rounded-xl shadow-lg backdrop-blur-sm transition-all hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        See requests
      </button>
    </div>
  
    {isOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-2xl bg-zinc-900 rounded-xl border border-zinc-700 shadow-2xl max-h-[90vh] overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-yellow-400 font-medium">User Requests</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-yellow-400 rounded-lg border border-zinc-700 transition-colors"
                aria-label="Close"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            {requests && requests.length > 0 ? (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                {requests.map(req => (
                  <div 
                    key={req.id}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 hover:border-yellow-400 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <ProfileImage 
                          src={req.user.picture ?? undefined} 
                          alt={req.user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-yellow-400 truncate">
                            {req.user.name } { req.user.surname} 
                          </h3>
                          <p className="text-gray-400 text-xs">
                            <span className="text-gray-500">{req.user.isPrivate ? "Private" : "Public"} Account</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 flex-shrink-0">
                        <button
                          onClick={() => handleAccept(req)}
                          className="px-6 py-2 bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-500 hover:scale-[1.02] hover:from-gray-600 hover:via-yellow-500 hover:to-yellow-400 text-black font-semibold rounded-lg transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(req)}
                          className="px-6 py-2 bg-zinc-700 hover:bg-zinc-600 hover:scale-[1.02] text-gray-300 font-semibold rounded-lg border border-zinc-600 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-12 text-center">
                <p className="text-gray-400 text-lg">No pending requests</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  )
};
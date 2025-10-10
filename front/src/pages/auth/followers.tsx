import { useEffect, useState } from "react"
import { Axios } from "../../lib/api"
import { type IResponse, type IUser } from "../../types";
import { ProfileImage } from "../../lib/helpers/profileImage";
import { Link } from "react-router-dom";

export const Followers = () => {
  const [followers, setFollowers] = useState<IUser[]>([]);

  useEffect(() => {
    Axios.get<IResponse<IUser[]>>("/followers")
      .then((resp) => {
        console.log(resp.data)
        setFollowers(resp.data.payload);
      })
  }, [])

  return (
    <div>
      {followers && followers.length > 0 ? (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {followers.map((follower) => (
            <Link to={`/profile/${follower.id}`}
              key={follower.id}
              className="flex items-center gap-4 p-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-yellow-400 transition-colors"
            >
              <ProfileImage
                src={follower.picture ?? undefined} 
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-yellow-400 truncate">
                  {follower.name} {follower.surname}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">No followers yet</p>
        </div>
      )}
    </div>
  )
}
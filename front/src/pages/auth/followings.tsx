import { useEffect, useState } from "react";
import type { IUser } from "../../types";
import { Axios } from "../../lib/api";
import { ProfileImage } from "../../lib/helpers/profileImage";
import { Link } from "react-router-dom";

export const Followings = () => {
  const [followings, setFollowings] = useState<IUser[]>([]);

  useEffect(() => {
    Axios.get("/followings")
      .then((resp) => {
        setFollowings(resp.data.payload);
      })
  }, [])

  return (
    <div>
      {followings && followings.length > 0 ? (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {followings.map((following) => (
            <Link to={`/profile/${following.id}`}
              key={following.id}
              className="flex items-center gap-4 p-4 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-yellow-400 transition-colors"
            >
              <ProfileImage 
                src={following.picture ?? undefined}
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-yellow-400 truncate">
                  {following.name} {following.surname}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">Not following anyone yet</p>
        </div>
      )}
    </div>
  )
}
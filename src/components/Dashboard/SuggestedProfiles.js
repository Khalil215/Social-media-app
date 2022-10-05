import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import UserDataContext from "../../context/userdata"
import { updateFollowedUserFollowers, updateLoggedInUserFollowing, getUserByUid } from "../../hooks/FirestoreServices"

export default function SuggestedProfiles({ profiles, userData }) {

  const { setActiveUser } = useContext(UserDataContext)
  const [followed, setFollowed] = useState(false)


  
  async function handleFollow(e) {
    e.preventDefault()
    setFollowed(true)
    await updateLoggedInUserFollowing(userData, profiles.userId, false)
    await updateFollowedUserFollowers(userData, profiles.docId, false)

    const user = await getUserByUid(userData.userId)
    setActiveUser(user)
    // console.log(user);
  }



  return ( !followed?
    (<div className="suggestedprofiles">
      <Link to={`/dashboard/p/${profiles.username}`}>
        <div className="suggesteduser">
          <img src={profiles.imageSrc} alt="" />
          <p>{profiles.username}</p>
        </div>
      </Link>
      <button className="follow" onClick={handleFollow}>Follow</button>
    </div>):(null)
  )
}

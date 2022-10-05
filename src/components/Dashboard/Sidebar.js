import { useContext, useEffect } from "react"
import UserDataContext from '../../context/userdata'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getSuggestedProfiles } from "../../hooks/FirestoreServices"
import { useState } from "react"
import SuggestedProfiles from "./SuggestedProfiles"


export default function Sidebar() {
  const { userData } = useContext(UserDataContext)
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {

    async function getUsersNotFollowing() {
      const users = await getSuggestedProfiles(userData)
      setProfiles(users)
      // console.log(profiles);
    }
    if (userData) {
      getUsersNotFollowing()
    }
  }, [userData])
 

  return !profiles ? (
  <SkeletonTheme  baseColor="#162329" highlightColor="#193741"><Skeleton className="sidebar" height={200} width={350} count={1} /></SkeletonTheme>) : profiles.length > 0 && (<>
  <div className="sidebar">
    <p className="sidebarp">Suggestions for you </p>
  {profiles.map(profiles => <SuggestedProfiles key={profiles.userId} profiles={profiles} userData={userData}/>)}
  </div>
  </>)
}



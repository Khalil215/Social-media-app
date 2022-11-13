import { useContext, useEffect } from "react"
import UserDataContext from '../../context/userdata'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getSuggestedProfiles } from "../../hooks/FirestoreServices"
import { useState } from "react"
import SuggestedProfiles from "./SuggestedProfiles"


export default function Sidebar({ viewProfiles }) {
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

  // console.log(viewProfiles);
  return (<div className={viewProfiles ?'none': ''}>
    {!profiles ? (<div className="sidebarSkel"><Skeleton className="sp" height={`100%`} count={3} /></div>) : profiles.length > 0 && (<>
      <div className="sidebar">
        <p className="sidebarp">Suggestions for you </p>
        {profiles.map(profiles => <SuggestedProfiles key={profiles.userId} profiles={profiles} userData={userData} />)}
      </div>
    </>)}
  </div>)
}



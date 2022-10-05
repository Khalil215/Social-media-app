import Chats from "./Chat";
import { Link, Route, Routes } from 'react-router-dom';
import '../../styles/chats.css'
import { getFollowedProfiles } from "../../hooks/FirestoreServices";
import { useContext, useEffect } from "react";
import { useState } from "react";
import UserDataContext from "../../context/userdata";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Chat() {
  const [followed, setFollowed] = useState(null)
  const { userData } = useContext(UserDataContext)

  useEffect(() => {
    async function getChats() {
      const followedProfiles = await getFollowedProfiles(userData)
      setFollowed(followedProfiles)
      // console.log( followedProfiles);
    }
    if (userData) {
      getChats()
    }
  }, [userData])

  return (
    <div className='chat'>
      {!followed ? (
        <SkeletonTheme baseColor="#162329" highlightColor="#193741" ><div className='chatskel'><Skeleton height={100} width={350} count={1} /><Skeleton height={100} width={350} count={1} /><Skeleton height={100} width={350} count={1} /><Skeleton height={100} width={350} count={1} /></div></SkeletonTheme>) : followed.length > 0 ? <div>
          <div className="convo">Conversations</div>

          {followed.map((followed) => {

            return <Link to={`/dashboard/chat/${followed.userId}`} className="mychats" key={followed.docId}>

              <img src={followed.imageSrc} alt="" />
              <div className="headerName">
                <div className='fullName'>{followed.fullName}</div>
                <div className='postUsername'>{followed.username}</div>
              </div>

            </Link>

          })}

        </div> : (<p className="timelinep">Follow Users To Chat With Them</p>)}

     
      <Routes>
        <Route path=":userId" element={<Chats />} />
      </Routes>

    </div>
  )
}

{/* <Chat/> */ }
import Chats from "./Chat";
import { Link, Route, Routes } from 'react-router-dom';
import '../../styles/chats.css'
import { getFollowedProfiles } from "../../hooks/FirestoreServices";
import { useContext, useEffect } from "react";
import { useState } from "react";
import UserDataContext from "../../context/userdata";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Chat() {
  const [followed, setFollowed] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const { userData } = useContext(UserDataContext)

  useEffect(() => {
    async function getChats() {
      const followedProfiles = await getFollowedProfiles(userData)
      setFollowed(followedProfiles)
    }
    if (userData) {
      getChats()
    }
  }, [userData])

  const handleClick =()=>{setShowChat(!showChat)}
  return (
    <div className='chat'>
      <div className={showChat? 'none':''}>
        {!followed ? (
          <div className='chatskel'><Skeleton className='chtskl' height={`100%`} count={4} /></div>) : followed.length > 0 ? <div>
            <div className="convo">Conversations</div>

            {followed.map((followed) => {

              return <Link to={`/dashboard/chat/${followed.userId}`} className="mychats" key={followed.docId} onClick={handleClick}>

                <img src={followed.imageSrc} alt="" />
                <div className="headerName">
                  <div className='fullName'>{followed.fullName}</div>
                  <div className='postUsername'>{followed.username}</div>
                </div>

              </Link>

            })}

          </div> : (<p className="timelinep">Follow Users To Chat With Them</p>)}
      </div>



      <Routes>
        <Route path=":userId" element={<Chats handleClick={handleClick} showChat={showChat}/>} />
      </Routes>

    </div>
  )
}

{/* <Chat/> */ }
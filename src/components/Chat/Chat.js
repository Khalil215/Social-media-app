import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import UserDataContext from "../../context/userdata";
import { getUserByUid } from "../../hooks/FirestoreServices";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { addDoc, messageRef, serverTimestamp, query, where, orderBy, onSnapshot } from "../../libraries/firebase";




export default function Chats() {
  const [chatUser, setChatUser] = useState(null)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState(null)
  const { userId } = useParams()
  const { userData } = useContext(UserDataContext)
  const scroll = useRef()
  const invalid = message === ''


  useEffect(() => {
    async function getUser() {
      const user = await getUserByUid(userId)
      setChatUser(user)
    }

    const getChatMessages = () => {
      const q = query(messageRef, where('userId', 'in', [userId + ',' + userData.userId, userData.userId + ',' + userId]), orderBy('timeCreated'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach(doc => {
          messages.push({ ...doc.data(), docId: doc.id })
        })

        setChat(messages)
      })

    }

    if (userId) {
      getUser()
      getChatMessages()
    }
  }, [userId])

  async function handleSumit(e) {
    e.preventDefault()
    await addDoc(messageRef, {
      timeCreated: serverTimestamp(),
      text: message,
      image: `/images/avatars/${userData.username}.jpg`,
      userId: userData.userId + ',' + userId
    })
    setMessage('')
    scroll.current.scrollIntoView({ behaviour: 'smooth' })

  }



  return !chatUser ? (
    <SkeletonTheme baseColor="#162329" highlightColor="#193741" ><Skeleton height={550} width={580} count={1} /></SkeletonTheme>) : (
    <div className="insidechat">
      <div className="inchatheader ">
        <img src={chatUser.imageSrc} alt="" />
        <div className="headerName">
          <div className='fullName'>{chatUser.fullName}</div>
          <div className='postUsername'>{chatUser.username}</div>
        </div></div>
      <div className="inchatbody">

        {chat.length > 0 ? (chat.map(chat => {
          return chat.userId == userData.userId + ',' + userId ? (<div className="sent" key={chat.docId}>
            <p>{chat.text}</p>
            <img src={chat.image} alt="" />
          </div>) : (<div className="received" key={chat.docId}>
            <img src={chat.image} alt="" />
            <p>{chat.text}</p>
          </div>)
        })) : (<p className="nomssg">No messages here yet...</p>)}
        <div ref={scroll}></div>
      </div>
      <div className="inchatinput">
        <form onSubmit={(event) =>
          message.length >= 1 ? handleSumit(event) : event.preventDefault()
        }>
          <input type="text" placeholder="Type a message here" value={message} onChange={(e) => setMessage(e.target.value)} />
          <svg onClick={invalid ? null : handleSumit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </form>
      </div>
    </div>

  )
}

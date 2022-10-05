import '../../styles/dashboards.css'
import Header from '../Header'
import Body from '../Body'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/user'
import UserDataContext from '../../context/userdata'
import { useNavigate } from 'react-router-dom'
// import { userColRef, query, where, onSnapshot } from '../../libraries/firebase'
import useUser from '../../hooks/useUser'


export default function Dashboard() {
  const navigate = useNavigate()

  const { User } = useContext(UserContext)

  const { userData, setActiveUser } = useUser(User.uid)
  // if (User) {
  //   console.log('inMainpage', userData);
  // }


  useEffect(() => {
    document.title = 'Social Media app'
    navigate('/dashboard/timeline')

  }, [])


  return (
    <UserDataContext.Provider value={{ userData, setActiveUser }}>
      <div className='dashboard'>
        <Header />
        <Body />
      </div>
    </UserDataContext.Provider>

  )
}

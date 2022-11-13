import { Link } from 'react-router-dom'
import '../styles/dashboards.css'
import UserDataContext from '../context/userdata'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useContext } from 'react'

export default function Header() {
  const { userData } = useContext(UserDataContext)

  return (
    <div className='header'>
      <div className='gram'>social media app</div>

      <div className="profile">

        {!userData ? (<div className="headSkel"><Skeleton height={`100%`}/></div>) : (
          <Link to={`/dashboard/p/${userData?.username}`}>
          <img src={userData.imageSrc}/>
          <div>
          <div className='fullname'>{userData.fullName}</div>
          <div className='username'>{userData.username}</div>
          </div>

          </Link>
          
        )}

      </div>

    </div>
  )
}

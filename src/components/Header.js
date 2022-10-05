import {Link} from 'react-router-dom'
import '../styles/dashboards.css'
import UserDataContext from '../context/userdata'
import Skeleton , { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useContext } from 'react'

export default function Header() {
  const {userData} = useContext(UserDataContext) 
  // if(userData){
    // console.log(userData);
  // }
  // console.log(userData)

  return (
    <div className='header'>
      <div className='gram'>social media app</div>

      <div className="profile">
      <SkeletonTheme baseColor="#162329" highlightColor="#193741">
        {!userData ? (<Skeleton height={70} width={130} count={1}/>) : (
        <Link to={`/dashboard/p/${userData?.username}`}>
        <img src={userData.imageSrc}/>
        <div>
        <div className='fullname'>{userData.fullName}</div>
        <div className='username'>{userData.username}</div>
        </div>
       
        </Link>
        ) }
        </SkeletonTheme>
      </div>

    </div>
  )
}

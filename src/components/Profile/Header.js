import PropTypes from 'prop-types';
import '../../styles/profile.css'
import UserDataContext from '../../context/userdata'
import { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { isUserFollowingProfile, toggleFollow, getUserByUid } from '../../hooks/FirestoreServices';


export default function Header({ username, fullName, numFollowers, numFollowing, numPosts, userId, docId, imageSrc }) {

  const { userData, setActiveUser } = useContext(UserDataContext)

  const [isFollowingProfile, setIsFollowingProfile] = useState(null)
  const [followersCount, setFollowersCount] = useState(null)


  useEffect(() => {
    async function isLoggedUserFollowingProfile() {
      const isFollowing = await isUserFollowingProfile(userData, userId)
      setIsFollowingProfile(isFollowing)
    }
    if (userId) {
      isLoggedUserFollowingProfile()
    }
  }, [userData, userId])

  async function handleToggleFollow(e) {
    e.preventDefault()

    setIsFollowingProfile(isFollowingProfile => !isFollowingProfile)

    setFollowersCount(followersCount => isFollowingProfile ? numFollowers + followersCount - 1 : numFollowers + followersCount + 1)

    await toggleFollow(userData, userId, docId, isFollowingProfile)

    const user = await getUserByUid(userData.userId)
    setActiveUser(user)


  }


  return !username ? (
    <div className='profileHeader'>
      <Skeleton circle className='pcSkel' count={1} />
      <div className='skel'>
      <Skeleton className='pSkel' height={`100%`} count={3} />
    </div></div>) : (
    <div className='profileHeader'>
      <div><img src={imageSrc} alt="" /></div>
      <div>
        <div className=' profileDetails'>
          <div className='bold top'>{username}</div>
          {userData.username === username ? <div></div> : isFollowingProfile ? <button onClick={handleToggleFollow}>Unfolow</button> : <button onClick={handleToggleFollow}>Follow</button>}
        </div>
        <div className=' profileDetails mid'>
          <div><span className='bold'>{numPosts}</span>  photos</div>
          <div><span className='bold'>{followersCount ? followersCount : numFollowers}</span> followers</div>
          <div><span className='bold'>{numFollowing}</span> following</div>
        </div>
        <div className=' profileDetails bold top'>{fullName}</div>
      </div>
    </div>
  )
}

Header.propTypes = {
  docId: PropTypes.string,
  username: PropTypes.string,
  userId: PropTypes.string,
  fullName: PropTypes.string,
  numFollowers: PropTypes.number,
  numFollowers: PropTypes.number,
  numPosts: PropTypes.number,

};

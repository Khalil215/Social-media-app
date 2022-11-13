import '../../styles/mainpage.css'
import { useContext } from 'react'
import Post from './Post'
import UserDataContext from '../../context/userdata'
import usePhotos  from '../../hooks/usePhotos'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function Timeline({viewProfiles}) {
  const { userData } = useContext(UserDataContext)

  const { photos } = usePhotos(userData)
 

  return (
    <div className={viewProfiles ?'timeline': 'none'}>
      `
        {/* use the users following to determine timeline display */}
        {userData?.following === undefined ? (<div className="tlSkel"><Skeleton height={`100%`} /></div>) : userData.following.length === 0 ? (<p className='timelinep'>Follow people to see  their Photos</p>) : photos && (<>
          {photos.map(photos => <Post key={photos.photoId} photos={photos}/>)}
        </>)
        }
      `
    </div>
  )
}

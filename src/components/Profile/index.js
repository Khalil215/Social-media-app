import '../../styles/profile.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername, getUsersPhotos } from "../../hooks/FirestoreServices";
import Header from "./Header";
import Photos from "./Photos";


export default function Profile() {

  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    async function getUserDetails() {
      const usersProfile = await getUserByUsername(username)
      setProfile(usersProfile)
    }

    async function getPosts() {
      const usersPost = await getUsersPhotos(username)
      setPosts(usersPost)
      // console.log(profile);
    }
    
    if (username) {
      getUserDetails()
      getPosts()
    }
  

  }, [username])

  return  (
    <div className="profilePage">
      <Header username={profile?.username} fullName={profile?.fullName} numFollowers={profile?.followers.length} numFollowing={profile?.following.length} numPosts={posts? posts?.length : 0} userId={profile?.userId} docId={profile?.docId}/> 
<hr />
      <Photos posts={posts}/>
    </div>
  )
}

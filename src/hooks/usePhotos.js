import { useEffect, useState } from "react"
import { getPhotos } from "./FirestoreServices"


export default function usePhotos(user) {

  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following.length > 0) {
        const followedUserPhotos = await getPhotos(user)
        setPhotos(followedUserPhotos)
      }
    }
    getTimelinePhotos()
  }, [user])


  return { photos }
}

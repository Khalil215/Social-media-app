
import { getDocs, userColRef, query, where, photoColRef, db, doc, updateDoc, arrayUnion, arrayRemove} from '../libraries/firebase'


export async function doesUserExist(username) {
  const user = query(userColRef, where('username', '==', username))
  const result = await getDocs(user)
  return result.docs.length > 0
}


export async function getUserByUid(uid) {
  const q = query(userColRef, where('userId', '==', uid))

  const querySnapshot = await getDocs(q)
  const user = []
  querySnapshot.forEach(doc => {
    user.push({ ...doc.data(), docId: doc.id })
  })
  const [user1] = user
  return user1
}



export async function getPhotos(user) {
  const q = query(photoColRef, where('userId', 'in', user.following))
  const querySnapshot = await getDocs(q)

  const photos = []
  querySnapshot.forEach(doc => {
    photos.push({ ...doc.data(), docId: doc.id })
  })

  const photoWithDetails = photos.map(photo => {
    let userLikedPhoto = false
    if (photo.likes.includes(user.id)) {
      userLikedPhoto = true
    }

    return { ...photo, userLikedPhoto }
  })

  return photoWithDetails
}

export async function getSuggestedProfiles(user) {
  let q = query(userColRef, where('userId', '!=', user.userId))
  if (user.following.length > 0) {
    q = query(userColRef, where('userId', 'not-in', [...user.following, user.userId]))
  }
  const querySnapshot = await getDocs(q)
  const users = []
  querySnapshot.forEach(doc => {
    users.push({ ...doc.data(), docId: doc.id })
  })
  return users
}

export async function updateLoggedInUserFollowing(userData, userId, isFollowing) {
  let docRef = doc(db, 'users', userData.docId)

  await updateDoc(docRef, {
    following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
  })

}

export async function updateFollowedUserFollowers(userData, docId, isFollowing) {
  let docRef = doc(db, 'users', docId)


  await updateDoc(docRef, {
    followers: isFollowing ? arrayRemove(userData.userId) : arrayUnion(userData.userId)
  })
}


export async function getUserByUsername(username) {
  const q = query(userColRef, where('username', '==', username))

  const querySnapshot = await getDocs(q)
  const user = []
  querySnapshot.forEach(doc => {
    user.push({ ...doc.data(), docId: doc.id })
  })
  const [user1] = user
  return user1
}

export async function getUsersPhotos(username) {

  const profile = await getUserByUsername(username)

  const q = query(photoColRef, where('userId', '==', profile.userId))
  const querySnapshot = await getDocs(q)

  const photos = []
  querySnapshot.forEach(doc => {
    photos.push({ ...doc.data(), docId: doc.id })
  })
  return photos
}


export async function isUserFollowingProfile(userData, userId) {
  const q = query(userColRef, where('userId', '==', userData.userId), where('following', 'array-contains', userId))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.length > 0
}

export async function toggleFollow(userData, userId, docId, isFollowing) {
  await updateLoggedInUserFollowing(userData, userId, isFollowing)
  await updateFollowedUserFollowers(userData, docId, isFollowing)
}

export async function getFollowedProfiles(user) {

  if (user.following.length == 0) {
    return []
  }
  const q = query(userColRef, where('userId', 'in', user.following))

  const querySnapshot = await getDocs(q)
  const users = []
  querySnapshot.forEach(doc => {
    users.push({ ...doc.data(), docId: doc.id })
  })
  return users
}

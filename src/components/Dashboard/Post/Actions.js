import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import UserDataContext from '../../../context/userdata'
import { db, doc, updateDoc,arrayUnion, arrayRemove } from '../../../libraries/firebase'
// db,doc,updateDoc

export default function Actions({ docId, userLikedPhoto, totalLikes, handleFocus }) {
  const {
    userData
  } = useContext(UserDataContext);
  const [toggleLiked, setToggleLiked] = useState(userLikedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const handleToggleLiked = async () => { 
    setToggleLiked((toggleLiked) => !toggleLiked);

    let docRef = doc(db, 'photos', docId)

    await updateDoc(docRef, {
      likes: toggleLiked ? arrayRemove(userData.userId) : arrayUnion(userData.userId)
    })

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));

    // console.log(likes, toggleLiked, docId);
  };

  return (
    <>
      
        <div className="icons">
          <div className="numLikes">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#4AC27B" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w- h-6" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <p className="font-bold">{likes}</p>
          </div>
          <div className="actionz">
            <svg xmlns="http://www.w3.org/2000/svg" fill={toggleLiked ? '#4AC27B' : 'none'}viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" onClick={handleToggleLiked}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" onClick={handleFocus}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>


        </div>


    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  handleFocus: PropTypes.func.isRequired
};

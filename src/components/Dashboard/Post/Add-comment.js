import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import UserContext from '../../../context/user'
import { db,doc,updateDoc, arrayUnion, arrayRemove } from '../../../libraries/firebase'
import UserDataContext from '../../../context/userdata';



export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
 
  const {
   userData: { username }
  } = useContext(UserDataContext);

  // console.log(username);
  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([...comments, { username, comment }]);
    setComment('');

    let docRef = doc(db, 'photos', docId)

    return updateDoc(docRef, {
      comments: arrayUnion({ username, comment })
    })
  };

  return (
    <>
      <form
        className="inputComment"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          
          autoComplete="off"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`${!comment && 'opacity'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object
};

import { useRef } from 'react';
import Header from './Header';
import Image from './Image';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';

export default function Post({ photos }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="post">

      <Header username={photos.username} fullName={photos.fullName} />
      <Image src={photos.imageSrc} caption={photos.caption} />
      <Actions
        docId={photos.docId}
        totalLikes={photos.likes.length}
        handleFocus={handleFocus}
        userLikedPhoto={photos.userLikedPhoto}
      />
      <Footer caption={photos.caption} />
      <Comments
        docId={photos.docId}
        comments={photos.comments}
        commentInput={commentInput}
      />
    </div>
  );
}



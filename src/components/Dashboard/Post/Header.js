
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username, fullName }) {



  return (
    <>
      <Link to={`/dashboard/p/${username}`} className="postHeader">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile picture`}
        />
        <div className="headerName">
          <p className='fullName'>{fullName}</p>
          <p className='postUsername'>{username}</p></div>
      </Link>
    </>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};

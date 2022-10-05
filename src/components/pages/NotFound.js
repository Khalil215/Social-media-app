import { Link } from 'react-router-dom';
import '../../styles/index.css'
const NotFound = () => {
  return (
    <div className="App">
      <div className="notFound">
        <h1>Sorry, this page isn't available.</h1>
        <br />
        <p>
          The link you followed may be broken, or the page may have been removed. Go back to <Link to='/'>  Log In </Link>
        </p>

      </div>
    </div>

  );
}

export default NotFound;
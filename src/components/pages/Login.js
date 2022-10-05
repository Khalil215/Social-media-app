import '../../styles/loginsignup.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
// import { logIn } from '../../hooks/useFirebaseAuth'
import { auth, signInWithEmailAndPassword } from '../../libraries/firebase'

import UserContext from '../../context/user';
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { User } = useContext(UserContext)
  const navigate = useNavigate()
  const isInvalid = email === '' || password === ''


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/dashboard')

    } catch (error) {
      setError(error.message)
      setEmail('')
      setPassword('')
    }


  }

  useEffect(() => {
    document.title = 'Log In'

    // if (User) {
    //   navigate('/dashboard')
    // }
  }, [])

  return (
    <div className="App">
      <div className="loginPage">
        <div className="photo">
          <img className='iphone' src="/images/rocket.jpg" alt="logo" />
        </div>
        <div className="loginContext">
          <div className="inputs">

            <form action="" onSubmit={handleLogin}>
              {error && <p style={{ color: 'red', fontSize: '0.9em', fontAlign: 'center', border: '2px solid black', padding: '5px' }}> {error}</p>}

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <input type="email" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <input type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />

              <button type="submit" className= {isInvalid ? 'opacity' : ''}> Log in </button>

            </form>
          </div>
          <div className='signup'><p>Don't have an account? <Link to='/signUp'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
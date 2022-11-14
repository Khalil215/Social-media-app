import '../../styles/loginsignup.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { auth, createUserWithEmailAndPassword, addDoc, userColRef, serverTimestamp } from '../../libraries/firebase'
import { doesUserExist } from '../../hooks/FirestoreServices'
// import FirebaseContext from '../../context/firebase';

const Signup = () => {

  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const isInvalid = email === '' || password === '' || username === '' || fullname === ''


  const handleLogin = async (e) => {
    e.preventDefault()
    const userExist = await doesUserExist(username)
    if (!userExist) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        const newDoc = await addDoc(userColRef, {
          dateCreated: serverTimestamp(),
          emailAddress: email.toLowerCase(),
          followers: [],
          following: [],
          fullName: fullname,
          userId: cred.user.uid,
          username: username.toLowerCase(),
          imageSrc: '/images/avatars/default.png'
        })
        // console.log({ cred })
        // console.log(newDoc)
        // console.log(cred.user.uid)

        navigate('/dashboard')

      } catch (error) {
        setError(error.message)
        setUsername('')
        setFullname('')
        setEmail('')
        setPassword('')
      }
    } else {
      setError('This Username already exists. Please try another')
      setUsername('')
    }


  }
  useEffect(() => {
    document.title = 'Sign Up'
  }, [])


  return (
    <div className="App">
      <div className="loginPage">
        <div className="photo">
          <img className='iphone' src="/images/rocket.JPG" alt="logo" />
        </div>
        <div className="loginContext">
          <div className="inputs">

            <form action="" onSubmit={handleLogin}>
              {error && <p style={{ color: 'red', fontSize: '0.9em', fontAlign: 'center', border: '2px solid black', padding: '5px' }}> {error}</p>}


              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <input type="text" required placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>

              <input type="text" required placeholder="Full Name" onChange={(e) => setFullname(e.target.value)} value={fullname} />

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <input type="email" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <input type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />

              <button type="submit" className={isInvalid ? 'opacity' : ''}> Sign Up </button>

            </form>
          </div>
          <div className='signup'><p>Have an account? <Link to='/'>Log In</Link></p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Signup;
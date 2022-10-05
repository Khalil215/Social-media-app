import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from "react";
import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from './libraries/firebase'
import UserContext from './context/user';
import ProtectedRoute from './components/ProtectedRoutes';

const Login = lazy(() => import('./components/pages/Login'))
const SignUp = lazy(() => import('./components/pages/Signup'))
const Dashboard = lazy(() => import('./components/pages/MainPage'))
const NotFound = lazy(() => import('./components/pages/NotFound'))



export default function App() {
  const [User, setUser] = useState('')


  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      }
    })

  }, [])



  return (
    <div>

      <Suspense fallback={<div className='App'><img src='/images/alt.png'></img></div>}>
        <UserContext.Provider value={{ User }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            
            <Route path='*' element={<NotFound />} />
          </Routes>
        </UserContext.Provider>

      </Suspense>
    </div >
  );
}

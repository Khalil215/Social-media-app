import '../styles/dashboards.css'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Chat from './Chat'
import Profile from './Profile'
import { Route, Routes } from 'react-router-dom'

export default function Body() {
  
  return (
    <div className="body">
      <Navbar />
      <div className="pageBody">
        <Routes>
          <Route path="timeline" element={<Dashboard />} />
          <Route path="chat/*" element={<Chat />} />
          <Route path="p/:username" element={<Profile />} />
        </Routes>



      </div>

    </div>
  )
}

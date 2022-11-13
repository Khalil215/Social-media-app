import Sidebar from './Sidebar'
import Timeline from './Timeline'
import '../../styles/mainpage.css'
import { useState } from 'react'

export default function Dashboard() {

  const [viewProfiles,  setViewProfiles] = useState(true)
  const change = viewProfiles ? 'Suggested Profiles' : 'View Posts'

  return (<>
    <button onClick={() => setViewProfiles(!viewProfiles)} className='change'>{change}</button>
    <div className='dash'>

      <Timeline viewProfiles={viewProfiles}/>
      <Sidebar viewProfiles={viewProfiles}/>
    </div>
  </>

  )
}

import Sidebar from './Sidebar'
import Timeline from './Timeline'
import '../../styles/mainpage.css'



export default function Dashboard() {

  return (
    <div className='dash'>
      <Timeline />
      <Sidebar />
    </div>
  )
}

import '../../styles/dashboards.css'
import Header from '../Header'
import Body from '../Body'
import { useContext, useEffect} from 'react'
import UserContext from '../../context/user'
import UserDataContext from '../../context/userdata'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'


export default function Dashboard() {
  const navigate = useNavigate()

  const { User } = useContext(UserContext)

  const { userData, setActiveUser } = useUser(User.uid)


  useEffect(() => {
    document.title = 'Social Media app'
    navigate('/dashboard/timeline')

  }, [])


  return (
    <UserDataContext.Provider value={{ userData, setActiveUser }}>
      <div className='dashboard'>
        <Header />
        <Body />
      </div>
    </UserDataContext.Provider>

  )
}

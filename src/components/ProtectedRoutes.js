import { useContext } from "react"
import { Navigate } from "react-router-dom"
import UserContext from "../context/user"


export default function ProtectedRoute({children}) {

  const {User}= useContext(UserContext)


  if(!User){
    return <Navigate to='/'/>
  }

  return children
}

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const RequireUser = ({ children, redirectTo }) => {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to={redirectTo} />
}

export default RequireUser

import React, { useContext, useState, useEffect, useMemo } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

const AuthContext = React.createContext<null | any>(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      signup,
    }),
    [currentUser]
  )

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

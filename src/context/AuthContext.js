//context api for the authenticated user-->>

import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    //to check if user is present or not-->>
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log(user)
    })
    //clean up function-->>
    return () => {
      unsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

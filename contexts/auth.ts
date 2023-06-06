import { createContext } from 'react'
import { isLoggedIn } from '~/hooks/isLoggedIn'


export const AuthContext = createContext({
  isLoggedIn: isLoggedIn(),
  getUsername: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username') as string
    }
    return ''
  },
  setIsLoggedIn: (isLoggedIn: boolean) => {},
})
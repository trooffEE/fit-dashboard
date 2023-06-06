export const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('username')
  }
  return ''
}

export const currentUser = () => {
  if (isLoggedIn()) {
    return localStorage.getItem('username') as string
  }
  return ''
}

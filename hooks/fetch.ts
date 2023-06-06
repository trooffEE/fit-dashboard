import { AxiosError, AxiosResponse } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '~/contexts/auth'
import Router from 'next/router'

const useFetch = <T extends unknown>(callbackFetch: (...params: any[]) => Promise<AxiosResponse<T, any>>): [T, boolean] => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)
    callbackFetch()
      .then(({ data }) => {
        setData(data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return [data, isLoading]
}

export const useCodeCheck = <T extends unknown>() => {
  const { setIsLoggedIn } = useContext(AuthContext)
  const checkCode = (data: AxiosError<T>) => {
    if (data.response?.status === 403) {
      localStorage.setItem('username', '')
      toast.error('Доступ запрещен, введите корретное имя пользователя бота ⛔')
      setIsLoggedIn(false)
    }
  }

  const redirectTo = (to: string) => {
    Router.push({
      pathname: to,
    })
  }

  return { checkCode, redirectTo }
}

export default useFetch

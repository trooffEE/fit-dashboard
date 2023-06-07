import { AxiosError, AxiosResponse } from 'axios'
import { useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '~/contexts/auth'
import Router from 'next/router'

const useFetch = <S extends (...params: any[]) => Promise<AxiosResponse<unknown, any>>, T extends ReturnType<S>>(
  callbackFetch: S,
  args: Parameters<S>,
  transform?: (...params: unknown[]) => any
): [Awaited<T>['data'], boolean] => {
  const [isLoading, setIsLoading] = useState(true)
  const cachedParams = useMemo(() => [...args], [...args])
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)
    callbackFetch(...cachedParams)
      .then(({ data }) => {
        setData(transform ? transform(data) : data)
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false))
  }, [...cachedParams])

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

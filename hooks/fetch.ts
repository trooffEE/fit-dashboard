import { AxiosError, AxiosResponse } from 'axios'
import { useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '~/contexts/auth'
import Router from 'next/router'

const useFetch = <S extends (...params: any[]) => Promise<AxiosResponse<unknown, any>>, T extends ReturnType<S>>(
  callbackFetch: S,
  args: Parameters<S>,
  config?: {
    transform?: (...params: unknown[]) => any
    options?: {
      authOnly?: boolean
    }
  }
): [Awaited<T>['data'], boolean] => {
  const [isLoading, setIsLoading] = useState(true)
  const { checkCode, redirectTo } = useCodeCheck()

  const cachedParams = useMemo(() => [...args], [...args])
  const [data, setData] = useState<any>(null)
  const transform = config?.transform
  const options = config?.options

  useEffect(() => {
    setIsLoading(true)
    callbackFetch(...cachedParams)
      .then(({ data }) => {
        setData(transform ? transform(data) : data)
      })
      .catch((e) => {
        if (options?.authOnly) {
          checkCode(e)
          redirectTo('/')
        }
      })
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

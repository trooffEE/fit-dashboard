import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

const useFetch = <T extends unknown>(callbackFetch: () => Promise<AxiosResponse<T, any>>): [T, boolean] => {
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

export default useFetch

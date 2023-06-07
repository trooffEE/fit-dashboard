import React from 'react'

type Props = {
  isLoading: boolean,
  content: JSX.Element
}

const LoaderContent = ({ isLoading, content }: Props) => {
  return <>{isLoading ? <div>Загрузка...</div> : content}</>
}

export default LoaderContent
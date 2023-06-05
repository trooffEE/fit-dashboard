import React from 'react'

type Props = {
  isLoading: boolean,
  content: JSX.Element
}

const LoaderContent = ({ isLoading, content }: Props) => {
  return <>{isLoading ? <div>is loading...</div> : content}</>
}

export default LoaderContent
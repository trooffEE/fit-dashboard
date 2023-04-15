import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'

type Props = {} & React.HTMLAttributes<HTMLDivElement>

const GraphContainer = ({ className = '', children }: PropsWithChildren<Props>) => {
  return <div className={classNames([className, 'rounded-sm bg-primaryDark/30 pr-5 py-5'])}>{children}</div>
}

export default GraphContainer

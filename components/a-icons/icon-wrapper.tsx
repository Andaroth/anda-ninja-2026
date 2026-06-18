import { FC } from 'react'
import { IconPropsType } from './types'

const iconWrapper = (WrappedComponent: FC<IconPropsType>) => {
  // Return a new functional component
  return function IconWrapper(props: IconPropsType) {
    return (
      <div className="flex justify-center items-center">
        <WrappedComponent {...props} />
      </div>
    )
  }
}

export default iconWrapper

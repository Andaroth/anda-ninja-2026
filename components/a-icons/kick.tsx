import { FC } from 'react'
import { IconPropsType } from './types'
import iconWrapper from './icon-wrapper'

const AKickIcon: FC<IconPropsType> = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20} height={24}
      viewBox="0 0 20 24"
      fill={props.fill || "#FCFCFC"}
      {...props}
    >
      <path
        fill={props.fill || "#FCFCFC"}
        d="M0 0H8.26393V5.71333H11.0186V2.85667H13.7732V0H22.0371V8.57H19.2825V11.4267H16.5279V14.2833H19.2825V17.14H22.0371V25.71H13.7732V22.8533H11.0186V19.9967H8.26393V25.71H0V0ZM55.0929"
      />
    </svg>
  )
}

export default iconWrapper(AKickIcon)

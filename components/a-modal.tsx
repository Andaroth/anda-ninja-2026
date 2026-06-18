import { FC, useEffect } from "react"
import cn from "classnames"

interface AModalProps {
  title?: string
  isOpen: boolean
  onOpen?: () => void
  onClose?: () => void
  overlay?: boolean
  closableOverlay?: boolean
  className?: string
  children?: any
  footer?: any // dom
}

const AModal: FC<AModalProps> = (props: AModalProps) => {
  const {  title, isOpen, onOpen, onClose, closableOverlay = true, overlay, className, children, footer } = props

  const handleClose = () => {
    document.body.style.overflow = "initial"
    if (onClose) onClose()
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    if (onOpen) onOpen()
  }, [])

  return isOpen ? <>
    <div className="flex fixed top-0 left-0 w-[calc(100vw-64px)] h-[100dvh] justify-center mx-[32px] z-50">
      { overlay ? <div className="fixed block w-[100vw] h-[100dvh] bg-[#000000CC] z-10" onClick={() => closableOverlay ? handleClose() : null} /> : ''}
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <div className={cn("modal flex flex-col rounded-lg bg-black shadow shadow-[#0F0] border-2 border-[#0F0] p-4 z-20", className)}>
            <div className="flex gap-2 border-b-2 border-[#030] pb-2 justify-between">
              { title ? <p className="text-2xl text-white">{title}</p> : <div /> }
              <div className="flex flex-col justify-center">
                <div className="flex justify-center cursor-pointer right-0 w-[24px] h-[24px] rounded-xl border-2 border-transparent hover:border-red-500" onClick={handleClose}>
                  <div className="flex flex-col justify-center">
                    &times;
                  </div>
                </div>
              </div>
            </div>
            <div className="max-h-[calc(80vh-80px)] overflow-y-auto py-2">{children}</div>
            { footer ? <div className="flex justify-end gap-2 pt-2 border-t-2 border-[#030]">{footer}</div> : ''}
          </div>
        </div>
      </div>
    </div>
  </> : ''
}

export default AModal
import { FC, useRef } from "react";
import cn from "classnames"

interface AInputProps {
  value?: string
  disabled?: boolean
  type?: "text" | "password"
  placeholder?: string
  className?: string
  onSubmit?: (e: any) => void
  onChange?: (e: any) => void
}

const AInput: FC<AInputProps> = (props: AInputProps) => {
  const ref = useRef<HTMLInputElement>()
  const { disabled, type = "text", placeholder, className, onSubmit, onChange } = props
  const value = props.value

  const handleKeyDown = (e: any) => {
    if (ref) onChange(ref.current?.value)
    if (onSubmit && e.key === "Enter") onSubmit(e)
  }
  return (
    <input
      ref={ref}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      className={cn(
        "rounded-lg p-2 mr-2 text-black",
        className
      )}
      defaultValue={value}
    />
  )
}

export default AInput
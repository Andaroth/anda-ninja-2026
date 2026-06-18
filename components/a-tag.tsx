import { FC } from "react"
import cn from "classnames"

interface ATagProps {
  className?: string
  prefix?: string
  label: string
  sufix?: string
  variant?: "primary" | "dark"
  hover?: boolean
}

const ATag: FC<ATagProps> = ({ className, prefix, label, sufix, variant, hover }: ATagProps) => {
  const variantStyle = {
    "primary": `bg-[#0F0] text-[#000] ${ hover ? "hover:bg-[#030] hover:text-[#0F0]" : ''}`,
    "dark": `bg-[#030] text-[#0F0] ${ hover ? "hover:bg-[#0F0] hover:text-[#000]" : ''}`
  }[variant || "primary"]

  return <span className={cn(
    "rounded-md p-1 !no-underline",
    hover ? "cursor-pointer" : "",
    variantStyle,
    className
  )}>{prefix||""}{label}{sufix||""}</span>
}

export default ATag;
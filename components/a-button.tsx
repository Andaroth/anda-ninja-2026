import Link from "next/link"
import cn from "classnames"

type VariantType = "default" | "dark" | "darkred"

interface AButtonProps {
  children?: any
  href?: string
  target?: "_self" | "_blank"
  className?: string
  variant?: VariantType
  disabled?: boolean
  onClick?: (e: any) => void
}

const AButton = (props: AButtonProps) => {
  const { children,
    href,
    className,
    variant = "default",
    target = "_self",
    disabled,
    onClick
  } = props

  const variantStyle = {
    'default': 'border-[#0F0] bg-[#0F0] !text-black hover:bg-black hover:!text-[#0F0]',
    'dark': 'border-[#060] bg-black !text-white hover:bg-black hover:border-[#0F0] hover:!text-[#0F0]',
    'darkred': 'border-[#600] bg-black !text-white hover:bg-black hover:border-[#F00] hover:!text-[#F00]'
  }[variant]

  return (
    <Link
      className={cn(
        "button flex flex-row px-4 py-2 rounded-md mx-auto border-2",
        className,
        disabled ? "!border-[#CCC] !bg-black !text-[#CCC] !hover:text-[#CCC] !cursor-default disabled" : variantStyle
      )}
      href={href || ""}
      target={target}
      onClick={(e) => {
        if (disabled) e.preventDefault()
        if (onClick) {
          e.preventDefault()
          if (!disabled) onClick(e)
        }
      }}
    >
      <div className="flex flex-col mx-auto justify-center text-center">
        {children}
      </div>
    </Link>
  )
}

export default AButton
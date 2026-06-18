import { FC, useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import useStore from "@/store/global"
import cn from "classnames"
import Link from "next/link"

import { themeNameType } from "@/store/global"
import { useTranslation } from "react-i18next"

interface ALoginButtonProps {
  theme?: themeNameType
  text?: string
  className?: string
}

const ALoginButton: FC<ALoginButtonProps> = ({ theme, text, className }: ALoginButtonProps) => {
  const router = useRouter()
  const account = useStore((state) => state.account)
  const btnRef = useRef()
  const { t } = useTranslation()

  const themeColor = {
    default: "#0F0",
    red: "#F00"
  }[theme || "default"]
  const darkColor = {
    default: "#060",
    red: "#600"
  }[theme || "default"]

  const handleClick = (e) => {
    e.preventDefault()
    if (account) router.push('/account')
    else router.replace(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL)
  }

  const [backgroundColor, setBackgroundColor] = useState(themeColor)
  const [textColor, setTextColor] = useState("#000")

  const insideText = text || (account ? account.global_name || account.username || '' : t("expr.login"))

  useEffect(() => setBackgroundColor(themeColor), [theme])

  return (
    <>
      <Link
        ref={btnRef}
        href=""
        className={cn(
          "button flex flex-row px-1 py-0.5 rounded-md mx-auto border-2 hover:scale-[1.025] ease-in-out duration-200",
          className
        )}
        style={{
          borderColor: themeColor,
          background: backgroundColor
        }}
        onClick={handleClick}
        onMouseEnter={() => {
          setBackgroundColor('#000')
          setTextColor(themeColor)

        }}
        onMouseLeave={() => {
          setBackgroundColor(themeColor)
          setTextColor("#000")
        }}
      >
        <div className="flex flex-col justify-center" style={{ color: textColor }}>
          {insideText}
        </div>
      </Link>
    </>
  )
}

export default ALoginButton
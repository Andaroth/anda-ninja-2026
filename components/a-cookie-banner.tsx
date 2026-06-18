import Link from "next/link"
import AButton from "./a-button"
import useStore from "@/store/global"

import { useTranslation } from "react-i18next"

const ACookieBanner = () => {
  const { t } = useTranslation()
  const { cgu, setCgu } = useStore((state) => ({
    cgu: state.cgu,
    setCgu: state.setCgu,
  }))

  const handleAcceptCgu = () => setCgu(true)

  return !cgu ? <aside className="fixed z-50 w-full px-6 bottom-12">
    <div className="flex z-50 flex-col sm:flex-row bg-black/90 p-2 border-2 rounded-md border-[#0F0]">
      <div className="flex flex-col flex-grow mb-4 sm:mb-0">
        <h4>{t("cookies.personal")}</h4>
        <p className="sm:mr-2">{t("cookies.byvisit")} <Link href="/cgu">{t("cgu.title")}</Link>. </p>
      </div>
      <AButton onClick={handleAcceptCgu}>{t("expr.iaccept")}</AButton>
    </div>
  </aside> : ''

}

export default ACookieBanner
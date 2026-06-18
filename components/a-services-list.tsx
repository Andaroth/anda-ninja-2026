import Link from "next/link";

import { useTranslation } from "react-i18next";

const AServicesList = () => {
  const { t } = useTranslation()
  const services = [
    { icon: "🎨", text: t('home.services01'), url: "./services#dev" },
    { icon: "🥽", text: t('home.services02'), url: "./services#cybersec" },
    { icon: "💡", text: t('home.services03'), url: "./services#expertise" },
  ]

  return <ul className="my-4 grid gap-4 md:grid-cols-3">
    { services.map(soc => <li key={services.indexOf(soc)} className="flex flex-col justify-start bg-[#030] rounded-lg p-4 text-center h-full">
      <Link className="flex flex-col gap-2 h-full origin-center hover:scale-[1.05]" href={soc.url} target="_self">
        <h3 className="text-4xl">{soc.icon}</h3>
        <div className="flex flex-grow cursor-pointer">
          <div className="flex flex-col w-full justify-center">
            <div className="flex justify-center w-full">{soc.text}</div>
          </div>
        </div>
      </Link>
    </li>)}
  </ul>
}

export default AServicesList;
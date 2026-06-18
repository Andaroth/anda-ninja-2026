import { FC } from "react";
import cn from "classnames";

import Link from "next/link";

import useStore from "@/store/global";

import i18next from "i18next";

import FRFlag from "@/components/a-icons/france";
import UKFlag from "@/components/a-icons/unitedkingdom";

const AFooter: FC = () => {
  const { theme, lang, setLang } = useStore((state) => ({
    theme: state.theme,
    lang: state.lang,
    setLang: state.setLang,
  }));

  const handleChangeLanguage = (e) => {
    e.preventDefault();
    const _lang = lang === "fr" ? "en" : "fr";
    i18next.changeLanguage(_lang);
    setLang(_lang);
  };

  return (
    <footer className="py-2 flex flex-row justify-center">
      <div className="flex mx-auto">
        <div className="flex flex-row">
          <p className="px-2 sm:border-r-2 border-[#030]">
            &copy; Axel FIOLLE {new Date().getFullYear()}
          </p>
          <a
            className="hidden sm:block px-2"
            onClick={(e) => handleChangeLanguage(e)}
          >
            {lang === "fr" ? (
              <UKFlag className="cursor-pointer" />
            ) : (
              <FRFlag className="cursor-pointer" />
            )}
            <aside className="hidden">
              {lang === "fr" ? "Translate to English" : "Voir en Français"}
            </aside>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AFooter;

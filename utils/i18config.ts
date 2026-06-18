import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import fr from "@/data/lang/fr.json";
import en from "@/data/lang/en.json";
import th from "@/data/lang/th.json";

i18next.use(initReactI18next).init({
  lng: "en",
  debug: process.env.ENVIRONMENT !== "production",
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    th: { translation: th },
  },
});

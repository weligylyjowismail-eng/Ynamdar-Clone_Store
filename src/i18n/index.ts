import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json"
import tm from "./locales/tm.json"
import ru from "./locales/ru.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      tm: { translation: tm }
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "tm",
  });
export default i18n
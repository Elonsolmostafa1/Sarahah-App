import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from './locale/eng.json'
import translationAr from './locale/ar.json'
import LanguageDetector from "i18next-browser-languagedetector"

const resources = {
  en: {
    translation: translationEn
  },
  ar: {
    translation: translationAr
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: `${localStorage.getItem('i18nextLng') || 'en'}`, 
    interpolation: {
      escapeValue: false 
    },
    react:{
        useSuspense:false
    }
  });

  export default i18n;
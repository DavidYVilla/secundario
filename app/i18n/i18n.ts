import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es  from './locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false },
}).then(() => {
  console.log("i18n initialized successfully");
});

export default i18n; // ✅ Exportamos el objeto directamente

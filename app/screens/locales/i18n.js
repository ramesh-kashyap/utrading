import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

const resources = {
  en: {
    translation: {
      welcome: "Language",
      change_language: "Change Language"
    }
  },
  hi: {
    translation: {
      welcome: "भाषा बदलें",
      change_language: "भाषा बदलें"
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      change_language: "Cambiar idioma"
    }
  }
};

// Get device language safely
const deviceLanguage = Localization.getLocales()?.[0]?.languageCode || 'en';

// Check if the language is supported
const supportedLanguages = Object.keys(resources);
const selectedLanguage = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: selectedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

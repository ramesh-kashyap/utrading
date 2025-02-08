// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import * as Localization from 'react-native-localize';
// // import en from './en.json';
// // import hi from './hi.json';

// const resources = {
//     en: {
//       translation: {
//         welcome: "Language",
//         change_language: "Change Language"
//       }
//     },
//     hi : {
//       translation: {
//         welcome: "भाषा बदलें",
//         change_language: "भाषा बदलें"
//       }
//     },
//     es: {
//       translation: {
//         welcome: "Bienvenido",
//         change_language: "Cambiar idioma"
//       }
//     }
//   };

//   const language = Localization.getLocales()[0].languageCode || 'en';
//   i18n
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: resources[deviceLanguage] ? deviceLanguage : 'en', // Check if language exists, else use 'en'
//     fallbackLng: "en",
//     interpolation: {
//       escapeValue: false // React already escapes by default
//     }
//   });

//   export default i18n;
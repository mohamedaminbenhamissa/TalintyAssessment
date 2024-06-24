import { initReactI18next } from 'react-i18next';

//languages
import arabic from '@/locales/ar/ar.json';
import english from'@/locales/en/en.json';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translation: english,
            },
          
            ar: {
                translation: arabic,
            },
        },
        fallbackLng: 'en',
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag'],
            caches: ['localStorage', 'cookie'],
        },
    });

export default i18n;
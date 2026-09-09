import React from 'react'
import { createRoot } from 'react-dom/client'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import App from './App.jsx'
import en from './locales/en.json'
import ar from './locales/ar.json'
import './index.css'

const savedLang = localStorage.getItem('lang')
const lng = savedLang === 'ar' ? 'ar' : 'en'

const applyLang = (code) => {
  document.documentElement.lang = code
  document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
  document.title = code === 'ar' ? 'برنس الهوندا — قوة الأحلام' : 'Honda Prince — Power of Dreams'
}
applyLang(lng)

i18next.use(initReactI18next).init({
  lng,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
})

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
)
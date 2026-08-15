import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ru from './locales/ru.json'

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

const STORAGE_KEY = 'isoCity.language'

const isSupported = (value: string | null): value is LanguageCode => LANGUAGES.some((l) => l.code === value)

const detect = (): LanguageCode => {
  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (isSupported(stored)) return stored

  const browser = window.navigator.language.slice(0, 2)

  return isSupported(browser) ? browser : 'en'
}

export const setLanguage = (code: LanguageCode) => {
  window.localStorage.setItem(STORAGE_KEY, code)

  return i18n.changeLanguage(code)
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: detect(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n

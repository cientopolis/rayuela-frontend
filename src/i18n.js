import { createI18n } from 'vue-i18n'
import ES from './locales/es.json'
import EN from './locales/en.json'
import PT from './locales/pt.json'

export default createI18n({
    legacy: false,
    locale: 'ES', // Idioma por defecto
    fallbackLocale: 'ES', // Secundario
    availableLocales: ['ES, EN, PT'],
    messages: {
        ES,
        EN,
        PT
    }
  })
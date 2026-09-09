import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaArrowRight } from 'react-icons/fa'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 overflow-hidden px-6 py-20 text-center">
      <div className="absolute inset-0 grid-lines bg-[radial-gradient(60%_60%_at_50%_30%,#ffffff_0%,#eef0f2_80%)]" />
      <div className="absolute left-1/2 top-1/3 size-72 -translate-x-1/2 animate-glow rounded-full bg-honda-red/10 blur-3xl" />

      <span className="relative font-display text-8xl font-bold text-outline md:text-9xl">
        {t('notFound.code')}
      </span>
      <h1 className="relative font-display text-3xl font-bold text-carbon-900 md:text-4xl">
        {t('notFound.title1')} <span className="text-honda-red">{t('notFound.title2')}</span>
      </h1>
      <p className="relative max-w-md text-carbon-600">{t('notFound.desc')}</p>
      <NavLink
        to="/"
        className="group relative inline-flex items-center gap-2 rounded-full bg-honda-red px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-honda-redLight hover:shadow-lg hover:shadow-honda-red/40"
      >
        {t('notFound.back')}
        <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1 rtl-flip" />
      </NavLink>
    </div>
  )
}
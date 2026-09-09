import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaArrowRight, FaPhone } from 'react-icons/fa'

/**
 * Reusable call-to-action banner used at the bottom of pages.
 */
export default function CtaBanner() {
  const { t } = useTranslation()
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-carbon-900/10 bg-white px-8 py-14 text-center md:px-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_120%,rgba(225,29,42,0.18)_0%,transparent_70%)]" />
          <div className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-honda-red/10 blur-3xl animate-glow" />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <h2 className="font-display text-4xl font-bold text-carbon-900 md:text-5xl">
              {t('cta.title1')} <span className="text-honda-red">{t('cta.title2')}</span>
            </h2>
            <p className="max-w-xl text-carbon-700">{t('cta.desc')}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <NavLink
                to="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-honda-red px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-honda-redLight hover:shadow-lg hover:shadow-honda-red/40"
              >
                {t('cta.button')}
                <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1 rtl-flip" />
              </NavLink>
              <a
                href={`tel:${t('cta.phone')}`}
                className="inline-flex items-center gap-2 rounded-full border border-carbon-900/20 px-8 py-3.5 font-semibold text-carbon-800 transition-colors hover:border-honda-red hover:text-carbon-900"
              >
                <FaPhone className="text-sm text-honda-red" />
                {t('cta.call')} {t('cta.phone')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
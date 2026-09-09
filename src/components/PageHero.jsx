import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaChevronRight } from 'react-icons/fa'
import { CarSilhouette } from './CarArt.jsx'

/**
 * Compact hero banner for inner pages: eyebrow, big title and optional description.
 */
export default function PageHero({ eyebrowKey, title1Key, title2Key, descKey, crumb }) {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_0%,#ffffff_0%,#eef0f2_78%)]" />
      <div className="absolute -left-32 top-10 size-[24rem] rounded-full bg-[radial-gradient(circle,rgba(225,29,42,0.1)_0%,transparent_70%)] blur-2xl" />
      <CarSilhouette className="absolute bottom-2 end-4 w-80 text-carbon-900/10" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-5 inline-flex flex-wrap items-center gap-1.5 text-xs text-carbon-500"
        >
          <NavLink to="/" className="text-carbon-600 transition-colors hover:text-honda-red">
            {t('nav.home')}
          </NavLink>
          {crumb && (
            <>
              <FaChevronRight className="text-[9px] rtl-flip" />
              <NavLink to={crumb.to} className="text-carbon-600 transition-colors hover:text-honda-red">
                {t(crumb.key)}
              </NavLink>
            </>
          )}
          <FaChevronRight className="text-[9px] rtl-flip" />
          <span className="text-honda-red">{t(eyebrowKey)}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="font-display text-5xl font-bold leading-tight text-carbon-900 md:text-6xl"
        >
          {title2Key ? (
            <>
              {t(title1Key)} <span className="text-honda-red">{t(title2Key)}</span>
            </>
          ) : (
            t(title1Key)
          )}
        </motion.h1>

        {descKey && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-carbon-700 md:text-lg"
          >
            {t(descKey)}
          </motion.p>
        )}
      </div>
    </section>
  )
}
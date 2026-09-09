import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/**
 * Reusable animated section heading: eyebrow + two-part title
 * (second part rendered in a softer tone).
 */
export default function SectionHeading({ eyebrowKey, title1Key, title2Key, align = 'center' }) {
  const { t } = useTranslation()
  const alignment = align === 'center' ? 'text-center justify-center items-center' : 'text-start justify-start items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${align === 'center' ? 'mx-auto' : ''}`}>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.6, once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-xs font-semibold uppercase tracking-widestx text-honda-red"
      >
        {t(eyebrowKey)}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6, once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="font-display text-4xl font-bold md:text-5xl"
      >
        {title2Key ? (
          <>
            {t(title1Key)} <span className="text-carbon-500">{t(title2Key)}</span>
          </>
        ) : (
          t(title1Key)
        )}
      </motion.h2>
    </div>
  )
}
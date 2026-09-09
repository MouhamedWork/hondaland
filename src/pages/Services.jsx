import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaShieldAlt, FaCogs, FaGlobe, FaShippingFast, FaArrowRight } from 'react-icons/fa'
import PageHero from '../components/PageHero.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { CarSilhouette } from '../components/CarArt.jsx'

const ITEMS = [
  { icon: FaShieldAlt, sKey: 's1', slug: 'original-parts' },
  { icon: FaCogs, sKey: 's2', slug: 'used-parts' },
  { icon: FaGlobe, sKey: 's3', slug: 'order-import' },
  { icon: FaShippingFast, sKey: 's4', slug: 'shipping' },
]

export default function Services() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero eyebrowKey="nav.services" title1Key="services.title" descKey="services.subtitle" />
      <section className="relative py-20">
        <CarSilhouette className="pointer-events-none absolute bottom-0 w-full max-w-5xl text-carbon-900/5" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-6 md:grid-cols-2">
            {ITEMS.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-carbon-900/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-honda-red/40 hover:shadow-xl hover:shadow-honda-red/10"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-honda-red/10 text-2xl text-honda-red transition-colors duration-300 group-hover:bg-honda-red group-hover:text-white">
                    <s.icon />
                  </span>
                  <span className="font-display text-5xl font-bold text-outline">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-carbon-900">{t(`services.${s.sKey}.name`)}</h2>
                <p className="text-sm leading-relaxed text-carbon-600">{t(`services.${s.sKey}.short`)}</p>
                <NavLink
                  to={`/services/${s.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-honda-red transition-colors hover:text-honda-redLight"
                >
                  {t('services.explore')}
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1 rtl-flip" />
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
import { motion } from 'framer-motion'
import { NavLink, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaShieldAlt, FaCogs, FaGlobe, FaShippingFast, FaCheck, FaArrowRight, FaPhone } from 'react-icons/fa'
import PageHero from '../components/PageHero.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { GearArt } from '../components/CarArt.jsx'

const SLUG_MAP = {
  'original-parts': { sKey: 's1', icon: FaShieldAlt },
  'used-parts': { sKey: 's2', icon: FaCogs },
  'order-import': { sKey: 's3', icon: FaGlobe },
  shipping: { sKey: 's4', icon: FaShippingFast },
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const service = SLUG_MAP[slug]

  if (!service) return <Navigate to="/services" replace />

  const Icon = service.icon
  const sKey = service.sKey
  const allSlugs = Object.keys(SLUG_MAP)
  const number = String(allSlugs.indexOf(slug) + 1).padStart(2, '0')
  const features = [1, 2, 3].map((n) => t(`services.${sKey}.feat${n}`))
  const steps = t(`services.${sKey}.steps`, { returnObjects: true })
  const related = allSlugs.filter((s) => s !== slug)

  return (
    <>
      <PageHero
        eyebrowKey={`services.${sKey}.name`}
        title1Key="services.title"
        descKey={`services.${sKey}.short`}
        crumb={{ key: 'nav.services', to: '/services' }}
      />

      <section className="relative py-20">
        <GearArt className="pointer-events-none absolute end-6 top-16 w-44 text-carbon-900/5" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-8">
            {['long1', 'long2'].map((p, i) => (
              <motion.p
                key={p}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-base leading-relaxed text-carbon-600 md:text-lg"
              >
                {t(`services.${sKey}.${p}`)}
              </motion.p>
            ))}

            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col gap-3 rounded-2xl border border-carbon-900/10 bg-white p-5 shadow-sm"
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-honda-red/10 text-honda-red">
                    <FaCheck className="text-sm" />
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-carbon-700">{f}</span>
                </motion.div>
              ))}
            </div>

            {/*__SD_B__*/}
          </div>
        </div>
      </section>
    </>
  )
}
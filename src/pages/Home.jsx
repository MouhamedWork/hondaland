import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FaArrowRight,
  FaShippingFast,
  FaShieldAlt,
  FaTags,
  FaQuoteLeft,
  FaWrench,
  FaGlobe,
  FaLocationArrow,
  FaPhone,
  FaHandshake,
  FaTimes,
} from 'react-icons/fa'
import SectionHeading from '../components/SectionHeading.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import ParallaxSection from '../components/ParallaxSection.jsx'
import { CarSilhouette as CarArt, GearArt } from '../components/CarArt.jsx'
import { CertificateArt } from '../components/CertificateArt.jsx'
import { assets } from '../utils/assets.js'
import Hero from '../components/Hero.jsx'

const STATS = [
  { to: 21, suffix: '+', labelKey: 'stats.l1' },
  { to: 850, imports: true, labelKey: 'stats.l2' },
  { to: 120, suffix: 'K+', labelKey: 'stats.l3' },
  { to: 14, suffix: '+', labelKey: 'stats.l4' },
]

const COUNT_FORMAT = new Intl.NumberFormat('en-US')

function Counter({ to, suffix = '', imports = false, labelKey, start }) {
  const { t, i18n } = useTranslation()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    let t0
    const duration = 1400
    const tick = (now) => {
      if (t0 === undefined) t0 = now
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(2, -10 * p)
      setValue(Math.round(to * (p === 1 ? 1 : eased)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, to])

  const display = imports
    ? `${COUNT_FORMAT.format(value)}/30`
    : COUNT_FORMAT.format(value)

  return (
    <div className="flex flex-col gap-3">
      <span className="font-display text-5xl font-bold text-carbon-900">
        {display}
        {suffix && <span className="text-2xl text-honda-red">{suffix}</span>}
      </span>
      <span className="text-sm font-medium text-carbon-600">{t(labelKey)}</span>
    </div>
  )
}

const SERVICES_PREVIEW = [
  { icon: FaShieldAlt, sKey: 's1', to: '/services/original-parts' },
  { icon: FaWrench, sKey: 's2', to: '/services/used-parts' },
  { icon: FaGlobe, sKey: 's3', to: '/services/order-import' },
  { icon: FaShippingFast, sKey: 's4', to: '/services/shipping' },
]

const WHY_REASONS = [
  { icon: FaShieldAlt, rKey: 'r1' },
  { icon: FaShippingFast, rKey: 'r2' },
  { icon: FaTags, rKey: 'r3' },
  { icon: FaWrench, rKey: 'r4' },
]

const BRAND_NAMES = ['HONDA', 'TOYOTA', 'NISSAN', 'BMW', 'MERCEDES', 'HYUNDAI', 'KIA', 'CHEVROLET', 'MITSUBISHI', 'PEUGEOT']

const CERT_TILTS = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5]

export default function Home() {
  const { t } = useTranslation()
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 })
  const aboutPoints = t('about.points', { returnObjects: true })
  const testimonials = t('testimonials.items', { returnObjects: true })
  const partners = t('partners.items', { returnObjects: true })
  const awards = t('awards.items', { returnObjects: true })
  const [activeCert, setActiveCert] = useState(null)

  const { scrollY } = useScroll()
  const statsY = useTransform(scrollY, [400, 1300], [70, -70])
  const aboutY = useTransform(scrollY, [900, 1900], [50, -50])









  return (
    <div>

      <Hero />
      {/* ---------------- ABOUT ---------------- */}
      <ParallaxSection id="about" reverse showPattern patternOpacity={0.1} className="py-24">
        <motion.div
          style={{ y: aboutY }}
          aria-hidden
          className="pointer-events-none absolute -start-20 top-1/4 hidden opacity-60 lg:block"
        >
          <CarArt className="w-[26rem]" />
        </motion.div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-12 lg:grid-cols-2">
          <div className="relative flex min-h-[20rem] flex-col items-start justify-between gap-10 overflow-hidden rounded-3xl border border-carbon-900/10 bg-white p-10 shadow-sm lg:order-2">
            <GearArt className="absolute -end-10 -top-10 w-52 text-honda-red/10" />
            <span className="relative z-10 font-display text-6xl font-bold leading-[1.05] text-carbon-900/10 md:text-7xl">
              {t('brand.prefix')}
              <br />
              {t('brand.suffix')}
            </span>
            <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-honda-red px-5 py-2 text-sm font-semibold text-white">
              {t('hero.badge')}
            </span>
          </div>

          <div className="flex flex-col items-start gap-6 lg:order-1">
            <SectionHeading
              align="start"
              eyebrowKey="about.eyebrow"
              title1Key="about.title1"
              title2Key="about.title2"
            />
            <p className="leading-relaxed text-carbon-600">{t('about.p1')}</p>
            <p className="leading-relaxed text-carbon-600">{t('about.p2')}</p>
            <ul className="grid w-full gap-3 sm:grid-cols-2">
              {(Array.isArray(aboutPoints) ? aboutPoints : []).map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 rounded-xl border border-carbon-900/10 bg-white px-4 py-3 text-sm text-carbon-700 shadow-sm"
                >
                  <span className="size-2 shrink-0 rounded-full bg-honda-red" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to="/#why-us"
              className="group inline-flex items-center gap-2 font-semibold text-honda-red transition-colors hover:text-carbon-900"
            >
              {t('about.cta')}
              <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1 rtl-flip" />
            </Link>
          </div>
        </div>
      </ParallaxSection>

      {/* ---------------- STATS ---------------- */}
      <ParallaxSection
        ref={statsRef}
        id="stats"
        tilted
        showCar
        showPattern
        patternOpacity={0.12}
        carSide="start"
        carOpacity={0.1}
        className="border-y border-carbon-900/10 bg-carbon-50 py-16"
      >
        <motion.div style={{ y: statsY }} aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-0 size-72 rounded-full bg-honda-red/10 blur-3xl" />
          <div className="absolute bottom-0 right-[15%] size-72 rounded-full bg-carbon-900/5 blur-3xl" />
          <GearArt className="absolute -top-8 end-[8%] w-40 text-carbon-900/5" />
        </motion.div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <p className="text-center text-xs font-semibold uppercase tracking-widestx text-honda-red">
            {t('stats.eyebrow')}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((s) => (
              <Counter
                key={s.labelKey}
                to={s.to}
                suffix={s.suffix}
                imports={s.imports}
                labelKey={s.labelKey}
                start={statsInView}
              />
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ---------------- SERVICES ---------------- */}
      <ParallaxSection id="services" className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading eyebrowKey="tagline" title1Key="services.title" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-center text-carbon-600"
          >
            {t('services.subtitle')}
          </motion.p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {SERVICES_PREVIEW.map((s, i) => (
              <motion.div
                key={s.sKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-carbon-900/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-honda-red/10"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-honda-red/10 text-xl text-honda-red transition-colors duration-300 group-hover:bg-honda-red group-hover:text-white">
                  <s.icon />
                </span>
                <h3 className="font-display text-xl font-bold text-carbon-900">
                  {t(`services.${s.sKey}.name`)}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-carbon-600">
                  {t(`services.${s.sKey}.short`)}
                </p>
                <Link
                  to={s.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-honda-red transition-colors hover:text-carbon-900"
                >
                  {t('services.explore')}
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1 rtl-flip" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>



      {/* ---------------- WHY US ---------------- */}
      <ParallaxSection id="why-us" tilted showCar showPattern patternOpacity={0.15} carSide="end" carOpacity={0.08} className="border-y border-carbon-900/10 bg-carbon-50 py-24">
        <CarArt
          aria-hidden
          className="pointer-events-none absolute -end-24 bottom-0 w-[30rem] opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading eyebrowKey="whyUs.eyebrow" title1Key="whyUs.title1" title2Key="whyUs.title2" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {WHY_REASONS.map((r, i) => (
              <motion.div
                key={r.rKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-5 rounded-3xl border border-carbon-900/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-honda-red/10"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-honda-red/10 text-lg text-honda-red transition-colors duration-300 group-hover:bg-honda-red group-hover:text-white">
                  <r.icon />
                </span>
                <span className="flex flex-col gap-2">
                  <h3 className="font-display text-lg font-bold text-carbon-900">
                    {t(`whyUs.${r.rKey}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-carbon-600">{t(`whyUs.${r.rKey}.desc`)}</p>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ---------------- PARTNERS ---------------- */}
      <ParallaxSection id="partners" reverse showPattern patternOpacity={0.1} className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading eyebrowKey="partners.eyebrow" title1Key="partners.title1" title2Key="partners.title2" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-center text-carbon-600"
          >
            {t('partners.desc')}
          </motion.p>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {(Array.isArray(partners) ? partners : []).map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-carbon-900/10 bg-white px-4 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-honda-red/50"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-honda-red/10 text-lg text-honda-red transition-colors duration-300 group-hover:bg-honda-red group-hover:text-white">
                  <FaHandshake />
                </span>
                <span className="font-display text-base font-bold tracking-widestx text-carbon-900">{p.name}</span>
                <span className="text-xs text-carbon-500">{p.field}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ---------------- AWARDS GALLERY ---------------- */}
      <ParallaxSection id="awards" tilted showCar showPattern patternOpacity={0.12} carSide="start" carOpacity={0.07} className="border-y border-carbon-900/10 bg-carbon-50 py-24">
        <GearArt className="pointer-events-none absolute -start-16 bottom-8 w-56 text-carbon-900/5" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading eyebrowKey="awards.eyebrow" title1Key="awards.title1" title2Key="awards.title2" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-center text-carbon-600"
          >
            {t('awards.desc')}
          </motion.p>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
            {(Array.isArray(awards) ? awards : []).map((a, i) => (
              <motion.figure
                key={a.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0, rotate: CERT_TILTS[i % CERT_TILTS.length] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                onClick={() => setActiveCert(i)}
                className="relative cursor-pointer"
              >
                <CertificateArt
                  index={i}
                  title={a.title}
                  issuer={a.issuer}
                  year={a.year}
                  serial={`${t('awards.serial')} ${String(i + 1).padStart(3, '0')}`}
                  brand={t('brandFull')}
                  tagline={t('tagline')}
                />
              </motion.figure>
            ))}
          </div>

          {/* lightbox: enlarged certificate view */}
          <AnimatePresence>
            {activeCert !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCert(null)}
                className="fixed inset-0 z-[150] grid place-items-center overflow-y-auto bg-carbon-950/70 p-6 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.85, y: 24 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 16 }}
                  transition={{ type: 'spring', damping: 24, stiffness: 260 }}
                  className="relative w-full max-w-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CertificateArt
                    index={90}
                    title={awards[activeCert].title}
                    issuer={awards[activeCert].issuer}
                    year={awards[activeCert].year}
                    serial={`${t('awards.serial')} ${String(activeCert + 1).padStart(3, '0')}`}
                    brand={t('brandFull')}
                    tagline={t('tagline')}
                  />
                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    aria-label="Close"
                    className="absolute -top-3 -end-3 grid size-10 place-items-center rounded-full bg-honda-red text-white shadow-lg transition-colors hover:bg-honda-redLight"
                  >
                    <FaTimes />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ParallaxSection>

      {/* ---------------- BRANDS ---------------- */}
      <ParallaxSection id="brands" reverse showPattern patternOpacity={0.1} className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading eyebrowKey="brands.eyebrow" title1Key="brands.title1" title2Key="brands.title2" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-center text-carbon-600"
          >
            {t('brands.desc')}
          </motion.p>
        </div>

        <div className="relative mt-14" dir="ltr">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent" />
          <div className="marquee-track items-center">
            {[...BRAND_NAMES, ...BRAND_NAMES].map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="mx-3 rounded-2xl border border-carbon-900/10 bg-white px-8 py-4 font-display text-lg font-bold tracking-widestx text-carbon-600 shadow-sm transition-colors duration-300 hover:border-honda-red/50 hover:text-honda-red"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-12 px-6 text-center text-sm text-carbon-500">
          {t('brands.note')} —{' '}
          <Link
            to="/services/order-import"
            className="font-semibold text-honda-red transition-colors hover:underline"
          >
            {t('brands.cta')}
          </Link>
        </p>
      </ParallaxSection>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <ParallaxSection tilted showCar showPattern patternOpacity={0.12} carSide="end" carOpacity={0.09} className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading
            eyebrowKey="testimonials.eyebrow"
            title1Key="testimonials.title1"
            title2Key="testimonials.title2"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {(Array.isArray(testimonials) ? testimonials : []).map((item, i) => (
              <motion.figure
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col gap-5 rounded-3xl border border-carbon-900/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-honda-red/10"
              >
                <FaQuoteLeft className="text-2xl text-honda-red/30 transition-colors group-hover:text-honda-red" />
                <blockquote className="flex-1 text-sm leading-relaxed text-carbon-600">
                  {item.text}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-carbon-900/5 pt-4">
                  <span className="grid size-11 place-items-center rounded-full bg-honda-red/10 font-display text-base font-bold text-honda-red">
                    {item.name?.[0] ?? 'A'}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-carbon-900">{item.name}</span>
                    <span className="text-xs text-carbon-500">{item.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ---------------- CONTACT ---------------- */}
      <ParallaxSection id="contact" reverse showPattern patternOpacity={0.1} className="border-t border-carbon-900/10 bg-carbon-50 py-24">
        <GearArt
          aria-hidden
          className="pointer-events-none absolute -start-16 top-10 w-56 text-carbon-900/5"
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
          <SectionHeading eyebrowKey="cta.eyebrow" title1Key="cta.title1" title2Key="cta.title2" />
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-carbon-600">{t('cta.desc')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${t('cta.phone')}`}
              className="group inline-flex items-center gap-2 rounded-full bg-honda-red px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-honda-redLight hover:shadow-lg hover:shadow-honda-red/40"
            >
              <FaPhone />
              {t('cta.call')} {t('cta.phone')}
            </a>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-carbon-900/20 px-8 py-3.5 font-semibold text-carbon-700 transition-colors hover:border-honda-red hover:text-honda-red"
            >
              {t('hero.cta1')}
            </Link>
          </div>
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 text-sm text-carbon-500">
            <span className="inline-flex items-center gap-2">
              <FaLocationArrow className="text-honda-red" />
              {t('location.addressLine')}
            </span>
          </div>
        </div>
      </ParallaxSection>

      <CtaBanner />
    </div>
  )
}
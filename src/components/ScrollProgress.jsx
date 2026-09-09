import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { assets } from '../utils/assets.js'
import { scrollToId } from '../utils/scroll.js'
import { getSectionProgress, getActiveSection } from '../utils/progress.js'

const SECTIONS = [
  { id: 'home', key: 'nav.home' },
  { id: 'services', key: 'nav.services' },
  { id: 'about', key: 'nav.about' },
  { id: 'why-us', key: 'nav.whyUs' },
  { id: 'partners', key: 'partners.eyebrow' },
  { id: 'awards', key: 'awards.eyebrow' },
  { id: 'brands', key: 'nav.brands' },
  { id: 'testimonials', key: 'testimonials.eyebrow' },
  { id: 'contact', key: 'nav.contact' },
]

/** A scroll-driven road, with measured section stops rather than equal intervals. */
export default function ScrollProgress() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const carTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [percent, setPercent] = useState(0)
  const [stops, setStops] = useState([])
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setPercent(Math.round(value * 100))
  })

  useEffect(() => {
    let frame
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        setPercent(maxScroll > 0 ? Math.round(window.scrollY / maxScroll * 100) : 0)
        setStops(pathname === '/' ? SECTIONS.flatMap((section) => {
          const element = document.getElementById(section.id)
          if (!element) return []
          const offset = parseFloat(getComputedStyle(element).scrollMarginTop) || 0
          const top = element.getBoundingClientRect().top + window.scrollY - offset
          return [{ ...section, progress: getSectionProgress(top, maxScroll) }]
        }) : [])
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    window.addEventListener('resize', measure)
    document.fonts.ready.then(measure)
    measure()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(frame)
    }
  }, [pathname, i18n.language])

  const active = getActiveSection(stops, percent / 100)

  return (
    <aside className="scroll-sidebar" aria-label={t('progress.label')}>
      <span className="scroll-sidebar__caption" aria-hidden="true">{t('progress.journey')}</span>
      <div className="scroll-road">
        <div
          className="scroll-road__meter"
          role="progressbar"
          aria-label={t('progress.label')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <motion.div className="scroll-road__fill" style={{ scaleY: scrollYProgress }} />
        </div>
        {stops.length > 0 && (
          <nav className="scroll-road__stops" aria-label={t('progress.sections')}>
            {stops.map((stop) => (
              <button
                key={stop.id}
                type="button"
                className="scroll-road__stop"
                style={{ top: `${stop.progress * 100}%` }}
                aria-label={t(stop.key)}
                aria-current={active === stop.id ? 'location' : undefined}
                onClick={() => scrollToId(stop.id)}
              >
                <span className="scroll-road__dot" />
                <span className="scroll-road__tooltip">{t(stop.key)}</span>
              </button>
            ))}
          </nav>
        )}
        <motion.img
          src={assets.progressCar}
          alt=""
          aria-hidden="true"
          className="scroll-road__car"
          style={{ top: carTop }}
          width="28"
          height="48"
        />
      </div>
      <span className="scroll-sidebar__percent" dir="ltr" aria-hidden="true">{percent}%</span>
    </aside>
  )
}

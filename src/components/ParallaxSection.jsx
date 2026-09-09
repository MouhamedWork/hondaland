import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { assets } from '../utils/assets.js'

/** Local viewport progress keeps the effect consistent on every screen size. */
export default function ParallaxSection({
  children,
  className = '',
  tilted = false,
  reverse = false,
  showCar = false,
  carSide = 'end',
  carOpacity = 0.08,
  showPattern = false,
  patternOpacity = 0.15,
  showHonda = false,
  hondaOpacity = 0.2,
  ...props
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reverse ? [-60, 60] : [60, -60])
  const bgY = useTransform(scrollYProgress, [0, 1], reverse ? [-100, 100] : [100, -100])
  const hondaY = useTransform(scrollYProgress, [0, 1], reverse ? [-150, 150] : [150, -150])
  const carY = useTransform(scrollYProgress, [0, 1], reverse ? [-120, 120] : [120, -120])
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05])

  return (
    <section
      {...props}
      ref={ref}
      className={`parallax-section ${tilted ? 'section-tilted' : ''} ${reverse ? 'section-tilted--reverse' : ''} ${showCar ? 'parallax-section--has-car' : ''} ${showPattern ? 'parallax-section--has-pattern' : ''} ${showHonda ? 'parallax-section--has-honda' : ''} ${className}`}
    >
      {showHonda && (
        <motion.div
          aria-hidden="true"
          className="parallax-section__honda"
          style={{
            y: reduceMotion ? 0 : hondaY,
            opacity: hondaOpacity,
            backgroundImage: `url("${assets.honda}")`,
          }}
        />
      )}
      {showPattern && (
        <motion.div
          aria-hidden="true"
          className="parallax-section__bg"
          style={{
            y: reduceMotion ? 0 : bgY,
            opacity: patternOpacity,
            backgroundImage: `url("${assets.partsPattern}")`,
          }}
        />
      )}
      <motion.div
        aria-hidden="true"
        className="parallax-section__texture"
        style={{ y: reduceMotion ? 0 : y, backgroundImage: `url("${assets.partsPattern}")` }}
      />
      <motion.div
        aria-hidden="true"
        className="parallax-section__orb"
        style={{ y: reduceMotion ? 0 : y, rotate: reduceMotion ? 0 : rotate }}
      />
      {showCar && (
        <motion.img
          src={assets.carSilhouette}
          alt=""
          aria-hidden="true"
          className={`parallax-section__car parallax-section__car--${carSide}`}
          style={{
            y: reduceMotion ? 0 : carY,
            scale: reduceMotion ? 1 : scale,
            opacity: carOpacity,
          }}
          width="960"
          height="300"
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  )
}

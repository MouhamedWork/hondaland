// ============================================================
// الـ Preloader مسؤول فقط عن:
//
// 1. عرض الـ Logo في center.
// 2. عرض progress.
// 3. عند الوصول لـ 100% ينادي onComplete.
//
// لا نحرك الـ Logo هنا.
//
// App.jsx هو المسؤول عن إنشاء flying logo وتحريكه
// من نفس مكان الـ Preloader إلى Navbar.
// ============================================================

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { assets } from '../utils/assets.js'

const DURATION = 1600

const BADGE =
  'grid shrink-0 place-items-center size-16 rounded-3xl bg-white shadow-lg overflow-hidden'

export default function Preloader({ onComplete }) {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    let raf
    let t0 = null

    const tick = (now) => {
      if (t0 === null) {
        t0 = now
      }

      const p = Math.min(
        1,
        (now - t0) / DURATION
      )

      setProgress(Math.round(p * 100))

      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {

        // ====================================================
        // الـ preload انتهى هنا.
        //
        // لا نحرك الـ Logo هنا.
        //
        // فقط نبلغ App أن يبدأ مرحلة انتقال الـ Logo.
        // ====================================================

        setTimeout(() => {
          onComplete?.()
        }, 100)
      }
    }

    raf = requestAnimationFrame(tick)

    const fallback = setTimeout(() => {
      onComplete?.()
    }, DURATION + 800)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)

      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <motion.div
      // ======================================================
      // الـ Preloader كله يختفي بـ fade.
      //
      // لا نعمل translateY للـ Preloader لأننا نريد
      // الـ Logo هو الذي يتحرك وليس الشاشة كلها.
      // ======================================================
      exit={{
        opacity: 0,
        transition: {
          duration: 0.25,
          ease: 'easeOut',
        },
      }}

      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-12 bg-white"
    >

      <div className="absolute inset-0 grid-lines bg-[radial-gradient(80%_60%_at_50%_40%,#ffffff_0%,#eef0f2_85%)]" />

      <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-honda-red/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* ====================================================
            الـ Logo الأصلي.

            يظل هنا ثابت في center أثناء الـ preload.
        ==================================================== */}

        <div className="relative grid place-items-center py-4">

          <span className="preloader-ring" />

          <span className="preloader-ring preloader-ring--reverse" />

          <span className={BADGE}>

            <img
              src={assets.logo}
              alt={t('brandFull')}
              className="h-full w-full object-contain"
            />

          </span>

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <span className="font-display text-2xl font-bold tracking-widest text-carbon-900">
            {t('brand.prefix')}
            <span className="text-honda-red">.</span>
            {t('brand.suffix')}
          </span>

          <span className="text-xs text-carbon-500">
            {t('tagline')}
          </span>
        </motion.div>

      </div>

      <div className="relative z-10 flex w-56 flex-col items-center gap-3">

        <div className="h-1 w-full overflow-hidden rounded-full bg-carbon-900/10">

          <div
            className="h-full rounded-full bg-gradient-to-r from-honda-red to-honda-redLight transition-[width] duration-100"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <span className="font-display text-sm font-bold text-carbon-700">
          {progress}%
        </span>

        <span className="text-[11px] uppercase tracking-widest text-carbon-400">
          {t('preloader.loading')}…
        </span>

      </div>

    </motion.div>
  )
}
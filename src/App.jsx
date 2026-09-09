// ============================================================
// الفكرة الجديدة:
//
// 1. الـ Navbar موجود من البداية، لكنه لا يعمل أي animation.
//
// 2. الـ Preloader يعرض الـ Logo في center الشاشة.
//
// 3. عند وصول الـ loading إلى 100%:
//      - نأخذ مكان الـ Logo الحقيقي داخل الـ Navbar.
//      - نضع Logo مستقل فوق الشاشة.
//      - يبدأ من center الشاشة.
//      - يتحرك فعليًا إلى مكان الـ Logo في الـ Navbar.
//
// 4. أثناء الحركة:
//      - الـ Navbar ثابت تمامًا.
//      - الـ Logo هو العنصر الوحيد الذي يتحرك.
//
// 5. بعد انتهاء الحركة:
//      - نخفي الـ flying logo.
//      - نظهر Logo الـ Navbar.
//
// بهذه الطريقة لا نعتمد على layoutId في توقيت unmount,
// وبالتالي الحركة ستكون واضحة ومضمونة.
// ============================================================

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Preloader from './components/Preloader.jsx'

import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import NotFound from './pages/NotFound.jsx'

import { assets } from './utils/assets.js'

const ROUTE_TITLES = {
  '/': 'pageTitle.home',
  '/services': 'pageTitle.services',
  '/services/original-parts': 'pageTitle.services',
  '/services/used-parts': 'pageTitle.services',
  '/services/order-import': 'pageTitle.services',
  '/services/shipping': 'pageTitle.services',
}

function PageTitleSync() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    const key = ROUTE_TITLES[pathname] || 'pageTitle.home'
    document.title = t(key)
  }, [pathname, t])

  return null
}

function HashScroller() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const timer = setTimeout(() => {
      document
        .getElementById(hash.replace('#', ''))
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 90)

    return () => clearTimeout(timer)
  }, [hash])

  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)

  // هل بدأت حركة الـ Logo؟
  const [logoFlying, setLogoFlying] = useState(false)

  // مكان الـ Logo النهائي داخل Navbar
  const [logoTarget, setLogoTarget] = useState(null)

  // ============================================================
  // عندما ينتهي الـ Preloader:
  //
  // ننتظر لحظة صغيرة حتى يكون الـ Navbar ظاهرًا في DOM.
  // بعدها نجيب مكان الـ Logo الحقيقي باستخدام getBoundingClientRect.
  // ============================================================
  const handlePreloaderComplete = () => {
    setLoading(false)

    requestAnimationFrame(() => {
      const navbarLogo = document.getElementById('navbar-logo')

      if (!navbarLogo) return

      const rect = navbarLogo.getBoundingClientRect()

      setLogoTarget({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      })

      // نبدأ حركة الـ Logo
      setLogoFlying(true)
    })
  }

  const handleLogoFlightComplete = () => {
    // بعد وصول الـ Logo لمكانه في Navbar
    // نخفي الـ flying logo ونترك Logo الـ Navbar يظهر.
    setLogoFlying(false)
  }

  return (
    <BrowserRouter>
      <PageTitleSync />
      <HashScroller />

      <div className="min-h-screen bg-white font-body text-carbon-900 antialiased">

        {/* ======================================================
            الـ Navbar نفسه ثابت.
            لا يوجد initial y=-90
            ولا animate y=0

            الحركة كلها ستكون في flying logo.
        ====================================================== */}

        <Navbar
          ready={!loading}
          logoFlying={logoFlying}
        />

        <ScrollProgress />

        {/* ======================================================
            الـ Preloader
            يختفي بعد انتهاء الـ loading.
        ====================================================== */}

        <AnimatePresence>
          {loading && (
            <Preloader
              key="preloader"
              onComplete={handlePreloaderComplete}
            />
          )}
        </AnimatePresence>

        {/* ======================================================
            FLYING LOGO

            ده أهم جزء في الحركة.

            البداية:
                center الشاشة

            النهاية:
                مكان Logo الـ Navbar

            الـ Logo ده fixed فوق كل العناصر.
            لذلك المستخدم سيرى Logo واحد يتحرك فعليًا.
        ====================================================== */}

        <AnimatePresence>
          {logoFlying && logoTarget && (
            <motion.div
              key="flying-logo"

              initial={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                width: 64,
                height: 64,
                opacity: 1,
                scale: 1,
              }}

              animate={{
                left: logoTarget.x,
                top: logoTarget.y,
                x: 0,
                y: 0,
                width: logoTarget.width,
                height: logoTarget.height,
                opacity: 1,
                scale: 1,
              }}

              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}

              onAnimationComplete={handleLogoFlightComplete}

              className="
                pointer-events-none
                fixed
                z-[300]
                overflow-hidden
                rounded-xl
              "
            >
              <img
                src={assets.logo}
                alt=""
                className="h-full w-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================
            الـ Content موجود من البداية.
            الـ Preloader مجرد overlay فوقه.
        ====================================================== */}

        <main >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/services/:slug"
              element={<ServiceDetail />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  )
}
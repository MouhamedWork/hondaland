// ============================================================
// التغيير هنا:
//
// الـ Navbar لا يتحرك نهائيًا.
//
// لا يوجد:
//     initial={{ y: -90 }}
//     animate={{ y: 0 }}
//
// الـ Navbar موجود وثابت من أول لحظة.
//
// أما Logo الـ Navbar:
//     - له id="navbar-logo"
//     - App يستخدمه لمعرفة مكان النهاية.
//     - أثناء حركة الـ flying logo يكون opacity-0.
//     - بعد انتهاء الحركة يظهر في مكانه الطبيعي.
//
// إذن المستخدم يرى Logo واحد فقط يتحرك من center → Navbar.
// ============================================================

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

import {
  FaBars,
  FaTimes,
  FaGlobe,
  FaChevronDown,
  FaShieldAlt,
  FaCogs,
  FaShippingFast,
} from 'react-icons/fa'

import Logo from './Logo.jsx'

const SERVICE_LINKS = [
  { icon: FaShieldAlt, sKey: 's1', slug: 'original-parts' },
  { icon: FaCogs, sKey: 's2', slug: 'used-parts' },
  { icon: FaShippingFast, sKey: 's4', slug: 'shipping' },
]

export default function Navbar({
  ready = true,
  logoFlying = false,
}) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const toggleLang = () => {
    const next = i18n.language?.startsWith('ar')
      ? 'en'
      : 'ar'

    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)

    document.documentElement.lang = next
    document.documentElement.dir =
      next === 'ar' ? 'rtl' : 'ltr'

    document.title = t('pageTitle.home')
  }

  const desktopLink =
    'relative text-sm font-semibold text-carbon-700 transition-colors hover:text-honda-red'

  return (
    <header
      // ======================================================
      // مهم جدًا:
      //
      // الـ Navbar نفسه ثابت.
      //
      // لا initial
      // لا animate
      // لا y
      //
      // هو موجود في مكانه من البداية.
      // ======================================================
      className="
        fixed
        inset-x-0
        top-0
        z-50
        border-b
       border-white/10
  bg-transparent
  backdrop-blur-md
      "
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 md:px-12">

        <Link to="/" aria-label={t('brandFull')}>

          {/* ==================================================
              مكان الـ Logo النهائي.

              App يقيس هذا العنصر باستخدام:

                  getBoundingClientRect()

              وبعدها الـ flying logo يتحرك إلى نفس المكان.
          ================================================== */}

          <div
            id="navbar-logo"
            className={`
              transition-opacity duration-150
              ${logoFlying ? 'opacity-0' : 'opacity-100'}
            `}
          >
            <Logo />
          </div>

        </Link>

        {/* ---------- Desktop ---------- */}

        <nav className="hidden items-center gap-7 lg:flex">

          <Link
            to="/#home"
            className={desktopLink}
          >
            {t('nav.home')}
          </Link>

          <Link
            to="/#about"
            className={desktopLink}
          >
            {t('nav.about')}
          </Link>

          <div className="group relative">

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `${desktopLink} flex items-center gap-1.5 ${isActive ? 'text-honda-red' : ''
                }`
              }
            >
              {t('nav.services')}

              <FaChevronDown className="text-[9px] transition-transform duration-300 group-hover:rotate-180" />
            </NavLink>

            <div className="invisible absolute start-1/2 top-full z-20 w-72 translate-y-3 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ltr:-translate-x-1/2 rtl:translate-x-1/2">

              <div className="flex flex-col gap-1 rounded-2xl border border-carbon-900/10 bg-white p-2 shadow-xl shadow-carbon-900/10">

                {SERVICE_LINKS.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-carbon-700 transition-colors hover:bg-carbon-50 hover:text-honda-red"
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-honda-red/10 text-honda-red">
                      <s.icon className="text-xs" />
                    </span>

                    {t(`services.${s.sKey}.name`)}
                  </Link>
                ))}

                <Link
                  to="/services"
                  className="mt-1 rounded-xl bg-carbon-50 px-3 py-2.5 text-center text-sm font-semibold text-honda-red transition-colors hover:bg-honda-red/10"
                >
                  {t('services.title')} →
                </Link>

              </div>

            </div>
          </div>

          <Link
            to="/#why-us"
            className={desktopLink}
          >
            {t('nav.whyUs')}
          </Link>

          <Link
            to="/#brands"
            className={desktopLink}
          >
            {t('nav.brands')}
          </Link>

          <Link
            to="/#contact"
            className={desktopLink}
          >
            {t('nav.contact')}
          </Link>

        </nav>

        <div className="hidden items-center gap-3 lg:flex">

          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('lang.aria')}
            className="flex items-center gap-2 rounded-full border border-carbon-900/15 px-4 py-2 text-sm font-semibold text-carbon-700 transition-colors hover:border-honda-red hover:text-honda-red"
          >
            <FaGlobe className="text-xs" />
            {t('lang.switch')}
          </button>

          <Link
            to="/#contact"
            className="rounded-full bg-honda-red px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-honda-redLight hover:shadow-lg hover:shadow-honda-red/40"
          >
            {t('cta.button')}
          </Link>

        </div>

      </div>
    </header>
  )
}
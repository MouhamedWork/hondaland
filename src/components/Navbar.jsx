
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

// ============================================================
// SERVICES DROPDOWN LINKS
// ============================================================

const SERVICE_LINKS = [
  {
    icon: FaShieldAlt,
    sKey: 's1',
    slug: 'original-parts',
  },
  {
    icon: FaCogs,
    sKey: 's2',
    slug: 'used-parts',
  },
  {
    icon: FaShippingFast,
    sKey: 's4',
    slug: 'shipping',
  },
]


export default function Navbar({
  ready = true,
  logoFlying = false,
}) {

  const { t, i18n } = useTranslation()

  // ==========================================================
  // MOBILE MENU STATE
  //
  // false → menu closed
  // true  → menu open
  // ==========================================================

  const [open, setOpen] = useState(false)


  // ==========================================================
  // LANGUAGE SWITCH
  // ==========================================================

  const toggleLang = () => {

    const next = i18n.language?.startsWith('ar')
      ? 'en'
      : 'ar'

    i18n.changeLanguage(next)

    localStorage.setItem('lang', next)

    document.documentElement.lang = next

    document.documentElement.dir =
      next === 'ar'
        ? 'rtl'
        : 'ltr'

    document.title = t('pageTitle.home')
  }


  // ==========================================================
  // CLOSE MOBILE MENU
  // ==========================================================

  const closeMenu = () => {
    setOpen(false)
  }


  // ==========================================================
  // DESKTOP LINK STYLE
  // ==========================================================

  const desktopLink = `
    relative
    text-sm
    font-semibold
    text-white/80
    transition-colors
    hover:text-white
  `


  return (

    <header
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

      {/* ======================================================
          NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          gap-6
          px-6
          md:px-12
        "
      >

        {/* ====================================================
            LOGO

            App يستخدم:

                document
                  .getElementById('navbar-logo')
                  .getBoundingClientRect()

            لمعرفة مكان الـ Logo النهائي.
        ==================================================== */}

        <Link
          to="/"
          aria-label={t('brandFull')}
          onClick={closeMenu}
        >

          <div
            id="navbar-logo"
            className={`
              transition-opacity
              duration-150
              ${logoFlying
                ? 'opacity-0'
                : 'opacity-100'
              }
            `}
          >

            <Logo />

          </div>

        </Link>


        {/* ====================================================
            DESKTOP NAVIGATION

            يظهر من lg وأكبر
        ==================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-7
            lg:flex
          "
        >

          {/* HOME */}

          <Link
            to="/#home"
            className={desktopLink}
          >
            {t('nav.home')}
          </Link>


          {/* ABOUT */}

          <Link
            to="/#about"
            className={desktopLink}
          >
            {t('nav.about')}
          </Link>


          {/* ==================================================
              SERVICES DROPDOWN
          ================================================== */}

          <div className="group relative">

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `
                  ${desktopLink}
                  flex
                  items-center
                  gap-1.5
                  ${isActive
                  ? 'text-honda-red'
                  : ''
                }
                `
              }
            >

              {t('nav.services')}

              <FaChevronDown
                className="
                  text-[9px]
                  transition-transform
                  duration-300
                  group-hover:rotate-180
                "
              />

            </NavLink>


            {/* ================================================
                SERVICES DROPDOWN
            ================================================= */}

            <div
              className="
                invisible
                absolute
                start-1/2
                top-full
                z-20
                w-72
                translate-y-3
                pt-3
                opacity-0
                transition-all
                duration-300
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
                ltr:-translate-x-1/2
                rtl:translate-x-1/2
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-1
                  rounded-2xl
                  border
                  border-carbon-900/10
                  bg-white
                  p-2
                  shadow-xl
                  shadow-carbon-900/10
                "
              >

                {/* SERVICES */}

                {SERVICE_LINKS.map((service) => (

                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      text-carbon-700
                      transition-colors
                      hover:bg-carbon-50
                      hover:text-honda-red
                    "
                  >

                    {/* ICON */}

                    <span
                      className="
                        grid
                        size-8
                        place-items-center
                        rounded-lg
                        bg-honda-red/10
                        text-honda-red
                      "
                    >

                      <service.icon
                        className="text-xs"
                      />

                    </span>


                    {/* SERVICE NAME */}

                    {t(
                      `services.${service.sKey}.name`
                    )}

                  </Link>

                ))}


                {/* ALL SERVICES */}

                <Link
                  to="/services"
                  className="
                    mt-1
                    rounded-xl
                    bg-carbon-50
                    px-3
                    py-2.5
                    text-center
                    text-sm
                    font-semibold
                    text-honda-red
                    transition-colors
                    hover:bg-honda-red/10
                  "
                >
                  {t('services.title')} →
                </Link>

              </div>

            </div>

          </div>


          {/* WHY US */}

          <Link
            to="/#why-us"
            className={desktopLink}
          >
            {t('nav.whyUs')}
          </Link>


          {/* BRANDS */}

          <Link
            to="/#brands"
            className={desktopLink}
          >
            {t('nav.brands')}
          </Link>


          {/* CONTACT */}

          <Link
            to="/#contact"
            className={desktopLink}
          >
            {t('nav.contact')}
          </Link>

        </nav>


        {/* ====================================================
            DESKTOP ACTIONS
        ==================================================== */}

        <div
          className="
            hidden
            items-center
            gap-3
            lg:flex
          "
        >

          {/* LANGUAGE */}

          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('lang.aria')}
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              px-4
              py-2
              text-sm
              font-semibold
              text-white/80
              transition-all
              duration-300
              hover:border-white/50
              hover:text-white
            "
          >

            <FaGlobe className="text-xs" />

            {t('lang.switch')}

          </button>


          {/* CTA */}

          <Link
            to="/#contact"
            className="
              rounded-full
              bg-honda-red
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-honda-redLight
              hover:shadow-lg
              hover:shadow-honda-red/40
            "
          >

            {t('cta.button')}

          </Link>

        </div>


        {/* ====================================================
            MOBILE BURGER BUTTON

            يظهر فقط في:
                Mobile
                Tablet

            ويختفي في:
                lg+
        ==================================================== */}

        <button
          type="button"
          onClick={() =>
            setOpen((previous) => !previous)
          }
          aria-label={
            open
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={open}
          className="
            grid
            size-11
            place-items-center
            rounded-xl
            border
            border-white/15
            bg-white/5
            text-white
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-white/30
            hover:bg-white/10
            lg:hidden
          "
        >

          {/* ==================================================
              BURGER ↔ CLOSE ANIMATION
          ================================================== */}

          <AnimatePresence
            mode="wait"
            initial={false}
          >

            {open ? (

              <motion.span
                key="close"
                initial={{
                  rotate: -90,
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                  scale: 0.7,
                }}
              >

                <FaTimes className="text-lg" />

              </motion.span>

            ) : (

              <motion.span
                key="menu"
                initial={{
                  rotate: 90,
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  rotate: -90,
                  opacity: 0,
                  scale: 0.7,
                }}
              >

                <FaBars className="text-lg" />

              </motion.span>

            )}

          </AnimatePresence>

        </button>

      </div>


      {/* ========================================================
          MOBILE MENU

          open === true
              ↓
          يظهر

          open === false
              ↓
          يختفي
      ======================================================== */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              border-t
              border-white/10
              bg-carbon-950/95
              backdrop-blur-2xl
              lg:hidden
            "
          >

            <div
              className="
                mx-auto
                max-w-7xl
                px-6
                py-5
                md:px-12
              "
            >

              {/* =================================================
                  MOBILE LINKS
              ================================================= */}

              <nav className="flex flex-col gap-1">

                {/* HOME */}

                <Link
                  to="/#home"
                  onClick={closeMenu}
                  className="
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-white/80
                    transition-colors
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  {t('nav.home')}
                </Link>


                {/* ABOUT */}

                <Link
                  to="/#about"
                  onClick={closeMenu}
                  className="
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-white/80
                    transition-colors
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  {t('nav.about')}
                </Link>


                {/* =================================================
                    SERVICES
                ================================================= */}

                <div
                  className="
                    my-1
                    border-y
                    border-white/10
                    py-2
                  "
                >

                  {/* SERVICES MAIN LINK */}

                  <Link
                    to="/services"
                    onClick={closeMenu}
                    className="
                      block
                      rounded-xl
                      px-4
                      py-3.5
                      text-sm
                      font-semibold
                      text-white/80
                      transition-colors
                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    {t('nav.services')}
                  </Link>


                  {/* SERVICES SUB LINKS */}

                  <div
                    className="
                      mt-1
                      flex
                      flex-col
                      gap-1
                    "
                  >

                    {SERVICE_LINKS.map((service) => (

                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={closeMenu}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          px-6
                          py-3
                          text-xs
                          font-medium
                          text-white/50
                          transition-colors
                          hover:bg-white/5
                          hover:text-white
                        "
                      >

                        <span
                          className="
                            grid
                            size-7
                            place-items-center
                            rounded-lg
                            bg-honda-red/10
                            text-honda-red
                          "
                        >

                          <service.icon
                            className="text-[10px]"
                          />

                        </span>


                        {t(
                          `services.${service.sKey}.name`
                        )}

                      </Link>

                    ))}

                  </div>

                </div>


                {/* WHY US */}

                <Link
                  to="/#why-us"
                  onClick={closeMenu}
                  className="
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-white/80
                    transition-colors
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  {t('nav.whyUs')}
                </Link>


                {/* BRANDS */}

                <Link
                  to="/#brands"
                  onClick={closeMenu}
                  className="
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-white/80
                    transition-colors
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  {t('nav.brands')}
                </Link>


                {/* CONTACT */}

                <Link
                  to="/#contact"
                  onClick={closeMenu}
                  className="
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-white/80
                    transition-colors
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  {t('nav.contact')}
                </Link>

              </nav>


              {/* =================================================
                  MOBILE ACTIONS
              ================================================= */}

              <div
                className="
                  mt-4
                  flex
                  flex-col
                  gap-3
                  border-t
                  border-white/10
                  pt-4
                "
              >

                {/* LANGUAGE */}

                <button
                  type="button"
                  onClick={toggleLang}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white/80
                    transition-all
                    duration-300
                    hover:border-white/30
                    hover:text-white
                  "
                >

                  <FaGlobe className="text-xs" />

                  {t('lang.switch')}

                </button>


                {/* CTA */}

                <Link
                  to="/#contact"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-honda-red
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-honda-redLight
                    hover:shadow-lg
                    hover:shadow-honda-red/30
                  "
                >

                  {t('cta.button')}

                </Link>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </header>
  )
}


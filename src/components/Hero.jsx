import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
    FaArrowRight,
    FaShippingFast,
} from 'react-icons/fa'

export default function Hero() {
    const { t } = useTranslation()

    const { scrollY } = useScroll()

    // =========================================================
    // BACKGROUND PARALLAX
    // The background moves slower while scrolling
    // =========================================================
    const backgroundY = useTransform(
        scrollY,
        [0, 700],
        [0, 180]
    )

    // Slight zoom-out effect
    const backgroundScale = useTransform(
        scrollY,
        [0, 700],
        [1.12, 1]
    )

    // =========================================================
    // CONTENT PARALLAX
    // Content moves upward while scrolling
    // =========================================================
    const contentY = useTransform(
        scrollY,
        [0, 650],
        [0, -90]
    )

    // =========================================================
    // HERO FADE
    // Hero gradually fades while leaving the viewport
    // =========================================================
    const heroOpacity = useTransform(
        scrollY,
        [0, 500],
        [1, 0]
    )

    // =========================================================
    // DECORATIONS PARALLAX
    // Decorative elements move at another speed
    // =========================================================
    const decorationY = useTransform(
        scrollY,
        [0, 700],
        [0, -160]
    )

    return (

        <section
            id="home"
            className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        bg-carbon-950
      "
        >
            {/* ---------------- HERO (light) ---------------- */}
            {/* =========================================================
    HERO SECTION
    - Full screen automotive background
    - Unsplash image
    - Framer Motion parallax
    - Floating automotive decorations
    - Foreground car animation
========================================================= */}

            {/* =========================================================
    HERO
    Automotive Hero with:
    - Full background image
    - Framer Motion parallax
    - Transparent navbar compatibility
    - Dark automotive overlay
    - Existing translation keys
========================================================= */}
            {/* =====================================================
          AUTOMOTIVE BACKGROUND
      ===================================================== */}
            <motion.div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          -inset-[8%]
          bg-cover
          bg-center
          bg-no-repeat
        "
                style={{
                    y: backgroundY,
                    scale: backgroundScale,

                    // Automotive image
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=90")',
                }}
            />

            {/* =====================================================
          DARK OVERLAY
      ===================================================== */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          inset-0
          bg-black/55
        "
            />

            {/* =====================================================
          LEFT GRADIENT
          Keeps text readable
      ===================================================== */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/80
          to-black/20
        "
            />

            {/* =====================================================
          RED GLOW - LEFT
      ===================================================== */}
            <motion.div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          -left-40
          top-1/4
          size-[30rem]
          rounded-full
          bg-honda-red/20
          blur-[120px]
        "
                style={{
                    y: decorationY,
                }}
            />

            {/* =====================================================
          RED GLOW - RIGHT
      ===================================================== */}
            <motion.div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          size-[30rem]
          rounded-full
          bg-honda-red/10
          blur-[140px]
        "
                style={{
                    y: decorationY,
                }}
            />

            {/* =====================================================
          TECHNICAL GRID
      ===================================================== */}
            <div
                aria-hidden="true"
                className="
          grid-lines
          pointer-events-none
          absolute
          inset-0
          opacity-[0.08]
        "
            />

            {/* =====================================================
          DECORATIVE CIRCLE
      ===================================================== */}
            <motion.div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          right-[12%]
          top-[20%]
          hidden
          size-32
          rounded-full
          border
          border-white/10
          lg:block
        "
                style={{
                    y: decorationY,
                }}
            >
                <div
                    className="
            absolute
            inset-3
            rounded-full
            border
            border-honda-red/30
          "
                />

                <div
                    className="
            absolute
            left-1/2
            top-0
            h-full
            w-px
            -translate-x-1/2
            bg-white/10
          "
                />

                <div
                    className="
            absolute
            left-0
            top-1/2
            h-px
            w-full
            -translate-y-1/2
            bg-white/10
          "
                />
            </motion.div>

            {/* =====================================================
          SMALL FLOATING DOT
      ===================================================== */}
            <motion.div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          right-[28%]
          top-[15%]
          hidden
          size-3
          rounded-full
          bg-honda-red
          shadow-[0_0_30px_rgba(225,29,42,0.8)]
          lg:block
        "
                style={{
                    y: decorationY,
                }}
            />

            {/* =====================================================
          HERO CONTENT
      ===================================================== */}
            <motion.div
                style={{
                    y: contentY,
                    opacity: heroOpacity,
                }}
                className="
          relative
          z-20
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-7xl
          items-center
          px-6
          pt-20
          md:px-12
        "
            >
                <div className="max-w-3xl">

                    {/* =================================================
              BADGE
          ================================================= */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.25,
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
              mb-7
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/15
              bg-white/10
              px-4
              py-2
              backdrop-blur-md
            "
                    >
                        <span
                            className="
                size-2
                rounded-full
                bg-honda-red
                shadow-[0_0_18px_rgba(225,29,42,0.9)]
              "
                        />

                        <span
                            className="
                text-xs
                font-bold
                tracking-wide
                text-white/85
              "
                        >
                            {t('hero.badge')}
                        </span>
                    </motion.div>

                    {/* =================================================
              TITLE
          ================================================= */}
                    <div className="overflow-hidden">

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 80,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.4,
                                duration: 0.9,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                text-6xl
                font-black
                leading-[0.9]
                tracking-[-0.04em]
                text-white
                sm:text-7xl
                lg:text-8xl
                xl:text-[7rem]
              "
                        >
                            {t('hero.title1')}
                        </motion.h1>

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 80,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.52,
                                duration: 0.9,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                mt-1
                text-6xl
                font-black
                leading-[0.9]
                tracking-[-0.04em]
                text-honda-red
                sm:text-7xl
                lg:text-8xl
                xl:text-[7rem]
              "
                        >
                            {t('hero.title2')}
                        </motion.h1>

                    </div>

                    {/* =================================================
              RED ACCENT
          ================================================= */}
                    <motion.div
                        initial={{
                            width: 0,
                            opacity: 0,
                        }}
                        animate={{
                            width: '110px',
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.9,
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
              mt-8
              h-1
              rounded-full
              bg-honda-red
            "
                    />

                    {/* =================================================
              DESCRIPTION
          ================================================= */}
                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
              mt-7
              max-w-2xl
              text-base
              leading-8
              text-white/70
              sm:text-lg
            "
                    >
                        {t('hero.desc')}
                    </motion.p>

                    {/* =================================================
              CTA BUTTONS
          ================================================= */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 1.15,
                            duration: 0.7,
                        }}
                        className="
              mt-9
              flex
              flex-wrap
              items-center
              gap-4
            "
                    >
                        {/* Primary */}
                        <Link
                            to="/services"
                            className="
                group
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-honda-red
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-[0_15px_40px_rgba(225,29,42,0.3)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-red-600
                hover:shadow-[0_20px_50px_rgba(225,29,42,0.4)]
              "
                        >
                            {t('hero.cta1')}

                            <FaArrowRight
                                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  rtl:rotate-180
                "
                            />
                        </Link>

                        {/* Secondary */}
                        <a
                            href="#contact"
                            className="
                inline-flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/20
                bg-white/5
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/40
                hover:bg-white/10
              "
                        >
                            {t('hero.cta2')}
                        </a>
                    </motion.div>

                    {/* =================================================
              DELIVERY
          ================================================= */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 1.35,
                            duration: 0.7,
                        }}
                        className="
              mt-8
              flex
              items-center
              gap-3
            "
                    >
                        <div
                            className="
                grid
                size-9
                place-items-center
                rounded-lg
                border
                border-white/10
                bg-white/5
              "
                        >
                            <FaShippingFast
                                className="text-sm text-honda-red"
                            />
                        </div>

                        <span
                            className="
                text-sm
                font-medium
                text-white/60
              "
                        >
                            {t('hero.delivery')}
                        </span>
                    </motion.div>

                </div>
            </motion.div>

            {/* =====================================================
          AUTOMOTIVE LABEL
      ===================================================== */}
            <motion.div
                aria-hidden="true"
                style={{
                    y: decorationY,
                }}
                className="
          pointer-events-none
          absolute
          bottom-24
          right-[8%]
          z-10
          hidden
          items-center
          gap-3
          lg:flex
        "
            >
                <span className="h-px w-20 bg-white/20" />

                <span
                    className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-white/30
          "
                >
                    Automotive Parts
                </span>

                <span className="h-px w-20 bg-white/20" />
            </motion.div>

            {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 1.8,
                    duration: 0.8,
                }}
                className="
          absolute
          bottom-7
          left-1/2
          z-30
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-3
          md:flex
        "
            >
                <span
                    className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-white/35
          "
                >
                    Scroll
                </span>

                <motion.div
                    animate={{
                        y: [0, 7, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="
            flex
            h-10
            w-6
            justify-center
            rounded-full
            border
            border-white/20
            p-1
          "
                >
                    <motion.span
                        animate={{
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                        className="
              h-2
              w-1
              rounded-full
              bg-white
            "
                    />
                </motion.div>
            </motion.div>

            {/* =====================================================
          BOTTOM FADE
      ===================================================== */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-32
          bg-gradient-to-t
          from-carbon-950
          to-transparent
        "
            />
        </section>
    )
}
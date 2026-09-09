import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FaEnvelope,
  FaTachometerAlt,
  FaLocationArrow,
  FaPhone,
  FaClock,
} from 'react-icons/fa'

const COLUMNS = [
  {
    headingKey: 'footer.col1',
    links: [
      { key: 'footer.l1_1', to: '/#about' },
      { key: 'footer.l1_2', to: '/#about' },
      { key: 'footer.l1_3', to: '/#why-us' },
      { key: 'footer.l1_4', to: '/#contact' },
    ],
  },
  {
    headingKey: 'footer.col2',
    links: [
      { key: 'footer.l2_1', to: '/services/original-parts' },
      { key: 'footer.l2_2', to: '/services/used-parts' },
      { key: 'footer.l2_3', to: '/services/order-import' },
      { key: 'footer.l2_4', to: '/services/shipping' },
    ],
  },
  {
    headingKey: 'footer.col3',
    links: [
      { key: 'footer.l3_1', to: '/#brands' },
      { key: 'footer.l3_2', to: '/#blog' },
      { key: 'footer.l3_3', to: '/#contact' },
      { key: 'footer.l3_4', to: '/#contact' },
    ],
  },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-carbon-900/10 bg-carbon-100">
      <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_85%_0%,rgba(225,29,42,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-14 pt-16 md:grid-cols-2 md:px-12 lg:grid-cols-4">
        <div>
          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-honda-red text-white">
              <FaTachometerAlt className="text-sm" />
            </span>
            <span className="font-display text-lg font-bold tracking-widestx">
              {t('brand.prefix')}
              <span className="text-honda-red">.</span>
              {t('brand.suffix')}
            </span>
          </NavLink>
          <p className="mt-5 text-sm leading-relaxed text-carbon-500">
            {t('footer.desc')}
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.headingKey}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-carbon-700">
              {t(col.headingKey)}
            </h3>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-carbon-600 transition-colors hover:text-carbon-900">
              {col.links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="inline-block transition-all duration-200 hover:text-carbon-900 hover:translate-x-1">
                    {t(link.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-carbon-700">
            {t('footer.store')}
          </h3>
          <ul className="mt-5 flex flex-col gap-2.5 text-sm text-carbon-600">
            <li className="flex items-center gap-2.5">
              <FaLocationArrow className="text-honda-red" />
              {t('location.addressLine')}
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhone className="text-honda-red" /> {t('location.phone')}
            </li>
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="text-honda-red" /> {t('location.email')}
            </li>
            <li className="flex items-center gap-2.5">
              <FaClock className="text-honda-red" /> {t('location.hoursValue')}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-carbon-900/10 px-6 py-6 text-xs text-carbon-500 md:px-12">
        <span>
          © {year} {t('brandFull')} — {t('tagline')}. {t('footer.rights')}
        </span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-honda-red" />
          {t('footer.credit')}
        </span>
      </div>
    </footer>
  )
}
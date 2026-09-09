// ============================================================
// الـ Logo أصبح Component عادي.
//
// لم نعد نستخدم layoutId هنا لأننا عملنا الحركة
// بشكل explicit من خلال flying logo في App.jsx.
//
// هذا يجعل التحكم في:
//     البداية
//     النهاية
//     السرعة
//     الـ easing
//     الـ scale
//
// أسهل وأوضح.
// ============================================================

import { useTranslation } from 'react-i18next'
import { assets } from '../utils/assets.js'

export default function Logo({
  size = 'md',
}) {
  const { t } = useTranslation()

  const badge =
    size === 'lg'
      ? 'size-16 rounded-3xl'
      : size === 'md'
        ? 'size-11 rounded-xl'
        : 'size-9 rounded-lg'

  return (
    <span className="flex items-center gap-2.5">

      <span
        className={`
          grid
          shrink-0
          place-items-center
          overflow-hidden
          ${badge}
        `}
      >
        <img
          src={assets.logo}
          alt={t('brandFull')}
          className="h-full w-full object-contain"
        />
      </span>

      <span className="flex flex-col leading-none">

        {size === 'lg' && (
          <span className="mt-1.5 text-[11px] text-carbon-500">
            {t('tagline')}
          </span>
        )}

      </span>

    </span>
  )
}
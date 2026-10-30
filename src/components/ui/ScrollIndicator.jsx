import { ArrowDown, ArrowRight } from 'lucide-react'

export default function ScrollIndicator({
  variant = 'dark',
  direction = 'down',
  text = 'SCROLL TO EXPLORE',
  className = '',
}) {
  const isLight = variant === 'light'
  const textColor = isLight ? 'text-[#231F20]/65' : 'text-white/75'
  const iconColor = 'text-[#E8B884]'
  const borderColor = isLight ? 'border-[#231F20]/15 bg-white/70' : 'border-white/15 bg-black/35'

  return (
    <div
      className={`pointer-events-none select-none flex items-center justify-center z-30 ${className}`}
      aria-hidden="true"
    >
      <div
        className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md shadow-sm ${borderColor}`}
      >
        <span
          className={`text-[0.6rem] sm:text-[0.65rem] tracking-[0.28em] uppercase font-semibold ${textColor}`}
        >
          {text}
        </span>
        {direction === 'right' ? (
          <ArrowRight
            size={13}
            strokeWidth={2}
            className={`${iconColor} animate-pulse`}
          />
        ) : (
          <ArrowDown
            size={13}
            strokeWidth={2}
            className={`${iconColor} animate-bounce`}
          />
        )}
      </div>
    </div>
  )
}


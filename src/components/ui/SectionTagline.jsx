import React from 'react'

export default function SectionTagline({ text, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-[1px] bg-[#E8B884] shrink-0" />
      </div>
      <span className="text-xs tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
        {text}
      </span>
    </div>
  )
}

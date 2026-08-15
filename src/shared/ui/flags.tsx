import React from 'react'

type FlagProps = {
  className?: string
}

export const FlagEn: React.FC<FlagProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
    <rect width="24" height="16" fill="#012169" />
    <path d="M0 0 24 16M24 0 0 16" stroke="#ffffff" strokeWidth="4.4" />
    <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="2.2" />
    <path d="M12 0v16M0 8h24" stroke="#ffffff" strokeWidth="5.4" />
    <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="3.2" />
  </svg>
)

export const FlagRu: React.FC<FlagProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
    <rect width="24" height="16" fill="#ffffff" />
    <rect y="5.33" width="24" height="5.34" fill="#0039a6" />
    <rect y="10.67" width="24" height="5.33" fill="#d52b1e" />
  </svg>
)

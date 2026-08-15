import React from 'react'

type IconProps = {
  className?: string
}

export const GemIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <path d="M6.6 2.8h6.8l3 5.1H3.6z" fill="#cbb2ff" />
    <path d="M3.6 7.9h12.8L10 17.6z" fill="#8b5cf6" />
    <path d="M6.6 2.8 8.2 7.9 10 2.8l1.8 5.1 1.6-5.1M8.2 7.9 10 17.6l1.8-9.7" fill="none" stroke="#5b21b6" strokeWidth="0.9" strokeLinejoin="round" />
    <path d="M3.6 7.9h12.8" fill="none" stroke="#5b21b6" strokeWidth="0.9" />
  </svg>
)

export const EnergyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <path d="M11.6 2 4.8 11h4l-.6 7 7-9.4h-4.2z" fill="#ffd66b" stroke="#d99a1c" strokeWidth="1" strokeLinejoin="round" />
  </svg>
)

export const GearIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M10 3.2 11 5a5.9 5.9 0 0 1 1.6.7l2-.5 1.2 2.1-1.4 1.4a5.6 5.6 0 0 1 0 1.6l1.4 1.4-1.2 2.1-2-.5a5.9 5.9 0 0 1-1.6.9L10 16.8 8.6 15a5.9 5.9 0 0 1-1.6-.9l-2 .5-1.2-2.1 1.4-1.4a5.6 5.6 0 0 1 0-1.6L3.8 7.3 5 5.2l2 .5A5.9 5.9 0 0 1 8.6 5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="10" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export const QuestIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <rect x="4" y="3" width="12" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7.4 8.2h5.2M7.4 11.4h3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <path d="m5 10.6 3.3 3.3L15 6.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

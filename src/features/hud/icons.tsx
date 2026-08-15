import React from 'react'

type IconProps = {
  className?: string
}

export const CoinIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="8" fill="#f0a92b" />
    <circle cx="10" cy="10" r="6" fill="#ffd66b" />
    <path
      d="M10 5.5v9M7.6 7.6h4.2a1.7 1.7 0 0 1 0 3.4H8.2a1.7 1.7 0 0 0 0 3.4h4"
      stroke="#a56c12"
      strokeWidth="1.3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)

export const EnergyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <path d="M11.6 2 4.8 11h4l-.6 7 7-9.4h-4.2z" fill="#7fb4ff" stroke="#3f7ee0" strokeWidth="1" strokeLinejoin="round" />
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

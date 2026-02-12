import type { IconProps } from 'crm-project-ui'

export const ContactsIcon: React.FC<IconProps> = props => {
  return (
    <svg
      width="420"
      height="300"
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="90" cy="80" r="60" fill="#EEF2FF" />
      <circle cx="340" cy="220" r="70" fill="#ECFEFF" />

      <line
        x1="170"
        y1="140"
        x2="250"
        y2="110"
        stroke="#CBD5E1"
        stroke-width="2"
        stroke-dasharray="4 4"
      />
      <line
        x1="170"
        y1="160"
        x2="250"
        y2="180"
        stroke="#CBD5E1"
        stroke-width="2"
        stroke-dasharray="4 4"
      />

      <rect
        x="120"
        y="110"
        rx="14"
        ry="14"
        width="120"
        height="90"
        fill="#FFFFFF"
        stroke="#E5E7EB"
      />
      <circle cx="150" cy="145" r="14" fill="#A5B4FC" />
      <rect x="175" y="135" width="45" height="8" rx="4" fill="#CBD5E1" />
      <rect x="175" y="150" width="30" height="6" rx="3" fill="#E5E7EB" />

      <circle cx="270" cy="105" r="22" fill="#FFFFFF" stroke="#E5E7EB" />
      <circle cx="270" cy="100" r="7" fill="#67E8F9" />
      <rect x="260" y="112" width="20" height="8" rx="4" fill="#CBD5E1" />

      <circle cx="270" cy="185" r="22" fill="#FFFFFF" stroke="#E5E7EB" />
      <circle cx="270" cy="180" r="7" fill="#86EFAC" />
      <rect x="260" y="192" width="20" height="8" rx="4" fill="#CBD5E1" />

      <circle cx="200" cy="60" r="4" fill="#A5B4FC" />
      <circle cx="310" cy="60" r="4" fill="#67E8F9" />
      <circle cx="350" cy="120" r="4" fill="#86EFAC" />
    </svg>
  )
}

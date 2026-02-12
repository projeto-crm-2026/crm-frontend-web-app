'use client'

type SemiCircleProgressProps = {
  percentage: number
  label: string
  size?: number
  strokeWidth?: number
  className?: string
  color?: string;
}

export function SemiCircleProgress({
  percentage,
  label,
  size = 200,
  strokeWidth = 14,
  className = '',
  color= 'text-blue-600'
}: SemiCircleProgressProps) {
  const clamped = Math.min(100, Math.max(0, percentage))
  const w = size
  const h = size / 2 + 20
  const cx = w / 2
  const cy = h - 8
  const r = (w - strokeWidth) / 2 - 8
  const startAngle = Math.PI
  const endAngle = Math.PI * (1 - clamped / 100)
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy - r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy - r * Math.sin(endAngle)
  const largeArc = clamped >= 50 ? 1 : 0
  const pathBg = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`
  const pathProgress = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`

  return (
    <div className={`relative flex h-full w-full flex-col items-center${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${w} ${h}`}
        className="overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={pathBg}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-slate-200"
        />
        <path
          d={pathProgress}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          left: '50%',
          top: '58%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <span className={`text-2xl font-bold text-slate-800`}>{clamped}%</span>
        <span className="text-xs text-slate-500">{label}</span>
      </div>
    </div>
  )
}

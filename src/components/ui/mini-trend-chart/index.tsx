'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'

type MiniTrendChartProps = {
  percentage: number
  positive?: boolean
  className?: string
  background?: string
  border?: string
  color?: string
}

export function MiniTrendChart({
  percentage,
  positive = true,
  className = '',
  background = 'bg-stone-50',
  color = 'text-amber-600'
}: MiniTrendChartProps) {
  const value = Math.abs(percentage)
  const sign = percentage >= 0 ? '+' : '−'
  const displayText = `${sign}${value.toFixed(2)}%`

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      title={displayText}
    >
      <div className={`p-1 ${background} flex items-center justify-center rounded-lg`}>{positive ? <TrendingUp /> : <TrendingDown />}</div>
      <span className={`text-xs font-medium ${color} tabular-nums`}>
        {displayText}
      </span>
    </div>
  )
}

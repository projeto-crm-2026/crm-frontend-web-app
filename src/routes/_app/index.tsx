import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Handshake, Users } from 'lucide-react'
import DashboardLayout from '../../features/dashboard/layout'
import { MiniTrendChart } from '../../components/ui/mini-trend-chart'
import { SemiCircleProgress } from '../../components/ui/semi-circle-progress'

const META_MIN = 50
const META_MAX = 500
const META_STEP = 10

function formatMetaValue(value: number) {
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(1)} mi`
  return `R$ ${value} mil`
}

export const Route = createFileRoute('/_app/')({
  component: IndexPage
})

const MOCK_STATS = [
  {
    label: 'Leads',
    value: '148',
    icon: Users,
    color: 'bg-white text-blue-700 border-stone-200',
    trend: 1.51,
    background: 'bg-blue-50',
    border: 'border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    label: 'Deals ativos',
    value: '18',
    icon: Handshake,
    color: 'bg-white text-orange-700 border-stone-200',
    trend: 2.8,
    background: 'bg-orange-50',
    border: 'border-orange-200',
    textColor: 'text-orange-700'
  },
  {
    label: 'Valor em negociação',
    value: 'R$ 1,2 mi',
    icon: Handshake,
    color: 'bg-white text-green-700 border-stone-200',
    trend: 0.94,
    background: 'bg-green-50',
    border: 'border-green-200',
    textColor: 'text-green-700'
  }
]

const DEALS_PERCENTAGES = [
  { title: 'Em proposta', percentage: 28, label: 'do total de deals' },
  {
    title: 'Em negociação',
    percentage: 42,
    label: 'do total de deals',
    color: 'text-yellow-400'
  },
  {
    title: 'Ganho',
    percentage: 22,
    label: 'fechados no período',
    color: 'text-green-600'
  },
  {
    title: 'Perdido',
    percentage: 8,
    label: 'no período',
    color: 'text-red-600'
  }
]

function IndexPage() {
  const [metaMensal, setMetaMensal] = useState(150)

  return (
    <div className="min-h-screen w-full overflow-x-auto">
      <DashboardLayout>
        <div className="flex flex-col gap-8 p-6">
          <section className="flex flex-col gap-6 rounded-xl bg-white p-5 sm:flex-row">
            <div className="flex flex-1 flex-col">
              <h2 className="mb-4 text-xl font-semibold text-slate-800">
                Informações rápidas
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_STATS.map(
                  ({
                    label,
                    value,
                    icon: Icon,
                    color,
                    trend,
                    background,
                    border,
                    textColor
                  }) => (
                    <div
                      key={label}
                      className={`flex h-34 min-w-[200px] flex-col gap-4 rounded-xl border p-4 shadow-md transition-all duration-150 ease-in hover:scale-102 ${color} relative`}
                    >
                      <p className="text-sm text-stone-600 opacity-90">
                        {label}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/80">
                          <Icon className="h-7 w-7" />
                        </div>
                        <p className="text-2xl font-semibold">{value}</p>
                      </div>
                      <div className="absolute right-2 bottom-2">
                        <MiniTrendChart
                          percentage={trend}
                          positive={trend >= 0}
                          background={background}
                          border={border}
                          color={textColor}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex max-w-sm min-w-[280px] flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-xl font-semibold text-slate-700">
                  Meta mensal
                </h2>
              </div>
              <p className="mb-1 text-3xl font-bold text-slate-700">
                {formatMetaValue(metaMensal)}
              </p>
              <p className="mb-4 text-sm text-slate-500">
                Ajuste a meta com o controle abaixo
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min={META_MIN}
                  max={META_MAX}
                  step={META_STEP}
                  value={metaMensal}
                  onChange={e => setMetaMensal(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-blue-200 accent-blue-600 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow-md"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{formatMetaValue(META_MIN)}</span>
                  <span>{formatMetaValue(META_MAX)}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col rounded-xl bg-slate-50 p-5 shadow-xl shadow-neutral-100">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-slate-800">
                Deals por estágio
              </h2>
              <p className="text-sm text-stone-600">
                Acompanhe a situação dos seus contratos
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DEALS_PERCENTAGES.map(({ title, percentage, label, color }) => (
                <div
                  key={title}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm duration-100 ease-in-out hover:scale-101"
                >
                  <h3 className="mb-2 text-left font-semibold text-slate-800">
                    {title}
                  </h3>
                  <div className="relative h-[140px] w-full">
                    <SemiCircleProgress
                      percentage={percentage}
                      label={label}
                      size={200}
                      color={color}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DashboardLayout>
    </div>
  )
}

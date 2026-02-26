import { createFileRoute } from '@tanstack/react-router'
import {
  Calendar,
  ChartArea,
  Handshake,
  MonitorCheck,
  Users
} from 'lucide-react'
import DashboardLayout from '../../features/dashboard/layout'
import { MiniTrendChart } from '../../components/ui/mini-trend-chart'
import { TypeAnimation } from 'react-type-animation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useState } from 'react'
import { ChartRadialStacked } from '../../components/ui/radial-chart'
import { ChartContainer, type ChartConfig } from '../../components/ui/chart'

export const Route = createFileRoute('/_app/')({
  component: IndexPage
})

const MOCK_STATS = [
  {
    label: 'Total de Leads',
    value: '148',
    icon: Users,
    color: 'bg-white text-blue-700 border-slate-200',
    trend: 1.51,
    background: 'bg-blue-50',
    border: 'border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    label: 'Deals ativos',
    value: '18',
    icon: Handshake,
    color: 'bg-white text-orange-700 border-slate-200',
    trend: 2.8,
    background: 'bg-orange-50',
    border: 'border-orange-200',
    textColor: 'text-orange-700'
  },
  {
    label: 'Valor em negociação',
    value: 'R$ 1,2 mi',
    icon: Handshake,
    color: 'bg-white text-green-700 border-slate-200',
    trend: 0.94,
    background: 'bg-green-50',
    border: 'border-green-200',
    textColor: 'text-green-700'
  },
  {
    label: 'Contratos pendentes',
    value: '12',
    icon: Handshake,
    color: 'bg-white text-purple-700 border-slate-200',
    trend: 0.94,
    background: 'bg-purple-50',
    border: 'border-purple-200',
    textColor: 'text-purple-700'
  }
]

const DEALS_PERCENTAGES = [
  {
    title: 'Em proposta',
    percentage: 28,
    label: 'do total de deals',
    color: 'blue',
    total: 100
  },
  {
    title: 'Em negociação',
    percentage: 42,
    label: 'do total de deals',
    color: 'yellow',
    total: 100
  },
  {
    title: 'Ganho',
    percentage: 22,
    label: 'fechados no período',
    color: 'green',
    total: 100
  },
  {
    title: 'Perdido',
    percentage: 8,
    label: 'no período',
    color: 'red',
    total: 100
  }
]

const data = [
  { type: 'Contratos', value: 100, color: '#3b82f6' },
  { type: 'Leds', value: 100, color: '#3b82f6' },
  { type: 'Faturamento', value: 100, color: '#3b82f6' },
  { type: 'Deals', value: 50, color: '#3b82f6' }
]

const diaryData = [
  { type: 'Contratos', value: 10, color: '#3b82f6' },
  { type: 'Leds', value: 10, color: '#3b82f6' },
  { type: 'Faturamento', value: 10, color: '#3b82f6' },
  { type: 'Deals', value: 5, color: '#3b82f6' }
]

const anualData = [
  { type: 'Contratos', value: 1000, color: '#3b82f6' },
  { type: 'Leds', value: 2000, color: '#3b82f6' },
  { type: 'Faturamento', value: 1000, color: '#3b82f6' },
  { type: 'Deals', value: 500, color: '#3b82f6' }
]

const chartConfig = {
  Total: {
    label: 'Total',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

function IndexPage() {
  const [actualData, setActualData] = useState(data)

  return (
    <div className="min-h-screen w-full overflow-x-auto">
      <DashboardLayout>
        <div className="flex min-h-16 flex-col gap-2 p-6">
          <div className="flex flex-col gap-1 px-5">
            <div className="min-h-7">
              <TypeAnimation
                sequence={[
                  `Acompanhe em tempo real.`,
                  2000,
                  'Tenha insights exclusivos.',
                  2000,
                  'Analise suas informações rapidamente.',
                  2000
                ]}
                speed={50}
                repeat={Infinity}
                className="text-xl font-semibold text-slate-700"
              />
            </div>
          </div>
          <section className="flex flex-col gap-6 rounded-xl p-5 sm:flex-row">
            <div className="flex flex-1 flex-col">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                      <p className="text-sm font-semibold text-slate-600 opacity-90">
                        {label}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/80">
                          <Icon className="h-7 w-7" />
                        </div>
                        <p className="text-3xl font-semibold">{value}</p>
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
          </section>
          <section className="flex gap-3 p-5">
            <ChartContainer
              className="h-[25rem] w-[80%] flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              config={chartConfig}
            >
              <BarChart
                data={actualData}
                style={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: 1.618
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey={'type'} />
                <YAxis dataKey={'value'} />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  fill="#1d4ed8"
                  barSize={50}
                />
              </BarChart>
            </ChartContainer>

            <div className="flex flex-col gap-5">
              <p className="text-md text-center">Filtre por periodo:</p>
              <button
                onClick={() => setActualData(data)}
                className={`text-md flex w-52 items-center gap-3 rounded-xl bg-white p-5 font-medium text-stone-800 transition-all duration-100 hover:scale-101 hover:cursor-pointer ${actualData === data ? `border-2 border-blue-400` : `border border-neutral-200`}`}
              >
                <ChartArea className="text-blue-800" />
                Mensal
              </button>
              <button
                onClick={() => setActualData(anualData)}
                className={`text-md flex w-52 items-center gap-3 rounded-xl bg-white p-5 font-medium text-stone-800 transition-all duration-100 hover:scale-101 hover:cursor-pointer ${actualData === anualData ? `border-2 border-blue-400` : `border border-neutral-200`}`}
              >
                <Calendar className="text-blue-800" />
                Anual
              </button>
              <button
                onClick={() => setActualData(diaryData)}
                className={`text-md flex w-52 items-center gap-3 rounded-xl bg-white p-5 font-medium text-stone-800 transition-all duration-100 hover:scale-101 hover:cursor-pointer ${actualData === diaryData ? `border-2 border-blue-400` : `border border-neutral-200`}`}
              >
                <MonitorCheck className="text-blue-800" /> Diária
              </button>
            </div>
          </section>

          <section className="flex flex-col rounded-xl p-2">
            <div className="mb-3 flex flex-col gap-1 px-2">
              <h2 className="text-xl font-semibold text-slate-800">
                Deals por estágio
              </h2>
              <p className="text-sm text-slate-600">
                Acompanhe a situação dos seus contratos
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DEALS_PERCENTAGES.map(
                ({ title, percentage, label, color, total }) => (
                  <ChartRadialStacked
                    title={title}
                    color={color}
                    percentage={percentage}
                    total={total}
                    label={label}
                  />
                )
              )}
            </div>
          </section>
        </div>
      </DashboardLayout>
    </div>
  )
}

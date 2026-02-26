import { Card, CardDescription, CardHeader } from 'crm-project-ui'
import {
  Calendar,
  ChartArea,
  Handshake,
  MonitorCheck,
  Users
} from 'lucide-react'
import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { createFileRoute } from '@tanstack/react-router'

import { ChartPieInteractive } from '../../components/ui/char-interactive-pier'
import { type ChartConfig, ChartContainer } from '../../components/ui/chart'
import { MiniTrendChart } from '../../components/ui/mini-trend-chart'
import DashboardLayout from '../../features/dashboard/layout'

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
    description: 'Clique para ver detalhes',
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

const monthlyData = [
  { name: 'Contratos', value: 120, color: '#3b82f6' },
  { name: 'Leads', value: 200, color: '#ef4444' },
  { name: 'Faturamento', value: 85, color: '#22c55e' },
  { name: 'Deals', value: 75, color: '#f97316' }
]

const weeklyData = [
  { name: 'Seg', value: 20, color: '#3b82f6' },
  { name: 'Ter', value: 35, color: '#ef4444' },
  { name: 'Qua', value: 15, color: '#22c55e' },
  { name: 'Qui', value: 45, color: '#f97316' },
  { name: 'Sex', value: 50, color: '#8b5cf6' }
]

const yearlyData = [
  { name: 'Jan', value: 1200, color: '#3b82f6' },
  { name: 'Fev', value: 1500, color: '#ef4444' },
  { name: 'Mar', value: 1800, color: '#22c55e' },
  { name: 'Abr', value: 1300, color: '#f97316' },
  { name: 'Mai', value: 2000, color: '#8b5cf6' },
  { name: 'Jun', value: 2400, color: '#3b82f6' },
  { name: 'Jul', value: 2200, color: '#ef4444' },
  { name: 'Ago', value: 2600, color: '#22c55e' },
  { name: 'Set', value: 2900, color: '#f97316' },
  { name: 'Out', value: 3200, color: '#8b5cf6' },
  { name: 'Nov', value: 3000, color: '#3b82f6' },
  { name: 'Dez', value: 3500, color: '#ef4444' }
]

const chartConfig = {
  Total: {
    label: 'Total',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

function IndexPage() {
  const [actualData, setActualData] = useState(monthlyData)

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
                className="text-xl font-semibold text-slate-700"
                repeat={Infinity}
                speed={50}
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
                      className={`flex h-34 min-w-[200px] flex-col gap-4 rounded-xl border p-4 shadow-md transition-all duration-150 ease-in hover:scale-102 ${color} relative`}
                      key={label}
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
                          background={background}
                          border={border}
                          color={textColor}
                          percentage={trend}
                          positive={trend >= 0}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
          <section className="flex gap-3 p-5">
            <Card className="h-[28rem] w-[80%] flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardDescription></CardDescription>
              </CardHeader>
              <ChartContainer className="h-[90%] w-full" config={chartConfig}>
                <BarChart
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: 1.618
                  }}
                  data={actualData}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey={Object.keys(actualData[0])[0]} />
                  <YAxis dataKey={Object.keys(actualData[0])[1]} />
                  <Bar
                    barSize={50}
                    dataKey={Object.keys(actualData[0])[1]}
                    fill="#1d4ed8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </Card>

            <div className="flex flex-col gap-5">
              <p className="text-md text-center">Selecione um filtro</p>
              <button
                className={`text-md flex w-52 items-center gap-3 rounded-xl bg-white p-5 font-medium text-stone-800 transition-all duration-100 hover:scale-101 hover:cursor-pointer ${actualData === monthlyData ? `border-2 border-blue-400` : `border border-neutral-200`}`}
                onClick={() => setActualData(monthlyData)}
              >
                <ChartArea className="text-blue-800" />
                Resumo Diário
              </button>
              <button
                className={`text-md flex w-52 items-center gap-3 rounded-xl bg-white p-5 font-medium text-stone-800 transition-all duration-100 hover:scale-101 hover:cursor-pointer ${actualData === weeklyData ? `border-2 border-blue-400` : `border border-neutral-200`}`}
                onClick={() => setActualData(weeklyData)}
              >
                <Calendar className="text-blue-800" />
                Balanço semanal
              </button>
              <button
                className={`text-md flex w-52 items-center gap-3 rounded-xl bg-white p-5 font-medium text-stone-800 transition-all duration-100 hover:scale-101 hover:cursor-pointer ${actualData === yearlyData ? `border-2 border-blue-400` : `border border-neutral-200`}`}
                onClick={() => setActualData(yearlyData)}
              >
                <MonitorCheck className="text-blue-800" /> Balanço anual
              </button>
            </div>
          </section>

          <section
            className="flex w-[90%] flex-col rounded-xl p-2 lg:w-1/2"
            id="deals"
          >
            <ChartPieInteractive />
          </section>
        </div>
      </DashboardLayout>
    </div>
  )
}

import {
  FileText,
  Handshake,
  TrendingDown,
  TrendingUp,
  Users
} from 'lucide-react'
import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis
} from 'recharts'

import { createFileRoute } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '../../components/ui/chart'
import DashboardLayout from '../../features/dashboard/layout'

export const Route = createFileRoute('/_app/')({
  component: IndexPage
})

const MOCK_STATS = [
  {
    label: 'Total de Leads',
    value: '148',
    icon: Users,
    trend: 12.5,
    positive: true
  },
  {
    label: 'Deals ativos',
    value: '18',
    icon: Handshake,
    trend: 8.2,
    positive: true
  },
  {
    label: 'Valor em negociação',
    value: 'R$ 1,2 mi',
    icon: Handshake,
    trend: -3.1,
    positive: false
  },
  {
    label: 'Contratos pendentes',
    value: '12',
    icon: FileText,
    trend: 4.7,
    positive: true
  }
]

const monthlyData = [
  { month: 'Jan', leads: 86, deals: 40, contratos: 20 },
  { month: 'Fev', leads: 120, deals: 55, contratos: 32 },
  { month: 'Mar', leads: 145, deals: 62, contratos: 41 },
  { month: 'Abr', leads: 98, deals: 48, contratos: 28 },
  { month: 'Mai', leads: 165, deals: 70, contratos: 52 },
  { month: 'Jun', leads: 200, deals: 85, contratos: 60 }
]

const barChartConfig = {
  leads: { label: 'Leads', color: '#3b82f6' },
  deals: { label: 'Deals', color: '#f97316' },
  contratos: { label: 'Contratos', color: '#22c55e' }
} satisfies ChartConfig

const areaData = [
  { month: 'Jan', faturamento: 45000 },
  { month: 'Fev', faturamento: 52000 },
  { month: 'Mar', faturamento: 61000 },
  { month: 'Abr', faturamento: 48000 },
  { month: 'Mai', faturamento: 72000 },
  { month: 'Jun', faturamento: 85000 }
]

const areaChartConfig = {
  faturamento: { label: 'Faturamento', color: '#3b82f6' }
} satisfies ChartConfig

const pieData = [
  { status: 'ganho', value: 237, fill: '#22c55e' },
  { status: 'perdido', value: 135, fill: '#ef4444' },
  { status: 'proposta', value: 173, fill: '#f97316' },
  { status: 'pendente', value: 186, fill: '#3b82f6' }
]

const pieChartConfig = {
  ganho: { label: 'Ganho', color: '#22c55e' },
  perdido: { label: 'Perdido', color: '#ef4444' },
  proposta: { label: 'Proposta', color: '#f97316' },
  pendente: { label: 'Pendente', color: '#3b82f6' }
} satisfies ChartConfig

type TimeFilter = 'mensal' | 'semanal' | 'anual'

function PieCenterLabel({
  viewBox,
  total
}: {
  viewBox?: { cx?: number; cy?: number }
  total: number
}) {
  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x={viewBox.cx}
          y={viewBox.cy}
          className="fill-slate-800 text-2xl font-bold"
        >
          {total}
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 20}
          className="fill-slate-400 text-xs"
        >
          Deals
        </tspan>
      </text>
    )
  }
  return null
}

const weeklyData = [
  { month: 'Seg', leads: 22, deals: 8, contratos: 3 },
  { month: 'Ter', leads: 35, deals: 12, contratos: 5 },
  { month: 'Qua', leads: 18, deals: 6, contratos: 4 },
  { month: 'Qui', leads: 42, deals: 15, contratos: 7 },
  { month: 'Sex', leads: 50, deals: 20, contratos: 9 }
]

const yearlyData = [
  { month: '2020', leads: 850, deals: 320, contratos: 180 },
  { month: '2021', leads: 1200, deals: 480, contratos: 290 },
  { month: '2022', leads: 1600, deals: 620, contratos: 410 },
  { month: '2023', leads: 2100, deals: 850, contratos: 560 },
  { month: '2024', leads: 2800, deals: 1100, contratos: 720 }
]

function IndexPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('mensal')

  const chartDataMap: Record<TimeFilter, typeof monthlyData> = {
    mensal: monthlyData,
    semanal: weeklyData,
    anual: yearlyData
  }
  const chartData = chartDataMap[timeFilter]

  const totalDeals = pieData.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_STATS.map(({ label, value, icon: Icon, trend, positive }) => (
            <Card key={label} className="border-gray-100 shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-600">{label}</p>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-50">
                  <Icon className="h-4 w-4 text-slate-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-slate-800">{value}</p>
                <div className="mt-1 flex items-center gap-1">
                  {positive ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {positive ? '+' : ''}
                    {trend}%
                  </span>
                  <span className="text-xs text-slate-400">
                    vs mês anterior
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="border-gray-100 shadow-none lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-sm text-slate-700">
                    Visão geral de atividades
                  </CardTitle>
                  <CardDescription>
                    Leads, deals e contratos por período
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  {(
                    [
                      { key: 'semanal', label: 'Semana' },
                      { key: 'mensal', label: 'Mês' },
                      { key: 'anual', label: 'Ano' }
                    ] as const
                  ).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setTimeFilter(key)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                        timeFilter === key
                          ? 'bg-[#e1e2de] text-slate-700'
                          : 'text-slate-500 hover:bg-[#e1e2de77] hover:text-slate-700'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-72 w-full" config={barChartConfig}>
                <BarChart data={chartData} barGap={4}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs"
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={false}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="leads"
                    fill="var(--color-leads)"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="deals"
                    fill="var(--color-deals)"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="contratos"
                    fill="var(--color-contratos)"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-700">
                Resumo de Deals
              </CardTitle>
              <CardDescription>Distribuição por status</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
              <ChartContainer
                className="mx-auto aspect-square w-full max-w-60"
                config={pieChartConfig}
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    cursor={false}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="status"
                    innerRadius={55}
                    strokeWidth={3}
                    stroke="#fff"
                  >
                    <Label
                      content={() => <PieCenterLabel total={totalDeals} />}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-1.5">
              {pieData.map(item => {
                const config =
                  pieChartConfig[item.status as keyof typeof pieChartConfig]
                return (
                  <div
                    key={item.status}
                    className="flex w-full items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-slate-600">{config?.label}</span>
                    </div>
                    <span className="font-medium text-slate-700">
                      {item.value}
                    </span>
                  </div>
                )
              })}
            </CardFooter>
          </Card>
        </div>

        <Card className="border-gray-100 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm text-slate-700">
              Faturamento mensal
            </CardTitle>
            <CardDescription>
              Evolução do faturamento nos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-60 w-full" config={areaChartConfig}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient
                    id="faturamentoGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                  tickFormatter={v => `R$ ${(v / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <Area
                  type="monotone"
                  dataKey="faturamento"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#faturamentoGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

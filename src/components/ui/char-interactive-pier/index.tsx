'use client'

import * as React from 'react'
import { useState } from 'react'
import { Label, Pie, PieChart, Sector } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../card'
import {
  type ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent
} from '../chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select'

export const description = 'An interactive pie chart'

const desktopData = [
  { type: 'pending', value: 186, fill: '#3b82f6' },
  { type: 'lost', value: 305, fill: '#ef4444' },
  { type: 'earned', value: 237, fill: '#22c55e' },
  { type: 'inpropose', value: 173, fill: '#f97316' }
]

const chartConfig = {
  pending: {
    label: 'Pendente',
    color: '#3b82f6'
  },
  lost: {
    label: 'Perdido',
    color: '#ef4444'
  },
  earned: {
    label: 'Ganho',
    color: '#22c55e'
  },
  inpropose: {
    label: 'Proposta',
    color: '#f97316'
  }
} satisfies ChartConfig

export function ChartPieInteractive() {
  const id = 'pie-interactive'
  const [activeItem, setActiveItem] = useState(desktopData[0]?.type ?? '')
  const activeIndexMemo = React.useMemo(
    () => {
      const index = desktopData.findIndex(item => item.type === activeItem)
      return Math.max(index, 0)
    },
    [activeItem]
  )


  const items = React.useMemo(() => desktopData.map(item => item.type), [])

  return (
    <Card className="flex flex-col" data-chart={id}>
      <ChartStyle config={chartConfig} id={id} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Resumo de Deals</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select onValueChange={setActiveItem} value={activeItem}>
          <SelectTrigger
            aria-label="Select a value"
            className="ml-auto h-9 w-40 rounded-lg pl-2.5"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {items.map(key => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  className="gap-2 rounded-lg [&_span]:flex"
                  key={key}
                  value={key}
                >
                  <div className="text-md flex items-center justify-center gap-2">
                    <span
                      style={{
                        backgroundColor: `var(--color-${key})`
                      }}
                      className="rounded-full my-auto flex h-3 w-3 shrink-0"
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          className="mx-auto aspect-square w-full max-w-75"
          config={chartConfig}
          id={id}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <Pie
              shape={({ outerRadius = 0, ...props }: any) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    innerRadius={outerRadius + 12}
                    outerRadius={outerRadius + 25}
                  />
                </g>
              )}
              onClick={data => {
                setActiveItem(data.type)
              }}
              className="hover:cursor-pointer"
              data={desktopData}
              dataKey="value"
              innerRadius={60}
              nameKey="type"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className="fill-foreground text-3xl font-bold"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {desktopData[activeIndexMemo].value.toLocaleString()}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                        >
                          Deals
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

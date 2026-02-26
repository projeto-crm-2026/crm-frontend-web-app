'use client'

import * as React from 'react'
import { Label, Pie, PieChart, Sector } from 'recharts'
import { type PieSectorDataItem } from 'recharts/types/polar/Pie'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../card'
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '../chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select'
import { useState } from 'react'

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
  const [activeitem, setActiveItem] = useState(desktopData[0].type)
  const activeIndexMemo = React.useMemo(
    () => desktopData.findIndex(item => item.type === activeitem),
    [activeitem]
  )
  const [activeIndex, setActiveIndex] = useState(activeIndexMemo)

  const items = React.useMemo(() => desktopData.map(item => item.type), [])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Resumo de Deals</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select value={activeitem} onValueChange={setActiveItem}>
          <SelectTrigger
            className="ml-auto h-9 w-[160px] rounded-lg pl-2.5"
            aria-label="Select a value"
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
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-md">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: `var(--color-${key})`
                      }}
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
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="value"
              nameKey="type"
              className='hover:cursor-pointer'
              innerRadius={60}
              onClick={(data, index) => {
                setActiveIndex(index)
                setActiveItem(data.type)
              }}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
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

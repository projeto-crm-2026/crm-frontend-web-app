'use client'

import { TrendingUp } from 'lucide-react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import { Card, CardContent, CardFooter } from '../card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../chart'

export const description = 'A radial chart with stacked sections'

type ChartRadialStackedProps = {
  title: string
  color: string
  percentage: number
  label: string
  total: number
}

export function ChartRadialStacked({
  title,
  color,
  percentage,
  total
}: ChartRadialStackedProps) {
  const chartConfig = {
    config: {
      label: 'Total',
      color: 'var(--chart-2)'
    }
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col p-2">
      <CardContent className="flex h-full items-center justify-center pb-0">
        <ChartContainer
          className="mx-auto flex w-full min-w-50 items-center justify-center pt-2"
          config={chartConfig}
        >
          <RadialBarChart
            cx="50%" // adicione isso
            cy="80%"
            data={[{ Total: total }]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <PolarRadiusAxis axisLine={false} tick={false} tickLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
                        <tspan
                          className="fill-foreground text-2xl font-bold"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                        >
                          {percentage.toLocaleString()}%
                        </tspan>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                        >
                          {title}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              className="stroke-transparent stroke-2"
              cornerRadius={5}
              dataKey="Total"
              fill={color}
              stackId="a"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="m-0 flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Aumento de 5.2% neste mês <TrendingUp className="h-4 w-4 text-lg" />
        </div>
      </CardFooter>
    </Card>
  )
}

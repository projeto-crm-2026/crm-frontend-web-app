'use client'

import { TrendingUp } from 'lucide-react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
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
  label,
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
          config={chartConfig}
          className="mx-auto flex w-full min-w-50 items-center justify-center pt-2"
        >
          <RadialBarChart
            data={[{ Total: total }]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            cx="50%" // adicione isso
            cy="80%"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {percentage.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
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
              dataKey="Total"
              fill={color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
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

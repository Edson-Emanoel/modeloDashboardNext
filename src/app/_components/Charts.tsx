"use client"

import "@/app/globals.css"
import * as React from "react"
import { Clock, TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A donut chart with text"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig
export function Charts() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])
  return (
    <div className="flex gap-5">
      {/* Card Section 01 */}
      <Card className="w-[30%] p-5 h-42 mt-5 bg-background_octonary border-none">
        <CardHeader className="p-0">
          <CardTitle>Performance do Restaurante</CardTitle>
          <CardDescription className="text-alt_text">Total de Pedidos no Mês</CardDescription>
        </CardHeader> 

        <CardContent className="gap-5 flex items-center justify-center">
          <ul className="flex flex-col gap-3 mt-5">
            <li className="flex gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-background_ninary rounded-md">
                <Clock className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">82 New Orders</span>
                Processando
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-background_ninary rounded-md">
                <Clock className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">82 New Orders</span>
                Processando
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-background_ninary rounded-md">
                <Clock className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">82 New Orders</span>
                Processando
              </div>
            </li>
          </ul>

          <ChartContainer
            config={chartConfig}
            className="flex-1 aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={() => (
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        fontSize="24"
                        fontWeight="bold"
                        fill="#F0F0F0"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>

                      <tspan
                        x="50%"
                        dy="1.5em"
                        fontSize="12"
                        fill="#71717a"
                      >
                        Total de Pedidos
                      </tspan>
                    </text>
                  )}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Card Section 02 */}
      <Card className="h-42 mt-5 bg-background_octonary border-none">
        <CardHeader>
          <CardTitle>Performance do Restaurante</CardTitle>
          <CardDescription className="text-alt_text">Total de Pedidos no Mês</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={() => (
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        fontSize="24"
                        fontWeight="bold"
                        fill="#F0F0F0"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>

                      <tspan
                        x="50%"
                        dy="1.5em"
                        fontSize="12"
                        fill="#71717a"
                      >
                        Total de Pedidos
                      </tspan>
                    </text>
                  )}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

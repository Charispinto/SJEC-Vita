"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PieChartComponentProps {
  data: [number, number]
}

export default function PieChartComponent({ data = [50, 50] }: PieChartComponentProps) {
  const chartData = [
    { name: "Interested Users", value: data[0] },
    { name: "Not Interested Users", value: data[1] },
  ]

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"]

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>User Interest Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            interested: {
              label: "Interested Users",
              color: COLORS[0],
            },
            notInterested: {
              label: "Not Interested Users",
              color: COLORS[1],
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry, index) => (
                  <span style={{ color: COLORS[index % COLORS.length] }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
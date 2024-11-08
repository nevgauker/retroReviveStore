'use client'
import { formatCurrency } from '@/lib/formatters'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

type RevenueByProductChartProps = {
  data: {
    name: string
    revenue: number
  }[]
}

export function RevenueByProductChart({ data }: RevenueByProductChartProps) {
  return (
    <ResponsiveContainer width='100%' minHeight={300}>
      <PieChart>
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          formatter={value => formatCurrency(value as number)}
        />
        <Pie
          label={item => item.name}
          data={data}
          dataKey='revenue'
          type='monotone'
          nameKey='name'
          fill='hsl(var(--primary))'
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

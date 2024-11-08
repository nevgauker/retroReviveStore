'use client'
import { formatNumber } from '@/lib/formatters'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type UsersByDateChartProps = {
  data: {
    date: string
    totalUsers: number
  }[]
}

export function UsersByDayChart({ data }: UsersByDateChartProps) {
  return (
    <ResponsiveContainer width='100%' minHeight={300}>
      <BarChart data={data}>
        <CartesianGrid stroke='hsl(var(--muted))' />
        <XAxis dataKey='date' stroke='hsl(var(--primary))' />
        <YAxis
          tickFormatter={tick => formatNumber(tick)}
          stroke='hsl(var(--primary))'
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          formatter={value => formatNumber(value as number)}
        />
        <Bar
          dataKey='totalUsers'
          type='monotone'
          name='New Customers'
          stroke='hsl(var(--primary))'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

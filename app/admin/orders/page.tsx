import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import db from '@/db/db'
import { formatCurrency } from '@/lib/formatters'
import { PageHeader } from '../_components/PageHeader'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Minus, MoreVertical } from 'lucide-react'
import { DeleteDropDownItem } from './_components/OrderActions'

function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
      discountCode: { select: { code: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default function OrdersPage() {
  return (
    <>
      <PageHeader
        title="Sales"
        subtitle="Review recent transactions and manage order records."
      />
      <OrdersTable />
    </>
  )
}

async function OrdersTable() {
  const orders = await getOrders()

  if (orders.length === 0)
    return (
      <div className="rounded-2xl border border-border/70 bg-white/90 p-6 text-sm text-muted-foreground">
        No sales found.
      </div>
    )

  return (
    <div className="rounded-2xl border border-border/70 bg-white/90 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Price Paid</TableHead>
            <TableHead>Coupon</TableHead>
            <TableHead className='w-0'>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.product.name}</TableCell>
              <TableCell>{order.user.email}</TableCell>
              <TableCell>
                {formatCurrency(order.pricePaidInCents / 100)}
              </TableCell>
              <TableCell>
                {order.discountCode == null ? (
                  <Minus className="text-muted-foreground" />
                ) : (
                  order.discountCode.code
                )}
              </TableCell>
              <TableCell className='text-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-full p-2 hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                    <span className='sr-only'>Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropDownItem id={order.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

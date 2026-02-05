import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { PageHeader } from '../_components/PageHeader'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { DeleteDropDownItem } from './_components/UserActions'

function getUsers() {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { pricePaidInCents: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Track customer value and order activity."
      />
      <UsersTable />
    </>
  )
}

async function UsersTable() {
  const users = await getUsers()

  if (users.length === 0)
    return (
      <div className="rounded-2xl border border-border/70 bg-white/90 p-6 text-sm text-muted-foreground">
        No customers found.
      </div>
    )

  return (
    <div className="rounded-2xl border border-border/70 bg-white/90 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className='w-0'>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{formatNumber(user.orders.length)}</TableCell>
              <TableCell>
                {formatCurrency(
                  user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) /
                    100,
                )}
              </TableCell>
              <TableCell className='text-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-full p-2 hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                    <span className='sr-only'>Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropDownItem id={user.id} />
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

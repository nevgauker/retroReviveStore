import { Button } from '@/components/ui/button'
import { PageHeader } from '../_components/PageHeader'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  CheckCircle2,
  Globe,
  Infinity,
  Minus,
  MoreVertical,
  XCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import db from '@/db/db'
import { Prisma } from '@prisma/client'
import {
  formatDateTime,
  formatDiscountCode,
  formatNumber,
} from '@/lib/formatters'
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from './_components/DiscountCodeActions'

const SELECT_FIELDS: Prisma.DiscountCodeSelect = {
  id: true,
  allProducts: true,
  code: true,
  discountAmount: true,
  discountType: true,
  expiresAt: true,
  limit: true,
  uses: true,
  isActive: true,
  products: { select: { name: true } },
  _count: { select: { orders: true } },
}
type DiscountCodeRow = Prisma.DiscountCodeGetPayload<{
  select: typeof SELECT_FIELDS
}>

export default async function DiscountCodesPage() {

  const allDiscountCodes = await db.discountCode.findMany({
    select: SELECT_FIELDS,
    orderBy: { createdAt: 'asc' },
  });

  // Filter expired and unexpired discount codes locally
  const expiredDiscountCodes = allDiscountCodes.filter((discountCode) => {
    const isExpiredByLimit =
      discountCode.limit !== null && discountCode.uses >= discountCode.limit;
    const isExpiredByDate =
      discountCode.expiresAt !== null && discountCode.expiresAt <= new Date();
    return isExpiredByLimit || isExpiredByDate;
  });

  const unexpiredDiscountCodes = allDiscountCodes.filter((discountCode) => {
    const isExpiredByLimit =
      discountCode.limit !== null && discountCode.uses >= discountCode.limit;
    const isExpiredByDate =
      discountCode.expiresAt !== null && discountCode.expiresAt <= new Date();
    return !isExpiredByLimit && !isExpiredByDate;
  });

  return (
    <>
      <PageHeader
        title="Coupons"
        subtitle="Manage discount codes, expiration rules, and usage limits."
        actions={
          <Button asChild>
            <Link href='/admin/discount-codes/new'>Add Coupon</Link>
          </Button>
        }
      />
      <DiscountCodesTable
        discountCodes={unexpiredDiscountCodes}
        canDeactivate
      />

      <div className='space-y-4'>
        <h2 className='text-xl font-semibold text-foreground'>Expired coupons</h2>
        <DiscountCodesTable discountCodes={expiredDiscountCodes} isInactive />
      </div>
    </>
  )
}

type DiscountCodesTableProps = {
  discountCodes: DiscountCodeRow[]
  isInactive?: boolean
  canDeactivate?: boolean
}

function DiscountCodesTable({
  discountCodes,
  isInactive = false,
  canDeactivate = false,
}: DiscountCodesTableProps) {
  if (discountCodes.length === 0) {
    return (
      <div className="rounded-2xl border border-border/70 bg-white/90 p-6 text-sm text-muted-foreground">
        No coupons found.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-white/90 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-0'>
              <span className='sr-only'>Is Active</span>
            </TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Remaining Uses</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className='w-0'>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discountCodes.map(discountCode => (
            <TableRow key={discountCode.id}>
              <TableCell>
                {discountCode.isActive && !isInactive ? (
                  <>
                    <span className='sr-only'>Active</span>
                    <CheckCircle2 className="text-emerald-500" />
                  </>
                ) : (
                  <>
                    <span className='sr-only'>Inactive</span>
                    <XCircle className='text-destructive' />
                  </>
                )}
              </TableCell>
              <TableCell className="font-medium">{discountCode.code}</TableCell>
              <TableCell>{formatDiscountCode(discountCode)}</TableCell>
              <TableCell>
                {discountCode.expiresAt == null ? (
                  <Minus className="text-muted-foreground" />
                ) : (
                  formatDateTime(discountCode.expiresAt)
                )}
              </TableCell>
              <TableCell>
                {discountCode.limit == null ? (
                  <Infinity className="text-muted-foreground" />
                ) : (
                  formatNumber(discountCode.limit - discountCode.uses)
                )}
              </TableCell>
              <TableCell>{formatNumber(discountCode._count.orders)}</TableCell>
              <TableCell>
                {discountCode.allProducts ? (
                  <Globe className="text-muted-foreground" />
                ) : (
                  discountCode.products.map(p => p.name).join(', ')
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-full p-2 hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                    <span className='sr-only'>Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {canDeactivate && (
                      <>
                        <ActiveToggleDropdownItem
                          id={discountCode.id}
                          isActive={discountCode.isActive}
                        />
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DeleteDropdownItem
                      id={discountCode.id}
                      disabled={discountCode._count.orders > 0}
                    />
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

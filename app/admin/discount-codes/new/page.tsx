import db from '@/db/db'
import { PageHeader } from '../../_components/PageHeader'
import { DiscountCodeForm } from '../_components/DiscountCodeForm'

export default async function NewDiscountCodePage() {
  const products = await db.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return (
    <>
      <PageHeader
        title="Add coupon"
        subtitle="Create a new discount code with limits and eligible products."
      />
      <DiscountCodeForm products={products} />
    </>
  )
}

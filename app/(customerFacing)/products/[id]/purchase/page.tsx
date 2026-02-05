import db from '@/db/db'
import { notFound } from 'next/navigation'
import { CheckoutForm } from './_components/CheckoutForm'
import { usableDiscountCodeWhere } from '@/lib/discountCodeHelpers'
import PageHeader from '@/components/PageHeader'

export default async function PurchasePage({
  params: { id },
  searchParams: { coupon },
}: {
  params: { id: string }
  searchParams: { coupon?: string }
}) {
  const product = await db.product.findUnique({ where: { id } })
  if (product == null) return notFound()

  const discountCode =
    coupon == null ? undefined : await getDiscountCode(coupon, product.id)

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Checkout"
        title="Secure purchase"
        subtitle="Complete your order and receive an instant download link via email."
      />
      <CheckoutForm product={product} discountCode={discountCode || undefined} />
    </div>
  )
}

function getDiscountCode(coupon: string, productId: string) {
  return db.discountCode.findUnique({
    select: { id: true, discountAmount: true, discountType: true },
    where: { ...usableDiscountCodeWhere, code: coupon },
  })
}

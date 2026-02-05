import { generateLink } from '@/actions/download_link'
import { Button } from '@/components/ui/button'
import db from '@/db/db'
import { formatCurrency } from '@/lib/formatters'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Stripe from 'stripe'
import PageHeader from '@/components/PageHeader'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string }
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  )
  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  })
  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === 'succeeded'
  const link = await generateLink(product.filePath)

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={isSuccess ? 'Payment complete' : 'Payment failed'}
        title={isSuccess ? 'Your download is ready' : 'We could not process the payment'}
        subtitle={
          isSuccess
            ? 'Your receipt has been sent to your email. Download your files below.'
            : 'Please try again or use a different payment method.'
        }
      />

      <div className="grid gap-6 rounded-2xl border border-border/70 bg-white/90 p-6 shadow-sm md:grid-cols-[0.9fr_1.1fr]">
        <div className='relative h-56 w-full overflow-hidden rounded-xl border border-border/70'>
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className='object-cover'
          />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Order summary
            </p>
            <h1 className='text-2xl font-semibold'>{product.name}</h1>
          </div>
          <div className='line-clamp-3 text-sm text-muted-foreground'>
            {product.description}
          </div>
          <div className="text-sm text-muted-foreground">
            {formatCurrency(product.priceInCents / 100)} · Instant delivery
          </div>

          <Button className='mt-2 w-full sm:w-auto' size='lg' asChild>
            {isSuccess ? (
              <a href={String(link)}>Download files</a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

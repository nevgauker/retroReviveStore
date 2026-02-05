import db from '@/db/db'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import PurchaseReceiptEmail from '@/email/PurchaseReceipt'

function getStripeClient(stripeSecretKey: string) {
  return new Stripe(stripeSecretKey, { apiVersion: '2024-04-10' })
}

function getResendClient(resendApiKey: string) {
  return new Resend(resendApiKey)
}

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const resendApiKey = process.env.RESEND_API_KEY
    const senderEmail = process.env.SENDER_EMAIL

    if (!stripeSecretKey || !stripeWebhookSecret || !resendApiKey || !senderEmail) {
      console.error("Missing necessary environment variables. Please check your .env configuration.")
      return new NextResponse('Server misconfigured', { status: 500 })
    }

    const stripe = getStripeClient(stripeSecretKey)
    const resend = getResendClient(resendApiKey)

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return new NextResponse('Missing Stripe signature', { status: 400 })
    }

    const body = await req.text()
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret)
    } catch (err) {
      console.error("Stripe signature verification failed.", err)
      return new NextResponse('Signature verification failed', { status: 400 })
    }

    if (event.type !== 'charge.succeeded') {
      return new NextResponse('Event type not supported', { status: 400 })
    }

    const charge = event.data.object as Stripe.Charge
    const { productId, discountCodeId } = charge.metadata || {}
    const email = charge.billing_details?.email
    const pricePaidInCents = charge.amount

    if (!productId || !email || !pricePaidInCents) {
      return new NextResponse('Invalid charge metadata or missing data', { status: 400 })
    }

    const product = await db.product.findUnique({ where: { id: productId } })
    if (!product) {
      console.error(`Product not found with ID: ${productId}`)
      return new NextResponse('Product not found', { status: 404 })
    }

    const userFields = {
      email,
      orders: { create: { productId, pricePaidInCents, discountCodeId } },
    }

    const { orders: [order] } = await db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { orders: { orderBy: { createdAt: 'desc' }, take: 1 } },
    })

    if (discountCodeId) {
      try {
        await db.discountCode.update({
          where: { id: discountCodeId },
          data: { uses: { increment: 1 } },
        })
      } catch (err) {
        console.error(`Failed to update discount code: ${discountCodeId}`, err)
        return new NextResponse('Failed to update discount code', { status: 500 })
      }
    }

    try {
      await resend.emails.send({
        from: `Support <${senderEmail}>`,
        to: email,
        subject: 'Order Confirmation',
        react: (
          <PurchaseReceiptEmail
            order={order}
            product={product}
          />
        ),
      })
    } catch (err) {
      console.error("Failed to send email confirmation", err)
      return new NextResponse('Failed to send confirmation email', { status: 500 })
    }

    return new NextResponse('Payment processed successfully', { status: 200 })

  } catch (err) {
    console.error("Unexpected error processing payment webhook", err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

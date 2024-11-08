import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'

type PurchaseReceiptEmailProps = {
  product: {
    name: string
    imagePath: string
    description: string
    filePath: string
  }
  order: { id: string; createdAt: Date; pricePaidInCents: number }
}

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: 'Product name',
    description: 'Some description',
    imagePath: '/products/2ffba410-ed45-4e0e-8c98-2cd256b03c33-japan.png',
    filePath: ''
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({
  product,
  order,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

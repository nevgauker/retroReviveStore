import { generateLink } from '@/actions/download_link';
import { formatCurrency } from '@/lib/formatters'
import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { useEffect, useState } from 'react';

type OrderInformationProps = {
  order: { id: string; createdAt: Date; pricePaidInCents: number }
  product: { imagePath: string; name: string; description: string, filePath: string }
  // downloadVerificationId: string
}

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export async function OrderInformation({
  order,
  product,
  // downloadVerificationId,
}: OrderInformationProps) {
  const url = await generateLink(product.filePath)

  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
              Order ID
            </Text>
            <Text className='mt-0 mr-4'>{order.id}</Text>
          </Column>
          <Column>
            <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
              Purchased On
            </Text>
            <Text className='mt-0 mr-4'>
              {dateFormatter.format(order.createdAt)}
            </Text>
          </Column>
          <Column>
            <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
              Price Paid
            </Text>
            <Text className='mt-0 mr-4'>
              {formatCurrency(order.pricePaidInCents / 100)}
            </Text>
          </Column>
        </Row>
      </Section>
      <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4'>
        <Img
          width='100%'
          alt={product.name}
          src={product.imagePath}
        />
        <Row className='mt-8'>
          <Column className='align-bottom'>
            <Text className='text-lg font-bold m-0 mr-4'>{product.name}</Text>
          </Column>
          <Column align='right'>
            <Button
              // href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
              className='bg-black text-white px-6 py-4 rounded text-lg'
            >
              <a href={String(url)}>Download</a>
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className='text-gray-500 mb-0'>{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  )
}

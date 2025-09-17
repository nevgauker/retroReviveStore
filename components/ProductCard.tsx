import { formatCurrency } from '@/lib/formatters'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

type ProductCardProps = {
  id: string
  name: string
  priceInCents: number
  description: string
  imagePath: string
}

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className='flex flex-col overflow-hidden transition hover:shadow-lg'>
      <div className='relative w-full aspect-square'>
        <Image
          src={imagePath}
          alt={name}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
          priority={false}
        />
      </div>

      <CardHeader>
        <CardTitle className='truncate'>{name}</CardTitle>
        <p className='text-lg font-semibold text-indigo-600'>
          {formatCurrency(priceInCents / 100)}
        </p>
      </CardHeader>

      <CardContent className='flex-grow'>
        <CardDescription className='line-clamp-3'>
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button asChild size='lg' className='w-full'>
          <Link href={`/products/${id}/purchase`} aria-label={`Purchase ${name}`}>
            Purchase
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className='flex flex-col overflow-hidden animate-pulse'>
      <div className='w-full aspect-square bg-gray-300' />
      <CardHeader>
        <CardTitle>
          <div className='h-6 w-3/4 rounded-full bg-gray-300' />
        </CardTitle>
        <div className='h-5 w-1/2 rounded-full bg-gray-300' />
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='h-4 w-full rounded-full bg-gray-300' />
        <div className='h-4 w-full rounded-full bg-gray-300' />
        <div className='h-4 w-3/4 rounded-full bg-gray-300' />
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled size='lg' />
      </CardFooter>
    </Card>
  )
}

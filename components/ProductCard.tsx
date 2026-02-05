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
    <Card className='group flex flex-col overflow-hidden border-border/70 bg-white/90 transition hover:-translate-y-1 hover:shadow-xl'>
      <div className='relative w-full aspect-square overflow-hidden'>
        <Image
          src={imagePath}
          alt={name}
          fill
          className='object-cover transition duration-300 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
          priority={false}
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
          Instant download
        </div>
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className='truncate text-xl'>{name}</CardTitle>
        <p className='text-lg font-semibold text-primary'>
          {formatCurrency(priceInCents / 100)}
        </p>
      </CardHeader>

      <CardContent className='flex-grow space-y-3'>
        <CardDescription className='line-clamp-3'>
          {description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border/70 bg-secondary px-2.5 py-1">
            Curated pack
          </span>
          <span className="rounded-full border border-border/70 bg-secondary px-2.5 py-1">
            License included
          </span>
        </div>
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
    <Card className='flex flex-col overflow-hidden animate-pulse border-border/70 bg-white/90'>
      <div className='w-full aspect-square bg-muted' />
      <CardHeader>
        <CardTitle>
          <div className='h-6 w-3/4 rounded-full bg-muted' />
        </CardTitle>
        <div className='h-5 w-1/2 rounded-full bg-muted' />
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='h-4 w-full rounded-full bg-muted' />
        <div className='h-4 w-full rounded-full bg-muted' />
        <div className='h-4 w-3/4 rounded-full bg-muted' />
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled size='lg' />
      </CardFooter>
    </Card>
  )
}

import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { Suspense } from 'react';
import ClientPopup from '@/components/client_popup';
import { cache } from "@/lib/cache"
import db from '@/db/db';
import { Product } from '@prisma/client';

export default function HomePage() {
  const cookieStore = cookies();
  const popupShown = cookieStore.get('popupShown');

  const getMostPopularProducts = cache(
    () => {
      return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6,
      })
    },
    ["/", "getMostPopularProducts"],
    { revalidate: 60 * 60 * 24 }
  )

  const getNewestProducts = cache(() => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    })
  }, ["/", "getNewestProducts"])

  return (
    <main className='space-y-12'>
      {!popupShown && <ClientPopup />} {/* Render pop-up if cookie is not set */}
      <ProductGridSection
        title='Most Popular'
        bannerImageName='/most.jpg'
        productsFetcher={getMostPopularProducts}
      />
      <ProductGridSection
        title='Newest'
        bannerImageName='/new.jpg'
        productsFetcher={getNewestProducts}
      />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string
  bannerImageName: string
  productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({ title, bannerImageName, productsFetcher }: ProductGridSectionProps) {
  return (
    <div className='space-y-4'>
      <div className='relative w-full h-80'>
        <Image src={bannerImageName} alt={`${title} products`} fill objectFit='contain' />
      </div>
      <div className='flex gap-4'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <Button variant='outline' asChild>
          <Link href='/products' className='space-x-2'>
            <span>View All</span>
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>
}) {
  return (await productsFetcher()).map(product => (
    <ProductCard key={product.id} {...product} />
  ))
}

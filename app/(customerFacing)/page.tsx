import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { Suspense } from 'react';
import ClientPopup from '@/components/client_popup';

export default function HomePage() {
  const cookieStore = cookies();
  const popupShown = cookieStore.get('popupShown');

  return (
    <main className='space-y-12'>
      {!popupShown && <ClientPopup />} {/* Render pop-up if cookie is not set */}
      <ProductGridSection
        title='Most Popular'
        bannerImageName='/most.jpg'
      />
      <ProductGridSection
        title='Newest'
        bannerImageName='/new.jpg'
      />
    </main>
  );
}

function ProductGridSection({ title, bannerImageName }: { title: string, bannerImageName: string }) {
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
        <Suspense fallback={<ProductCardSkeleton />}>
          {/* Assume ProductSuspense fetches and displays products */}
        </Suspense>
      </div>
    </div>
  );
}

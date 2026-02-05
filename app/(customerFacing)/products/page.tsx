import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import PageHeader from '@/components/PageHeader'
import db from '@/db/db'
import { cache } from '@/lib/cache'
import { Suspense } from 'react'

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: 'asc' },
  })
}, ['/products', 'getProducts'])

export default function ProductsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Catalog"
        title="All digital drops"
        subtitle="Browse the full archive of retro-inspired assets. Every pack includes clear licensing and instant delivery."
      />

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-white/80 p-4">
        <div className="flex flex-wrap gap-2 text-sm">
          {['All', 'Textures', 'Poster Kits', 'Icons', 'UI Frames', 'Bundles'].map(
            (label) => (
              <span
                key={label}
                className="rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {label}
              </span>
            )
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Sorted by: <span className="font-semibold text-foreground">A–Z</span>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductsSuspense() {
  const products = await getProducts()

  return products.map(product => <ProductCard key={product.id} {...product} />)
}

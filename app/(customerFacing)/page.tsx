import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Suspense } from "react"
import ClientPopup from "@/components/client_popup"
import { cache } from "@/lib/cache"
import db from "@/db/db"
import { Product } from "@prisma/client"

export default function HomePage() {
  const cookieStore = cookies()
  const popupShown = cookieStore.get("popupShown")

  const getMostPopularProducts = cache(
    () =>
      db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6,
      }),
    ["/", "getMostPopularProducts"],
    { revalidate: 60 * 60 * 24 } // cache for 1 day
  )

  const getNewestProducts = cache(
    () =>
      db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ["/", "getNewestProducts"]
  )

  return (
    <main className="space-y-16">
      {!popupShown && <ClientPopup />}

      <ProductGridSection
        title="Most Popular"
        bannerImageName="/most.jpg"
        productsFetcher={getMostPopularProducts}
        viewAllHref="/products?sort=popular"
      />

      <ProductGridSection
        title="Newest"
        bannerImageName="/new.jpg"
        productsFetcher={getNewestProducts}
        viewAllHref="/products?sort=newest"
      />
    </main>
  )
}

type ProductGridSectionProps = {
  title: string
  bannerImageName: string
  productsFetcher: () => Promise<Product[]>
  viewAllHref: string
}

function ProductGridSection({
  title,
  bannerImageName,
  productsFetcher,
  viewAllHref,
}: ProductGridSectionProps) {
  return (
    <section className="space-y-6">
      {/* Banner */}
      <div className="relative w-full h-60 md:h-80 rounded-lg overflow-hidden shadow">
        <Image
          src={bannerImageName}
          alt={`${title} products`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
          <h2 className="text-3xl font-extrabold text-white drop-shadow-md">
            {title}
          </h2>
        </div>
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title} Picks</h3>
        <Button variant="outline" asChild>
          <Link href={viewAllHref}>View All</Link>
        </Button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense
          fallback={
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </section>
  )
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>
}) {
  const products = await productsFetcher()
  return products.map((product) => <ProductCard key={product.id} {...product} />)
}

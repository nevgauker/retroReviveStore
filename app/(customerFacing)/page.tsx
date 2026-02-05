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

export default async function HomePage() {
  const cookieStore = await cookies()
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
    <main className="space-y-20">
      {!popupShown && <ClientPopup />}

      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-white/80 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,170,0.45),transparent_55%)]" />
        <div className="relative grid gap-10 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-border/70 bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Retro marketplace
            </span>
            <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
              Vintage-inspired digital drops curated for modern creators.
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              Explore rare textures, poster kits, and nostalgic assets. Each
              collection is vetted for quality and delivered instantly after
              purchase.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/products">Shop the collection</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/about">How it works</Link>
              </Button>
            </div>
            <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold text-foreground">120+</p>
                <p>Curated assets</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">5 min</p>
                <p>Average checkout time</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">24/7</p>
                <p>Instant access</p>
              </div>
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-2xl border border-border/70 lg:h-full">
            <Image
              src="/RetroRevive_background.jpg"
              alt="Retro collage background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Curated quality",
            copy: "Every drop is handpicked, tested, and packaged with licensing details.",
          },
          {
            title: "Instant delivery",
            copy: "Skip the waiting. Download directly after checkout with secure links.",
          },
          {
            title: "Creative friendly",
            copy: "Designed for designers, marketers, and collectors who want fast inspiration.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/70 bg-white/80 p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
          </div>
        ))}
      </section>

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

      <section className="grid gap-6 rounded-3xl border border-border/70 bg-white/80 p-8 md:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Built for collectors and pros</h2>
          <p className="text-muted-foreground">
            Retro Revive is a portfolio-grade marketplace prototype built to
            showcase real-world eCommerce UX. Every flow prioritizes clarity,
            trust, and delight.
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-secondary p-6 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Experience highlights
          </p>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>Transparent pricing and licensing</li>
            <li>Responsive checkout with Stripe</li>
            <li>Instant file delivery</li>
            <li>Human-first support touchpoints</li>
          </ul>
        </div>
      </section>
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
      <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg border border-border/70">
        <Image
          src={bannerImageName}
          alt={`${title} products`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
          <h2 className="text-3xl font-semibold text-white drop-shadow-md">
            {title}
          </h2>
        </div>
      </div>

      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Curated collection
          </p>
          <h3 className="text-xl font-semibold">{title} Picks</h3>
        </div>
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

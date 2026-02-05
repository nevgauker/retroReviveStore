import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-white/80">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="space-y-4">
          <p className="text-2xl font-semibold text-foreground">Retro Revive</p>
          <p className="text-sm text-muted-foreground">
            A curated marketplace for nostalgic digital assets. Designed to feel
            vintage, delivered with modern speed.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Instant Downloads
            </span>
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Weekly Drops
            </span>
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Secure Checkout
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Explore
          </p>
          <div className="flex flex-col gap-2">
            <Link className="hover:text-foreground" href="/products">
              All Products
            </Link>
            <Link className="hover:text-foreground" href="/orders">
              My Orders
            </Link>
            <Link className="hover:text-foreground" href="/about">
              About
            </Link>
            <Link className="hover:text-foreground" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Stay in the loop
          </p>
          <p className="text-muted-foreground">
            Get a monthly digest of new collections and limited releases.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link className="hover:text-foreground" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-foreground" href="/privacy">
              Privacy
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Retro Revive. All rights reserved.
      </div>
    </footer>
  )
}

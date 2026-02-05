'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, ReactNode } from 'react'
import { Button } from './ui/button'

type NavProps = {
  children: ReactNode
  action?: {
    label: string
    href: string
  }
  contextLabel?: string
  secondaryLink?: {
    label: string
    href: string
  } | null
}

export default function Nav({
  children,
  action = { label: 'Browse Collection', href: '/products' },
  contextLabel = 'Curated Digital Drops',
  secondaryLink = { label: 'Our Story', href: '/about' },
}: NavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/80 backdrop-blur-md">
      <div className="container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border bg-white">
            <Image
              src="/RetroRevive_logo.png"
              alt="Retro Revive logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-foreground">
              Retro Revive
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {contextLabel}
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
          {children}
        </nav>

        <div className="flex items-center gap-3">
          {secondaryLink && (
            <Link
              href={secondaryLink.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {secondaryLink.label}
            </Link>
          )}
          <Button asChild className="shadow-sm">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

type NavLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  exact?: boolean
}

export function NavLink({ href, exact = false, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(String(href))

  return (
    <Link
      href={href}
      {...props}
      className={cn(
        'px-3 py-2 rounded-full text-sm font-medium transition-colors',
        'hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary',
        isActive
          ? 'bg-secondary text-secondary-foreground'
          : 'text-muted-foreground'
      )}
      aria-current={isActive ? 'page' : undefined}
    />
  )
}

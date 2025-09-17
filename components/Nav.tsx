'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Component, ComponentProps, ReactNode } from 'react'

export default function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className='text-primary flex justify-center px-4'>
      {children}
    </nav>
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
        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
        'hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary',
        isActive
          ? 'bg-secondary text-secondary-foreground'
          : 'text-muted-foreground'
      )}
      aria-current={isActive ? 'page' : undefined}
    />
  )
}
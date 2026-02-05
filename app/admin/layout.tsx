import Nav, { NavLink } from '@/components/Nav'
export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav
        contextLabel="Admin Console"
        secondaryLink={null}
        action={{ label: 'View Store', href: '/' }}
      >
        <NavLink href={'/admin'}>Dashboard</NavLink>
        <NavLink href={'/admin/products'}>Products</NavLink>
        <NavLink href={'/admin/users'}>Customers</NavLink>
        <NavLink href={'/admin/orders'}>Sales</NavLink>
        <NavLink href='/admin/discount-codes'>Coupons</NavLink>
      </Nav>
      <div className='container my-10 space-y-6'>{children}</div>
    </>
  )
}

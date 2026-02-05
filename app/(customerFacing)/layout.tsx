import Footer from '@/components/Footer'
import Nav, { NavLink } from '@/components/Nav'
import { TopSection } from '@/components/TopSection'

export const dynamic = 'force-dynamic'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopSection />
      <Nav>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/products'>Products</NavLink>
        <NavLink href='/orders'>My Orders</NavLink>
      </Nav>

      {/* Page content */}
      <main className="flex-1 container my-10">
        {children}
      </main>

      <Footer />
    </div>
  )
}

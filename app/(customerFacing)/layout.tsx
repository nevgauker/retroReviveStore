import Footer from '@/components/Footer'
import Nav, { NavLink } from '@/components/Nav'
import { TopSection } from '@/components/TopSection'
import Image from "next/image"

export const dynamic = 'force-dynamic'




export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col justify-start items-start">
      <TopSection />
      <Nav>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/products'>Products</NavLink>
        <NavLink href='/orders'>My Orders</NavLink>
      </Nav>
      <div className='container my-6'>{children}</div>
      <Footer />
    </div>
  )
}

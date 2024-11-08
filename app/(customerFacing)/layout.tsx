import Nav, { NavLink } from '@/components/Nav'
import Image from "next/image"

export const dynamic = 'force-dynamic'


function TopSection() {
  return (
    <div className="relative h-[100px] w-screen border-b-1 border-red shadow-md">
      <Image
        className="object-contain-top"
        src={"/RetroRevive_background.jpg"}
        alt={"store background"}
        fill
      />

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <Image
          className="object-contain"
          src={"/RetroRevive_logo.png"}
          alt={"store logo"}
          width={80}
          height={80}
        />
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <Image
          className="object-contain"
          src={"/RetroRevive_text.png"}
          alt={"store logo"}
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}

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
    </div>
  )
}

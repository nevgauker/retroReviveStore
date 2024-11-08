import { Button } from '@/components/ui/button'
import Link from 'next/link'


//TODO 4. don't need that route anymore. might keep it and modify it to regenerate the url 

export default function Expired() {
  return (
    <>
      <h1 className='text-4xl mb-4'>Download link expired</h1>
      <Button asChild size='lg'>
        <Link href='/orders'>Get New Link</Link>
      </Button>
    </>
  )
}

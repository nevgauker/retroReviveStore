import { Button } from '@/components/ui/button'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'


//TODO 4. don't need that route anymore. might keep it and modify it to regenerate the url 

export default function Expired() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Link expired"
        title="Your download link has expired"
        subtitle="No worries — we can resend it instantly."
      />
      <Button asChild size='lg'>
        <Link href='/orders'>Request a new link</Link>
      </Button>
    </div>
  )
}

'use client'

import { emailOrderHistory } from '@/actions/orders'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/PageHeader'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState, useFormStatus } from 'react-dom'


//TODO 5. modify it to re generate and send the google cloud link


export default function MyOrdersPage() {
  const [data, action] = useFormState(emailOrderHistory, {})
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Order history"
        title="Retrieve your downloads"
        subtitle="No account required. Enter the email used at checkout and we'll send your secure links."
      />
      <form action={action} className='max-w-2xl'>
        <Card className="border-border/70 bg-white/90 shadow-sm">
          <CardHeader>
            <CardTitle>Send me my purchases</CardTitle>
            <CardDescription>
              We only use your email to locate your order history and send your
              download links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input type='email' required name='email' id='email' />
              {data.error && <div className='text-destructive'>{data.error}</div>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3">
            {data.message ? (
              <p className="text-sm text-muted-foreground">{data.message}</p>
            ) : (
              <SubmitButton />
            )}
            <p className="text-xs text-muted-foreground">
              Need help? Reach out via the contact page and we'll verify your
              purchase.
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className='w-full' size='lg' disabled={pending} type='submit'>
      {pending ? 'Sending...' : 'Send'}
    </Button>
  )
}

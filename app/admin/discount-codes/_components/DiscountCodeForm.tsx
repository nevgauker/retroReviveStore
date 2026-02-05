'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DiscountCodeType } from '@prisma/client'
import { addDiscountCode } from '../../_actions/discountCodes'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function DiscountCodeForm({
  products,
}: {
  products: { name: string; id: string }[]
}) {
  const [error, action] = useFormState(addDiscountCode, {})
  const [allProducts, setAllProducts] = useState(true)
  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())

  return (
    <form action={action} className='space-y-6'>
      <Card className="border-border/70 bg-white/90 shadow-sm">
        <CardHeader>
          <CardTitle>Coupon details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='code'>Code</Label>
              <Input type='text' id='code' name='code' required />
              {error.code && <div className='text-destructive'>{error.code}</div>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='discountType'>Discount Type</Label>
              <RadioGroup
                id='discountType'
                name='discountType'
                defaultValue={DiscountCodeType.PERCENTAGE}
              >
                <div className='flex gap-2 items-center'>
                  <RadioGroupItem
                    id='percentage'
                    value={DiscountCodeType.PERCENTAGE}
                  />
                  <Label htmlFor='percentage'>Percentage</Label>
                </div>
                <div className='flex gap-2 items-center'>
                  <RadioGroupItem id='fixed' value={DiscountCodeType.FIXED} />
                  <Label htmlFor='fixed'>Fixed</Label>
                </div>
              </RadioGroup>
              {error.discountType && (
                <div className='text-destructive'>{error.discountType}</div>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='discountAmount'>Discount Amount</Label>
              <Input
                type='number'
                id='discountAmount'
                name='discountAmount'
                required
              />
              {error.discountAmount && (
                <div className='text-destructive'>{error.discountAmount}</div>
              )}
            </div>
          </div>

          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='limit'>Limit</Label>
              <Input type='number' id='limit' name='limit' />
              <div className='text-xs text-muted-foreground'>
                Leave blank for infinite uses
              </div>
              {error.limit && <div className='text-destructive'>{error.limit}</div>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='expiresAt'>Expiration</Label>
              <Input
                type='datetime-local'
                id='expiresAt'
                name='expiresAt'
                className='w-max'
                min={today.toJSON().split(':').slice(0, -1).join(':')}
              />
              <div className='text-xs text-muted-foreground'>
                Leave blank for no expiration
              </div>
              {error.expiresAt && (
                <div className='text-destructive'>{error.expiresAt}</div>
              )}
            </div>
            <div className='space-y-2'>
              <Label>Allowed Products</Label>
              {error.allProducts && (
                <div className='text-destructive'>{error.allProducts}</div>
              )}
              {error.productIds && (
                <div className='text-destructive'>{error.productIds}</div>
              )}
              <div className='flex gap-2 items-center'>
                <Checkbox
                  id='allProducts'
                  name='allProducts'
                  checked={allProducts}
                  onCheckedChange={e => setAllProducts(e === true)}
                />
                <Label htmlFor='allProducts'>All Products</Label>
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto rounded-lg border border-border/70 bg-white p-3">
                {products.map(product => (
                  <div key={product.id} className='flex gap-2 items-center'>
                    <Checkbox
                      id={product.id}
                      name='productIds'
                      disabled={allProducts}
                      value={product.id}
                    />
                    <Label htmlFor={product.id}>{product.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </Button>
  )
}

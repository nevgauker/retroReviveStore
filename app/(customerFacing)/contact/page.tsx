'use client'
import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Contact"
        title="Let us know how we can help"
        subtitle="Need a resend, have a licensing question, or want a custom drop? Leave a message and we’ll reply within 1–2 business days."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border/70 bg-white/90 p-6 shadow-sm">
          {submitted ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Thanks for reaching out.
              </p>
              <p className="text-sm text-muted-foreground">
                We received your message and will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={5}
                ></textarea>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send message
              </Button>
            </form>
          )}
        </div>

        <div className="space-y-4 rounded-2xl border border-border/70 bg-secondary p-6 text-sm text-muted-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]">
            Support details
          </p>
          <p>
            Typical response time: <span className="font-semibold">24–48h</span>
          </p>
          <p>
            For urgent delivery issues, include your order email in the message.
          </p>
          <div className="rounded-xl border border-border/70 bg-white p-4 text-xs">
            <p className="font-semibold text-foreground">Office hours</p>
            <p>Mon–Fri, 9:00am–6:00pm (PST)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

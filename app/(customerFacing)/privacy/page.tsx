import PageHeader from '@/components/PageHeader'

function PrivacyPolicyPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Privacy"
        title="Privacy policy"
        subtitle="We collect the minimum information needed to fulfill digital orders and deliver secure links."
      />

      <div className="space-y-6 rounded-2xl border border-border/70 bg-white/90 p-6 text-sm text-muted-foreground shadow-sm">
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            1. Information we collect
          </h2>
          <p>
            We collect your email address so we can deliver your purchase and
            provide access to your download history.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            2. How we use your information
          </h2>
          <p>
            Your email is used for order delivery, receipts, and support
            follow-ups. We do not sell or rent your data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            3. Storage and security
          </h2>
          <p>
            We secure order data with encryption and access controls. Payment
            information is processed by Stripe and is never stored on our
            servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            4. Your rights
          </h2>
          <p>
            You can request access or deletion of your data at any time by
            contacting us via the contact page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            5. Policy updates
          </h2>
          <p>
            Updates to this policy will be published here. Continued use of the
            store indicates acceptance of the latest version.
          </p>
        </section>
      </div>

      <p className="text-xs text-muted-foreground">
        Last updated: February 5, 2026
      </p>
    </div>
  )
}

export default PrivacyPolicyPage

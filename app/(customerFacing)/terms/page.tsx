import PageHeader from '@/components/PageHeader'

function TermsOfUsePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Terms"
        title="Terms of use"
        subtitle="These terms explain how Retro Revive digital assets can be purchased, downloaded, and used."
      />

      <div className="space-y-6 rounded-2xl border border-border/70 bg-white/90 p-6 text-sm text-muted-foreground shadow-sm">
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            1. Purchases and access
          </h2>
          <p>
            Purchases provide access to downloadable files tied to your email
            address. Links can be reissued via the orders page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            2. License and usage
          </h2>
          <p>
            You receive a non-exclusive license for personal or commercial use
            depending on the product description. Reselling or redistributing
            the files is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            3. Refund policy
          </h2>
          <p>
            Digital sales are final due to the instant nature of delivery. If
            there is an issue with a file, contact support and we will help
            resolve it.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            4. Intellectual property
          </h2>
          <p>
            All assets remain the intellectual property of Retro Revive or its
            licensors. Unauthorized distribution may result in removal of
            access.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            5. Liability
          </h2>
          <p>
            Assets are provided “as is.” Retro Revive is not liable for indirect
            damages related to usage or delivery delays beyond our control.
          </p>
        </section>
      </div>

      <p className="text-xs text-muted-foreground">
        Last updated: February 5, 2026
      </p>
    </div>
  )
}

export default TermsOfUsePage

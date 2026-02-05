import PageHeader from '@/components/PageHeader'

function AboutPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Our story"
        title="Retro aesthetics, modern reliability"
        subtitle="Retro Revive is a portfolio-grade marketplace prototype built to demonstrate thoughtful product design. Every touchpoint is designed to feel premium, clear, and trustworthy."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: 'Our mission',
            copy: 'Empower creators with rare, nostalgia-driven assets that speed up ideation and elevate presentation work.',
          },
          {
            title: 'Curated drops',
            copy: 'Each bundle is selected for craft, consistency, and real-world usability. No filler, no repeats.',
          },
          {
            title: 'Quality-first',
            copy: 'We test every file, include licensing clarity, and package assets for immediate download.',
          },
          {
            title: 'Privacy-minded',
            copy: 'Purchases are linked to email only. We never collect more than needed for delivery.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/70 bg-white/80 p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{item.copy}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border/70 bg-secondary p-6 text-sm text-muted-foreground">
        <p className="text-xs font-semibold uppercase tracking-[0.3em]">
          Portfolio note
        </p>
        <p className="mt-3">
          Retro Revive is a demonstration project meant to showcase UX, product
          strategy, and UI craft for a modern digital commerce experience.
        </p>
      </div>
    </div>
  )
}

export default AboutPage

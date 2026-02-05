export function TopSection() {
  return (
    <div className="w-full border-b border-border/70 bg-[linear-gradient(120deg,rgba(250,237,214,0.85),rgba(255,255,255,0.95),rgba(252,228,198,0.9))]">
      <div className="container flex flex-col gap-1 py-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>Instant delivery • Curated weekly drops</span>
        <span>Secure checkout • No account required</span>
      </div>
    </div>
  )
}

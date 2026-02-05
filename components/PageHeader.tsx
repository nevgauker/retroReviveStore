type PageHeaderProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: PageHeaderProps) {
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </span>
      )}
      <h1 className="text-4xl font-semibold text-foreground md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}

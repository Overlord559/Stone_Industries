type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-5 sm:space-y-6">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-cyan-300/85">
        {eyebrow}
      </p>
      <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-[2.8rem]">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
        {description}
      </p>
    </div>
  )
}

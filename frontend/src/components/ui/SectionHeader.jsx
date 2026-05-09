export default function SectionHeader({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.32em] text-purpleNeon">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-7 text-slate-300">{copy}</p>}
    </div>
  );
}

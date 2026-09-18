export default function SectionHeader({ eyebrow, title, description, className = '' }) {
  return (
    <div className={`mb-14 ${className}`}>
      <div className="inline-flex items-center gap-2.5 font-mono text-[0.78rem] font-medium text-accent-1 uppercase tracking-[0.1em] mb-4 py-1 px-3.5 rounded-full bg-accent-glow">
        {eyebrow}
      </div>
      <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.15] mb-3.5 tracking-[-0.02em]" style={{ textWrap: 'balance' }}>
        {title}
      </h2>
      {description && (
        <p className="text-text-2 text-lg max-w-[540px] leading-relaxed">{description}</p>
      )}
    </div>
  );
}

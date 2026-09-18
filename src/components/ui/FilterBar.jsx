export default function FilterBar({ filters, active, onFilter, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 mb-9 ${className}`}>
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onFilter(value)}
          className={`filter-btn px-[18px] py-2 rounded-full border text-[0.84rem] font-semibold cursor-pointer font-body transition-all duration-200
            ${active === value
              ? 'text-white border-transparent shadow-[0_4px_16px_var(--accent-glow)]'
              : 'border-border text-text-2 bg-transparent hover:border-accent-1 hover:text-accent-1'
            }`}
          style={active === value ? { background: 'var(--gradient)' } : {}}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

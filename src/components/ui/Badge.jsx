const variants = {
  published: 'bg-green-bg text-green-t',
  progress: 'bg-warm-bg text-warm',
  draft: 'bg-gray-bg text-gray-b',
  idea: 'bg-purple-bg text-purple-t',
};

const labels = {
  published: 'Published',
  progress: 'In Progress',
  draft: 'Draft',
  idea: 'Idea',
};

export default function Badge({ status }) {
  const variant = variants[status] || variants.draft;
  const label = labels[status] || status;
  const isPulsing = status === 'progress';

  return (
    <span className={`badge inline-flex items-center gap-1.5 text-[0.7rem] font-bold px-3 py-1 rounded-full uppercase tracking-[0.04em] ${variant}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full bg-current ${isPulsing ? 'animate-pulse' : ''}`}
        style={isPulsing ? { animation: 'pulse 2s ease-in-out infinite' } : {}}
      />
      {label}
    </span>
  );
}

import { useEffect, useRef, useState } from 'react';

function AnimatedNum({ target }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          let cur = 0;
          const step = Math.max(1, Math.ceil(target / 30));
          const timer = setInterval(() => {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(timer); }
            setVal(cur);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display font-extrabold text-[1.7rem] gradient-text tabular-nums">
      {val}
    </span>
  );
}

export default function StatsBar({ stats }) {
  const defaultStats = [
    { num: 3, label: 'Research Papers' },
    { num: 6, label: 'Written Pieces' },
    { num: 3, label: 'Projects' },
    { num: 5, label: 'Tutorials' },
  ];

  const items = stats || defaultStats;

  return (
    <div className="stats-bar border-t border-b border-border py-8 -mx-6 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[100px] blur-[120px] opacity-[0.04] pointer-events-none rounded-full" style={{ background: 'var(--gradient)' }} />
      <div className="max-w-[1100px] mx-auto flex justify-center gap-12 flex-wrap relative">
        {items.map(({ num, label }, i) => (
          <div key={i} className="flex items-baseline gap-2">
            <AnimatedNum target={num} />
            <span className="text-sm text-text-3 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

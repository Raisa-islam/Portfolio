import { useState } from 'react';
import { useCollection } from '../hooks/useFirestore';
import SectionHeader from '../components/ui/SectionHeader';
import FilterBar from '../components/ui/FilterBar';
import useReveal from '../hooks/useReveal';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Paper Reviews', value: 'review' },
  { label: 'Research Notes', value: 'notes' },
  { label: 'Tutorials', value: 'tutorial' },
  { label: 'Further Work', value: 'further' },
  { label: 'Course Notes', value: 'course' },
];

const ACCENT_COLORS = {
  review: 'var(--accent-1)',
  notes: 'var(--purple)',
  tutorial: 'var(--green)',
  further: 'var(--warm)',
  course: 'var(--gray-b)',
};

const TAG_CLASSES = {
  review: 'bg-accent-glow text-accent-1',
  notes: 'bg-purple-bg text-purple-t',
  tutorial: 'bg-green-bg text-green-t',
  further: 'bg-warm-bg text-warm',
  course: 'bg-gray-bg text-gray-b',
};

const TAG_LABELS = {
  review: 'Paper Review',
  notes: 'Research Notes',
  tutorial: 'Tutorial',
  further: 'Further Work',
  course: 'Course Notes',
};

const FALLBACK = [
  {
    id: '1', category: 'review', title: 'Understanding the Transformer Architecture: A Visual Guide',
    excerpt: 'Breaking down "Attention Is All You Need" into intuitive components — self-attention, multi-head attention, and positional encoding explained visually.',
    readTime: '12 min read', date: 'Nov 2024', status: 'published',
  },
  {
    id: '2', category: 'notes', title: 'What Large Language Models Still Can\'t Do',
    excerpt: 'After reviewing recent benchmarks and failure modes — the open problems I find most interesting, and where more work is needed.',
    readTime: '8 min read', date: 'Oct 2024', status: 'published',
  },
  {
    id: '3', category: 'tutorial', title: 'Setting Up Your Research Workflow with LaTeX and Git',
    excerpt: 'Organizing papers, managing references with BibTeX, and using version control in academic writing — a practical guide.',
    readTime: '15 min read', date: 'Sep 2024', status: 'published',
  },
  {
    id: '4', category: 'further', title: 'Comparing Attention Mechanisms: Where Are the Gaps?',
    excerpt: 'Dot-product vs. additive vs. linear attention — comparing approaches and the unexplored directions I plan to investigate.',
    readTime: '10 min read', date: 'Sep 2024', status: 'published',
  },
  {
    id: '5', category: 'tutorial', title: 'Introduction to Neural Networks: From Perceptrons to Deep Learning',
    excerpt: 'A beginner-friendly walkthrough of how neural networks actually work, building intuition from single neurons to deep architectures.',
    readTime: '', date: '', status: 'draft', draftLabel: 'Writing',
  },
  {
    id: '6', category: 'course', title: 'Linear Algebra for Machine Learning',
    excerpt: 'The essential linear algebra concepts you actually need for ML — vectors, matrices, eigenvalues, and SVD explained with code examples.',
    readTime: '', date: '', status: 'idea', draftLabel: 'Planned',
  },
];

export default function Writing() {
  const [filter, setFilter] = useState('all');
  const { data: firestoreData } = useCollection('writing', { orderByField: 'createdAt' });
  const items = firestoreData.length > 0 ? firestoreData : FALLBACK;
  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);
  const reveal = useReveal();

  return (
    <div className="section-glow relative overflow-hidden -mx-6 py-[120px] px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] blur-[140px] rounded-full pointer-events-none" style={{ background: 'var(--orb-1)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--dot-grid) 0.8px, transparent 0.8px)', backgroundSize: '30px 30px' }} />

      <section id="writing" className="relative">
        <div className="max-w-[1100px] mx-auto">
          <div ref={reveal} className="reveal">
            <SectionHeader
              eyebrow="Writing"
              title="Paper reviews, research notes & tutorials"
              description="Analysis of what I'm reading, notes on what I'm learning, and guides I wish I'd had when starting out."
            />
          </div>

          <div ref={reveal} className="reveal">
            <FilterBar filters={FILTERS} active={filter} onFilter={setFilter} />
          </div>

          <div ref={reveal} className="reveal writing-grid rounded-card border border-border-light overflow-hidden bg-surface">
            {filtered.map((item) => {
              const isDraft = item.status === 'draft' || item.status === 'idea';
              return (
                <div
                  key={item.id}
                  className={`w-card grid border-b border-border-light last:border-b-0 transition-colors hover:bg-bg-alt ${isDraft ? 'opacity-70' : ''}`}
                  style={{ gridTemplateColumns: '6px 1fr' }}
                >
                  <div
                    className="w-[6px]"
                    style={{
                      background: ACCENT_COLORS[item.category] || 'var(--gray-b)',
                      opacity: isDraft ? 0.4 : 1,
                    }}
                  />
                  <div className="py-7 px-8 md:px-8 flex flex-col gap-2.5">
                    <div className="flex items-center gap-3.5 flex-wrap">
                      <span className={`text-[0.7rem] font-bold px-3 py-1 rounded-full uppercase tracking-[0.04em] ${TAG_CLASSES[item.category] || 'bg-gray-bg text-gray-b'}`}>
                        {TAG_LABELS[item.category] || item.category}
                      </span>
                      {isDraft ? (
                        <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-warm uppercase tracking-[0.04em]">
                          <span className="w-[5px] h-[5px] rounded-full bg-current" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                          {item.draftLabel}
                        </span>
                      ) : (
                        <span className="text-[0.78rem] text-text-3">{item.readTime}</span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-[1.15rem] leading-snug text-text-1 hover:text-accent-1 transition-colors cursor-pointer m-0">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-2 leading-relaxed max-w-[640px] m-0">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-[0.78rem] text-text-3 mt-1">
                      {item.date && <span>{item.date}</span>}
                      {item.date && item.status === 'published' && (
                        <>
                          <span className="w-[3px] h-[3px] rounded-full bg-text-3 shrink-0" />
                          <a href="#" className="font-semibold text-[0.85rem] text-accent-1 inline-flex items-center gap-1 hover:gap-2 transition-all">
                            Read more <span>&rarr;</span>
                          </a>
                        </>
                      )}
                      {!item.date && <span>{item.draftLabel === 'Writing' ? 'Coming soon' : 'Planned'}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

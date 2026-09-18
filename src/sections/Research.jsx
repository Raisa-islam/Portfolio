import { useState } from 'react';
import { useCollection } from '../hooks/useFirestore';
import SectionHeader from '../components/ui/SectionHeader';
import FilterBar from '../components/ui/FilterBar';
import Badge from '../components/ui/Badge';
import { FiFileText } from 'react-icons/fi';
import useReveal from '../hooks/useReveal';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'progress' },
  { label: 'Drafts', value: 'draft' },
  { label: 'Ideas', value: 'idea' },
];

const FALLBACK = [
  {
    id: '1', title: 'Attention Patterns in Low-Resource Bengali NLP', status: 'progress', year: '2024',
    description: 'Investigating how attention mechanisms behave differently in low-resource language settings, with focus on Bengali text classification and sentiment analysis tasks.',
    tags: ['NLP', 'Bengali', 'Attention'], updatedLabel: 'Updated Dec 2024',
  },
  {
    id: '2', title: 'Transfer Learning for Underrepresented South Asian Languages', status: 'idea', year: '2024',
    description: 'A planned survey on adapting transfer learning from high-resource languages to underrepresented South Asian languages — Bengali, Urdu, and Tamil.',
    tags: ['Transfer Learning', 'Survey', 'Multilingual'], updatedLabel: 'Planned',
  },
  {
    id: '3', title: 'Performance Patterns in Modern React: CSR vs SSR vs Hybrid', status: 'draft', year: '2024',
    description: 'Analyzing rendering strategies in React applications with real-world benchmarks, comparing client-side, server-side, and hybrid approaches.',
    tags: ['React', 'Performance', 'SSR'], updatedLabel: 'Early draft',
  },
];

export default function Research() {
  const [filter, setFilter] = useState('all');
  const { data: firestoreData } = useCollection('research', { orderByField: 'createdAt' });
  const items = firestoreData.length > 0 ? firestoreData : FALLBACK;
  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter);
  const reveal = useReveal();

  return (
    <section className="py-[120px] px-6" id="research">
      <div className="max-w-[1100px] mx-auto">
        <div ref={reveal} className="reveal">
          <SectionHeader
            eyebrow="Research"
            title="Exploring ideas, one paper at a time"
            description="From early explorations to ongoing investigations — my research journey in AI, NLP, and web technologies."
          />
        </div>

        <div ref={reveal} className="reveal">
          <FilterBar filters={FILTERS} active={filter} onFilter={setFilter} />
        </div>

        <div className="grid gap-[22px] grid-cols-1 md:grid-cols-2">
          {filtered.map((paper, i) => (
            <div
              key={paper.id}
              ref={reveal}
              className={`card reveal reveal-d${Math.min(i + 1, 6)} ${paper.status === 'draft' ? 'border-dashed opacity-75 hover:opacity-100' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge status={paper.status} />
                <span className="text-[0.78rem] text-text-3 font-medium">{paper.year}</span>
              </div>
              <h3 className="font-display font-bold text-[1.18rem] leading-snug mb-2.5 text-text-1">{paper.title}</h3>
              <p className="text-sm text-text-2 leading-relaxed mb-[18px] line-clamp-3">{paper.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-[18px]">
                {paper.tags?.map(t => (
                  <span key={t} className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-md bg-bg-alt text-text-2 font-mono">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[0.8rem] text-text-3">
                <span>{paper.updatedLabel}</span>
                {paper.pdfUrl && (
                  <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="card-link-btn">
                    <FiFileText size={15} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .card {
          background: var(--surface); border: 1px solid var(--border-light);
          border-radius: var(--radius); padding: 30px; position: relative; overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--gradient); opacity: 0; transition: opacity 0.3s;
        }
        .card:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); border-color: transparent; }
        .card:hover::before { opacity: 1; }
        .card-link-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid var(--border); color: var(--text-3); transition: all 0.2s;
        }
        .card-link-btn:hover {
          border-color: var(--accent-1); color: var(--accent-1);
          background: var(--accent-glow); transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

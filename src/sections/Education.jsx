import { useCollection } from '../hooks/useFirestore';
import SectionHeader from '../components/ui/SectionHeader';
import useReveal from '../hooks/useReveal';

const FALLBACK = [
  { id: '1', institution: 'University of Dhaka', degree: 'BSc in Computer Science and Engineering', years: '2020 – 2024' },
  { id: '2', institution: 'Holy Cross College', degree: 'Higher Secondary Certificate · Science', years: '2017 – 2019' },
  { id: '3', institution: 'Monipur High School and College', degree: 'Secondary School Certificate', years: '2007 – 2017' },
];

export default function Education() {
  const { data: firestoreData } = useCollection('education', { orderByField: 'order' });
  const items = firestoreData.length > 0
    ? firestoreData.map(d => ({ id: d.id, institution: d.institution, degree: d.degree, years: d.years }))
    : FALLBACK;
  const reveal = useReveal();

  return (
    <div className="section-glow relative overflow-hidden -mx-6 py-[120px] px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] blur-[140px] rounded-full pointer-events-none" style={{ background: 'var(--orb-1)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--dot-grid) 0.8px, transparent 0.8px)', backgroundSize: '30px 30px' }} />

      <section id="education" className="relative">
        <div className="max-w-[1100px] mx-auto">
          <div ref={reveal} className="reveal">
            <SectionHeader eyebrow="Education" title="Academic background" />
          </div>

          <div ref={reveal} className="reveal relative pl-11 max-w-[620px]">
            <div className="absolute left-[13px] top-3 bottom-3 w-[2px] rounded-sm" style={{ background: 'linear-gradient(to bottom, var(--accent-1), var(--accent-2))' }} />

            {items.map((item, i) => (
              <div key={item.id} className="relative pb-11 last:pb-0">
                <div
                  className={`absolute -left-11 top-1 w-7 h-7 rounded-full flex items-center justify-center z-[1]
                    ${i === 0 ? 'shadow-[0_0_20px_var(--accent-glow)]' : ''}`}
                  style={{
                    background: i === 0 ? 'var(--accent-1)' : 'var(--bg)',
                    border: '3px solid var(--accent-1)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: i === 0 ? '#fff' : 'var(--accent-1)' }} />
                </div>
                <p className="font-mono text-[0.82rem] text-accent-1 mb-1.5 font-medium">{item.years}</p>
                <p className="font-display font-bold text-[1.15rem] text-text-1 mb-1">{item.institution}</p>
                <p className="text-sm text-text-2">{item.degree}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useCollection } from '../hooks/useFirestore';
import SectionHeader from '../components/ui/SectionHeader';
import useReveal from '../hooks/useReveal';
import { FiImage } from 'react-icons/fi';

const FALLBACK = [
  { id: 'painting', icon: '🎨', title: 'Painting', description: 'Creating art whenever inspiration strikes — watercolors, acrylics, and everything in between.', iconBg: 'var(--warm-bg)' },
  { id: 'planting', icon: '🌿', title: 'Planting', description: 'Growing things from tiny seeds — there\'s something deeply satisfying about watching plants thrive.', iconBg: 'var(--green-bg)' },
  { id: 'reading', icon: '📚', title: 'Reading', description: 'From fiction that opens new worlds to non-fiction that changes how I think about this one.', iconBg: 'var(--purple-bg)' },
  { id: 'cooking', icon: '🍳', title: 'Cooking', description: 'Experimenting in the kitchen — trying new recipes and perfecting the comfort food classics.', iconBg: 'var(--accent-glow)' },
  { id: 'youtube', icon: '🎬', title: 'YouTube', description: 'Sharing what I learn and how I live — tutorials, vlogs, and little moments worth capturing.', iconBg: 'var(--warm-bg)', link: '#', linkLabel: 'Watch now' },
];

export default function LifeBeyondCode() {
  const { data: firestoreData } = useCollection('life', { orderByField: 'order' });
  const items = firestoreData.length > 0 ? firestoreData : FALLBACK;
  const reveal = useReveal();

  return (
    <section className="py-[120px] px-6" id="life">
      <div className="max-w-[1100px] mx-auto">
        <div ref={reveal} className="reveal">
          <SectionHeader
            eyebrow="Life Beyond Code"
            title="The person behind the terminal"
            description="Research is what I do, but here's who I am when the laptop closes — the things that keep life colorful and balanced."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Photo placeholder */}
          <div ref={reveal} className="reveal col-span-2 bg-surface border border-border-light rounded-2xl p-1.5 relative overflow-hidden min-h-[240px] transition-all hover:-translate-y-[3px] hover:shadow-[var(--shadow-hover)]">
            <div className="w-full h-full min-h-[228px] rounded-xl bg-bg-alt flex flex-col items-center justify-center gap-3 text-text-3">
              <FiImage size={40} className="opacity-40" />
              <span className="text-[0.82rem] font-semibold">Your photo here</span>
            </div>
          </div>

          {items.map((item, i) => (
            <div
              key={item.id}
              ref={reveal}
              className={`reveal reveal-d${Math.min(i + 2, 6)} bg-surface border border-border-light rounded-2xl py-7 px-6 text-center relative overflow-hidden transition-all hover:-translate-y-[5px] hover:shadow-[var(--shadow-hover)] hover:border-transparent`}
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-[1.6rem]"
                style={{ background: item.iconBg }}
              >
                {item.icon}
              </div>
              <p className="font-display font-bold text-base mb-1.5 text-text-1">{item.title}</p>
              <p className="text-[0.82rem] text-text-2 leading-relaxed m-0">{item.description}</p>
              {item.link && (
                <a href={item.link} className="inline-flex items-center gap-1 mt-3 text-[0.78rem] font-bold text-accent-1 hover:gap-2 transition-all">
                  {item.linkLabel} <span>&rarr;</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useCollection } from '../hooks/useFirestore';
import SectionHeader from '../components/ui/SectionHeader';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import useReveal from '../hooks/useReveal';

const FALLBACK = [
  {
    id: '1', title: 'ArtnCraftStore',
    description: 'A dynamic platform for art enthusiasts — curated collections, user authentication, and seamless browsing built with React and Firebase.',
    tags: ['React', 'Firebase', 'Tailwind'],
    github: 'https://github.com/Raisa-islam/ArtnCraftStore',
    live: 'https://artncraftstore-7c050.web.app/',
  },
  {
    id: '2', title: 'VolunAid',
    description: 'Connecting volunteers with opportunities — post, apply, and manage roles with secure auth and customizable browsing views.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Raisa-islam/VolunAid',
    live: 'https://volunteermanagement-7ef6d.web.app/',
  },
  {
    id: '3', title: 'BlissAbode',
    description: 'A real estate platform with multi-option auth, curated listings, favorites management, and detailed property information.',
    tags: ['React', 'Firebase', 'CSS'],
    github: 'https://github.com/Raisa-islam/BlissAbode',
    live: 'https://b9a9-92593.web.app/',
  },
];

export default function Projects() {
  const { data: firestoreData } = useCollection('projects', { orderByField: 'createdAt' });
  const items = firestoreData.length > 0 ? firestoreData : FALLBACK;
  const reveal = useReveal();

  return (
    <section className="py-[120px] px-6" id="projects">
      <div className="max-w-[1100px] mx-auto">
        <div ref={reveal} className="reveal">
          <SectionHeader
            eyebrow="Projects"
            title="Things I've built"
            description="Web applications designed and developed from the ground up."
          />
        </div>

        <div className="grid gap-[22px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <div key={project.id} ref={reveal} className={`card reveal reveal-d${Math.min(i + 1, 6)}`}>
              <h3 className="font-display font-bold text-[1.18rem] leading-snug mb-2.5 text-text-1">{project.title}</h3>
              <p className="text-sm text-text-2 leading-relaxed mb-[18px] line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-[18px]">
                {project.tags?.map(t => (
                  <span key={t} className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-md bg-bg-alt text-text-2 font-mono">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[0.8rem] text-text-3">
                <span />
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-link-btn" title="GitHub">
                      <FiGithub size={15} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="card-link-btn" title="Live">
                      <FiExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

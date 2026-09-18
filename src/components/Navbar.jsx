import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { label: 'Research', href: '#research' },
  { label: 'Writing', href: '#writing' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Life', href: '#life' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onAdminClick }) {
  const { isDark, toggle } = useTheme();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] px-6 transition-all duration-300 ${
          scrolled ? 'border-b border-border-light' : 'border-b border-transparent'
        }`}
        style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(16px) saturate(1.4)', WebkitBackdropFilter: 'blur(16px) saturate(1.4)' }}
      >
        <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-display font-bold text-lg gradient-text"
          >
            Raisa Islam
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-text-2 text-[0.87rem] font-semibold relative hover:text-text-1 transition-colors
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0
                    after:h-[2px] after:rounded-sm after:scale-x-0 after:origin-left
                    after:transition-transform after:duration-300 hover:after:scale-x-100"
                  style={{ '--tw-after-bg': 'var(--gradient)' }}
                >
                  {label}
                  <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] rounded-sm scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" style={{ background: 'var(--gradient)' }} />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2.5">
              <button
                onClick={toggle}
                className="theme-btn w-9 h-9 rounded-full border border-border bg-surface text-text-2
                  inline-flex items-center justify-center cursor-pointer
                  hover:border-accent-1 hover:text-accent-1 hover:bg-accent-glow"
                aria-label="Toggle theme"
              >
                {isDark() ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
              {user && (
                <button onClick={onAdminClick} className="btn-admin">
                  Admin
                </button>
              )}
            </li>
          </ul>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="theme-btn w-9 h-9 rounded-full border border-border bg-surface text-text-2
                inline-flex items-center justify-center cursor-pointer
                hover:border-accent-1 hover:text-accent-1 hover:bg-accent-glow"
              aria-label="Toggle theme"
            >
              {isDark() ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-text-1 bg-transparent border-none cursor-pointer"
              aria-label="Menu"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-bg z-[999] p-8 flex flex-col md:hidden">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="font-display text-2xl font-bold text-text-1 block py-3.5 border-b border-border-light"
            >
              {label}
            </a>
          ))}
          {user && (
            <button
              onClick={() => { onAdminClick(); setMobileOpen(false); }}
              className="btn-admin mt-5 self-start"
            >
              Admin
            </button>
          )}
        </div>
      )}

      <style>{`
        .btn-admin {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 100px;
          background: var(--gradient);
          color: #fff;
          font-size: 0.78rem;
          font-weight: 700;
          font-family: var(--font-body);
          border: none;
          cursor: pointer;
          letter-spacing: 0.02em;
        }
        .btn-admin:hover { opacity: 0.88; }
      `}</style>
    </>
  );
}

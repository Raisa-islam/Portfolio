import { useEffect, useRef, useState } from 'react';
import { FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';

const ROLES = ['Aspiring Researcher', 'Web Developer', 'Lifelong Learner', 'Problem Solver'];

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [roleText, setRoleText] = useState('');

  // Typewriter effect
  useEffect(() => {
    let ri = 0, ci = 0, deleting = false, timeout;

    function type() {
      const word = ROLES[ri];
      if (!deleting) {
        ci++;
        setRoleText(word.substring(0, ci));
        if (ci === word.length) {
          timeout = setTimeout(() => { deleting = true; type(); }, 2200);
          return;
        }
        timeout = setTimeout(type, 70 + Math.random() * 40);
      } else {
        ci--;
        setRoleText(word.substring(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % ROLES.length;
          timeout = setTimeout(type, 400);
          return;
        }
        timeout = setTimeout(type, 35);
      }
    }

    type();
    return () => clearTimeout(timeout);
  }, []);

  // Particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    let W, H, pts = [], mouse = { x: -999, y: -999 };
    const N = 55, CD = 130;
    let animId;

    function resize() {
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }

    function init() {
      resize();
      pts = [];
      for (let i = 0; i < N; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 1.5 + 1
        });
      }
    }

    function gc() {
      const s = getComputedStyle(document.documentElement);
      return {
        d: s.getPropertyValue('--canvas-dot').trim(),
        l: s.getPropertyValue('--canvas-line').trim()
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const c = gc();

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 140 && md > 0) { p.x += dx / md * 1.5; p.y += dy / md * 1.5; }

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const ddx = p.x - q.x, ddy = p.y - q.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < CD) {
            ctx.beginPath();
            ctx.strokeStyle = c.l.replace(/[\d.]+\)$/, (1 - dist / CD) * 0.14 + ')');
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = c.d;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const handleResize = () => resize();
    const handleMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const handleLeave = () => { mouse.x = -999; mouse.y = -999; };

    window.addEventListener('resize', handleResize);
    hero.addEventListener('mousemove', handleMouse);
    hero.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      hero.removeEventListener('mousemove', handleMouse);
      hero.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16" id="hero">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="relative z-[2] max-w-[700px] py-10 px-6 md:px-0">
        <p className="font-mono text-sm text-accent-1 font-medium mb-5 tracking-wide">
          {'// hello world'}
        </p>

        <h1 className="font-display font-extrabold text-[clamp(3rem,7vw,4.8rem)] leading-[1.05] mb-4 tracking-[-0.03em] gradient-warm-text">
          Raisa Islam
        </h1>

        <p className="text-2xl font-bold text-text-2 mb-6 min-h-[2.2em]">
          <span className="text-text-1">{roleText}</span>
          <span className="inline-block w-[3px] h-[1.2em] bg-accent-1 ml-[3px] align-text-bottom rounded-sm animate-cursor" />
        </p>

        <p className="text-lg text-text-2 leading-relaxed max-w-[550px] mb-9">
          Passionate about understanding how things work — from neural networks to user interfaces.
          Exploring the intersection of AI and web technologies, one experiment at a time.
        </p>

        <div className="flex gap-2.5 flex-wrap">
          <a href="https://github.com/Raisa-islam" target="_blank" rel="noopener noreferrer" className="hero-link">
            <FiGithub size={16} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/raisa-islam62/" target="_blank" rel="noopener noreferrer" className="hero-link">
            <FiLinkedin size={16} /> LinkedIn
          </a>
          <a href="#" className="hero-link">
            <FiGlobe size={16} /> Scholar
          </a>
        </div>
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[2] text-text-3 text-[0.72rem] flex flex-col items-center gap-2 font-semibold tracking-[0.1em] uppercase hidden md:flex">
        <span>Scroll</span>
        <div className="w-px h-9 bg-border relative overflow-hidden">
          <span className="absolute top-[-50%] left-0 w-full h-1/2 bg-accent-1 animate-scroll-line" />
        </div>
      </div>

      <style>{`
        .hero-link {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 100px;
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text-2); font-size: 0.85rem; font-weight: 600;
          transition: all 0.3s;
        }
        .hero-link:hover {
          border-color: var(--accent-1); color: var(--accent-1);
          box-shadow: 0 0 24px var(--accent-glow); transform: translateY(-2px);
        }
        .animate-cursor { animation: blink 1s step-end infinite; }
        .animate-scroll-line { animation: scroll-down 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

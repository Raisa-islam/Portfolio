import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import ScrollProgress from '../../components/ScrollProgress';
import Footer from '../../components/Footer';
import Hero from '../../sections/Hero';
import StatsBar from '../../sections/StatsBar';
import Research from '../../sections/Research';
import Writing from '../../sections/Writing';
import Projects from '../../sections/Projects';
import Education from '../../sections/Education';
import LifeBeyondCode from '../../sections/LifeBeyondCode';
import Contact from '../../sections/Contact';
import AdminDashboard from '../../components/AdminDashboard';

export default function Home() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="bg-bg min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Raisa Islam | Aspiring Researcher</title>
      </Helmet>

      <ScrollProgress />
      <Navbar onAdminClick={() => setAdminOpen(true)} />

      <main className="px-6">
        <Hero />
        <StatsBar />
        <Research />

        <hr className="h-[2px] border-none mx-auto max-w-[200px] rounded-sm opacity-40" style={{ background: 'var(--gradient-warm)' }} />

        <Writing />

        <hr className="h-[2px] border-none mx-auto max-w-[200px] rounded-sm opacity-40" style={{ background: 'var(--gradient-warm)' }} />

        <Projects />
        <Education />

        <hr className="h-[2px] border-none mx-auto max-w-[200px] rounded-sm opacity-40" style={{ background: 'var(--gradient-warm)' }} />

        <LifeBeyondCode />

        <hr className="h-[2px] border-none mx-auto max-w-[200px] rounded-sm opacity-40" style={{ background: 'var(--gradient-warm)' }} />

        <Contact />
      </main>

      <Footer />

      {adminOpen && <AdminDashboard onClose={() => setAdminOpen(false)} />}
    </div>
  );
}

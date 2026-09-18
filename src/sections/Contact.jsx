import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import SectionHeader from '../components/ui/SectionHeader';
import { FiGithub, FiLinkedin, FiBookOpen } from 'react-icons/fi';
import useReveal from '../hooks/useReveal';

export default function Contact() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const reveal = useReveal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.sendForm(
        'service_w9miwg4',
        'template_q3nmnsl',
        formRef.current,
        'DclJew29VpZ1hw-qB'
      );
      setSent(true);
      formRef.current.reset();
      setTimeout(() => setSent(false), 4000);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-[120px] px-6" id="contact">
      <div className="max-w-[1100px] mx-auto">
        <div ref={reveal} className="reveal">
          <SectionHeader eyebrow="Contact" title="Let's connect" />
        </div>

        <div ref={reveal} className="reveal contact-wrap bg-surface border border-border-light rounded-[20px] p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-[-40%] right-[-15%] w-[500px] h-[500px] blur-[150px] opacity-[0.05] rounded-full pointer-events-none" style={{ background: 'var(--gradient)' }} />
          <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] blur-[140px] opacity-[0.04] rounded-full pointer-events-none" style={{ background: 'var(--accent-2)' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start relative">
            <div>
              <h3 className="font-display font-bold text-2xl mb-4">I'd love to hear from you</h3>
              <p className="text-text-2 mb-7 text-[0.95rem] leading-relaxed">
                Whether it's a research collaboration, a project idea, or a conversation about something interesting — I'm always happy to connect and explore new possibilities together.
              </p>
              <div className="flex gap-2.5">
                {[
                  { href: 'https://github.com/Raisa-islam', icon: FiGithub, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/raisa-islam62/', icon: FiLinkedin, label: 'LinkedIn' },
                  { href: '#', icon: FiBookOpen, label: 'Scholar' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="contact-social inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border text-text-2 hover:border-accent-1 hover:text-accent-1 hover:bg-accent-glow hover:-translate-y-[3px] transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="flex gap-3.5 flex-col sm:flex-row">
                <input type="text" name="user_name" required placeholder="Your name" className="form-field flex-1 py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)] placeholder:text-text-3" />
                <input type="email" name="user_email" required placeholder="Your email" className="form-field flex-1 py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)] placeholder:text-text-3" />
              </div>
              <input type="text" name="subject" placeholder="Subject" className="form-field py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)] placeholder:text-text-3" />
              <textarea name="message" required placeholder="Your message" className="form-field py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)] placeholder:text-text-3 resize-y min-h-[130px]" />
              <button
                type="submit"
                disabled={sending}
                className="self-end py-3 px-8 rounded-xl text-white border-none font-body text-[0.92rem] font-bold cursor-pointer hover:opacity-90 hover:shadow-[0_6px_24px_var(--accent-glow)] hover:-translate-y-[2px] transition-all disabled:opacity-60"
                style={{ background: 'var(--gradient)' }}
              >
                {sent ? 'Sent!' : sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, type FormEvent } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react';
import { WordsPullUp, WordsPullUpMultiStyle, ScrollRevealText } from './components/AnimatedText';
import { CinematicVideo } from './components/CinematicVideo';

const services = [
  { id: 'fix', number: '01', name: 'Peach Fix.', category: 'The right first step', description: 'Turn “we should fix that” into something that works.', items: ['One clear enquiry path', 'The right details, every time', 'A named person on the other end', 'Tested, documented, handed over'] },
  { id: 'brand', number: '02', name: 'Brand & Content.', category: 'A little more you', description: 'A business that feels like itself. Everywhere.', items: ['A clear visual identity', 'Content made for your business', 'Useful, reusable brand assets', 'Your approval before publishing'] },
  { id: 'partner', number: '03', name: 'Peach Partner.', category: 'For the bigger picture', description: 'A considered next step for businesses ready to grow.', items: ['A shared, agreed starting point', 'Focused priorities and delivery', 'Clear reporting and responsibilities', 'A programme scoped around fit'] },
];

const questions = [
  { q: 'Can we start with something small?', a: 'Absolutely. A focused project is often the best starting point. We agree on one problem, what we’ll deliver, and what “done” looks like before work starts.' },
  { q: 'What happens after the project?', a: 'You get the work and a clear handover. If there is ongoing work to do, we can agree on Peach Care. There is no need to jump into a bigger programme.' },
  { q: 'What does a project cost?', a: 'It depends on the scope. Tell us what you need and we’ll put the work, price, timing and responsibilities in writing. No open-ended promises.' },
];

function PillLink({ href, children, className = '' }: { href: string; children: string; className?: string }) {
  return <a className={`pill-link group ${className}`} href={href}><span>{children}</span><span className="pill-arrow"><ArrowRight size={20} strokeWidth={1.6} /></span></a>;
}

function Contact() {
  const [draft, setDraft] = useState<string | null>(null);
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const business = String(form.get('business') || '').trim();
    const message = String(form.get('message') || '').trim();
    const email = String(form.get('email') || '').trim();
    const body = `Hi Peach,\n\n${message}\n\nName: ${name}\nBusiness: ${business}\nReply to: ${email}`;
    setDraft(`mailto:reach@peachhq.co?subject=${encodeURIComponent(`A little more peachy — ${business || name}`)}&body=${encodeURIComponent(body)}`);
  }
  return <footer id="contact" className="contact-wrap">
    <div className="contact-main">
      <div className="contact-copy">
        <span className="eyebrow"><span className="peach-dot" /> Good things start with a conversation</span>
        <h2>Let’s make it<br /><i>peachy.</i><span className="contact-star" aria-hidden="true">*</span></h2>
        <a className="email-link" href="mailto:reach@peachhq.co">reach@peachhq.co <ArrowUpRight size={22} /></a>
      </div>
      <form className="inquiry-form" onSubmit={prepareEmail} onChange={() => setDraft(null)}>
        <div className="field-row">
          <label>Your name<input autoComplete="name" name="name" placeholder="Alex" required maxLength={100} /></label>
          <label>Your email<input type="email" autoComplete="email" name="email" placeholder="alex@business.com" required maxLength={254} /></label>
        </div>
        <label>Business<input name="business" autoComplete="organization" placeholder="What’s your business called?" required maxLength={150} /></label>
        <label>What could feel easier?<textarea name="message" placeholder="A website, your brand, the enquiries you’re missing…" required rows={2} maxLength={2000} /></label>
        <div className="form-bottom"><p>Tell us a little. We’ll take it from there.<br />Your message opens in your email app.</p><button className="pill-link" type="submit"><span>Prepare enquiry</span><span className="pill-arrow"><ArrowRight size={20} /></span></button></div>
        {draft ? <div className="email-draft" role="status"><span>Your enquiry is ready.</span><a href={draft}>Open email draft <ArrowUpRight size={16} /></a></div> : null}
      </form>
    </div>
    <div className="footer-bottom"><a href="#home" aria-label="Peach home" className="footer-brand"><img src="/assets/peach-icon-white.svg" alt="" width="25" height="30" /><span>Make it peachy.</span></a><span>© {new Date().getFullYear()} Peach</span><a href="/legal.html">Privacy & terms <ArrowUpRight size={13} /></a><a href="#home">Back to top <ArrowUpRight size={13} /></a></div>
  </footer>;
}

export default function App() {
  const reduce = useReducedMotion();
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#about">Skip to content</a>
    <main>
      <section id="home" className="hero-section p-4 md:p-6" aria-label="Peach creative and growth studio">
        <div className="hero-frame rounded-2xl md:rounded-[2rem]">
          <CinematicVideo name="hero" label="hero background video" priority />
          <div className="noise-overlay hero-noise" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <a href="#home" className="hero-logo" aria-label="Peach home"><img src="/assets/peach-icon-white.svg" alt="" width="36" height="42" /></a>
          <nav className="nav-pill" aria-label="Main navigation"><a href="#about">Our story</a><a href="#services">What we do</a><a href="#process">The process</a><a href="#questions">Good questions</a><a href="#contact">Let’s talk <ArrowUpRight size={12} /></a></nav>
          <div className="hero-note"><span className="peach-dot" /> Independent thinking.<br /><span>Good things, made to work.</span></div>
          <div className="hero-content">
            <div className="hero-title-wrap"><p className="hero-kicker">A little less friction. A lot more possibility.</p><h1><WordsPullUp text="peach" showAsterisk /></h1></div>
            <motion.div className="hero-description" initial={reduce ? false : { opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <p>Thoughtful brands. Websites with presence. Systems that make the everyday easier. We bring the pieces together, so your business can move forward.</p>
              <PillLink href="#contact">Make it peachy</PillLink>
            </motion.div>
          </div>
          <a href="#about" className="scroll-cue"><ArrowDown size={12} /> Scroll to discover</a>
        </div>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-heading">
        <div className="section-caption"><span>01 / A fresh perspective</span><span>Thoughtful by design.</span></div>
        <div className="about-card">
          <span className="eyebrow"><span className="peach-dot" /> Design, technology & a human touch</span>
          <h2 id="about-heading"><WordsPullUp text="Good business should" /><br /><WordsPullUpMultiStyle segments={[{ text: 'feel this good.', className: 'serif-accent' }]} /></h2>
          <ScrollRevealText text="We’re Peach. We bring thoughtful design and practical systems to businesses with something good to offer. From the first impression to the next enquiry, we help the pieces work together. Less chasing. More room for the work you love." />
          <a className="text-link" href="#services">A better way to work <ArrowUpRight size={17} /></a>
          <span className="about-decoration" aria-hidden="true">*</span>
        </div>
        <div id="process" className="process-row">
          <div className="process-label"><span className="eyebrow">Keep it simple.</span><p>Good work.<br /><i>No runaround.</i></p></div>
          {[['01', 'Find the friction.', 'A short conversation about what’s working, what isn’t, and what matters next.'], ['02', 'Make it work.', 'A clear scope. Considered design. A working solution, tested together.'], ['03', 'Keep moving.', 'A proper handover, with ongoing care when there’s a reason for it.']].map(([n, title, text]) => <div className="process-step" key={n}><span className="step-number">{n}</span><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </section>

      <section id="services" className="features-section" aria-labelledby="features-heading">
        <span id="offers" className="anchor-alias" />
        <div className="bg-noise" aria-hidden="true" />
        <div className="section-caption"><span>02 / What we bring</span><span>One good place to start.</span></div>
        <div className="features-heading"><h2 id="features-heading"><WordsPullUpMultiStyle segments={[{ text: 'Make a better first impression.' }]} /><br /><WordsPullUpMultiStyle segments={[{ text: 'Then make every next step easier.', className: 'muted-heading' }]} /></h2><a className="text-link" href="#contact">Find your starting point <ArrowUpRight size={17} /></a></div>
        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-2">
          <motion.article className="feature-film" initial={reduce ? false : { opacity: 0, transform: 'scale(0.95)' }} whileInView={{ opacity: 1, transform: 'scale(1)' }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <CinematicVideo name="feature" label="creative canvas video" />
            <div className="film-shade" /><span className="film-label">The bigger picture</span><div className="film-title"><span>Your next<br /><i>good thing.</i></span><ArrowUpRight size={27} strokeWidth={1} /></div>
          </motion.article>
          {services.map((service, i) => <motion.article key={service.id} className="service-card" initial={reduce ? false : { opacity: 0, transform: 'scale(0.95)' }} whileInView={{ opacity: 1, transform: 'scale(1)' }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: reduce ? 0 : (i + 1) * 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <div className="service-art"><img src={`/assets/cinematic/${service.id}.webp`} width="64" height="64" alt="" loading="lazy" /><span>{service.number}</span></div>
            <span className="service-category">{service.category}</span><h3>{service.name}</h3><p className="service-description">{service.description}</p>
            <ul>{service.items.map(item => <li key={item}><Check size={13} strokeWidth={1.5} /><span>{item}</span></li>)}</ul>
            <a className="service-link" href={`/service.html?s=${service.id}`}>Explore {service.name.replace('.', '')}<ArrowUpRight size={19} strokeWidth={1.5} /></a>
          </motion.article>)}
        </div>
        <div className="other-offer"><span>More ways to make the everyday easier.</span><a href="/service.html?s=answer">Meet Peach Answer <ArrowUpRight size={15} /><small>In testing</small></a></div>
        <div className="questions" id="questions"><div><span className="eyebrow">Before we say hello</span><h3>Good questions.<br /><i>Straight answers.</i></h3></div><div className="question-list">{questions.map(({ q, a }) => <details key={q}><summary>{q}<Plus size={18} strokeWidth={1.4} /></summary><p>{a}</p></details>)}</div></div>
      </section>
    </main>
    <Contact />
  </MotionConfig>;
}

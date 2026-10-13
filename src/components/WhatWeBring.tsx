import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { WordsPullUpMultiStyle } from './AnimatedText';

// The "What we bring" offers section, restored from the earlier cinematic homepage (commit 646d3d1).
// The feature card now shows the peach astronaut still instead of the rose video.
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

export function WhatWeBring() {
  const reduce = useReducedMotion();
  const enter = (i: number) => ({
    initial: reduce ? false as const : { opacity: 0, transform: 'scale(0.95)' },
    whileInView: { opacity: 1, transform: 'scale(1)' },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: reduce ? 0 : i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <div className="wwb" id="offers">
      <section id="services" className="features-section" aria-labelledby="features-heading">
        <div className="bg-noise" aria-hidden="true" />
        <div className="section-caption"><span>04 / What we bring</span><span>One good place to start.</span></div>
        <div className="features-heading">
          <h2 id="features-heading"><WordsPullUpMultiStyle segments={[{ text: 'Make a better first impression.' }]} /><br /><WordsPullUpMultiStyle segments={[{ text: 'Then make every next step easier.', className: 'muted-heading' }]} /></h2>
          <a className="text-link" href="#contact">Find your starting point <ArrowUpRight size={17} /></a>
        </div>
        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-2">
          <motion.a href="#contact" className="feature-film" data-cursor="Hello" {...enter(0)}>
            <img className="film-still" src="/assets/art/peach-astronaut.webp" alt="An astronaut asleep in a field of ripe peaches" loading="lazy" />
            <div className="film-shade" /><span className="film-label">The bigger picture</span>
            <div className="film-title"><span>Your next<br /><i>good thing.</i></span><ArrowUpRight size={27} strokeWidth={1} /></div>
          </motion.a>
          {services.map((service, i) => (
            <motion.article key={service.id} className="service-card" {...enter(i + 1)}>
              <div className="service-art"><img src={`/assets/cinematic/${service.id}.webp`} width="64" height="64" alt="" loading="lazy" /><span>{service.number}</span></div>
              <span className="service-category">{service.category}</span><h3>{service.name}</h3><p className="service-description">{service.description}</p>
              <ul>{service.items.map(item => <li key={item}><Check size={13} strokeWidth={1.5} /><span>{item}</span></li>)}</ul>
              <a className="service-link" href={`/service.html?s=${service.id}`} data-cursor="Open">Explore {service.name.replace('.', '')}<ArrowUpRight size={19} strokeWidth={1.5} /></a>
            </motion.article>
          ))}
        </div>
        <div className="other-offer"><span>More ways to make the everyday easier.</span><a href="/service.html?s=answer">Meet Peach Answer <ArrowUpRight size={15} /><small>In testing</small></a></div>
        <div className="questions" id="questions">
          <div><span className="eyebrow">Before we say hello</span><h3>Good questions.<br /><i>Straight answers.</i></h3></div>
          <div className="question-list">{questions.map(({ q, a }) => <details key={q}><summary>{q}<Plus size={18} strokeWidth={1.4} /></summary><p>{a}</p></details>)}</div>
        </div>
      </section>
    </div>
  );
}

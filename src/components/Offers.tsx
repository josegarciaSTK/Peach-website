import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Magnetic } from './Interaction';

// Each offer wears a fruit sticker. PLU codes are the real ones for peaches (4038, 4044, 4401).
const offers = [
  { id: 'fix', plu: '4038', tone: 'peach', kind: 'Focused project', name: 'Peach Fix', line: 'Turn “we should fix that” into something that works.', problem: 'Enquiries arrive missing details, or land with nobody.', items: ['One enquiry path, rebuilt end to end', 'The right details on every message', 'Routed to a named person, with a backup', 'Tested like a customer, then handed over'] },
  { id: 'brand', plu: '4044', tone: 'red', kind: 'Brand & content', name: 'Brand & Content', line: 'A business that feels like itself. Everywhere.', problem: 'Your work is good. Your brand doesn’t show it yet.', items: ['A clear visual identity', 'Content made for your business', 'Useful, reusable brand assets', 'Your approval before anything is published'] },
  { id: 'partner', plu: '4401', tone: 'leaf', kind: 'Ongoing partnership', name: 'Peach Partner', line: 'A considered next step for businesses ready to grow.', problem: 'Lots of good ideas, no one to own them.', items: ['A shared, agreed starting point', 'Focused priorities and delivery', 'Clear reporting and responsibilities', 'A programme scoped around fit'] },
];

const questions = [
  ['Can we start with something small?', 'Absolutely. A focused project is often the best place to start. We agree on one problem, what we’ll deliver, and what “done” looks like before work begins.'],
  ['What does a project cost?', 'It depends on the scope. Every price is fixed and quoted for your scope, in writing, before we start. No open-ended hours.'],
  ['What happens after the project?', 'You get the work and a clear handover. If there’s a reason for ongoing care, we’ll agree it. There’s no need to jump into a bigger programme.'],
  ['Do I need new software?', 'Usually not. We work with the tools you already have. If something genuinely needs replacing, we’ll say so and quote it separately.'],
];

function Sticker({ plu, name, tone }: { plu: string; name: string; tone: string }) {
  return (
    <div className={`sticker sticker--${tone}`} aria-hidden="true">
      <span className="sticker__brand">PEACH</span>
      <span className="sticker__plu">{plu}</span>
      <span className="sticker__name">{name}</span>
    </div>
  );
}

export function Offers() {
  const reduce = useReducedMotion();
  return (
    <section id="offers" className="offers section-light" aria-labelledby="offers-heading">
      <div className="section-index mono"><span>(04) Offers</span><span>Pick a starting point</span></div>
      <div className="offers__head">
        <h2 id="offers-heading">Three ways to <span className="serif">make it peachy.</span></h2>
        <p>Every project is fixed in scope and price before we begin. Start small, see it work, then decide what’s next.</p>
      </div>
      <div className="offers__grid">
        {offers.map((o, i) => (
          <motion.article key={o.id} className="offer" data-tone={o.tone}
            initial={reduce ? false : { opacity: 0, y: 60, rotate: i === 1 ? 0 : (i === 0 ? -2 : 2) }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
            <Sticker plu={o.plu} name={o.name} tone={o.tone} />
            <span className="mono offer__kind">{String(i + 1).padStart(2, '0')} · {o.kind}</span>
            <h3>{o.name}</h3>
            <p className="offer__line">{o.line}</p>
            <p className="offer__problem"><span className="mono">For when</span>{o.problem}</p>
            <ul>{o.items.map(item => <li key={item}><Plus size={14} strokeWidth={1.6} />{item}</li>)}</ul>
            <div className="offer__foot">
              <span className="mono">Fixed price · quoted for your scope</span>
              <a href={`/service.html?s=${o.id}`} className="offer__link" data-cursor="Open">Explore <ArrowUpRight size={16} /></a>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="offers__more">
        <span>Also in the orchard: <strong>Peach Answer</strong>, an AI receptionist for the calls you can’t pick up.</span>
        <a href="/service.html?s=answer" className="mono">In testing <ArrowUpRight size={14} /></a>
      </div>

      <div className="faq" id="questions">
        <h3>Good questions. <span className="serif">Straight answers.</span></h3>
        <div className="faq__list">
          {questions.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} strokeWidth={1.4} /></summary><p>{a}</p></details>)}
        </div>
      </div>
      <div className="offers__cta"><Magnetic><a className="btn btn--ink" href="#contact" data-cursor="Hello">Not sure where to start? Ask us <ArrowUpRight size={18} /></a></Magnetic></div>
    </section>
  );
}

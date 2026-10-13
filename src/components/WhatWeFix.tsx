import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MaskedLines } from './MaskedLines';

// Problems in the owner's words, each answered by an offer. Copy comes from services-data.js.
const fixes = [
  { id: 'fix', problem: 'Enquiries arrive missing details, or land with nobody.', offer: 'Peach Fix', kind: 'Focused project', draft: false,
    answer: 'We rebuild one enquiry path so every enquiry arrives complete and goes straight to the person responsible. Then we test it like a customer would.',
    first: 'Pick the path. We’ll send a written scope.' },
  { id: 'answer', problem: 'The phone rings while you’re with a customer.', offer: 'Peach Answer', kind: 'AI receptionist', draft: true,
    answer: 'An AI receptionist for the inbound calls you choose to route to it. It captures the details you agreed and hands them to your team. Booking is added only once it passes its own test.',
    first: 'Start with a compatibility check on your number.' },
  { id: 'brand', problem: 'Your brand doesn’t feel like the same business everywhere.', offer: 'Brand & Content', kind: 'Project, with optional care', draft: false,
    answer: 'A clear identity, the files to use it, and a set content pack you approve. If you want ongoing social, it runs on an agreed cadence, with your approval before anything is posted.',
    first: 'Send us three places your brand appears today.' },
  { id: 'partner', problem: 'The basics work. Now you want growth handled together.', offer: 'Peach Partner', kind: 'Growth partner engagement', draft: true,
    answer: 'A later-stage programme for businesses that already qualify. It starts from a signed baseline, with agreed scope, regular reporting and shared responsibilities.',
    first: 'Start with a fit conversation.' },
];

type Fix = typeof fixes[number];
function Answer({ f }: { f: Fix }) {
  return (
    <>
      <span className="fix__kind">{f.kind}</span>
      <h3>{f.offer}</h3>
      <p>{f.answer}</p>
      <div className="fix__first"><span>First step</span>{f.first}</div>
      <a className="fix__link" href={`/service.html?s=${f.id}`} data-cursor="Open">See how {f.offer} works <ArrowUpRight size={16} /></a>
    </>
  );
}

export function WhatWeFix() {
  const [active, setActive] = useState(fixes[0].id);
  const reduce = useReducedMotion();
  const current = fixes.find(f => f.id === active)!;
  return (
    <section id="fix" className="fix" aria-labelledby="fix-heading">
      <div className="section-index"><span>What we fix</span></div>
      <div className="fix__head">
        <MaskedLines id="fix-heading" className="fix__heading" lines={['Sound familiar?', <span className="serif-italic">We fix that.</span>]} />
        <p>Real problems from real businesses. Point at one to see what we do about it.</p>
      </div>
      <div className="fix__body">
        <ul className="fix__list">
          {fixes.map(f => (
            <li key={f.id}>
              <button type="button" className="fix__row" aria-pressed={f.id === active} aria-controls="fix-panel"
                onPointerEnter={e => e.pointerType === 'mouse' && setActive(f.id)} onFocus={() => setActive(f.id)} onClick={() => setActive(f.id)}>
                {f.id === active ? <motion.span layoutId="fix-marker" className="fix__marker" transition={{ type: 'spring', stiffness: 420, damping: 36 }} aria-hidden="true" /> : null}
                <span className="fix__problem">{f.problem}</span>
                <span className="fix__offer">{f.offer}{f.draft ? <small>In testing</small> : null}</span>
              </button>
              {f.id === active ? <div className="fix__inline"><Answer f={f} /></div> : null}
            </li>
          ))}
        </ul>
        <div id="fix-panel" className="fix__panel" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current.id} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <Answer f={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

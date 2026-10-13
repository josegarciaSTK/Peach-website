import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MaskedLines } from './MaskedLines';

// How pricing works, in three calm steps. A small peach travels the line as the section scrolls by.
const steps = [
  { title: 'Talk it through', text: 'A short call about what’s working and what isn’t. You leave with a written scope, not a sales pitch.' },
  { title: 'A fixed price, in writing', text: 'Every project is quoted for your scope and agreed in writing before anything starts. No open-ended hours.' },
  { title: 'Care only if it helps', text: 'After handover you can run it yourself. If there’s ongoing work, we agree Peach Care. No bigger programme required.' },
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const left = useTransform(progress, [0, 1], reduce ? ['100%', '100%'] : ['0%', '100%']);
  const rotate = useTransform(progress, [0, 1], reduce ? [0, 0] : [-30, 330]);
  return (
    <section id="pricing" className="pricing ch-light" aria-labelledby="pricing-heading">
      <div className="section-index"><span>Pricing</span></div>
      <div className="pricing__head">
        <MaskedLines id="pricing-heading" className="pricing__heading" lines={['How pricing works.']} />
        <p>Prices are quoted for your scope, so there’s no menu. What never changes is how we get there.</p>
      </div>
      <div ref={ref} className="pricing__track">
        <div className="pricing__line" aria-hidden="true">
          <motion.i style={{ scaleX: progress }} />
          <motion.span className="pricing__peach" style={{ left, rotate }}><img src="/assets/peach-icon-coral.svg" alt="" /></motion.span>
        </div>
        <ol className="pricing__steps">
          {steps.map(s => <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const steps = [
  { n: '01', title: 'Find the friction.', text: 'A short conversation about what’s working, what isn’t, and what matters next.', tone: 'stack-card--dark' },
  { n: '02', title: 'Make it work.', text: 'A clear scope. Considered design. A working solution, tested together.', tone: 'stack-card--cream' },
  { n: '03', title: 'Keep moving.', text: 'A proper handover, with ongoing care when there’s a reason for it.', tone: 'stack-card--peach' },
];

function StackCard({ step, i, progress }: { step: typeof steps[number]; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // Each card shrinks a little once the next one starts covering it.
  const start = i / steps.length;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : 1 - (steps.length - 1 - i) * 0.05]);
  return (
    <motion.article className={`stack-card ${step.tone}`} style={{ scale, top: `calc(14vh + ${i} * var(--stack-step))` }}>
      <span className="stack-num">{step.n}</span>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </motion.article>
  );
}

export function ProcessStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section id="process" className="process-section" aria-labelledby="process-heading">
      <div className="section-caption"><span>03 / The process</span><span>Keep it simple.</span></div>
      <h2 id="process-heading" className="process-heading">Good work.<br /><i>No runaround.</i></h2>
      <div ref={ref} className="stack">
        {steps.map((s, i) => <StackCard key={s.n} step={s} i={i} progress={scrollYProgress} />)}
      </div>
    </section>
  );
}

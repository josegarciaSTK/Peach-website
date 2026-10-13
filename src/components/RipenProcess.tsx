import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { RipePeach } from './RipePeach';

const steps = [
  { stage: 'Blossom', n: '01', title: 'Find the friction.', text: 'A short call about what’s working, what isn’t, and what matters next. You leave with a written scope, not a sales pitch.' },
  { stage: 'Fruit', n: '02', title: 'Make it work.', text: 'Considered design and a working solution, built around how your business actually runs. Tested together before anything goes live.' },
  { stage: 'Ripe', n: '03', title: 'Keep it growing.', text: 'A proper handover you can run without us, and ongoing care only when there’s a real reason for it.' },
];

// A pinned stage: the three steps stay readable on the left while the peach ripens on the right.
export function RipenProcess() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const ripeness = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', v => setIndex(Math.min(steps.length - 1, Math.floor(v * steps.length * 0.999))));
  const glow = useTransform(ripeness, [0, 0.5, 1], ['#a7b86833', '#f6b48c38', '#fa757647']);
  const rotate = useTransform(ripeness, [0, 1], [-8, 6]);
  const bar = scrollYProgress;
  const glowBg = useTransform(glow, c => `radial-gradient(50% 50% at 50% 50%, ${c} 0%, transparent 70%)`);

  const list = (
    <ol className="ripen__steps">
      {steps.map((s, i) => (
        <li key={s.n} data-on={reduce || i === index || undefined}>
          <span className="mono">{s.stage}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );

  if (reduce) {
    return (
      <section id="process" className="ripen ripen--static" aria-labelledby="process-heading">
        <div className="section-index"><span>Process</span></div>
        <h2 id="process-heading" className="ripen__heading">Good work. <span className="serif-italic">No runaround.</span></h2>
        {list}
      </section>
    );
  }

  return (
    <section ref={ref} id="process" className="ripen" aria-labelledby="process-heading">
      <div className="ripen__pin">
        <div className="section-index"><span>Process</span></div>
        <div className="ripen__stage">
          <div className="ripen__copy">
            <h2 id="process-heading" className="ripen__heading">Good work. <span className="serif-italic">No runaround.</span></h2>
            {list}
            <div className="ripen__track" aria-hidden="true"><motion.i style={{ scaleX: bar }} /></div>
          </div>
          <div className="ripen__fruit">
            <motion.div className="ripen__glow" style={{ background: glowBg }} aria-hidden="true" />
            <motion.div style={{ rotate }} className="ripen__fruit-inner"><RipePeach ripeness={ripeness} className="ripen__peach" /></motion.div>
            <span className="ripen__stage-name mono" aria-hidden="true">{steps[index].stage}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

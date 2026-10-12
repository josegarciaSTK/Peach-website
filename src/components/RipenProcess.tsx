import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { RipePeach } from './RipePeach';

const steps = [
  { stage: 'Blossom', n: '01', title: 'Find the friction.', text: 'A short call about what’s working, what isn’t, and what matters next. You leave with a written scope, not a sales pitch.' },
  { stage: 'Fruit', n: '02', title: 'Make it work.', text: 'Considered design and a working solution, built around how your business actually runs. Tested together before anything goes live.' },
  { stage: 'Ripe', n: '03', title: 'Keep it growing.', text: 'A proper handover you can run without us, and ongoing care only when there’s a real reason for it.' },
];

// A pinned stage: the peach ripens from green to coral while the three steps play through.
export function RipenProcess() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const ripeness = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', v => setIndex(Math.min(steps.length - 1, Math.floor(v * steps.length * 0.999))));
  const bg = useTransform(ripeness, [0, 0.5, 1], ['#DEDBC8', '#EBD7C5', '#F7C9BC']);
  const rotate = useTransform(ripeness, [0, 1], [-8, 6]);
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const step = steps[index];

  if (reduce) {
    return (
      <section id="process" className="ripen ripen--static section-light" aria-labelledby="process-heading">
        <div className="section-index mono"><span>(02) Process</span><span>From blossom to ripe</span></div>
        <h2 id="process-heading" className="ripen__heading">Good work. <span className="serif">No runaround.</span></h2>
        <ol className="ripen__list">{steps.map(s => <li key={s.n}><span className="mono">{s.n} · {s.stage}</span><h3>{s.title}</h3><p>{s.text}</p></li>)}</ol>
      </section>
    );
  }

  return (
    <motion.section ref={ref} id="process" className="ripen section-light" style={{ backgroundColor: bg }} aria-labelledby="process-heading">
      <div className="ripen__pin">
        <div className="section-index mono"><span>(02) Process</span><span>From blossom to ripe</span></div>
        <h2 id="process-heading" className="ripen__heading">Good work. <span className="serif">No runaround.</span></h2>

        <div className="ripen__stage">
          <div className="ripen__copy" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step.n} initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <span className="mono ripen__stage-label">{step.n} — {step.stage}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div className="ripen__fruit" style={{ rotate }}>
            <RipePeach ripeness={ripeness} className="ripen__peach" />
          </motion.div>

          <div className="ripen__num" aria-hidden="true">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={step.n} initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>{step.n}</motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="ripen__track" aria-hidden="true">
          {steps.map((s, i) => <span key={s.n} className="mono" data-on={i <= index || undefined}>{s.stage}</span>)}
          <motion.i style={{ width: bar }} />
        </div>
      </div>
    </motion.section>
  );
}

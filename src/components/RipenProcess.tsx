import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

const steps = [
  { stage: 'Blossom', n: '01', title: 'Find the friction.', text: 'A short call about what’s working, what isn’t, and what matters next. You leave with a written scope, not a sales pitch.' },
  { stage: 'Fruit', n: '02', title: 'Make it work.', text: 'Considered design and a working solution, built around how your business actually runs. Tested together before anything goes live.' },
  { stage: 'Ripe', n: '03', title: 'Keep it growing.', text: 'A proper handover you can run without us, and ongoing care only when there’s a real reason for it.' },
];

// A pinned stage: the three steps stay readable on the left while the art on the right grows
// from blossom to green fruit to ripe peach. The two peach images share framing, so they crossfade in place.
function Stages({ ripeness }: { ripeness: MotionValue<number> }) {
  const blossomOpacity = useTransform(ripeness, [0, 0.26, 0.4], [1, 1, 0]);
  const blossomScale = useTransform(ripeness, [0, 0.26, 0.4], [1, 1.04, 0.7]);
  const blossomRotate = useTransform(ripeness, [0, 0.4], [-6, 24]);
  const greenOpacity = useTransform(ripeness, [0.3, 0.42], [0, 1]);
  const peachScale = useTransform(ripeness, [0.3, 0.46, 1], [0.6, 0.92, 1]);
  const ripeOpacity = useTransform(ripeness, [0.62, 0.82], [0, 1]);
  return (
    <div className="ripen__stages">
      <motion.img src="/assets/art/stage-blossom.webp" alt="" className="ripen__img" style={{ opacity: blossomOpacity, scale: blossomScale, rotate: blossomRotate }} />
      <motion.div className="ripen__peach-wrap" style={{ scale: peachScale }}>
        <motion.img src="/assets/art/stage-green.webp" alt="" className="ripen__img" style={{ opacity: greenOpacity }} />
        <motion.img src="/assets/art/stage-ripe.webp" alt="" className="ripen__img" style={{ opacity: ripeOpacity }} />
      </motion.div>
    </div>
  );
}

export function RipenProcess() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const ripeness = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', v => setIndex(Math.min(steps.length - 1, Math.floor(v * steps.length * 0.999))));
  const glow = useTransform(ripeness, [0, 0.5, 1], ['#a7b86833', '#f6b48c38', '#fa757647']);
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
            <div className="ripen__fruit-inner" role="img" aria-label="A peach blossom that becomes a green peach, then a ripe one"><Stages ripeness={ripeness} /></div>
            <span className="ripen__stage-name mono" aria-hidden="true">{steps[index].stage}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

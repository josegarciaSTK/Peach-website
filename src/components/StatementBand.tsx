import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// The one vivid-red statement section from the brand brief. The marquee drifts on its own
// and is nudged by scroll; reduced-motion visitors get a still line.
export function StatementBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const shift = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%']);
  const line = 'Make it peachy ✳ A little less friction ✳ A lot more possibility ✳ ';
  return (
    <section ref={ref} className="statement-band" aria-labelledby="statement-heading">
      <motion.div className="marquee" aria-hidden="true" style={{ x: shift }}>
        <div className={`marquee__track${reduce ? '' : ' is-moving'}`}><span>{line}</span><span>{line}</span></div>
      </motion.div>
      <div className="statement-body">
        <h2 id="statement-heading">You run the business.<br /><i>We’ll make it feel easier.</i></h2>
        <a className="pill-link statement-cta" href="#contact"><span>Start with a conversation</span><span className="pill-arrow"><ArrowRight size={20} strokeWidth={1.6} /></span></a>
      </div>
    </section>
  );
}

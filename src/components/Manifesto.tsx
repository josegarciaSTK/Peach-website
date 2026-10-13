import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// Words light up one by one as the paragraph scrolls through the viewport.
type Piece = string | { inline: ReactNode };
const statement: Piece[] = [
  'We’re Peach,', { inline: <span className="inline-pill inline-pill--peach"><img src="/assets/peach-icon-white.svg" alt="" /></span> },
  'a small studio for brands, websites and the systems behind them. We make good businesses',
  { inline: <span className="inline-pill inline-pill--bloom"><img src="/assets/art/branch-peach.webp" alt="" /></span> },
  'look as good as they are, then make every next enquiry easier to win.',
];

function Word({ children, progress, at }: { children: ReactNode; progress: MotionValue<number>; at: number }) {
  const opacity = useTransform(progress, [at - 0.06, at + 0.02], [0.14, 1]);
  return <motion.span className="manifesto__word" style={{ opacity }} aria-hidden="true">{children}</motion.span>;
}

const proof = [
  ['01', 'Fixed scope, in writing', 'You know what you get, when, and for how much, before anything starts.'],
  ['02', 'One named person', 'The person you talk to on day one is the one doing the work.'],
  ['03', 'Yours to keep', 'Files, logins and handover notes. Nothing locked away with us.'],
];

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words: ReactNode[] = statement.flatMap(p => typeof p === 'string' ? p.split(' ') : [p.inline]);
  const plain = statement.filter((p): p is string => typeof p === 'string').join(' ');

  return (
    <section id="about" className="manifesto section-light" aria-labelledby="about-label">
      <div className="section-index mono"><span id="about-label">(01) About</span><span>A fresh perspective</span></div>
      <p ref={ref} className="manifesto__text" aria-label={plain}>
        {words.map((content, i) => {
          return reduce
            ? <span key={i} className="manifesto__word" aria-hidden="true">{content}</span>
            : <Word key={i} progress={scrollYProgress} at={i / words.length}>{content}</Word>;
        })}
      </p>
      <ul className="proof">
        {proof.map(([n, title, text], i) => (
          <motion.li key={n} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <span className="mono">{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

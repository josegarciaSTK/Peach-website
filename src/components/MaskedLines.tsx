import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Masked headline: each line rises from behind its own baseline once, the next line 110ms later.
// Lines are authored by the caller so the break points are deliberate.
export function MaskedLines({ lines, as: Tag = 'h2', id, className = '' }: { lines: ReactNode[]; as?: 'h2' | 'h3'; id?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  return (
    <Tag ref={ref} id={id} className={`masked ${className}`}>
      {lines.map((line, i) => (
        <span className="masked__line" key={i}>
          <motion.span className="masked__inner" initial={reduce ? false : { y: '108%' }} animate={inView || reduce ? { y: '0%' } : undefined} transition={{ duration: 0.9, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] }}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

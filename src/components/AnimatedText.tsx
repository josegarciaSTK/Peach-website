import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const entranceEase = [0.16, 1, 0.3, 1] as const;
type Segment = { text: string; className?: string };

export function WordsPullUpMultiStyle({ segments, className = '', showAsterisk = false }: { segments: Segment[]; className?: string; showAsterisk?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const words = segments.flatMap(segment => segment.text.split(' ').map(word => ({ word, className: segment.className })));
  return (
    <span ref={ref} className={`words ${className}`} aria-label={segments.map(segment => segment.text).join(' ')}>
      {words.map(({ word, className: wordClass }, i) => (
        <span className={`word-clip ${wordClass || ''}`} key={`${i}-${word}`} aria-hidden="true">
          <motion.span className="word" initial={reduce ? false : { opacity: 0, transform: 'translateY(20px)' }} animate={visible ? { opacity: 1, transform: 'translateY(0px)' } : undefined} transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : i * 0.08, ease: entranceEase }}>
            {word}{showAsterisk && i === words.length - 1 ? <sup className="word-asterisk">*</sup> : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function WordsPullUp({ text, ...props }: { text: string; className?: string; showAsterisk?: boolean }) {
  return <WordsPullUpMultiStyle segments={[{ text }]} {...props} />;
}

function AnimatedLetter({ children, progress, index, total }: { children: ReactNode; progress: MotionValue<number>; index: number; total: number }) {
  const point = index / total;
  const opacity = useTransform(progress, [point - 0.1, point + 0.05], [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  let index = 0;
  return (
    <p ref={ref} className="about-body" aria-label={text}>
      {reduce ? text : <span aria-hidden="true">{text.split(' ').map((word, wi) => {
        const start = index;
        index += word.length + 1;
        return <span className="reveal-word" key={wi}>{[...word].map((char, ci) => <AnimatedLetter key={ci} progress={scrollYProgress} index={start + ci} total={text.length}>{char}</AnimatedLetter>)}{' '}</span>;
      })}</span>}
    </p>
  );
}

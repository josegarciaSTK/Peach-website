import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import Lenis from 'lenis';

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Inertia scrolling. Skipped for reduced-motion visitors; in-page anchors still work.
export function useSmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: 0 } });
    let raf = requestAnimationFrame(function loop(t) { lenis.raf(t); raf = requestAnimationFrame(loop); });
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [reduce]);
}

// Children drift toward the pointer while it is near, then spring back.
export function Magnetic({ children, strength = 0.32 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.5 });
  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return <motion.span ref={ref} className="magnetic" style={{ x, y }} onPointerMove={move} onPointerLeave={reset}>{children}</motion.span>;
}

// A soft peach follower. Elements with data-cursor="Label" grow it into a labelled disc.
export function PeachCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => { setEnabled(finePointer() && !reduce); }, [reduce]);
  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX); y.set(e.clientY); setHidden(false);
      const target = (e.target as Element | null)?.closest?.('[data-cursor]');
      setLabel(target ? target.getAttribute('data-cursor') : null);
    };
    const leave = () => setHidden(true);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave); };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div className="peach-cursor" aria-hidden="true" style={{ x: sx, y: sy }} data-hidden={hidden || undefined}>
      <motion.div className="peach-cursor__disc" animate={{ scale: label ? 1 : 0.16, x: label ? 44 : 0, y: label ? 44 : 0 }} transition={{ type: 'spring', stiffness: 380, damping: 28 }}>
        <motion.span animate={{ opacity: label ? 1 : 0 }} transition={{ duration: 0.15 }}>{label}</motion.span>
      </motion.div>
    </motion.div>
  );
}

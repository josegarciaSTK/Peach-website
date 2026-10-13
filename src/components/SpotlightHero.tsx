import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Interaction';

const BASE_IMAGE = '/assets/art/branch-lavender.webp';
const REVEAL_IMAGE = '/assets/art/branch-peach.webp';
const SPOTLIGHT_R = 260;
const SPOTLIGHT_R_TOUCH = 170;

// Eases a soft circular spotlight toward the pointer; inside it the lavender branch ripens to peach.
// Touch screens without a hovering pointer get a slow drift along the branch until they drag.
function useSpotlight(sectionRef: React.RefObject<HTMLElement | null>, maskRef: React.RefObject<HTMLDivElement | null>, reduce: boolean | null) {
  useEffect(() => {
    const section = sectionRef.current;
    const mask = maskRef.current;
    if (!section || !mask) return;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const radius = canHover ? SPOTLIGHT_R : SPOTLIGHT_R_TOUCH;
    mask.style.setProperty('--r', `${radius}px`);

    const target = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };
    let touched = false;
    let raf = 0;
    const start = performance.now();

    const paint = () => {
      mask.style.setProperty('--x', `${smooth.x}px`);
      mask.style.setProperty('--y', `${smooth.y}px`);
    };
    const drift = (t: number) => {
      // A lazy figure-eight along the branch, which runs from lower left to upper right.
      const w = section.clientWidth, h = section.clientHeight, s = (t - start) / 1000;
      const u = 0.5 + 0.34 * Math.sin(s * 0.45);
      return { x: w * u, y: h * (0.72 - 0.3 * u) + h * 0.05 * Math.sin(s * 0.9) };
    };
    const frame = (t: number) => {
      raf = 0;
      if (!canHover && !touched && !reduce) Object.assign(target, drift(t));
      if (smooth.x < -900) Object.assign(smooth, target);
      const k = reduce ? 1 : 0.1;
      smooth.x += (target.x - smooth.x) * k;
      smooth.y += (target.y - smooth.y) * k;
      paint();
      const settling = Math.abs(target.x - smooth.x) + Math.abs(target.y - smooth.y) > 0.3;
      if (settling || (!canHover && !touched && !reduce)) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const move = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      if (e.pointerType !== 'mouse') touched = true;
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      kick();
    };
    const leave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      target.x = target.y = -999;
      smooth.x = smooth.y = -999;
      paint();
    };
    section.addEventListener('pointermove', move);
    section.addEventListener('pointerdown', move);
    section.addEventListener('pointerleave', leave);
    if (!canHover && reduce) { Object.assign(target, drift(start)); }
    kick();
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerdown', move);
      section.removeEventListener('pointerleave', leave);
    };
  }, [sectionRef, maskRef, reduce]);
}

export function SpotlightHero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  useSpotlight(sectionRef, maskRef, reduce);

  return (
    <section ref={sectionRef} id="home" className="spot" aria-labelledby="hero-title">
      <div className="spot__img spot__zoom" style={{ backgroundImage: `url(${BASE_IMAGE})` }} role="img" aria-label="A flowering branch in lavender blossom. Where you move your cursor, it turns peach." />
      <div ref={maskRef} className="spot__reveal" aria-hidden="true">
        <div className="spot__img spot__zoom" style={{ backgroundImage: `url(${REVEAL_IMAGE})` }} />
      </div>

      <h1 id="hero-title" className="spot__title">
        <span className="spot__line serif spot-anim spot-reveal" style={{ animationDelay: '0.25s' }}>Good business,</span>
        <span className="spot__line spot__line--sans spot-anim spot-reveal" style={{ animationDelay: '0.42s' }}>in full bloom.</span>
      </h1>

      <div className="spot__left spot-anim spot-fade" style={{ animationDelay: '0.7s' }}>
        <p>Peach is a small studio for brands, websites and the systems behind them.</p>
      </div>

      <div className="spot__right spot-anim spot-fade" style={{ animationDelay: '0.85s' }}>
        <p>Move across the branch and watch it turn peach. Then tell us what could feel easier in your business.</p>
        <Magnetic><a className="btn btn--peach" href="#contact" data-cursor="Hello">Book a free call <ArrowUpRight size={18} strokeWidth={1.8} /></a></Magnetic>
      </div>
    </section>
  );
}

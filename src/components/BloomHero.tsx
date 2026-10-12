import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PeachWordmark } from './PeachWordmark';

// Morph-reveal trail: the violet bloom ripens to peach wherever the pointer passes.
const TRAIL_MAX_POINTS = 60;
const TRAIL_HEAD_R = 140;
const TRAIL_NOISE_AMP = 44;
const TRAIL_BLOB_PTS = 24;
const TRAIL_FADE_SPEED = 0.92;
const TRAIL_SAMPLE_DIST = 8;
// Masks are re-encoded every active frame; cap their resolution so that stays cheap.
const MASK_MAX_SIDE = 720;

type TrailPoint = { x: number; y: number; r: number; alpha: number; seed: number };

function drawMorphBlob(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number, seed: number, k: number) {
  if (r < 2) return;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < TRAIL_BLOB_PTS; i++) {
    const angle = (i / TRAIL_BLOB_PTS) * Math.PI * 2;
    const n1 = Math.sin(angle * 3 + t * 1.4 + seed) * 0.45;
    const n2 = Math.sin(angle * 5 - t * 0.9 + seed * 2.3) * 0.3;
    const n3 = Math.cos(angle * 2 + t * 1.8 + seed * 0.7) * 0.25;
    const rr = (r + (n1 + n2 + n3) * TRAIL_NOISE_AMP * (r / TRAIL_HEAD_R)) * k;
    pts.push([cx * k + Math.cos(angle) * rr, cy * k + Math.sin(angle) * rr]);
  }
  const last = pts[pts.length - 1];
  ctx.beginPath();
  ctx.moveTo((last[0] + pts[0][0]) / 2, (last[1] + pts[0][1]) / 2);
  pts.forEach((p, j) => {
    const q = pts[(j + 1) % pts.length];
    ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
  });
  ctx.closePath();
  ctx.fillStyle = '#fff';
  ctx.fill();
}

function useMorphTrail(hostRef: React.RefObject<HTMLElement | null>, subjectRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const host = hostRef.current;
    const subject = subjectRef.current;
    if (!host || !subject) return;
    const bg = subject.querySelector<HTMLElement>('.bloom-layer--bg')!;
    const top = subject.querySelector<HTMLElement>('.bloom-layer--top')!;
    const layers = [
      { el: bg, invert: false, canvas: document.createElement('canvas') },
      { el: top, invert: true, canvas: document.createElement('canvas') },
    ];

    let cssW = 0, cssH = 0, k = 1;
    const size = () => {
      cssW = subject.offsetWidth;
      cssH = subject.offsetHeight;
      k = Math.min(1, MASK_MAX_SIDE / Math.max(cssW, cssH, 1));
      for (const l of layers) { l.canvas.width = Math.round(cssW * k); l.canvas.height = Math.round(cssH * k); }
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(subject);

    let hovering = false;
    let pointer: { x: number; y: number } | null = null;
    let headRadius = 0;
    const headSeed = Math.random() * 100;
    let points: TrailPoint[] = [];
    let lastSample: { x: number; y: number } | null = null;
    let time = 0;
    let masked = false;
    let raf = 0;

    const setMask = (el: HTMLElement, url: string) => {
      el.style.webkitMaskImage = url; el.style.maskImage = url;
      el.style.webkitMaskSize = '100% 100%'; el.style.maskSize = '100% 100%';
      el.style.webkitMaskRepeat = 'no-repeat'; el.style.maskRepeat = 'no-repeat';
    };
    const clearMask = (el: HTMLElement) => {
      el.style.webkitMaskImage = el.style.maskImage = '';
      el.style.webkitMaskSize = el.style.maskSize = '';
      el.style.webkitMaskRepeat = el.style.maskRepeat = '';
    };

    const frame = () => {
      raf = 0;
      headRadius += ((hovering ? TRAIL_HEAD_R : 0) - headRadius) * (hovering ? 0.14 : 0.04);

      let pos: { x: number; y: number } | null = null;
      if (pointer && cssW && cssH) {
        const rect = subject.getBoundingClientRect();
        if (rect.width && rect.height) pos = { x: (pointer.x - rect.left) * (cssW / rect.width), y: (pointer.y - rect.top) * (cssH / rect.height) };
      }
      if (hovering && headRadius > 5 && pos && (!lastSample || Math.hypot(pos.x - lastSample.x, pos.y - lastSample.y) > TRAIL_SAMPLE_DIST)) {
        points.push({ x: pos.x, y: pos.y, r: headRadius, alpha: 1, seed: Math.random() * 100 });
        if (points.length > TRAIL_MAX_POINTS) points.shift();
        lastSample = pos;
      }
      for (const p of points) { p.alpha *= TRAIL_FADE_SPEED; p.r *= 0.995; }
      points = points.filter(p => p.alpha >= 0.01);
      time += 0.016;

      const active = points.length > 0 || headRadius > 0.5;
      if (active && pos) {
        for (const l of layers) {
          const c = l.canvas.getContext('2d')!;
          c.globalCompositeOperation = 'source-over';
          c.globalAlpha = 1;
          c.clearRect(0, 0, l.canvas.width, l.canvas.height);
          if (!l.invert) { c.fillStyle = '#fff'; c.fillRect(0, 0, l.canvas.width, l.canvas.height); c.globalCompositeOperation = 'destination-out'; }
          for (const p of points) { c.globalAlpha = p.alpha; drawMorphBlob(c, p.x, p.y, p.r, time, p.seed, k); }
          c.globalAlpha = 1;
          drawMorphBlob(c, pos.x, pos.y, headRadius, time, headSeed, k);
          setMask(l.el, `url(${l.canvas.toDataURL()})`);
        }
        masked = true;
        raf = requestAnimationFrame(frame);
      } else {
        if (masked) { layers.forEach(l => clearMask(l.el)); masked = false; }
        if (hovering) raf = requestAnimationFrame(frame);
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const onMove = (e: PointerEvent) => { pointer = { x: e.clientX, y: e.clientY }; hovering = true; kick(); };
    const onLeave = () => { hovering = false; lastSample = null; kick(); };
    host.addEventListener('pointerenter', onMove);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerdown', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointercancel', onLeave);
    const onUp = (e: PointerEvent) => { if (e.pointerType !== 'mouse') onLeave(); };
    host.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener('pointerenter', onMove);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerdown', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointercancel', onLeave);
      host.removeEventListener('pointerup', onUp);
    };
  }, [hostRef, subjectRef]);
}

const reveal = [0.16, 1, 0.3, 1] as const;

export function BloomHero() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  useMorphTrail(frameRef, subjectRef);
  const rise = (delay: number) => reduce ? { initial: false as const } : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.72, delay, ease: [0.25, 0.8, 0.28, 1] as const } };

  return (
    <section id="home" className="hero-section p-4 md:p-6" aria-label="Peach creative and growth studio">
      <div ref={frameRef} className="hero-frame bloom-frame rounded-2xl md:rounded-[2rem]">
        <div className="noise-overlay hero-noise" aria-hidden="true" />
        <motion.a href="#home" className="hero-logo" aria-label="Peach home" {...rise(0.1)}><img src="/assets/peach-icon-white.svg" alt="" width="36" height="42" /></motion.a>
        <motion.nav className="nav-pill" aria-label="Main navigation" {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.55, delay: 0.18 } })}>
          <a href="#about">Our story</a><a href="#work">Work</a><a href="#services">What we do</a><a href="#process">The process</a><a href="#contact">Let’s talk <ArrowUpRight size={12} /></a>
        </motion.nav>

        <h1 className="bloom-word" aria-label="Peach">
          <span className="bloom-word__mask">
            <motion.span className="bloom-word__inner" initial={reduce ? false : { y: '118%' }} animate={{ y: '0%' }} transition={{ duration: 1.15, delay: 0.3, ease: reveal }}>
              <PeachWordmark className="bloom-word__svg" />
            </motion.span>
          </span>
        </h1>

        <motion.div ref={subjectRef} className="bloom-subject" initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, delay: 0.66, ease: reveal }}>
          <img className="bloom-sizer" src="/assets/art/bloom-violet-1335.png" alt="" aria-hidden="true" />
          <div className="bloom-layer bloom-layer--bg"><img src="/assets/art/bloom-violet-1335.png" alt="Pixel-art bloom that turns peach where you move your cursor" /></div>
          <div className="bloom-layer bloom-layer--top" aria-hidden="true"><img src="/assets/art/bloom-peach-1400.png" alt="" /></div>
        </motion.div>

        <div className="hero-shade bloom-shade" aria-hidden="true" />

        <div className="bloom-copy">
          <motion.p className="bloom-copy__left" {...rise(0.98)}>Brand, websites, content<br /> and the systems behind them.</motion.p>
          <motion.div className="hero-description bloom-copy__right" {...rise(0.98)}>
            <p>Thoughtful brands. Websites with presence. Systems that make the everyday easier. We bring the pieces together, so your business can move forward.</p>
            <a className="pill-link group" href="#contact"><span>Make it peachy</span><span className="pill-arrow"><ArrowRight size={20} strokeWidth={1.6} /></span></a>
          </motion.div>
        </div>
        <motion.a href="#about" className="scroll-cue" {...rise(1.1)}><ArrowDown size={12} /> Scroll to discover</motion.a>
      </div>
    </section>
  );
}

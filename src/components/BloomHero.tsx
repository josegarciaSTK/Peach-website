import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Interaction';
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
const BADGE = 'MOVE TO RIPEN ✳ MAKE IT PEACHY ✳ ';

export function BloomHero() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  useMorphTrail(frameRef, subjectRef);
  const rise = (delay: number) => reduce ? { initial: false as const } : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: reveal } };

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div ref={frameRef} className="hero__frame" data-cursor="Ripen">
        <div className="grain" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />

        <h1 id="hero-title" className="hero__word">
          <span className="sr-only">Peach: brands, websites and the systems that bring in business</span>
          <span className="hero__word-mask" aria-hidden="true">
            <motion.span className="hero__word-inner" initial={reduce ? false : { y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.2, delay: 0.25, ease: reveal }}>
              <PeachWordmark className="hero__word-svg" />
            </motion.span>
          </span>
        </h1>

        <motion.div ref={subjectRef} className="bloom-subject" initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.3, delay: 0.6, ease: reveal }}>
          <img className="bloom-sizer" src="/assets/art/bloom-violet-1335.png" alt="" aria-hidden="true" />
          <div className="bloom-layer bloom-layer--bg"><img src="/assets/art/bloom-violet-1335.png" alt="Pixel-art blossom that turns peach where you move your cursor" /></div>
          <div className="bloom-layer bloom-layer--top" aria-hidden="true"><img src="/assets/art/bloom-peach-1400.png" alt="" /></div>
        </motion.div>

        <motion.div className="hero__badge" aria-hidden="true" {...rise(1.2)}>
          <svg viewBox="0 0 200 200" className={reduce ? '' : 'is-spinning'}>
            <defs><path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <text><textPath href="#badge-circle" textLength="488" lengthAdjust="spacing">{BADGE}</textPath></text>
          </svg>
          <img src="/assets/peach-icon-coral.svg" alt="" width="44" height="53" />
        </motion.div>

        <div className="hero__foot">
          <motion.ul className="hero__tags mono" {...rise(1)}>
            <li>Brand</li><li>Websites</li><li>Content</li><li>Systems</li>
          </motion.ul>
          <motion.div className="hero__pitch" {...rise(1.05)}>
            <p>We make good businesses <em className="serif">look as good as they are</em>, then make the next enquiry easier to win.</p>
            <div className="hero__ctas">
              <Magnetic><a className="btn btn--peach" href="#contact" data-cursor="Hello"><span>Book a free call</span><ArrowUpRight size={18} strokeWidth={1.8} /></a></Magnetic>
              <a className="btn btn--ghost" href="#offers">See the offers</a>
            </div>
          </motion.div>
        </div>
        <motion.a href="#about" className="hero__scroll mono" aria-label="Scroll to the next section" {...rise(1.3)}><ArrowDown size={13} /> Scroll</motion.a>
      </div>
    </section>
  );
}

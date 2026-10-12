import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// DRAFT: placeholder projects. Client names and results appear only with written permission
// (see README "Before launch"). Swap each entry for a real case study when it is cleared.
export const projects = [
  { id: 'cafe', title: 'A neighbourhood café', scope: 'QR loyalty, menu and Instagram', year: '2026', image: '/assets/cinematic/feature-poster.jpg', status: 'Case study in progress' },
  { id: 'tours', title: 'A local tour operator', scope: 'Booking enquiries and website', year: '2026', image: '/assets/cinematic/hero-poster.jpg', status: 'Case study in progress' },
  { id: 'renovation', title: 'A renovation company', scope: 'Brand refresh and quote flow', year: '2025', image: '/assets/art/bloom-violet-1335.png', status: 'Case study in progress' },
  { id: 'peach', title: 'Peach', scope: 'Our own brand, site and systems', year: '2026', image: '/assets/art/bloom-peach-1400.png', status: 'You are looking at it' },
];

export function WorkIndex() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  // Lean into the direction of travel, settle back to level when the cursor stops.
  const lean = useTransform(useVelocity(x), [-1600, 0, 1600], [-7, 0, 7], { clamp: true });
  const tilt = useSpring(useTransform(lean, v => (reduce ? 0 : v)), { stiffness: 180, damping: 22 });

  const follow = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    x.set(nx);
    y.set(e.clientY - rect.top);
  };
  const focusRow = (id: string, el: HTMLElement) => {
    if (!listRef.current) return;
    const list = listRef.current.getBoundingClientRect();
    const row = el.getBoundingClientRect();
    x.jump(list.width * 0.68);
    y.jump(row.top - list.top + row.height / 2);
    setActive(id);
  };
  const current = projects.find(p => p.id === active);

  return (
    <section id="work" className="work-section" aria-labelledby="work-heading">
      <div className="section-caption"><span>02 / Selected work</span><span>Small projects, real results.</span></div>
      <h2 id="work-heading" className="work-heading">Work that <i>works.</i></h2>
      <div ref={listRef} className="work-stage" onPointerMove={follow} onPointerLeave={() => setActive(null)}>
      <ol className="work-list" data-active={active ? '' : undefined}>
        {projects.map((p, i) => (
          <li key={p.id} className={`work-row${active === p.id ? ' is-active' : ''}`}>
            <a href="#contact" onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(p.id)} onFocus={(e) => focusRow(p.id, e.currentTarget)} onBlur={() => setActive(null)}>
              <span className="work-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="work-title">{p.title}</span>
              <span className="work-scope">{p.scope}</span>
              <span className="work-year">{p.year}</span>
              <span className="work-status">{p.status}<ArrowUpRight size={15} strokeWidth={1.5} /></span>
              <img className="work-thumb" src={p.image} alt="" loading="lazy" />
            </a>
          </li>
        ))}
      </ol>
        <AnimatePresence>
          {current ? (
            <motion.div key="preview" className="work-preview" aria-hidden="true" style={{ x: sx, y: sy, rotate: tilt }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img key={current.id} src={current.image} alt="" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }} />
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

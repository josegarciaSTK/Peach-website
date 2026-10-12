import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PeachWordmark } from './PeachWordmark';

// DRAFT: anonymous placeholder projects. Client names, results and photography appear only with the
// client's written permission (see README "Before launch"). Each poster keeps its frame for real imagery.
const projects = [
  { id: 'cafe', title: 'A neighbourhood café', scope: 'QR loyalty, menu and Instagram', year: '2026', tone: 'peach', mark: 'Café', status: 'Case study soon' },
  { id: 'tours', title: 'A local tour operator', scope: 'Booking enquiries and website', year: '2026', tone: 'ink', mark: 'Tours', status: 'Case study soon' },
  { id: 'renovation', title: 'A renovation company', scope: 'Brand refresh and quote flow', year: '2025', tone: 'cream', mark: 'Build', status: 'Case study soon' },
  { id: 'peach', title: 'Peach', scope: 'Our own brand, site and systems', year: '2026', tone: 'blush', mark: null, status: 'You’re looking at it' },
] as const;

function Poster({ p, i }: { p: typeof projects[number]; i: number }) {
  return (
    <article className={`poster poster--${p.tone}`} data-cursor={p.id === 'peach' ? 'You’re here' : 'Soon'}>
      <div className="poster__art" aria-hidden="true">
        {p.mark ? <span className="poster__mark serif">{p.mark}</span> : <PeachWordmark className="poster__wordmark" mono />}
        <span className="poster__plu mono">PLU {4038 + i * 3}</span>
      </div>
      <div className="poster__meta">
        <span className="mono">{String(i + 1).padStart(2, '0')} / {p.year}</span>
        <h3>{p.title}</h3>
        <p>{p.scope}</p>
        <span className="poster__status mono">{p.status}<ArrowUpRight size={14} /></span>
      </div>
    </article>
  );
}

export function WorkGallery() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  // Slide the rail exactly far enough for its last card to land at the right edge.
  const railRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => setDistance(Math.max(0, rail.scrollWidth - rail.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    return () => ro.disconnect();
  }, []);
  const x = useTransform(smooth, [0.05, 0.95], [0, -distance]);

  return (
    <section ref={ref} id="work" className={`work${reduce ? ' work--static' : ''}`} aria-labelledby="work-heading">
      <div className="work__pin">
        <div className="section-index mono"><span>(03) Selected work</span><span>Small projects, real results</span></div>
        <h2 id="work-heading" className="work__heading">Work that <span className="serif">works.</span></h2>
        <motion.div ref={railRef} className="work__rail" style={reduce ? undefined : { x }}>
          {projects.map((p, i) => <Poster key={p.id} p={p} i={i} />)}
          <a className="poster poster--cta" href="#contact" data-cursor="Hello">
            <span className="serif">Your business</span>
            <span className="mono">could be next <ArrowUpRight size={14} /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Work, after the "3D creator" portfolio pattern: two rows of tiles that slide in opposite
// directions as the page scrolls, then project cards that stick and stack as you pass them.
// DRAFT: client projects are anonymous placeholders. Real names, results and imagery only
// with the client's written permission (see README "Before launch").

type Tile = { kind: 'img'; src: string; alt: string; pos?: string; contain?: boolean } | { kind: 'type'; tone: string; text: string; note: string };
const tiles: Tile[] = [
  { kind: 'img', src: '/assets/art/peach-astronaut.webp', alt: '', pos: '50% 35%' },
  { kind: 'type', tone: 'peach', text: 'Café', note: 'QR loyalty & menu' },
  { kind: 'img', src: '/assets/art/peach-planet.webp', alt: '', pos: '50% 40%' },
  { kind: 'type', tone: 'ink', text: 'Tours', note: 'Booking enquiries' },
  { kind: 'img', src: '/assets/art/branch-peach.webp', alt: '', contain: true },
  { kind: 'type', tone: 'cream', text: 'Build', note: 'Quote flow' },
  { kind: 'type', tone: 'red', text: 'Make it peachy', note: 'Peach' },
  { kind: 'img', src: '/assets/cinematic/feature-poster.jpg', alt: '', pos: '50% 30%' },
  { kind: 'type', tone: 'blush', text: 'Brand', note: 'Identity & content' },
  { kind: 'img', src: '/assets/art/branch-lavender.webp', alt: '', contain: true },
  { kind: 'type', tone: 'leaf', text: '4038', note: 'PLU · Peach Fix' },
  { kind: 'img', src: '/assets/cinematic/hero-poster.jpg', alt: '', pos: '50% 50%' },
];

function TileView({ t }: { t: Tile }) {
  if (t.kind === 'img') return <div className={`mq-tile${t.contain ? ' mq-tile--art' : ''}`}><img src={t.src} alt={t.alt} loading="lazy" style={{ objectPosition: t.pos, objectFit: t.contain ? 'contain' : 'cover' }} /></div>;
  return <div className={`mq-tile mq-tile--type mq-tone-${t.tone}`}><span className="serif">{t.text}</span><small className="mono">{t.note}</small></div>;
}

function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const right = useTransform(scrollYProgress, [0, 1], reduce ? [-900, -900] : [-1300, -500]);
  const left = useTransform(scrollYProgress, [0, 1], reduce ? [-400, -400] : [0, -800]);
  const row1 = tiles.slice(0, 6), row2 = tiles.slice(6);
  return (
    <div ref={ref} className="mq" aria-hidden="true">
      <motion.div className="mq-row" style={{ x: right }}>{[...row1, ...row1, ...row1].map((t, i) => <TileView key={i} t={t} />)}</motion.div>
      <motion.div className="mq-row" style={{ x: left }}>{[...row2, ...row2, ...row2].map((t, i) => <TileView key={i} t={t} />)}</motion.div>
    </div>
  );
}

type Panel = { img?: string; pos?: string; contain?: boolean; tone?: string; big?: string; small?: string };
type Project = { n: string; category: string; name: string; scope: string; status: string; href?: string; panels: [Panel, Panel, Panel] };
const projects: Project[] = [
  { n: '01', category: 'Hospitality · Client', name: 'A neighbourhood café', scope: 'QR loyalty, menu and Instagram', status: 'Case study soon',
    panels: [{ tone: 'peach', big: 'Café' }, { tone: 'cream', small: 'Scan · Stamp · Come back' }, { tone: 'ink', big: 'Menu', small: 'Loyalty card & digital menu' }] },
  { n: '02', category: 'Travel · Client', name: 'A local tour operator', scope: 'Booking enquiries and website', status: 'Case study soon',
    panels: [{ tone: 'ink', big: 'Tours' }, { tone: 'blush', small: 'Every enquiry, complete' }, { tone: 'leaf', big: 'Book', small: 'Enquiry path & website' }] },
  { n: '03', category: 'Trades · Client', name: 'A renovation company', scope: 'Brand refresh and quote flow', status: 'Case study soon',
    panels: [{ tone: 'cream', big: 'Build' }, { tone: 'red', small: 'Quote in, quote out' }, { tone: 'peach', big: 'Quote', small: 'Brand refresh & quote flow' }] },
  { n: '04', category: 'Our own · Peach', name: 'Peach', scope: 'Our brand, this site and its systems', status: 'You’re looking at it', href: '#home',
    panels: [{ img: '/assets/art/branch-peach.webp', contain: true }, { img: '/assets/art/peach-planet.webp', pos: '50% 35%' }, { img: '/assets/art/peach-astronaut.webp', pos: '45% 40%' }] },
];

function PanelBody({ p }: { p: Panel }) {
  if (p.img) return <img src={p.img} alt="" loading="lazy" style={{ objectPosition: p.pos, objectFit: p.contain ? 'contain' : 'cover' }} />;
  return <>{p.big ? <span className="serif">{p.big}</span> : null}{p.small ? <small className="mono">{p.small}</small> : null}</>;
}

// Image shutter: the panel opens upward from its bottom edge while its content settles from 1.12 to 1.
function PanelView({ p, cls, enter, from }: { p: Panel; cls: string; enter: MotionValue<number>; from: number }) {
  const reduce = useReducedMotion();
  const range = [from, from + 0.45];
  const clipPath = useTransform(enter, range, reduce ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  const scale = useTransform(enter, range, reduce ? [1, 1] : [1.12, 1]);
  const tone = p.img ? (p.contain ? ' pc-panel--art' : '') : ` mq-tone-${p.tone}`;
  return (
    <motion.div className={`pc-panel ${cls}${tone}`} style={{ clipPath }}>
      <motion.div className="pc-panel__inner" style={{ scale }}><PanelBody p={p} /></motion.div>
    </motion.div>
  );
}

function ProjectCard({ p, i, total, progress }: { p: Project; i: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const slotRef = useRef<HTMLDivElement>(null);
  // 0 when the card's slot enters at the bottom of the screen, 1 when it reaches the top.
  const { scrollYProgress: enter } = useScroll({ target: slotRef, offset: ['start end', 'start 0.15'] });
  const target = 1 - (total - 1 - i) * 0.03;
  const scale = useTransform(progress, [i / total, 1], [1, reduce ? 1 : target]);
  const isLast = i === total - 1;
  const dim = useTransform(progress, [(i + 0.55) / total, (i + 1) / total], [0, isLast ? 0 : 0.6]);
  const numY = useTransform(enter, [0.25, 0.7], reduce ? ['0%', '0%'] : ['105%', '0%']);
  const titleY = useTransform(enter, [0.35, 0.8], reduce ? [0, 0] : [24, 0]);
  const titleOpacity = useTransform(enter, [0.35, 0.8], reduce ? [1, 1] : [0, 1]);
  return (
    <div ref={slotRef} className="pc-slot">
      <motion.article className="pc" style={{ scale, top: `calc(var(--pc-top) + ${i * 28}px)` }}>
        <header className="pc-head">
          <span className="pc-num-mask"><motion.span className="pc-num" style={{ y: numY }}>{p.n}</motion.span></span>
          <motion.div className="pc-title" style={{ y: titleY, opacity: titleOpacity }}>
            <span className="mono">{p.category}</span>
            <h3>{p.name}</h3>
            <p>{p.scope}</p>
          </motion.div>
          {p.href
            ? <a className="pc-btn" href={p.href} data-cursor="Top">{p.status} <ArrowUpRight size={16} /></a>
            : <span className="pc-btn pc-btn--soon">{p.status}</span>}
        </header>
        <div className="pc-grid">
          <div className="pc-col">
            <PanelView p={p.panels[0]} cls="pc-panel--a" enter={enter} from={0.3} />
            <PanelView p={p.panels[1]} cls="pc-panel--b" enter={enter} from={0.42} />
          </div>
          <PanelView p={p.panels[2]} cls="pc-panel--c" enter={enter} from={0.36} />
        </div>
        <motion.div className="pc-dim" style={{ opacity: dim }} aria-hidden="true" />
      </motion.article>
    </div>
  );
}

export function WorkShowcase() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  return (
    <section id="work" className="showcase" aria-labelledby="work-heading">
      <div className="showcase__head">
        <div className="section-index"><span>Selected work</span></div>
        <motion.h2 id="work-heading" className="grad-heading" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
          Work that <span className="serif-italic">works.</span>
        </motion.h2>
      </div>
      <Marquee />
      <div ref={stackRef} className="pc-stack">
        {projects.map((p, i) => <ProjectCard key={p.n} p={p} i={i} total={projects.length} progress={scrollYProgress} />)}
      </div>
      <div className="showcase__cta">
        <a className="btn btn--peach" href="#contact" data-cursor="Hello">Your business could be next <ArrowUpRight size={18} /></a>
      </div>
    </section>
  );
}

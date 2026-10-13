import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Interaction';

const links = [['About', '#about'], ['Process', '#process'], ['Work', '#work'], ['Offers', '#offers']] as const;

export function SiteHeader() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  // Flip to the light treatment whenever a light section sits under the header.
  const sync = (v: number) => {
    setSolid(v > 40);
    const under = document.elementsFromPoint(window.innerWidth / 2, 34).find(el => !el.closest('.site-header'));
    setLight(Boolean(under?.closest('.section-light, .contact')));
  };
  useMotionValueEvent(scrollY, 'change', sync);
  useEffect(() => { sync(window.scrollY); }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <motion.header className="site-header" data-solid={solid || open || undefined} data-light={(light && !open) || undefined} initial={reduce ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
      <a href="#home" className="site-header__brand" aria-label="Peach, back to top">
        <img src="/assets/peach-icon-coral.svg" alt="" width="22" height="27" />
        <span>Peach</span>
      </a>
      <nav className="site-header__nav mono" aria-label="Main">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <Magnetic><a className="btn btn--peach btn--sm" href="#contact" data-cursor="Hello">Book a call <ArrowUpRight size={15} strokeWidth={1.8} /></a></Magnetic>
      <button className="site-header__burger mono" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)}>{open ? 'Close' : 'Menu'}</button>
      <AnimatePresence>
        {open ? (
          <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Main" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            {[...links, ['Contact', '#contact'] as const].map(([label, href], i) => (
              <a key={href} href={href} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{label}</a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

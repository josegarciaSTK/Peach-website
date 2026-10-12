import { MotionConfig } from 'framer-motion';
import { SiteHeader } from './components/SiteHeader';
import { BloomHero } from './components/BloomHero';
import { Manifesto } from './components/Manifesto';
import { RipenProcess } from './components/RipenProcess';
import { WorkGallery } from './components/WorkGallery';
import { Offers } from './components/Offers';
import { Finale } from './components/Finale';
import { PeachCursor, useSmoothScroll } from './components/Interaction';

// Homepage story, "from blossom to ripe": the hero blossom, the peach ripening through the
// process, the work, the offers as fruit stickers, then the coral call to action.
export default function App() {
  useSmoothScroll();
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#about">Skip to content</a>
    <SiteHeader />
    <main>
      <BloomHero />
      <Manifesto />
      <RipenProcess />
      <WorkGallery />
      <Offers />
    </main>
    <Finale />
    <PeachCursor />
  </MotionConfig>;
}

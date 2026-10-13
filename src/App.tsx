import { MotionConfig } from 'framer-motion';
import { SiteHeader } from './components/SiteHeader';
import { SpotlightHero } from './components/SpotlightHero';
import { Manifesto } from './components/Manifesto';
import { RipenProcess } from './components/RipenProcess';
import { WorkGallery } from './components/WorkGallery';
import { Offers } from './components/Offers';
import { Finale } from './components/Finale';
import { PeachCursor, useSmoothScroll } from './components/Interaction';

// Homepage story, "from blossom to ripe": the blossoming branch that turns peach under the cursor, the peach ripening through the
// process, the work, the offers as fruit stickers, then the coral call to action.
export default function App() {
  useSmoothScroll();
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#about">Skip to content</a>
    <SiteHeader />
    <main>
      <SpotlightHero />
      <Manifesto />
      <RipenProcess />
      <WorkGallery />
      <Offers />
    </main>
    <Finale />
    <PeachCursor />
  </MotionConfig>;
}

import { MotionConfig } from 'framer-motion';
import { SiteHeader } from './components/SiteHeader';
import { SpotlightHero } from './components/SpotlightHero';
import { Manifesto } from './components/Manifesto';
import { RipenProcess } from './components/RipenProcess';
import { WorkShowcase } from './components/WorkShowcase';
import { WhatWeBring } from './components/WhatWeBring';
import { Contact, SiteFooter } from './components/Finale';
import { PeachCursor, useSmoothScroll } from './components/Interaction';

// Homepage story, "from blossom to ripe": the blossoming branch that turns peach under the cursor, the peach ripening through the
// process, the work, what we bring, then the call to action.
export default function App() {
  useSmoothScroll();
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#about">Skip to content</a>
    <SiteHeader />
    <div className="page">
      <main>
        <SpotlightHero />
        <Manifesto />
        <RipenProcess />
        <WorkShowcase />
        <WhatWeBring />
      </main>
      <Contact />
    </div>
    <SiteFooter />
    <PeachCursor />
  </MotionConfig>;
}

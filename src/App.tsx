import { MotionConfig } from 'framer-motion';
import { SiteHeader } from './components/SiteHeader';
import { SpotlightHero } from './components/SpotlightHero';
import { Manifesto } from './components/Manifesto';
import { RipenProcess } from './components/RipenProcess';
import { WorkShowcase } from './components/WorkShowcase';
import { WhatWeBring } from './components/WhatWeBring';
import { WhatWeFix } from './components/WhatWeFix';
import { Pricing } from './components/Pricing';
import { Contact, SiteFooter } from './components/Finale';
import { PeachCursor, useSmoothScroll } from './components/Interaction';

// Homepage story, "from blossom to ripe": the blossoming branch that turns peach under the cursor, the peach ripening through the
// problems we fix, the process, the work, what we bring, how pricing works, then the call to action.
export default function App() {
  useSmoothScroll();
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#about">Skip to content</a>
    <SiteHeader />
    <div className="page">
      <main>
        <SpotlightHero />
        <Manifesto />
        <WhatWeFix />
        <RipenProcess />
        <WorkShowcase />
        <WhatWeBring />
        <Pricing />
      </main>
      <Contact />
    </div>
    <SiteFooter />
    <PeachCursor />
  </MotionConfig>;
}

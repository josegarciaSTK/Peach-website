import { useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Interaction';
import { PeachWordmark } from './PeachWordmark';

const line = 'Make it peachy ✳ A little less friction ✳ A lot more possibility ✳ ';

function Marquee() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const shift = useTransform(scrollYProgress, [0, 1], ['4%', reduce ? '4%' : '-18%']);
  return (
    <div ref={ref} className="band" aria-hidden="true">
      <motion.div className="band__line" style={{ x: shift }}>
        <div className={`band__track${reduce ? '' : ' is-moving'}`}><span>{line}</span><span>{line}</span></div>
      </motion.div>
    </div>
  );
}

export function Finale() {
  const [draft, setDraft] = useState<string | null>(null);
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (k: string) => String(form.get(k) || '').trim();
    const body = `Hi Peach,\n\n${get('message')}\n\nName: ${get('name')}\nBusiness: ${get('business')}\nReply to: ${get('email')}`;
    setDraft(`mailto:reach@peachhq.co?subject=${encodeURIComponent(`A little more peachy: ${get('business') || get('name')}`)}&body=${encodeURIComponent(body)}`);
  }

  return (
    <>
      <Marquee />
      <section id="contact" className="contact" aria-labelledby="contact-heading">
        <div className="contact__copy">
          <span className="mono">(05) Contact</span>
          <h2 id="contact-heading">Let’s make it <span className="serif">peachy.</span></h2>
          <p>Tell us what could feel easier. You’ll hear back from a real person, with a clear next step.</p>
          <a className="contact__email" href="mailto:reach@peachhq.co" data-cursor="Write">reach@peachhq.co <ArrowUpRight size={22} /></a>
        </div>
        <form className="contact__form" onSubmit={prepareEmail} onChange={() => setDraft(null)}>
          <div className="field-row">
            <label>Your name<input autoComplete="name" name="name" placeholder="Alex" required maxLength={100} /></label>
            <label>Your email<input type="email" autoComplete="email" name="email" placeholder="alex@business.com" required maxLength={254} /></label>
          </div>
          <label>Business<input name="business" autoComplete="organization" placeholder="What’s your business called?" required maxLength={150} /></label>
          <label>What could feel easier?<textarea name="message" placeholder="A website, your brand, the enquiries you’re missing…" required rows={3} maxLength={2000} /></label>
          <div className="contact__submit">
            <p className="mono">Opens a ready-to-send email in your mail app.</p>
            <Magnetic><button className="btn btn--ink" type="submit" data-cursor="Send">Prepare enquiry <ArrowUpRight size={18} /></button></Magnetic>
          </div>
          {draft ? <div className="contact__draft" role="status"><span>Your enquiry is ready.</span><a href={draft}>Open email draft <ArrowUpRight size={16} /></a></div> : null}
        </form>
      </section>
      <footer className="footer">
        <div className="footer__row mono">
          <span>Make it peachy.</span>
          <a href="/legal.html">Privacy & terms</a>
          <span>© {new Date().getFullYear()} Peach</span>
          <a href="#home">Back to top ↑</a>
        </div>
        <PeachWordmark className="footer__wordmark" />
      </footer>
    </>
  );
}

import { useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Interaction';
import { PeachLogo } from './PeachLogo';
import { MaskedLines } from './MaskedLines';

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

const topics = ['Enquiries', 'Brand & content', 'Website', 'Not sure yet'];

// The closing ask: one plain question, a topic in one tap, and a short form that drafts an email.
export function Contact() {
  const [draft, setDraft] = useState<string | null>(null);
  const [topic, setTopic] = useState(topics[0]);
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (k: string) => String(form.get(k) || '').trim();
    const body = `Hi Peach,\n\nI'd like help with: ${topic}\n\n${get('message')}\n\nName: ${get('name')}\nBusiness: ${get('business')}\nReply to: ${get('email')}`;
    setDraft(`mailto:reach@peachhq.co?subject=${encodeURIComponent(`${topic}: ${get('business') || get('name')}`)}&body=${encodeURIComponent(body)}`);
  }

  return (
    <>
      <Marquee />
      <section id="contact" className="contact" aria-labelledby="contact-heading">
        <div className="contact__copy">
          <span className="section-index"><span>Contact</span></span>
          <MaskedLines id="contact-heading" lines={['What should', 'work better?']} />
          <p>Tell us in a few lines. You’ll hear back from a real person, with a clear next step and no sales pitch.</p>
          <dl className="contact__facts">
            <div><dt>Email</dt><dd><a href="mailto:reach@peachhq.co" data-cursor="Write">reach@peachhq.co</a></dd></div>
            <div><dt>Working with</dt><dd>Businesses in the US and UK</dd></div>
          </dl>
        </div>
        <form className="contact__form" onSubmit={prepareEmail} onChange={() => setDraft(null)}>
          <fieldset className="contact__topics">
            <legend>I’d like help with</legend>
            <div>
              {topics.map(t => (
                <label key={t} className="chip" data-on={t === topic || undefined}>
                  <input type="radio" name="topic" value={t} checked={t === topic} onChange={() => { setTopic(t); setDraft(null); }} />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="field-row">
            <label>Your name<input autoComplete="name" name="name" placeholder="Alex" required maxLength={100} /></label>
            <label>Your email<input type="email" autoComplete="email" name="email" placeholder="alex@business.com" required maxLength={254} /></label>
          </div>
          <label>Business<input name="business" autoComplete="organization" placeholder="What’s your business called?" required maxLength={150} /></label>
          <label>What’s getting in the way?<textarea name="message" placeholder="Enquiries arrive without a phone number, our site looks dated…" required rows={3} maxLength={2000} /></label>
          <div className="contact__submit">
            <p>Opens a ready-to-send email in your mail app.</p>
            <Magnetic><button className="btn btn--peach" type="submit" data-cursor="Send">Prepare enquiry <ArrowUpRight size={18} /></button></Magnetic>
          </div>
          {draft ? <div className="contact__draft" role="status"><span>Your enquiry is ready.</span><a href={draft}>Open email draft <ArrowUpRight size={16} /></a></div> : null}
        </form>
      </section>
    </>
  );
}

const footerLinks = [
  { title: 'Studio', links: [['About', '#about'], ['What we fix', '#fix'], ['Process', '#process'], ['Work', '#work'], ['Pricing', '#pricing'], ['Contact', '#contact']] },
  { title: 'Offers', links: [['Peach Fix', '/service.html?s=fix'], ['Brand & Content', '/service.html?s=brand'], ['Peach Partner', '/service.html?s=partner'], ['Peach Answer', '/service.html?s=answer']] },
] as const;

// Footer: intro, link columns, then the full logo, which settles from 94% to full size as it arrives.
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['12%', '0%']);
  return (
    <footer ref={ref} className="footer">
      <div className="footer__top">
        <div className="footer__intro">
          <p>A small studio for brands, websites and the systems behind them.</p>
          <a className="btn btn--peach" href="#contact" data-cursor="Hello">Book a free call <ArrowUpRight size={18} /></a>
        </div>
        {footerLinks.map(col => (
          <nav key={col.title} className="footer__col" aria-label={col.title}>
            <span>{col.title}</span>
            {col.links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
        ))}
        <div className="footer__col">
          <span>Say hello</span>
          <a href="mailto:reach@peachhq.co">reach@peachhq.co</a>
        </div>
      </div>
      <motion.div className="footer__logo" style={{ scale, y }}>
        <PeachLogo />
      </motion.div>
      <div className="footer__base">
        <span>© {new Date().getFullYear()} Peach. Make it peachy.</span>
        <a href="/legal.html">Privacy & terms</a>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

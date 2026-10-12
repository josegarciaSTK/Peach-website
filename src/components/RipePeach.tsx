import { useId } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

// Illustrated peach whose skin ripens from green to coral as `ripeness` goes 0 → 1.
// Stand-in until the real peach photography/video is shot; it keeps the same frame.
const skin = { base: ['#C9CF8A', '#F6B48C', '#FA7576'], deep: ['#7F9550', '#E98A63', '#C9384A'], blush: ['#A7B868', '#F38C7A', '#E2445A'] };

export function RipePeach({ ripeness, className = '' }: { ripeness: MotionValue<number>; className?: string }) {
  const id = useId().replace(/:/g, '');
  const stops = [0, 0.55, 1];
  const base = useTransform(ripeness, stops, skin.base);
  const deep = useTransform(ripeness, stops, skin.deep);
  const blush = useTransform(ripeness, stops, skin.blush);
  const blushOpacity = useTransform(ripeness, [0, 1], [0.15, 0.95]);
  const leafTilt = useTransform(ripeness, [0, 1], [-6, 10]);
  const swell = useTransform(ripeness, [0, 1], [0.86, 1]);

  return (
    <motion.svg className={className} viewBox="0 0 400 440" style={{ scale: swell }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`body-${id}`} cx="38%" cy="40%" r="70%">
          <motion.stop offset="0" stopColor="#FFF1E2" />
          <motion.stop offset="0.38" style={{ stopColor: base }} />
          <motion.stop offset="1" style={{ stopColor: deep }} />
        </radialGradient>
        <radialGradient id={`blush-${id}`} cx="70%" cy="62%" r="55%">
          <motion.stop offset="0" style={{ stopColor: blush }} stopOpacity="1" />
          <motion.stop offset="1" style={{ stopColor: blush }} stopOpacity="0" />
        </radialGradient>
        <filter id={`fuzz-${id}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id={`clip-${id}`}><path d={BODY} /></clipPath>
      </defs>
      <ellipse cx="200" cy="420" rx="128" ry="12" fill="#000" opacity=".25" />
      <path d={BODY} fill={`url(#body-${id})`} />
      <motion.path d={BODY} fill={`url(#blush-${id})`} style={{ opacity: blushOpacity }} />
      <g clipPath={`url(#clip-${id})`}>
        <rect width="400" height="440" filter={`url(#fuzz-${id})`} opacity=".22" />
        <path d="M208 92c-28 70-30 170 4 316" fill="none" stroke="#5a1a1f" strokeOpacity=".22" strokeWidth="9" strokeLinecap="round" />
        <ellipse cx="140" cy="170" rx="46" ry="30" fill="#fff" opacity=".28" transform="rotate(-30 140 170)" />
      </g>
      <path d="M206 98c-2-22 2-40 10-56" fill="none" stroke="#4a3123" strokeWidth="9" strokeLinecap="round" />
      <motion.g style={{ rotate: leafTilt, originX: '216px', originY: '60px' }}>
        <path d="M216 60c26-38 86-46 128-22-30 36-86 52-128 22z" fill="#5E7F3E" />
        <path d="M222 58c36-12 72-16 108-16" fill="none" stroke="#3E5A28" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}

const BODY = 'M206 96c-40-26-118-20-158 44-38 62-30 156 18 214 44 52 108 70 140 70s100-16 142-72c42-58 46-150 6-210-40-60-108-74-148-46z';

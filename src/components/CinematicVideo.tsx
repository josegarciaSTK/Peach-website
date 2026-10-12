import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export function CinematicVideo({ name, label, priority = false }: { name: 'hero' | 'feature'; label: string; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: '120px' });
  const reduce = useReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [requestedPlay, setRequestedPlay] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !userPaused && (!reduce || requestedPlay)) {
      void video.play().catch(() => setPlaying(false));
    } else video.pause();
  }, [inView, reduce, userPaused, requestedPlay]);
  return (
    <>
      <video ref={ref} className="cinematic-video" poster={`/assets/cinematic/${name}-poster.jpg`} muted loop playsInline preload={priority ? 'auto' : 'none'} aria-label={label} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
        {priority || inView ? <source src={`/assets/cinematic/${name}.mp4`} type="video/mp4" /> : null}
      </video>
      {!failed ? <button className="video-toggle" type="button" aria-label={`${playing ? 'Pause' : 'Play'} ${label}`} onClick={() => { setUserPaused(playing); setRequestedPlay(!playing); }}>
        {playing ? <Pause size={13} strokeWidth={1.6} /> : <Play size={13} strokeWidth={1.6} />}
        <span>{playing ? 'Pause film' : 'Play film'}</span>
      </button> : null}
    </>
  );
}

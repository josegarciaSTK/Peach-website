import { PeachWordmark } from './PeachWordmark';

// The Peach logo lockup: the peach icon beside the lowercase "peach" lettering.
export function PeachLogo({ className = '', title = 'Peach' }: { className?: string; title?: string }) {
  return (
    <span className={`peach-logo ${className}`} role="img" aria-label={title}>
      <img className="peach-logo__icon" src="/assets/peach-icon-coral.svg" alt="" />
      <PeachWordmark className="peach-logo__word" />
    </span>
  );
}

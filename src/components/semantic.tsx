/**
 * Semantic components — the five disjoint systems (DESIGN_TOKENS.md §4–§9,
 * COMPONENT_INVENTORY.md). Every distinction carries a NON-COLOR cue
 * (glyph, shape, dot, dash, text) per AC-A11Y-3 / AC-EPI-5.
 */
import { displayScore, type Tier } from '@/lib/adrs';
import type { EpistemicBlock } from '@/lib/schemas';

const EP_GLYPH = { fact: '■', inference: '▲', recommendation: '●' } as const;
const EP_LABEL = { fact: 'Fact', inference: 'Inference', recommendation: 'Recommendation' } as const;

/** ■▲● typed block — icon + text label + left border; never color-only. */
export function EpistemicBlockView({ block }: { block: EpistemicBlock }) {
  return (
    <div className={`ep-block ${block.kind}`} data-kind={block.kind}>
      <span className={`ep-tag ${block.kind}`}>
        {EP_GLYPH[block.kind]} {EP_LABEL[block.kind]}
      </span>
      {block.kind !== 'recommendation' && block.confidence ? (
        <ConfidenceChip level={block.confidence} />
      ) : null}
      <div>{block.text_md}</div>
      {block.citations?.map((c, i) => (
        <div key={i} className="mono" style={{ fontSize: 11.5, marginTop: 4, color: 'var(--ink-muted)' }}>
          <SourceTierBadge tier={c.tier} /> {c.publisher} — <i>{c.title}</i>, {c.pin_cite}
          {c.pub_date ? ` (${c.pub_date})` : ''} · accessed {c.accessed_date}
        </div>
      ))}
      {block.based_on?.length ? (
        <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 3 }}>based on: {block.based_on.join(', ')}</div>
      ) : null}
    </div>
  );
}

/** Neutral fill-density meter — deliberately hueless (DESIGN_TOKENS §9). */
export function ConfidenceChip({ level }: { level: 'high' | 'medium' | 'low' }) {
  const pct = { high: 100, medium: 55, low: 25 }[level];
  return (
    <span className="conf" title={`confidence: ${level}`}>
      <span className="track" aria-hidden>
        <span className="fill" style={{ width: `${pct}%`, display: 'block' }} />
      </span>
      {level}
    </span>
  );
}

export function LifecycleChip({ status, date }: { status: string; date?: string }) {
  return (
    <span className={`chip chip-lc-${status}`}>
      <span className="dot" aria-hidden /> {status.replaceAll('_', ' ')}
      {date ? <span className="mono" style={{ fontSize: 11 }}>({date})</span> : null}
    </span>
  );
}

export function BindingnessChip({ level }: { level: string }) {
  return <span className={`chip chip-bind-${level}`}>{level.replaceAll('_', ' ')}</span>;
}

export function InstrumentTypeChip({ type }: { type: string }) {
  return <span className="chip chip-type">{type.replaceAll('_', ' ')}</span>;
}

export function SourceTierBadge({ tier }: { tier: 1 | 2 | 3 }) {
  return <span className={`chip chip-tier${tier}`}>T{tier}</span>;
}

/** ADRS tier badge — display value rounded to 1 dp; tier derived from RAW upstream. */
export function TierBadge({ tier, raw }: { tier: Tier; raw?: number }) {
  return (
    <span className={`tierbadge tier-${tier}`} title="tier from full-precision score — not a compliance determination">
      {raw !== undefined ? <span className="score">{displayScore(raw).toFixed(1)}</span> : null}
      {tier}
    </span>
  );
}

/** Staleness marker — last_verified >180 days ago (PRD §16.5). */
export function StaleFlag({ lastVerified, asOf }: { lastVerified: string; asOf: Date }) {
  const days = Math.floor((asOf.getTime() - new Date(lastVerified).getTime()) / 86_400_000);
  if (days <= 180) return null;
  return <span className="stale-flag">⚠ verification stale ({days}d)</span>;
}

import { describe, expect, it } from 'vitest';
import {
  EXECUTIVE_MARKETS,
  POLICY_REFRESH_CHANGES,
  PORTFOLIO_MONITORING_LOG,
  PORTFOLIO_SIGNAL_AS_OF,
  PORTFOLIO_SIGNALS,
  PORTFOLIO_SOURCES,
} from '../../lib/portfolio/policySignals';
import { deriveEvidenceFreshness } from '../../lib/portfolio/freshness';
import { parseInstrumentSummary } from '../../lib/portfolio/instrumentSummary';
import { loadAndValidate } from '../../lib/validation/loadDataset';

describe('role-facing policy signal governance', () => {
  it('uses unique HTTPS Tier 1 source records with honest, bounded review dates', () => {
    const ids = PORTFOLIO_SOURCES.map((source) => source.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const source of PORTFOLIO_SOURCES) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.tier).toBe(1);
      expect(Date.parse(source.lastVerified)).toBeLessThanOrEqual(Date.parse(PORTFOLIO_SIGNAL_AS_OF));
      expect(Date.parse(source.nextReview)).toBeGreaterThanOrEqual(Date.parse(PORTFOLIO_SIGNAL_AS_OF));
      const days = (Date.parse(`${source.nextReview}T00:00:00Z`) - Date.parse(`${source.lastVerified}T00:00:00Z`)) / 86_400_000;
      expect(days).toBeGreaterThan(0);
      expect(days).toBeLessThanOrEqual(92);
    }
  });

  it('resolves every signal and executive-table source ID', () => {
    const sourceIds = new Set(PORTFOLIO_SOURCES.map((source) => source.id));
    for (const signal of PORTFOLIO_SIGNALS) {
      expect(Date.parse(signal.lastVerified)).toBeLessThanOrEqual(Date.parse(PORTFOLIO_SIGNAL_AS_OF));
      expect(Date.parse(signal.nextReview)).toBeGreaterThanOrEqual(Date.parse(PORTFOLIO_SIGNAL_AS_OF));
      expect(signal.sourceIds.length).toBeGreaterThan(0);
      for (const sourceId of signal.sourceIds) expect(sourceIds.has(sourceId), `${signal.id}:${sourceId}`).toBe(true);
    }
    for (const market of EXECUTIVE_MARKETS) {
      expect(market.sourceIds.length, `${market.market}:sourceIds`).toBeGreaterThan(0);
      for (const sourceId of market.sourceIds) expect(sourceIds.has(sourceId), `${market.market}:${sourceId}`).toBe(true);
    }
    expect(POLICY_REFRESH_CHANGES).toHaveLength(4);
    for (const change of POLICY_REFRESH_CHANGES) {
      expect(change.sourceIds.length, `${change.id}:sourceIds`).toBeGreaterThan(0);
      for (const sourceId of change.sourceIds) expect(sourceIds.has(sourceId), `${change.id}:${sourceId}`).toBe(true);
    }
  });

  it('keeps a dated, non-backfilled monitoring log that covers the current signals', () => {
    expect(PORTFOLIO_MONITORING_LOG).toHaveLength(4);
    const logged = new Set(PORTFOLIO_MONITORING_LOG.flatMap((entry) => entry.signalIds));
    expect(PORTFOLIO_SIGNALS.every((signal) => logged.has(signal.id))).toBe(true);
    expect(PORTFOLIO_MONITORING_LOG[0]!.note).toContain('no historical cadence is claimed');
    expect(PORTFOLIO_MONITORING_LOG.at(-1)!.date).toBe(PORTFOLIO_SIGNAL_AS_OF);
    expect(PORTFOLIO_MONITORING_LOG.at(-1)!.note).toContain('not real-time or comprehensive monitoring');
  });

  it('classifies the authored review window against an explicit reference date', () => {
    const dueSoon = deriveEvidenceFreshness(PORTFOLIO_SOURCES, PORTFOLIO_SIGNAL_AS_OF, '2026-08-13');
    expect(dueSoon).toMatchObject({
      status: 'due_soon',
      earliestNextReview: '2026-08-14',
      daysUntilEarliestReview: 1,
      dueSoonCount: 1,
      overdueCount: 0,
      oldestVerification: '2026-08-13',
      newestVerification: '2026-08-13',
    });

    const overdue = deriveEvidenceFreshness(PORTFOLIO_SOURCES, PORTFOLIO_SIGNAL_AS_OF, '2026-08-15');
    expect(overdue).toMatchObject({
      status: 'overdue',
      earliestNextReview: '2026-08-14',
      daysUntilEarliestReview: -1,
      overdueCount: 1,
    });
  });

  it('rejects calendar dates that Date.parse would otherwise normalize', () => {
    expect(() => deriveEvidenceFreshness(
      [{ lastVerified: '2026-02-28', nextReview: '2026-02-30' }],
      '2026-02-28',
      '2026-02-28',
    )).toThrow('Invalid ISO date');
  });

  it('keeps instrument-level fact and inference markers renderable as separate blocks', () => {
    const instruments = loadAndValidate('production').dataset.instruments;
    for (const instrument of instruments) {
      const blocks = parseInstrumentSummary(instrument.summary_md);
      expect(blocks.some((block) => block.kind === 'fact'), `${instrument.id}:fact`).toBe(true);
      expect(blocks.some((block) => block.kind === 'inference'), `${instrument.id}:inference`).toBe(true);
      expect(blocks.every((block) => block.text.length > 0), `${instrument.id}:text`).toBe(true);
    }
  });

  it('does not promote unmarked fixture copy to a fact', () => {
    expect(parseInstrumentSummary('Fixture note only.')).toEqual([
      { kind: 'unclassified', text: 'Fixture note only.' },
    ]);
  });
});

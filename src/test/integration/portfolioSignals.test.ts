import { describe, expect, it } from 'vitest';
import {
  EXECUTIVE_MARKETS,
  PORTFOLIO_MONITORING_LOG,
  PORTFOLIO_SIGNAL_AS_OF,
  PORTFOLIO_SIGNALS,
  PORTFOLIO_SOURCES,
} from '../../lib/portfolio/policySignals';

describe('role-facing policy signal governance', () => {
  it('uses unique HTTPS Tier 1 source records with a bounded review window', () => {
    const ids = PORTFOLIO_SOURCES.map((source) => source.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const source of PORTFOLIO_SOURCES) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.tier).toBe(1);
      expect(source.lastVerified).toBe(PORTFOLIO_SIGNAL_AS_OF);
      const days = (Date.parse(`${source.nextReview}T00:00:00Z`) - Date.parse(`${source.lastVerified}T00:00:00Z`)) / 86_400_000;
      expect(days).toBeGreaterThan(0);
      expect(days).toBeLessThanOrEqual(92);
    }
  });

  it('resolves every signal and executive-table source ID', () => {
    const sourceIds = new Set(PORTFOLIO_SOURCES.map((source) => source.id));
    for (const signal of PORTFOLIO_SIGNALS) {
      expect(signal.lastVerified).toBe(PORTFOLIO_SIGNAL_AS_OF);
      expect(signal.sourceIds.length).toBeGreaterThan(0);
      for (const sourceId of signal.sourceIds) expect(sourceIds.has(sourceId), `${signal.id}:${sourceId}`).toBe(true);
    }
    for (const market of EXECUTIVE_MARKETS) {
      expect(market.sourceIds.length, `${market.market}:sourceIds`).toBeGreaterThan(0);
      for (const sourceId of market.sourceIds) expect(sourceIds.has(sourceId), `${market.market}:${sourceId}`).toBe(true);
    }
  });

  it('starts an honest, non-backfilled monitoring log that covers the snapshot', () => {
    expect(PORTFOLIO_MONITORING_LOG).toHaveLength(1);
    const logged = new Set(PORTFOLIO_MONITORING_LOG[0]!.signalIds);
    expect(PORTFOLIO_SIGNALS.every((signal) => logged.has(signal.id))).toBe(true);
    expect(PORTFOLIO_MONITORING_LOG[0]!.note).toContain('no historical cadence is claimed');
  });
});

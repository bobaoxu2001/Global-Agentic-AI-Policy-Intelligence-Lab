'use client';

/**
 * P1-10 Policy Tracker — faceted FilterBar + sortable table (FR-2 / AC-TRK-1..5,
 * INTERACTION_SPEC §1): OR within an axis, AND across axes; URL-addressable
 * state; result count; clear-all; empty state; aria-sort headers.
 * No free-text search (MN-8 — faceted only).
 */
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Instrument } from '@/lib/schemas';
import { BindingnessChip, InstrumentTypeChip, LifecycleChip, StaleFlag } from './semantic';

const AXES = {
  jur: ['us', 'eu', 'sg', 'cn'],
  type: ['enacted_law', 'proposed_legislation', 'regulation', 'executive_action', 'regulator_guidance', 'voluntary_framework', 'technical_standard'],
  binding: ['binding', 'conditionally_binding', 'non_binding'],
  lifecycle: ['proposed', 'adopted_not_yet_applicable', 'in_force_partially_applicable', 'fully_applicable', 'amended', 'superseded', 'rescinded', 'expired', 'withdrawn'],
} as const;
type AxisKey = keyof typeof AXES;
type Filters = Record<AxisKey, string[]>;
type SortKey = 'title' | 'status_date' | 'lifecycle';

const EMPTY: Filters = { jur: [], type: [], binding: [], lifecycle: [] };

export function decodeFilters(search: string): Filters {
  const q = new URLSearchParams(search);
  const pick = (k: AxisKey) =>
    (q.get(k)?.split(',') ?? []).filter((v) => (AXES[k] as readonly string[]).includes(v));
  return { jur: pick('jur'), type: pick('type'), binding: pick('binding'), lifecycle: pick('lifecycle') };
}

export function encodeFilters(f: Filters, sort: SortKey, dir: 'asc' | 'desc'): string {
  const q = new URLSearchParams();
  (Object.keys(AXES) as AxisKey[]).forEach((k) => { if (f[k].length) q.set(k, f[k].join(',')); });
  if (sort !== 'status_date' || dir !== 'desc') { q.set('sort', sort); q.set('dir', dir); }
  return q.toString();
}

export function applyFilters(rows: Instrument[], f: Filters): Instrument[] {
  // AND across axes; OR within an axis (PRD §9 / OD-2)
  return rows.filter((i) =>
    (f.jur.length === 0 || f.jur.includes(i.jurisdiction_id)) &&
    (f.type.length === 0 || f.type.includes(i.instrument_type)) &&
    (f.binding.length === 0 || f.binding.includes(i.bindingness)) &&
    (f.lifecycle.length === 0 || f.lifecycle.includes(i.lifecycle_status)),
  );
}

export function InstrumentTracker({ instruments }: { instruments: Instrument[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<SortKey>('status_date');
  const [dir, setDir] = useState<'asc' | 'desc'>('desc');
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setFilters(decodeFilters(window.location.search));
    const s = q.get('sort'); const d = q.get('dir');
    if (s === 'title' || s === 'lifecycle' || s === 'status_date') setSort(s);
    if (d === 'asc' || d === 'desc') setDir(d);
  }, []);
  useEffect(() => {
    const qs = encodeFilters(filters, sort, dir);
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [filters, sort, dir]);

  const rows = useMemo(() => {
    const filtered = applyFilters(instruments, filters);
    const cmp = (a: Instrument, b: Instrument) => {
      const va = sort === 'title' ? a.title_en : sort === 'lifecycle' ? a.lifecycle_status : a.status_date;
      const vb = sort === 'title' ? b.title_en : sort === 'lifecycle' ? b.lifecycle_status : b.status_date;
      return va < vb ? -1 : va > vb ? 1 : 0;
    };
    return [...filtered].sort((a, b) => (dir === 'asc' ? cmp(a, b) : -cmp(a, b)));
  }, [instruments, filters, sort, dir]);

  const toggle = (k: AxisKey, v: string) =>
    setFilters((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
  const activeCount = (Object.keys(AXES) as AxisKey[]).reduce((n, k) => n + filters[k].length, 0);
  const header = (key: SortKey, label: string) => (
    <th
      aria-sort={sort === key ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      style={{ cursor: 'pointer' }}
      onClick={() => (sort === key ? setDir(dir === 'asc' ? 'desc' : 'asc') : (setSort(key), setDir('asc')))}
    >
      {label} {sort === key ? (dir === 'asc' ? '↑' : '↓') : ''}
    </th>
  );

  return (
    <div data-testid="tracker">
      <fieldset data-testid="filterbar">
        <legend><b>Filters</b> — OR within an axis, AND across axes (FR-2)</legend>
        {(Object.keys(AXES) as AxisKey[]).map((k) => (
          <div key={k} style={{ margin: '4px 0' }}>
            <span className="eyebrow" style={{ marginRight: 6 }}>{k}</span>
            {AXES[k].map((v) => (
              <label key={v} style={{ marginRight: 10, fontSize: 12 }}>
                <input type="checkbox" data-testid={`f-${k}-${v}`} checked={filters[k].includes(v)} onChange={() => toggle(k, v)} /> {v.replaceAll('_', ' ')}
              </label>
            ))}
          </div>
        ))}
        <div style={{ marginTop: 6 }}>
          <span data-testid="result-count" className="mono" style={{ fontSize: 12 }}>{rows.length} of {instruments.length} instruments</span>
          {activeCount > 0 ? (
            <button type="button" data-testid="clear-filters" style={{ marginLeft: 10 }} onClick={() => setFilters(EMPTY)}>
              Clear all ({activeCount})
            </button>
          ) : null}
        </div>
      </fieldset>

      {rows.length === 0 ? (
        <p data-testid="empty-state">No records match these filters. <button type="button" onClick={() => setFilters(EMPTY)}>Clear filters</button></p>
      ) : (
        <table>
          <thead>
            <tr>{header('title', 'Instrument')}<th>Type</th><th>Bindingness</th>{header('lifecycle', 'Lifecycle')}{header('status_date', 'Status date')}<th>Last verified</th></tr>
          </thead>
          <tbody>
            {rows.map((i) => (
              <tr key={i.id}>
                <td><Link href={`/instruments/${i.id}`}>{i.title_en}</Link></td>
                <td><InstrumentTypeChip type={i.instrument_type} /></td>
                <td><BindingnessChip level={i.bindingness} /></td>
                <td><LifecycleChip status={i.lifecycle_status} /></td>
                <td className="mono" style={{ fontSize: 12 }}>{i.status_date}</td>
                <td className="mono" style={{ fontSize: 12 }}>{i.last_verified} <StaleFlag lastVerified={i.last_verified} asOf={now} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

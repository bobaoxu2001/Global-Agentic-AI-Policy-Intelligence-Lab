'use client';

/**
 * P1-10 Policy Tracker — faceted FilterBar + sortable table (FR-2 / AC-TRK-1..5,
 * INTERACTION_SPEC §1): OR within an axis, AND across axes; URL-addressable
 * state; result count; clear-all; empty state; aria-sort headers.
 * No free-text search (MN-8 — faceted only).
 */
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { LocalizedText } from '@/components/LocalizedText';
import {
  EMPTY_FILTERS,
  encodeFilters,
  FILTER_AXES as AXES,
  type AxisKey,
  type Filters,
  type SortKey,
  type TrackerState,
} from '@/lib/portfolio/trackerState';
import type { Instrument } from '@/lib/schemas';
import { BindingnessChip, InstrumentTypeChip, LifecycleChip, StaleFlag } from './semantic';

const EMPTY = EMPTY_FILTERS;
const LIFECYCLE_RANK = new Map(AXES.lifecycle.map((status, index) => [status, index]));

export function applyFilters(rows: Instrument[], f: Filters): Instrument[] {
  // AND across axes; OR within an axis (PRD §9 / OD-2)
  return rows.filter((i) =>
    (f.jur.length === 0 || f.jur.includes(i.jurisdiction_id)) &&
    (f.type.length === 0 || f.type.includes(i.instrument_type)) &&
    (f.binding.length === 0 || f.binding.includes(i.bindingness)) &&
    (f.lifecycle.length === 0 || f.lifecycle.includes(i.lifecycle_status)),
  );
}

export function InstrumentTracker({ instruments, initialState }: { instruments: Instrument[]; initialState: TrackerState }) {
  const [filters, setFilters] = useState<Filters>(initialState.filters);
  const [sort, setSort] = useState<SortKey>(initialState.sort);
  const [dir, setDir] = useState<'asc' | 'desc'>(initialState.dir);
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    const qs = encodeFilters(filters, sort, dir);
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [filters, sort, dir]);

  const rows = useMemo(() => {
    const filtered = applyFilters(instruments, filters);
    const cmp = (a: Instrument, b: Instrument) => {
      const va = sort === 'title' ? a.title_en : sort === 'lifecycle' ? (LIFECYCLE_RANK.get(a.lifecycle_status) ?? Number.MAX_SAFE_INTEGER) : a.status_date;
      const vb = sort === 'title' ? b.title_en : sort === 'lifecycle' ? (LIFECYCLE_RANK.get(b.lifecycle_status) ?? Number.MAX_SAFE_INTEGER) : b.status_date;
      return va < vb ? -1 : va > vb ? 1 : 0;
    };
    return [...filtered].sort((a, b) => (dir === 'asc' ? cmp(a, b) : -cmp(a, b)));
  }, [instruments, filters, sort, dir]);

  const toggle = (k: AxisKey, v: string) =>
    setFilters((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
  const activeCount = (Object.keys(AXES) as AxisKey[]).reduce((n, k) => n + filters[k].length, 0);
  const header = (key: SortKey, translationId: string, fallback: string) => (
    <th
      scope="col"
      aria-sort={sort === key ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <button
        className="sort-button"
        type="button"
        onClick={() => (sort === key ? setDir(dir === 'asc' ? 'desc' : 'asc') : (setSort(key), setDir('asc')))}
      >
        <LocalizedText id={translationId} fallback={fallback} />
        {sort === key ? <span aria-hidden="true">{dir === 'asc' ? '↑' : '↓'}</span> : null}
      </button>
    </th>
  );

  const filterValue = (axis: AxisKey, value: string) => {
    const translationId = axis === 'jur'
      ? `instrument.filter.jurisdiction.${value}`
      : axis === 'type'
        ? `value.instrumentType.${value}`
        : axis === 'binding'
          ? `value.bindingness.${value}`
          : `value.lifecycle.${value}`;
    return <LocalizedText id={translationId} fallback={value.replaceAll('_', ' ')} />;
  };

  return (
    <div data-testid="tracker">
      <section className="filter-panel" data-testid="filterbar" aria-labelledby="instrument-filters-title">
        <h2 id="instrument-filters-title"><LocalizedText id="instrument.filters.title" fallback="Filters" /></h2>
        <p className="filter-logic"><LocalizedText id="instrument.filters.logic" fallback="Select any value within a group; selections across groups combine." /></p>
        {(Object.keys(AXES) as AxisKey[]).map((k) => (
          <fieldset className="filter-axis" key={k}>
            <legend className="eyebrow"><LocalizedText id={`instrument.filter.axis.${k}`} fallback={k} /></legend>
            <div className="filter-options">
              {AXES[k].map((v) => (
                <label key={v}>
                  <input type="checkbox" data-testid={`f-${k}-${v}`} checked={filters[k].includes(v)} onChange={() => toggle(k, v)} /> {filterValue(k, v)}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="filter-results">
          <span data-testid="result-count" className="mono" role="status" aria-live="polite" aria-atomic="true"><LocalizedText id="instrument.results" fallback="{visible} of {total} instruments" values={{ visible: rows.length, total: instruments.length }} /></span>
          {activeCount > 0 ? (
            <button type="button" data-testid="clear-filters" onClick={() => setFilters(EMPTY)}>
              <LocalizedText id="instrument.filters.clearAll" fallback="Clear all ({count})" values={{ count: activeCount }} />
            </button>
          ) : null}
        </div>
      </section>

      {rows.length === 0 ? (
        <div className="status-note" data-testid="empty-state"><p><LocalizedText id="instrument.filters.empty" fallback="No records match these filters." /></p><p><LocalizedText id="instrument.filters.activeSummary" fallback="{count} active filter selections." values={{ count: activeCount }} /></p><button type="button" onClick={() => setFilters(EMPTY)}><LocalizedText id="instrument.filters.clear" fallback="Clear filters" /></button></div>
      ) : (
        <div className="table-scroll" tabIndex={0} role="region" aria-labelledby="tracker-table-caption">
          <table>
            <caption className="visually-hidden" id="tracker-table-caption"><LocalizedText id="instrument.table.caption" fallback="Policy instruments matching the selected filters" /></caption>
            <thead>
              <tr>
                {header('title', 'instrument.header.instrument', 'Instrument')}
                <th scope="col"><LocalizedText id="instrument.header.type" fallback="Type" /></th>
                <th scope="col"><LocalizedText id="instrument.header.bindingness" fallback="Bindingness" /></th>
                {header('lifecycle', 'instrument.header.lifecycle', 'Lifecycle')}
                {header('status_date', 'instrument.header.statusDate', 'Status date')}
                <th scope="col"><LocalizedText id="instrument.header.lastVerified" fallback="Last verified" /></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.id}>
                  <th scope="row"><Link href={`/instruments/${i.id}`} lang="en">{i.title_en}</Link></th>
                  <td><InstrumentTypeChip type={i.instrument_type} /></td>
                  <td><BindingnessChip level={i.bindingness} /></td>
                  <td><LifecycleChip status={i.lifecycle_status} /></td>
                  <td className="mono tracker-date">{i.status_date}</td>
                  <td className="mono tracker-date">{i.last_verified} <StaleFlag lastVerified={i.last_verified} asOf={now} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

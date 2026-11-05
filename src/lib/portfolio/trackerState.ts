export const FILTER_AXES = {
  jur: ['us', 'eu', 'sg', 'cn'],
  type: ['enacted_law', 'proposed_legislation', 'regulation', 'executive_action', 'regulator_guidance', 'voluntary_framework', 'technical_standard'],
  binding: ['binding', 'conditionally_binding', 'non_binding'],
  lifecycle: ['proposed', 'adopted_not_yet_applicable', 'in_force_partially_applicable', 'fully_applicable', 'amended', 'superseded', 'rescinded', 'expired', 'withdrawn'],
} as const;

export type AxisKey = keyof typeof FILTER_AXES;
export type Filters = Record<AxisKey, string[]>;
export type SortKey = 'title' | 'status_date' | 'lifecycle';
export type TrackerState = { filters: Filters; sort: SortKey; dir: 'asc' | 'desc' };

export const EMPTY_FILTERS: Filters = { jur: [], type: [], binding: [], lifecycle: [] };

export function decodeFilters(search: string): Filters {
  const query = new URLSearchParams(search);
  const pick = (key: AxisKey) =>
    (query.get(key)?.split(',') ?? []).filter((value) => (FILTER_AXES[key] as readonly string[]).includes(value));
  return { jur: pick('jur'), type: pick('type'), binding: pick('binding'), lifecycle: pick('lifecycle') };
}

export function decodeTrackerState(search: string): TrackerState {
  const query = new URLSearchParams(search);
  const sortValue = query.get('sort');
  const dirValue = query.get('dir');
  return {
    filters: decodeFilters(search),
    sort: sortValue === 'title' || sortValue === 'lifecycle' || sortValue === 'status_date' ? sortValue : 'status_date',
    dir: dirValue === 'asc' || dirValue === 'desc' ? dirValue : 'desc',
  };
}

export function encodeFilters(filters: Filters, sort: SortKey, dir: 'asc' | 'desc'): string {
  const query = new URLSearchParams();
  (Object.keys(FILTER_AXES) as AxisKey[]).forEach((key) => {
    if (filters[key].length) query.set(key, filters[key].join(','));
  });
  if (sort !== 'status_date' || dir !== 'desc') {
    query.set('sort', sort);
    query.set('dir', dir);
  }
  return query.toString();
}

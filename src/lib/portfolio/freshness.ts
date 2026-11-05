const DAY_MS = 86_400_000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type EvidenceFreshnessStatus = 'within_window' | 'due_soon' | 'overdue';

export type ScheduledReview = {
  lastVerified: string;
  nextReview: string;
};

export type EvidenceFreshness = {
  status: EvidenceFreshnessStatus;
  referenceDate: string;
  checkedThrough: string;
  oldestVerification: string;
  newestVerification: string;
  earliestNextReview: string;
  daysUntilEarliestReview: number;
  dueSoonCount: number;
  overdueCount: number;
  totalCount: number;
};

function parseIsoDate(value: string): number {
  if (!ISO_DATE.test(value)) throw new Error(`Expected ISO date (YYYY-MM-DD), received "${value}"`);
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value) {
    throw new Error(`Invalid ISO date "${value}"`);
  }
  return timestamp;
}

export function todayIsoDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Classifies the dated portfolio snapshot against its authored re-check
 * schedule. This is a presentation warning, not a claim that sources changed.
 * The publication gate remains separately controlled by human review.
 */
export function deriveEvidenceFreshness(
  reviews: readonly ScheduledReview[],
  checkedThrough: string,
  referenceDate: string = todayIsoDate(),
): EvidenceFreshness {
  if (reviews.length === 0) throw new Error('Evidence freshness requires at least one scheduled review');

  const referenceTimestamp = parseIsoDate(referenceDate);
  parseIsoDate(checkedThrough);
  const reviewTimestamps = reviews.map((review) => ({
    date: review.nextReview,
    timestamp: parseIsoDate(review.nextReview),
  }));
  const verificationDates = reviews.map((review) => {
    parseIsoDate(review.lastVerified);
    return review.lastVerified;
  }).sort();
  const earliest = reviewTimestamps.reduce((current, candidate) =>
    candidate.timestamp < current.timestamp ? candidate : current,
  );
  const dueSoonBoundary = referenceTimestamp + (7 * DAY_MS);
  const overdueCount = reviewTimestamps.filter((review) => review.timestamp < referenceTimestamp).length;
  const dueSoonCount = reviewTimestamps.filter(
    (review) => review.timestamp >= referenceTimestamp && review.timestamp <= dueSoonBoundary,
  ).length;

  return {
    status: overdueCount > 0 ? 'overdue' : dueSoonCount > 0 ? 'due_soon' : 'within_window',
    referenceDate,
    checkedThrough,
    oldestVerification: verificationDates[0]!,
    newestVerification: verificationDates.at(-1)!,
    earliestNextReview: earliest.date,
    daysUntilEarliestReview: Math.round((earliest.timestamp - referenceTimestamp) / DAY_MS),
    dueSoonCount,
    overdueCount,
    totalCount: reviews.length,
  };
}

'use client';

import { useEffect, useState } from 'react';
import { LocalizedText } from '@/components/LocalizedText';
import { deriveEvidenceFreshness, todayIsoDate } from '@/lib/portfolio/freshness';

type EvidenceFreshnessPanelProps = {
  checkedThrough: string;
  initialReferenceDate: string;
  reviews: readonly { lastVerified: string; nextReview: string }[];
};

const STATUS_COPY = {
  within_window: {
    title: 'Within the review window',
    detail: 'No source record is due within seven days of the displayed evaluation date.',
  },
  due_soon: {
    title: 'Re-check due soon',
    detail: 'Source records due within seven days of the displayed evaluation date: {count} of {total}.',
  },
  overdue: {
    title: 'Evidence re-check overdue',
    detail: 'Source records past their scheduled re-check date: {count} of {total}. Treat affected signals as stale until refreshed.',
  },
} as const;

export function EvidenceFreshnessPanel({ checkedThrough, initialReferenceDate, reviews }: EvidenceFreshnessPanelProps) {
  const [referenceDate, setReferenceDate] = useState(initialReferenceDate);

  useEffect(() => {
    let nextDayTimer: number;

    const refreshForLocalDate = () => {
      const now = new Date();
      setReferenceDate(todayIsoDate(now));
      const nextLocalDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      nextDayTimer = window.setTimeout(refreshForLocalDate, nextLocalDay.getTime() - now.getTime() + 1_000);
    };

    refreshForLocalDate();
    return () => window.clearTimeout(nextDayTimer);
  }, []);

  const freshness = deriveEvidenceFreshness(reviews, checkedThrough, referenceDate);
  const copy = STATUS_COPY[freshness.status];
  const count = freshness.status === 'overdue' ? freshness.overdueCount : freshness.dueSoonCount;

  return (
    <aside
      className={`freshness-panel freshness-${freshness.status.replace('_', '-')}`}
      data-testid="evidence-freshness"
      data-freshness-status={freshness.status}
      data-reference-date={freshness.referenceDate}
      aria-labelledby="evidence-freshness-title"
    >
      <div>
        <p className="eyebrow"><LocalizedText id="freshness.eyebrow" fallback="Evidence freshness" /></p>
        <h2 id="evidence-freshness-title"><LocalizedText id={`freshness.${freshness.status}.title`} fallback={copy.title} /></h2>
      </div>
      <div className="freshness-copy" aria-live="polite" aria-atomic="true">
        <p>
          <LocalizedText
            id="freshness.schedule"
            fallback="Snapshot dated {checked}. Source records were individually verified from {oldest} to {newest}. Earliest scheduled re-check: {nextReview}. Status evaluated on {referenceDate}."
            values={{ checked: freshness.checkedThrough, oldest: freshness.oldestVerification, newest: freshness.newestVerification, nextReview: freshness.earliestNextReview, referenceDate: freshness.referenceDate }}
          />
        </p>
        <p>
          <LocalizedText
            id={`freshness.${freshness.status}.detail`}
            fallback={copy.detail}
            values={{ count, total: freshness.totalCount }}
          />
        </p>
      </div>
    </aside>
  );
}

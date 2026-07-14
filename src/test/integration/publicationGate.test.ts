import { describe, expect, it } from 'vitest';
import type { Control, ControlProvisionMap } from '../../lib/schemas';
import {
  checkProductionPublicationGate,
  type Dataset,
} from '../../lib/validation/integrity';
import { loadAndValidate } from '../../lib/validation/loadDataset';

type RecordType = 'instrument' | 'provision' | 'assessment' | 'changelog' | 'control' | 'control_provision_map';

interface ApprovalOverrides {
  owner_reviewer?: string;
  owner_decision?: 'approved' | 'returned_for_revision' | 'blocked';
  owner_reviewed_at?: string;
  prepared_by?: string;
}

const approvedDecision = (recordId: string, recordType: RecordType, overrides: ApprovalOverrides = {}) => ({
  record_id: recordId,
  record_type: recordType,
  owner_reviewer: 'Human Owner',
  owner_decision: 'approved' as const,
  owner_reviewed_at: '2026-07-14T09:00:00+09:00',
  official_source: 'https://example.com/official-source',
  source_reference: 'Test evidence reference',
  provision_inheritance: false,
  prepared_by: 'Codex',
  scope_note: `Test approval scoped to ${recordType} ${recordId}.`,
  ...overrides,
});

function withPublishedInstrument(dataset: Dataset, instrumentId = 'eu-gdpr'): Dataset {
  return {
    ...dataset,
    instruments: dataset.instruments.map((record) => ({
      ...record,
      review_status: record.id === instrumentId ? 'published' as const : 'in_review' as const,
    })),
  };
}

describe('independent owner approval gate', () => {
  it('rejects every kind of published entity when its own scoped approval is missing', () => {
    const production = loadAndValidate('production');
    const fixtures = loadAndValidate('fixtures');
    const baseline = withPublishedInstrument(production.dataset);
    const unapprovedInstrument = production.dataset.instruments.find((record) => record.id === 'us-eo-14179')!;
    const unapprovedProvision = production.dataset.provisions.find((record) => record.id === 'eu-ai-act:art14')!;
    const unapprovedAssessment = fixtures.dataset.assessments[0]!;
    const unapprovedChangelog = production.dataset.changelog[0]!;
    const unapprovedControl = production.controls[0]!;
    const unapprovedMap = production.controlMaps[0]!;

    const cases: Array<{
      id: string;
      dataset: Dataset;
      controls: Control[];
      controlMaps: ControlProvisionMap[];
    }> = [
      {
        id: unapprovedInstrument.id,
        dataset: {
          ...baseline,
          instruments: baseline.instruments.map((record) =>
            record.id === unapprovedInstrument.id ? { ...record, review_status: 'published' as const } : record,
          ),
        },
        controls: production.controls,
        controlMaps: production.controlMaps,
      },
      {
        id: unapprovedProvision.id,
        dataset: {
          ...baseline,
          provisions: baseline.provisions.map((record) =>
            record.id === unapprovedProvision.id ? { ...record, review_status: 'published' as const } : record,
          ),
        },
        controls: production.controls,
        controlMaps: production.controlMaps,
      },
      {
        id: unapprovedAssessment.id,
        dataset: { ...baseline, assessments: [{ ...unapprovedAssessment, review_status: 'published' as const }] },
        controls: production.controls,
        controlMaps: production.controlMaps,
      },
      {
        id: unapprovedChangelog.id,
        dataset: {
          ...baseline,
          changelog: baseline.changelog.map((record) =>
            record.id === unapprovedChangelog.id ? { ...record, review_status: 'published' as const } : record,
          ),
        },
        controls: production.controls,
        controlMaps: production.controlMaps,
      },
      {
        id: unapprovedControl.id,
        dataset: baseline,
        controls: production.controls.map((record) =>
          record.id === unapprovedControl.id ? { ...record, review_status: 'published' as const } : record,
        ),
        controlMaps: production.controlMaps,
      },
      {
        id: unapprovedMap.id,
        dataset: baseline,
        controls: production.controls,
        controlMaps: production.controlMaps.map((record) =>
          record.id === unapprovedMap.id ? { ...record, review_status: 'published' as const } : record,
        ),
      },
    ];

    for (const testCase of cases) {
      const errors = checkProductionPublicationGate(
        testCase.dataset,
        testCase.controls,
        testCase.controlMaps,
        'production',
      );
      expect(errors).toContainEqual(
        expect.objectContaining({ rule: 'R8-owner-approval', entity: testCase.id }),
      );
    }
  });

  it('rejects an approval prepared and reviewed by the same person, ignoring case and whitespace', () => {
    const production = loadAndValidate('production');
    const dataset = withPublishedInstrument(production.dataset);
    const log = {
      decisions: [
        approvedDecision('eu-gdpr', 'instrument', {
          owner_reviewer: '  AO XU ',
          prepared_by: 'ao xu',
        }),
      ],
    };

    expect(checkProductionPublicationGate(dataset, production.controls, production.controlMaps, 'production', log)).toContainEqual(
      expect.objectContaining({ rule: 'R8-reviewer-independence', entity: 'eu-gdpr' }),
    );
  });

  it('uses the latest dated decision so a later block supersedes an earlier approval', () => {
    const production = loadAndValidate('production');
    const dataset = withPublishedInstrument(production.dataset);
    const log = {
      decisions: [
        approvedDecision('eu-gdpr', 'instrument', { owner_reviewed_at: '2026-07-13T09:00:00+09:00' }),
        approvedDecision('eu-gdpr', 'instrument', {
          owner_decision: 'blocked',
          owner_reviewed_at: '2026-07-14T09:00:00+09:00',
        }),
      ],
    };

    expect(checkProductionPublicationGate(dataset, production.controls, production.controlMaps, 'production', log)).toContainEqual(
      expect.objectContaining({ rule: 'R8-owner-approval', entity: 'eu-gdpr' }),
    );
  });

  it('collects malformed owner-log evidence as a readable gate error', () => {
    const production = loadAndValidate('production');
    const dataset = withPublishedInstrument(production.dataset);
    const errors = checkProductionPublicationGate(
      dataset,
      production.controls,
      production.controlMaps,
      'production',
      { decisions: [{ record_id: 'eu-gdpr' }] },
    );

    expect(errors.some((error) => error.rule === 'R8-owner-log')).toBe(true);
  });
});

describe('published parent dependencies', () => {
  it('rejects a published provision whose parent instrument remains in review', () => {
    const production = loadAndValidate('production');
    const provisionId = 'eu-ai-act:art14';
    const dataset: Dataset = {
      ...withPublishedInstrument(production.dataset),
      provisions: production.dataset.provisions.map((record) =>
        record.id === provisionId ? { ...record, review_status: 'published' as const } : record,
      ),
    };
    const log = {
      decisions: [
        approvedDecision('eu-gdpr', 'instrument'),
        approvedDecision(provisionId, 'provision'),
      ],
    };

    expect(checkProductionPublicationGate(dataset, production.controls, production.controlMaps, 'production', log)).toContainEqual(
      expect.objectContaining({ rule: 'R8-published-parent', entity: provisionId }),
    );
  });

  it('rejects a published changelog entry whose parent instrument remains in review', () => {
    const production = loadAndValidate('production');
    const changelogId = 'chg-2026-07-12-eu-omnibus';
    const dataset: Dataset = {
      ...withPublishedInstrument(production.dataset),
      changelog: production.dataset.changelog.map((record) =>
        record.id === changelogId ? { ...record, review_status: 'published' as const } : record,
      ),
    };
    const log = {
      decisions: [
        approvedDecision('eu-gdpr', 'instrument'),
        approvedDecision(changelogId, 'changelog'),
      ],
    };

    expect(checkProductionPublicationGate(dataset, production.controls, production.controlMaps, 'production', log)).toContainEqual(
      expect.objectContaining({ rule: 'R8-published-parent', entity: changelogId }),
    );
  });
});

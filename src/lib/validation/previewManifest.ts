import { z } from 'zod';
import manifestJson from '../../../docs/research/GOLDEN_8_REVIEW_MANIFEST.json';

export const PREVIEW_APPROVAL = 'APPROVED FOR AI-ASSISTED PREVIEW' as const;

export const PreviewManifestSchema = z.object({
  publication_class: z.literal('interview research preview, not final legal publication'),
  review_basis: z.literal('AI-assisted primary-source verification'),
  reviewed_by: z.literal('Codex'),
  human_review_status: z.string().min(1),
  disclaimer: z.string().min(1),
  records: z.array(z.object({
    record_id: z.string().min(1),
    decision: z.enum([PREVIEW_APPROVAL, 'REVISE', 'BLOCK']),
    source_ids: z.array(z.string().min(1)).min(1),
    last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD'),
  }).strict()).min(1),
}).strict().superRefine((manifest, ctx) => {
  const seen = new Set<string>();
  manifest.records.forEach((record, index) => {
    if (seen.has(record.record_id)) {
      ctx.addIssue({ code: 'custom', path: ['records', index, 'record_id'], message: `duplicate record_id "${record.record_id}"` });
    }
    seen.add(record.record_id);
  });
});

export type PreviewManifest = z.infer<typeof PreviewManifestSchema>;
export const previewManifest: PreviewManifest = PreviewManifestSchema.parse(manifestJson);

export function approvedPreviewIds(manifest: PreviewManifest = previewManifest): string[] {
  return manifest.records.filter((record) => record.decision === PREVIEW_APPROVAL).map((record) => record.record_id);
}

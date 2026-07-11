/**
 * Zod content schemas — the SINGLE NORMATIVE schema source (ENG §8 / MN-15).
 * JSON Schema files in /schemas are generated artifacts; where generation
 * cannot express a refinement, the Zod definition governs.
 * Mirrors SPEC §17 (tables) and §18 (JSON Schemas).
 */
import { z } from 'zod';
import {
  ApproachTag,
  Bindingness,
  CapabilityId,
  Confidence,
  ControlCategory,
  DimScoreSchema,
  EpistemicKind,
  Intensity,
  InstrumentType,
  IsoDate,
  JurisdictionId,
  LifecycleStatus,
  MappingRelation,
  MappingStrength,
  MitigationClassEnum,
  ObligationType,
  ReviewStatus,
  RiskId,
  SourceTier,
} from './enums';

export * from './enums';

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * §18.4 citation (embedded in epistemic blocks). The Tier-1 archive rule
 * (§21.6/MJ-7) is enforced on the shared `sources` records (SourceSchema
 * below), which citations resolve to — not duplicated here, because embedded
 * citations have no manual-verification log of their own.
 */
export const CitationSchema = z
  .object({
    tier: SourceTier,
    publisher: z.string().min(1),
    title: z.string().min(1),
    url: z.string().url(),
    stable_ref: z.string().optional(),
    pin_cite: z.string().min(1), // sentinel "(instrument as a whole)" allowed (MN-5)
    pub_date: IsoDate.optional(),
    version_date: IsoDate.optional(),
    language: z.string().optional(),
    is_translation: z.boolean().optional(),
    archived_url: z.string().url().optional(),
    accessed_date: IsoDate,
  })
  .strict();

/** §17 sources row. All Tier 1 sources must carry archived_url where possible (MJ-7). */
export const SourceSchema = z
  .object({
    id: z.string().min(1),
    tier: SourceTier,
    publisher: z.string().min(1),
    title: z.string().min(1),
    url: z.string().url(),
    stable_ref: z.string().optional(),
    pub_date: IsoDate.optional(),
    version_date: IsoDate.optional(),
    language: z.string().min(1),
    is_translation: z.boolean().default(false),
    translation_of: z.string().optional(),
    archived_url: z.string().url().optional(),
    accessed_date: IsoDate,
    manual_verification_date: IsoDate.optional(), // MJ-7 logged manual verification
    fixture: z.boolean().optional(),
  })
  .strict()
  .superRefine((s, ctx) => {
    // SPEC §21.6 / PRD §24.9 hard rule: a Tier 1 source must carry an
    // archived_url or a logged manual verification (a stable_ref does NOT
    // substitute — it is not always a resolvable URL).
    if (s.tier === 1 && !s.archived_url && !s.manual_verification_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Tier 1 source requires archived_url or manual_verification_date (§21.6/MJ-7)',
      });
    }
  });

/** §18.6 epistemic block — conditional requirements by kind. */
export const EpistemicBlockSchema = z
  .object({
    id: z.string().min(1),
    kind: EpistemicKind,
    text_md: z.string().min(1),
    citations: z.array(CitationSchema).optional(),
    confidence: Confidence.optional(),
    based_on: z.array(z.string()).optional(),
  })
  .strict()
  .superRefine((b, ctx) => {
    if (b.kind === 'fact') {
      if (!b.citations || b.citations.length === 0)
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'fact requires ≥1 citation (§20.1/§21.1)' });
      if (!b.confidence)
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'fact requires confidence (§20.1)' });
      if (b.citations?.every((c) => c.tier === 3))
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Tier 3 may never cite a fact (§21.5)' });
    }
    if (b.kind === 'inference') {
      if (!b.confidence)
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'inference requires confidence (§20.1)' });
      if (!b.based_on || b.based_on.length === 0)
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'inference requires based_on (§20.1)' });
    }
    if (b.kind === 'recommendation') {
      if (b.confidence)
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'recommendation must NOT carry confidence (§20.1)' });
      if (!b.based_on || b.based_on.length === 0)
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'recommendation requires based_on (§20.1)' });
    }
  });

/** §17/§18.1 instrument. */
export const InstrumentSchema = z
  .object({
    id: z.string().min(1),
    jurisdiction_id: JurisdictionId,
    title_original: z.string().min(1),
    title_en: z.string().min(1),
    instrument_type: InstrumentType,
    bindingness: Bindingness,
    lifecycle_status: LifecycleStatus,
    status_date: IsoDate,
    approach_tags: z.array(ApproachTag).min(1),
    issuing_body: z.string().min(1),
    adopted_date: IsoDate.optional(),
    key_dates: z
      .array(
        z.object({ date: IsoDate, event: z.string().min(1), provision_ref: z.string().optional(), source_id: z.string().min(1) }).strict(),
      )
      .optional(),
    supersedes_id: z.string().optional(),
    superseded_by_id: z.string().optional(),
    summary_md: z.string().min(1),
    analyst_notes: z.string().optional(),
    review_status: ReviewStatus,
    as_of_date: IsoDate,
    last_verified: IsoDate, // distinct from as_of_date (MJ-1)
    source_ids: z.array(z.string().min(1)).min(1),
    fixture: z.boolean().optional(),
  })
  .strict();

/** §17/§18.2 provision — dual quote limit, translation source, optional bindingness override. */
export const ProvisionSchema = z
  .object({
    id: z.string().min(1),
    instrument_id: z.string().min(1),
    pin_cite: z.string().min(1),
    quote_verbatim: z.string().max(350).optional(),
    quote_translated: z.string().optional(),
    translation_source_id: z.string().optional(),
    paraphrase_en: z.string().min(1).max(600),
    obligation_type: ObligationType,
    bindingness: Bindingness.nullable().optional(), // null/absent = inherit instrument (MJ-2)
    applies_from: IsoDate.optional(),
    source_id: z.string().min(1),
    confidence: Confidence,
    confidence_rationale: z.string().min(1),
    epistemic_blocks: z.array(EpistemicBlockSchema).min(1),
    capability_map: z
      .array(z.object({ capability_id: CapabilityId, rationale: z.string().min(1), confidence: Confidence }).strict())
      .default([]),
    risk_map: z
      .array(z.object({ risk_id: RiskId, rationale: z.string().min(1) }).strict())
      .default([]),
    review_status: ReviewStatus,
    as_of_date: IsoDate,
    last_verified: IsoDate,
    fixture: z.boolean().optional(),
  })
  .strict()
  .superRefine((p, ctx) => {
    if (p.quote_verbatim && countWords(p.quote_verbatim) > 50)
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'quote_verbatim exceeds 50 words (§21.3/OD-3)' });
    if (p.quote_translated && !p.translation_source_id)
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'quote_translated requires translation_source_id (OD-4)' });
    if (p.capability_map.length + p.risk_map.length === 0)
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'provision requires ≥1 capability or risk mapping (§6.2/§17)' });
  });

/** §17 scenarios — capability profile with §10 intensities (CB-1). */
export const ScenarioSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    narrative_md: z.string().min(1),
    capability_profile: z
      .array(z.object({ capability_id: CapabilityId, intensity: Intensity, note: z.string().min(1) }).strict())
      .min(1),
    fixture: z.boolean().optional(),
  })
  .strict();

const DimEntry = z
  .object({
    score: DimScoreSchema,
    justification: z.string().min(40),
    divergence_justification: z.string().optional(), // required by integrity rule 13 when D/E diverge
  })
  .strict();

/** §18.3 assessment — computed fields are REJECTED in authored files (strict object). */
export const AssessmentSchema = z
  .object({
    id: z.string().min(1),
    scenario_id: z.string().min(1),
    jurisdiction_id: JurisdictionId,
    version: z.number().int().min(1),
    dims: z.object({ A: DimEntry, T: DimEntry, D: DimEntry, E: DimEntry, R: DimEntry }).strict(),
    mitigations: z.array(z.object({ class: MitigationClassEnum, evidence: z.string().min(40) }).strict()),
    j_components: z
      .object({
        binding_hit: z.object({ value: z.union([z.literal(0), z.literal(1)]), note: z.string().min(1), provision_ids: z.array(z.string()).optional() }).strict(),
        near_term_hit: z.object({ value: z.union([z.literal(0), z.literal(1)]), note: z.string().min(1), provision_ids: z.array(z.string()).optional() }).strict(),
        enforcement_posture: z.object({ value: z.union([z.literal(0), z.literal(1)]), note: z.string().min(1) }).strict(),
        prohibition_adjacent: z.object({ value: z.union([z.literal(0), z.literal(1)]), note: z.string().min(1) }).strict(),
      })
      .strict(),
    assessed_by: z.string().min(1),
    assessed_date: IsoDate,
    review_status: ReviewStatus,
    fixture: z.boolean().optional(),
  })
  .strict(); // strict ⇒ author-supplied inherent/residual/final/tier fail validation (§18.3)

/** §17 controls. */
export const ControlSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    category: ControlCategory,
    description: z.string().min(1),
    implementation_notes: z.string().min(1),
    verification_method: z.string().min(1),
    mitigation_class: MitigationClassEnum.nullable(),
    review_status: ReviewStatus,
    as_of_date: IsoDate,
    fixture: z.boolean().optional(),
  })
  .strict();

export const CapabilitySeedSchema = z
  .object({ id: CapabilityId, name: z.string().min(1), definition: z.string().min(1), indicators: z.string().min(1) })
  .strict();
export const RiskSeedSchema = z
  .object({ id: RiskId, name: z.string().min(1), definition: z.string().min(1), driven_by: z.array(CapabilityId).min(1) })
  .strict();

export const MappingSchemas = { MappingStrength, MappingRelation };

export type Instrument = z.infer<typeof InstrumentSchema>;
export type Provision = z.infer<typeof ProvisionSchema>;
export type Scenario = z.infer<typeof ScenarioSchema>;
export type Assessment = z.infer<typeof AssessmentSchema>;
export type SourceRecord = z.infer<typeof SourceSchema>;
export type EpistemicBlock = z.infer<typeof EpistemicBlockSchema>;
export type Control = z.infer<typeof ControlSchema>;

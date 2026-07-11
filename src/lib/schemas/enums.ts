/**
 * Taxonomy enums — [LOCKED] verbatim from SPEC §8–§11, §13, §15, §17.
 * Single source for every enum; do not fork these lists elsewhere.
 */
import { z } from 'zod';

export const JurisdictionId = z.enum(['us', 'eu', 'sg', 'cn']);

export const InstrumentType = z.enum([
  'enacted_law',
  'proposed_legislation',
  'regulation',
  'executive_action',
  'regulator_guidance',
  'voluntary_framework',
  'technical_standard',
]);

export const Bindingness = z.enum(['binding', 'conditionally_binding', 'non_binding']);

export const LifecycleStatus = z.enum([
  'proposed',
  'adopted_not_yet_applicable',
  'in_force_partially_applicable',
  'fully_applicable',
  'amended', // reserved for wholesale replacement only (SPEC §8 / MJ-4)
  'superseded',
  'rescinded',
  'expired',
  'withdrawn',
]);

export const ApproachTag = z.enum([
  'horizontal_comprehensive',
  'sector_specific',
  'technology_specific',
  'data_protection_derived',
  'content_governance',
  'safety_security',
  'procurement_internal_government',
  'standards_assurance',
]);

export const ObligationType = z.enum([
  'obligation',
  'prohibition',
  'right',
  'definition',
  'enforcement',
  'scope',
]);

export const CapabilityId = z.enum([
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12',
]);

export const RiskId = z.enum([
  'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12',
]);

export const MitigationClassEnum = z.enum(['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9']);

export const Confidence = z.enum(['high', 'medium', 'low']);
export const TierEnum = z.enum(['low', 'moderate', 'high', 'critical']);
export const MappingStrength = z.enum(['direct', 'derived', 'prudential']);
export const MappingRelation = z.enum(['satisfies_in_part', 'supports_evidence', 'implements_general_duty']);
export const ReviewStatus = z.enum(['draft', 'in_review', 'published']);
export const ControlCategory = z.enum(['technical', 'process', 'organizational', 'documentation']);
export const SourceTier = z.union([z.literal(1), z.literal(2), z.literal(3)]);
export const EpistemicKind = z.enum(['fact', 'inference', 'recommendation']);

/** Capability intensity 0–4 (SPEC §10 scale, CB-1/MD-1). Integers only. */
export const Intensity = z.number().int().min(0).max(4);
/** ADRS dimension anchor 0–4 (SPEC §13.3). Integers only. */
export const DimScoreSchema = z.number().int().min(0).max(4);

export const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

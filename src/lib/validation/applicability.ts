/**
 * "Currently-applicable binding provision" — the SPEC §13.5 operational
 * definition (MD-11), shared by /compare and scenario provision tables.
 * Reference date: build date for site views; assessed_date for assessments.
 */
import type { Instrument, Provision } from '../schemas';
import { effectiveBindingness } from './integrity';

export const IN_FORCE = ['fully_applicable', 'in_force_partially_applicable'] as const;

export function isCurrentlyApplicableBinding(
  p: Provision,
  instrumentsById: Map<string, Instrument>,
  refDate: string,
): boolean {
  const inst = instrumentsById.get(p.instrument_id);
  if (!inst) return false;
  const binding = effectiveBindingness(p, instrumentsById) === 'binding';
  const inForce = (IN_FORCE as readonly string[]).includes(inst.lifecycle_status);
  const applies = !p.applies_from || p.applies_from <= refDate;
  return binding && inForce && applies;
}

export const BUILD_DATE = new Date().toISOString().slice(0, 10);

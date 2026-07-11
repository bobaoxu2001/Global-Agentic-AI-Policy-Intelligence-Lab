/**
 * Build-time validation gate (ENG §10). Runs under the current BUILD_PROFILE.
 * Exit non-zero on any schema or integrity failure — SSG must not run (FR-13).
 */
import { assertNotFixtureDeploy, getBuildProfile } from '../src/lib/validation/buildProfile';
import { loadAndValidate } from '../src/lib/validation/loadDataset';

let profile: ReturnType<typeof getBuildProfile>;
try {
  profile = getBuildProfile();
  assertNotFixtureDeploy();
} catch (e) {
  console.error(`[validate] GATE FAILURE: ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
}

const report = loadAndValidate(profile);

console.log(`[validate] BUILD_PROFILE=${profile}`);
console.log(`[validate] counts: ${JSON.stringify(report.counts)}`);

if (report.schemaErrors.length > 0) {
  console.error(`\n[validate] SCHEMA ERRORS (${report.schemaErrors.length}):`);
  for (const e of report.schemaErrors)
    console.error(`  ${e.file}[${e.index}]: ${e.issues.join('; ')}`);
}
if (report.integrityErrors.length > 0) {
  console.error(`\n[validate] INTEGRITY ERRORS (${report.integrityErrors.length}):`);
  for (const e of report.integrityErrors) console.error(`  [${e.rule}] ${e.entity}: ${e.message}`);
}
if (!report.ok) {
  console.error('\n[validate] FAILED — build aborted.');
  process.exit(1);
}
console.log('[validate] OK — all schema and integrity checks passed.');

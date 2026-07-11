/**
 * Generate JSON Schema artifacts from the normative Zod source (ENG §8 / MN-15).
 * The emitted files in /schemas are ILLUSTRATIVE; where a Zod refinement cannot
 * round-trip (e.g. word counts, conditional epistemic requirements), Zod governs.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  AssessmentSchema, CitationSchema, EpistemicBlockSchema,
  InstrumentSchema, ProvisionSchema, ScenarioSchema, SourceSchema,
} from '../src/lib/schemas';

const out = join(process.cwd(), 'schemas');
mkdirSync(out, { recursive: true });
const emit = (name: string, schema: Parameters<typeof zodToJsonSchema>[0], id: string) => {
  const json = zodToJsonSchema(schema, { name, $refStrategy: 'none' });
  (json as Record<string, unknown>)['$id'] = id;
  (json as Record<string, unknown>)['$comment'] =
    'GENERATED from src/lib/schemas (Zod is normative — ENG §8/MN-15). Do not edit by hand.';
  writeFileSync(join(out, `${name}.schema.json`), JSON.stringify(json, null, 2) + '\n');
  console.log(`wrote schemas/${name}.schema.json`);
};
emit('citation', CitationSchema, 'atlas/citation');
emit('source', SourceSchema, 'atlas/source');
emit('epistemic-block', EpistemicBlockSchema, 'atlas/epistemic-block');
emit('instrument', InstrumentSchema, 'atlas/instrument');
emit('provision', ProvisionSchema, 'atlas/provision');
emit('scenario', ScenarioSchema, 'atlas/scenario');
emit('assessment', AssessmentSchema, 'atlas/assessment');

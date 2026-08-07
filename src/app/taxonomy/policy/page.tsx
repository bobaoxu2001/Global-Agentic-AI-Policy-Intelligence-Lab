import { LocalizedText } from '@/components/LocalizedText';

const AXES = [
  ['instrumentType', 'Instrument type', 'enacted law · proposed legislation · regulation · executive action · regulator guidance · voluntary framework · technical standard'],
  ['bindingness', 'Bindingness', 'binding · conditionally binding · non-binding'],
  ['lifecycle', 'Lifecycle', 'proposed → adopted not yet applicable → in force partially applicable → fully applicable → superseded, rescinded, expired, or withdrawn'],
  ['approach', 'Regulatory approach', 'horizontal comprehensive · sector specific · technology specific · data-protection derived · content governance · safety/security · procurement/internal government · standards/assurance'],
] as const;

export default function PolicyTaxonomyPage() { return <><h1><LocalizedText id="research.policyTaxonomy.title" fallback="Policy Taxonomy" /></h1><p className="status-note"><LocalizedText id="research.policyTaxonomy.note" fallback="Every instrument is classified across independent axes so status, bindingness, and regulatory approach are never conflated." /></p><dl>{AXES.map(([id, label, values]) => <div key={id}><dt><b><LocalizedText id={`research.policyTaxonomy.${id}.label`} fallback={label} /></b></dt><dd><LocalizedText id={`research.policyTaxonomy.${id}.values`} fallback={values} /></dd></div>)}</dl></>; }

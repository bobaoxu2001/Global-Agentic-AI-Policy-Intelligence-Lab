const AXES = {
  'Instrument type': 'enacted law · proposed legislation · regulation · executive action · regulator guidance · voluntary framework · technical standard',
  Bindingness: 'binding · conditionally binding · non-binding',
  Lifecycle: 'proposed → adopted not yet applicable → in force partially applicable → fully applicable → superseded, rescinded, expired, or withdrawn',
  'Regulatory approach': 'horizontal comprehensive · sector specific · technology specific · data-protection derived · content governance · safety/security · procurement/internal government · standards/assurance',
};
export default function PolicyTaxonomyPage() { return <><h1>Policy Taxonomy</h1><p className="status-note">Every instrument is classified across independent axes so status, bindingness, and regulatory approach are never conflated.</p><dl>{Object.entries(AXES).map(([k, v]) => <div key={k}><dt><b>{k}</b></dt><dd>{v}</dd></div>)}</dl></>; }

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Methodology',
  description: 'Source selection, evidence typing, monitoring, publication review, and ADRS limits for AI Policy Atlas.',
};

export default function MethodologyPage() {
  return (
    <>
      <h1>Methodology</h1>
      <p className="status-note">Production records are published only after documented human review. The interview preview is a separately labeled, AI-assisted research surface; its inclusion does not change a record&apos;s production review status.</p>

      <h2>Research workflow</h2>
      <ol>
        <li><b>Define the decision.</b> Record the product, market, capability, date, and decision the research is meant to inform.</li>
        <li><b>Use primary sources first.</b> Prefer official legislation, regulator or ministry publications, standards-body material, and official company disclosures. Secondary sources can help locate or interpret a primary source but do not silently replace it.</li>
        <li><b>Capture provenance.</b> Store source ID, publisher, title, URL, tier, publication/access date, stable reference or archive evidence, and the next re-check date.</li>
        <li><b>Separate epistemic types.</b> A fact states what the source supports; an inference explains likely business meaning; a recommendation proposes an accountable action.</li>
        <li><b>Challenge scope.</b> Check bindingness, lifecycle, applicability, product facts, exceptions, unresolved translations, and contrary evidence.</li>
        <li><b>Review before publication.</b> Production requires published status plus a logged owner approval. Preview inclusion is not publication approval.</li>
      </ol>

      <h2>Source tiers and confidence</h2>
      <p><b>Tier 1</b> is authoritative primary material. <b>Tier 2</b> is an authoritative explanatory or implementation source. <b>Tier 3</b> may support discovery or context but does not establish a factual claim on its own. Confidence is capped by source quality, lifecycle uncertainty, translation quality, and the weakest fact supporting an inference.</p>

      <h2>Monitoring and change control</h2>
      <p>Every dated portfolio signal has source IDs, a last-verified date, and a next-review date. Monitoring escalates only when a verified change affects product scope, launch timing, compute availability, customer eligibility, external positioning, or required evidence. Corrections preserve the prior record and explain what changed; a one-day snapshot is never described as a historical weekly track record.</p>

      <h2>Profile and publication boundary</h2>
      <ul>
        <li><b>Fixtures:</b> fictional records for product and formula testing.</li>
        <li><b>Interview preview:</b> a deterministic, manifest-scoped subset plus clearly labeled portfolio work samples; AI-assisted and not independently approved for production publication.</li>
        <li><b>Production:</b> fail-closed structured routes that render only published, approved records. Unpublished rows may remain in the research files without appearing in the application.</li>
      </ul>

      <h2>ADRS constants (SPEC §13 — locked)</h2>
      <pre>{`Weights: A 0.25 · T 0.20 · D 0.20 · E 0.15 · R 0.20
Credits: M1 .10 M2 .08 M3 .07 M4 .06 M5 .05 M6 .04 M7 .04 M8 .03 M9 .03 (cap 0.40)
J: 1 + .10·binding + .05·near_term + .05·enforcement + .10·prohibition (cap 1.30)
Tiers (half-open, from RAW score): Low [0,25) · Moderate [25,50) · High [50,75) · Critical [75,100]
Precision: full-precision chain; display rounds to 1 dp; tests assert ±0.001 (SPEC §13.7)`}</pre>
      <h2>ADRS decision limit</h2>
      <p>ADRS is an author-designed prioritization heuristic, not a calibrated probability, compliance score, or automated launch gate. Decisions must show the tier, driver breakdown, evidence quality, and plausible sensitivity range. Missing coverage can bias a score downward.</p>

      <h2>Known limits</h2>
      <p>The current structured corpus is a curated research foundation, not the larger corpus originally described in the product specification. It cannot establish universal legal coverage, current applicability for an unspecified product, or the effectiveness of controls that have not been tested in a real workflow. Qualified local review remains necessary for consequential decisions.</p>
    </>
  );
}

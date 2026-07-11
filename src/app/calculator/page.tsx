import { AdrsCalculator } from '@/components/AdrsCalculator';

/** ADRS Calculator shell — minimal unstyled wiring of the canonical formula module (FR-5 logic only; P1 styles later). */
export default function CalculatorPage() {
  return (
    <>
      <h1>ADRS Calculator</h1>
      <p><b>This is not a compliance determination.</b></p>
      <p className="phase0">Phase 0 shell — logic-complete, unstyled. Jurisdiction selection shows reference material only and never auto-sets J (CB-3).</p>
      <AdrsCalculator />
    </>
  );
}

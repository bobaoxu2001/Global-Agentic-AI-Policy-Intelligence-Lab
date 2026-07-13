import { AdrsCalculator } from '@/components/AdrsCalculator';

/** Legacy route retained for the permanent /risk-score redirect. */
export default function CalculatorPage() {
  return (
    <>
      <h1>ADRS Calculator</h1>
      <p><b>This is not a compliance determination.</b></p>
      <p className="status-note">Jurisdiction selection is reference material only and never auto-sets J (CB-3).</p>
      <AdrsCalculator />
    </>
  );
}

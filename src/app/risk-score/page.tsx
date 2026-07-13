import { AdrsCalculator } from '@/components/AdrsCalculator';

export default function RiskScorePage() {
  return (
    <>
      <h1>Agent Deployment Risk Score (ADRS)</h1>
      <p><b>This is not a compliance determination.</b> ADRS is a transparent analytical communication tool for comparing hypothetical deployment conditions.</p>
      <p className="status-note">The calculator is deterministic: analysts set capability anchors, supported mitigations, and the four jurisdictional J components manually. Selecting a jurisdiction never changes the score automatically.</p>
      <AdrsCalculator />
    </>
  );
}
